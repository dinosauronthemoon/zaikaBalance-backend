import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calculator, TrendingUp, BookOpen, Bell, Brain, Heart, Target } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "Smart Diet Planner",
    description: "AI-powered personalized diet recommendations based on your profile and goals",
    href: "/diet-planner",
  },
  {
    icon: Search,
    title: "Know Your Food",
    description: "Analyze Indian dishes to get detailed nutritional information instantly",
    href: "/food-analysis",
  },
  {
    icon: Calculator,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and get health recommendations",
    href: "/bmi-calculator",
  },
  {
    icon: TrendingUp,
    title: "Nutrient Tracker",
    description: "Track your daily nutrient intake and monitor your progress",
    href: "/nutrient-tracker",
  },
  {
    icon: BookOpen,
    title: "Recipe Book",
    description: "Curated collection of healthy Indian recipes for different categories",
    href: "/recipes",
  },
  {
    icon: Bell,
    title: "Food Reminders",
    description: "Set customizable reminders for meals and healthy eating habits",
    href: "/reminders",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-950 dark:to-orange-950">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Nutrition</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Smart Diet Planning for
            <span className="text-primary block">Indian Cuisine</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combine machine learning with traditional Indian food wisdom to create personalized diet plans, track
            nutrition, and achieve your health goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/diet-planner">
                <Target className="mr-2 h-5 w-5" />
                Start Diet Planning
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/food-analysis">
                <Search className="mr-2 h-5 w-5" />
                Analyze Food
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need for Healthy Living</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you make informed decisions about your diet and nutrition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={feature.href}>Try Now</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Indian Dishes Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">AI-Powered</div>
              <div className="text-muted-foreground">Personalized Recommendations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5 Categories</div>
              <div className="text-muted-foreground">Specialized Diet Plans</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
