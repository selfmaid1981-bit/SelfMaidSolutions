import {
  searchPlaces,
  isDuplicate,
  calculateLeadScore,
} from "./places-scraper";
import { enrichBusiness } from "./email-enricher";
import {
  appendLeadsToSheet,
  getExistingLeadEmails,
  getExistingLeadPhones,
} from "./sheets-sync";
import { createDiscoveredBusiness } from "../saas/lead-discovery";

export interface LeadGenConfig {
  searches: { query: string; maxResults?: number }[];
  intervalMinutes: number;
  defaultMaxResults: number;
}

const DEFAULT_CONFIG: LeadGenConfig = {
  searches: [
    {
      query: "property management companies in Montgomery Alabama",
      maxResults: 20,
    },
    { query: "realtors in Montgomery Alabama", maxResults: 20 },
    {
      query: "property management companies in Prattville Alabama",
      maxResults: 15,
    },
    { query: "real estate agents in Prattville Alabama", maxResults: 15 },
    {
      query: "property managers in Birmingham Alabama",
      maxResults: 15,
    },
    { query: "Airbnb property managers in Alabama", maxResults: 15 },
  ],
  intervalMinutes: 60,
  defaultMaxResults: 20,
};

let currentConfig: LeadGenConfig = { ...DEFAULT_CONFIG };
let pipelineInterval: ReturnType<typeof setInterval> | null = null;
let isRunning = false;

export function getLeadGenConfig(): LeadGenConfig {
  return { ...currentConfig };
}

export function updateLeadGenConfig(updates: Partial<LeadGenConfig>) {
  currentConfig = { ...currentConfig, ...updates };
}

export function addSearch(query: string, maxResults?: number) {
  const exists = currentConfig.searches.some(
    (s) => s.query.toLowerCase() === query.toLowerCase()
  );
  if (!exists) {
    currentConfig.searches.push({
      query,
      maxResults: maxResults || currentConfig.defaultMaxResults,
    });
  }
}

export function removeSearch(query: string) {
  currentConfig.searches = currentConfig.searches.filter(
    (s) => s.query.toLowerCase() !== query.toLowerCase()
  );
}

interface PipelineRunResult {
  totalFound: number;
  newLeads: number;
  duplicatesSkipped: number;
  emailsFound: number;
  sheetAppended: number;
  errors: number;
  searchResults: { query: string; found: number; new: number }[];
}

