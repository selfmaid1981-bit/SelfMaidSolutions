import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JotFormAgent } from "@/components/jotform-agent";
import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Quote from "@/pages/quote";
import Checkout from "@/pages/checkout";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import MarketingPage from "@/pages/marketing-page";
import AdminReviews from "@/pages/admin-reviews";
import NotFound from "@/pages/not-found";

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
        <Route path="/checkout" component={Checkout} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/admin/marketing" component={MarketingPage} />
        <Route path="/admin/reviews" component={AdminReviews} />
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
        <JotFormAgent />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
