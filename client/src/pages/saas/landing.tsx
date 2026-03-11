import { SubscriptionPlans } from "@/components/saas/subscription-plans";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export default function SaasLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-900">Leading Edge Growth OS</h1>
        <div className="flex gap-3">
          <Link href="/saas/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
          <Link href="/saas">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          Run Your Service Business<br />Like a <span className="text-indigo-600">Fortune 500</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          CRM, scheduling, AI receptionist, lead discovery, and automated marketing — all in one platform built for service businesses.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/saas/signup">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-lg">AI-Powered</h3>
            <p className="text-sm text-gray-500 mt-2">AI receptionist answers calls 24/7, qualifies leads, and books appointments automatically.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg">Lead Discovery</h3>
            <p className="text-sm text-gray-500 mt-2">Find new customers in your area with our local business discovery engine and automated outreach.</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-lg">All-in-One</h3>
            <p className="text-sm text-gray-500 mt-2">CRM, scheduling, invoicing, SMS, email — everything your service business needs in one place.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Simple, Transparent Pricing</h2>
        <SubscriptionPlans onSelectPlan={() => window.location.href = "/saas/signup"} />
      </section>

      <footer className="border-t mt-16 py-8 text-center text-sm text-gray-500">
        Leading Edge Growth OS — Built for service businesses that want to grow.
      </footer>
    </div>
  );
}
