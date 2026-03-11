import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JotFormAgent } from "@/components/jotform-agent";
import { FloatingCTA } from "@/components/floating-cta";
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
import OutreachTemplates from "@/pages/admin/outreach-templates";
import OutreachAutomation from "@/pages/admin/automation";
import ServiceArea from "@/pages/service-area";
import CityServicePage, { allCityServiceCombinations } from "@/pages/city-service";
import GetStarted from "@/pages/get-started";
import AirbnbCleaning from "@/pages/airbnb-cleaning";
import NotFound from "@/pages/not-found";
import { FacebookPixel } from "@/components/facebook-pixel";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
        <Route path="/services/:city" component={ServiceArea} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/airbnb-cleaning" component={AirbnbCleaning} />
        <Route path="/:cityServiceSlug">{(params) => {
          const slug = params.cityServiceSlug || "";
          const validSlugs = new Set(allCityServiceCombinations.map(c => c.slug));
          return validSlugs.has(slug) ? <CityServicePage /> : <NotFound />;
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
        <FloatingCTA />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
