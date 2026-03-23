import { Switch, Route, useLocation, Redirect } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JotFormAgent } from "@/components/jotform-agent";
import { trackPageView } from "@/lib/page-tracker";
import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Quote from "@/pages/quote";
import Booking from "@/pages/booking";
import Checkout from "@/pages/checkout";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import MarketingPage from "@/pages/marketing-page";
import AdminReviews from "@/pages/admin-reviews";
import AdminCampaigns from "@/pages/admin-campaigns";
import MarketingMaterials from "@/pages/marketing-materials";
import ViralMarketing from "@/pages/viral-marketing";
import AdminLeads from "@/pages/admin/leads";
import LeadGenPage from "@/pages/admin/lead-gen";
import OutreachTemplates from "@/pages/admin/outreach-templates";
import OutreachAutomation from "@/pages/admin/automation";
import ServiceArea from "@/pages/service-area";
import CityServicePage, { allCityServiceCombinations, slugAliases } from "@/pages/city-service";
import GetStarted from "@/pages/get-started";
import AirbnbCleaning from "@/pages/airbnb-cleaning";
import NeighborhoodPage from "@/pages/neighborhood";
import NotFound from "@/pages/not-found";
import { FacebookPixel } from "@/components/facebook-pixel";
import CrmDashboard from "@/pages/crm/dashboard";
import CrmPipeline from "@/pages/crm/pipeline";
import CrmContacts from "@/pages/crm/contacts";
import CrmCalendar from "@/pages/crm/calendar";
import CrmAppointments from "@/pages/crm/appointments";
import CrmJobs from "@/pages/crm/jobs";
import CrmAnalytics from "@/pages/crm/analytics";
import SaasLanding from "@/pages/saas/landing";
import SaasSignup from "@/pages/saas/signup";
import SaasDashboard from "@/pages/saas/dashboard";
import SaasLeadDiscovery from "@/pages/saas/lead-discovery";
import SaasBilling from "@/pages/saas/billing";
import SaasSettings from "@/pages/saas/settings";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/quote" component={Quote} />
        <Route path="/booking" component={Booking} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/admin/marketing" component={MarketingPage} />
        <Route path="/admin/reviews" component={AdminReviews} />
        <Route path="/admin/campaigns" component={AdminCampaigns} />
        <Route path="/admin/print" component={MarketingMaterials} />
        <Route path="/admin/viral" component={ViralMarketing} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/outreach" component={OutreachTemplates} />
        <Route path="/admin/automation" component={OutreachAutomation} />
        <Route path="/admin/lead-gen" component={LeadGenPage} />
        <Route path="/services/:city" component={ServiceArea} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/airbnb-cleaning" component={AirbnbCleaning} />
        <Route path="/crm" component={CrmDashboard} />
        <Route path="/crm/pipeline" component={CrmPipeline} />
        <Route path="/crm/contacts" component={CrmContacts} />
        <Route path="/crm/calendar" component={CrmCalendar} />
        <Route path="/crm/appointments" component={CrmAppointments} />
        <Route path="/crm/jobs" component={CrmJobs} />
        <Route path="/crm/analytics" component={CrmAnalytics} />
        <Route path="/saas/landing" component={SaasLanding} />
        <Route path="/saas/signup" component={SaasSignup} />
        <Route path="/saas" component={SaasDashboard} />
        <Route path="/saas/lead-discovery" component={SaasLeadDiscovery} />
        <Route path="/saas/billing" component={SaasBilling} />
        <Route path="/saas/settings" component={SaasSettings} />
        <Route path="/services/:city/:neighborhood" component={NeighborhoodPage} />
        <Route path="/:cityServiceSlug">{(params) => {
          const slug = params.cityServiceSlug || "";
          const validSlugs = new Set(allCityServiceCombinations.map(c => c.slug));
          if (validSlugs.has(slug)) return <CityServicePage />;
          const canonical = slugAliases[slug];
          if (canonical && validSlugs.has(canonical)) return <Redirect to={`/${canonical}`} />;
          return <NotFound />;
        }}</Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <FacebookPixel />
        <JotFormAgent />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