export async function runPipeline(): Promise<PipelineRunResult> {
  if (isRunning) {
    console.log("[LeadGen] Pipeline already running, skipping");
    return {
      totalFound: 0,
      newLeads: 0,
      duplicatesSkipped: 0,
      emailsFound: 0,
      sheetAppended: 0,
      errors: 0,
      searchResults: [],
    };
  }

  isRunning = true;
  console.log(
    `[LeadGen] Pipeline starting — ${currentConfig.searches.length} search(es)`
  );

  const result: PipelineRunResult = {
    totalFound: 0,
    newLeads: 0,
    duplicatesSkipped: 0,
    emailsFound: 0,
    sheetAppended: 0,
    errors: 0,
    searchResults: [],
  };

  try {
    const sheetEmails = await getExistingLeadEmails();
    const sheetPhones = await getExistingLeadPhones();
    const leadsToAppend: any[] = [];

    for (const search of currentConfig.searches) {
      const searchResult = { query: search.query, found: 0, new: 0 };

      try {
        console.log(
          `[LeadGen] Searching: "${search.query}" (max ${search.maxResults || currentConfig.defaultMaxResults})`
        );
        const places = await searchPlaces(
          search.query,
          search.maxResults || currentConfig.defaultMaxResults
        );
        searchResult.found = places.length;
        result.totalFound += places.length;

        for (const place of places) {
          try {
            const dupe = await isDuplicate(
              place.businessName,
              place.address,
              place.phone
            );
            if (dupe) {
              result.duplicatesSkipped++;
              continue;
            }

            if (
              place.phone &&
              sheetPhones.has(place.phone.replace(/\D/g, ""))
            ) {
              result.duplicatesSkipped++;
              continue;
            }

            const leadScore = calculateLeadScore(place);

            const biz = await createDiscoveredBusiness({
              businessName: place.businessName,
              address: place.address,
              city: place.city,
              state: place.state,
              phone: place.phone,
              website: place.website,
              rating: place.rating?.toString(),
              reviewCount: place.reviewCount,
              category: place.category,
              leadScore,
            });

            result.newLeads++;
            searchResult.new++;

            let email = "";
            let emailVerified = false;

            if (place.website) {
              try {
                const enrichResult = await enrichBusiness(
                  biz.id,
                  place.website
                );
                if (enrichResult.email) {
                  email = enrichResult.email;
                  emailVerified = enrichResult.verified;
                  result.emailsFound++;
                }
              } catch (err: any) {
                console.log(
                  `[LeadGen] Enrichment failed for ${place.businessName}: ${err.message}`
                );
              }
            }

            if (email && sheetEmails.has(email.toLowerCase())) {
              continue;
            }

            const today = new Date().toISOString().split("T")[0];
            const category = place.category?.toLowerCase() || "";
            const leadType = category.includes("real estate")
              ? "realtor"
              : "property_manager";
            const notes = [
              `Rating: ${place.rating}/5 (${place.reviewCount} reviews)`,
              `Score: ${leadScore}/5`,
              `Type: ${leadType}`,
              emailVerified ? "Email verified" : "",
            ]
              .filter(Boolean)
              .join(" | ");

            leadsToAppend.push({
              name: place.businessName,
              email: email || "",
              phone: place.phone,
              company: place.businessName,
              title: "",
              city: place.city
                ? `${place.city}, ${place.state}`
                : place.address,
              source: "Google Maps",
              status: "new",
              notes,
              dateAdded: today,
              lastContact: "",
              website: place.website,
            });

            if (email) sheetEmails.add(email.toLowerCase());
            if (place.phone)
              sheetPhones.add(place.phone.replace(/\D/g, ""));
          } catch (err: any) {
            console.error(
              `[LeadGen] Error processing ${place.businessName}: ${err.message}`
            );
            result.errors++;
          }
        }
      } catch (err: any) {
        console.error(
          `[LeadGen] Search failed for "${search.query}": ${err.message}`
        );
        result.errors++;
      }

      result.searchResults.push(searchResult);
      await new Promise((r) => setTimeout(r, 1000));
    }

    if (leadsToAppend.length > 0) {
      result.sheetAppended = await appendLeadsToSheet(leadsToAppend);
    }

    console.log(
      `[LeadGen] Pipeline complete: ${result.totalFound} found, ${result.newLeads} new, ${result.emailsFound} emails, ${result.sheetAppended} appended to sheet`
    );
  } catch (err: any) {
    console.error(`[LeadGen] Pipeline error: ${err.message}`);
    result.errors++;
  } finally {
    isRunning = false;
  }

  return result;
}

export function startLeadGenPipeline(intervalMinutes?: number) {
  if (pipelineInterval) {
    clearInterval(pipelineInterval);
  }

  const interval = intervalMinutes || currentConfig.intervalMinutes;
  currentConfig.intervalMinutes = interval;

  console.log(
    `[LeadGen] Pipeline scheduler started (every ${interval} minutes)`
  );

  pipelineInterval = setInterval(
    async () => {
      try {
        await runPipeline();
      } catch (err: any) {
        console.error(`[LeadGen] Scheduled run failed: ${err.message}`);
      }
    },
    interval * 60 * 1000
  );

  setTimeout(async () => {
    console.log("[LeadGen] Running initial pipeline...");
    try {
      await runPipeline();
    } catch (err: any) {
      console.error(`[LeadGen] Initial run failed: ${err.message}`);
    }
  }, 10000);
}

export function stopLeadGenPipeline() {
  if (pipelineInterval) {
    clearInterval(pipelineInterval);
    pipelineInterval = null;
    console.log("[LeadGen] Pipeline stopped");
  }
}

export function isPipelineRunning(): boolean {
  return pipelineInterval !== null;
}
