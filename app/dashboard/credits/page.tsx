"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const subscriptionPlans = [
  // {
  //   name: "Starter",
  //   price: "9",
  //   description: "Perfect for getting started with AI dubbing",
  //   features: ["100 minutes of dubbing", "720p video quality", "Basic support"],
  // },
  {
    name: "Pro",
    price: "9",
    description: "Best for professionals and content creators",
    features: ["1080p video quality", "Priority support", "Custom voices"],
  },
  {
    name: "Enterprise",
    price: "99",
    description: "For teams and high-volume needs",
    features: ["4K video quality", "24/7 support", "Custom voices", "API access"],
  },
]

const creditPacks = [
  {
    name: "Small Pack",
    credits: "100",
    price: "10",
    description: "Perfect for small projects",
  },
  {
    name: "Medium Pack",
    credits: "500",
    price: "45",
    description: "Great value for regular users",
  },
  {
    name: "Large Pack",
    credits: "1000",
    price: "80",
    description: "Best value for power users",
  },
]

export default function CreditsPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (plan: string) => {
    setLoading(plan)
    try {
      // TODO: Implement Stripe subscription
      // 1. Call your API route to create a Stripe checkout session
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   body: JSON.stringify({ plan }),
      // })
      // const { sessionId } = await response.json()
      // 2. Redirect to Stripe checkout
      // stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error("Error:", error)
    }
    setLoading(null)
  }

  const handleBuyCredits = async (pack: string) => {
    setLoading(pack)
    try {
      // TODO: Implement Stripe payment
      // Similar to subscription flow but with one-time payment
    } catch (error) {
      console.error("Error:", error)
    }
    setLoading(null)
  }

  return (
    <div className="container py-6">
      <h1 className="mb-8 text-3xl font-bold">Credits & Subscriptions</h1>

      <Tabs defaultValue="subscription" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscription">Monthly Subscription</TabsTrigger>
          <TabsTrigger value="credits">Buy Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">${plan.price}/mo</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={loading === plan.name}
                  >
                    {loading === plan.name ? "Processing..." : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="credits" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {creditPacks.map((pack) => (
              <Card key={pack.name}>
                <CardHeader>
                  <CardTitle>{pack.name}</CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{pack.credits}</span>
                    <span className="text-muted-foreground"> credits</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">${pack.price}</div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleBuyCredits(pack.name)}
                    disabled={loading === pack.name}
                  >
                    {loading === pack.name ? "Processing..." : "Buy Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

