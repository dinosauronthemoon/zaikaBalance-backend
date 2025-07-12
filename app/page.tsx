import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calculator, TrendingUp, BookOpen, Bell, Brain, Heart, Target, Sparkles } from "lucide-react"
import Link from "next/link"
import FloatingBackground from "@/components/floating-background"

const features = [
  {
    icon: Brain,
    title: "Smart Diet Planner",
    description: "AI-powered personalized diet recommendations based on your profile and goals",
    href: "/diet-planner",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    icon: Search,
    title: "Know Your Food",
    description: "Analyze Indian dishes to get detailed nutritional information instantly",
    href: "/food-analysis",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    icon: Calculator,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and get health recommendations",
    href: "/bmi-calculator",
    gradient: "from-rose-400 to-orange-400",
  },
  {
    icon: TrendingUp,
    title: "Nutrient Tracker",
    description: "Track your daily nutrient intake and monitor your progress",
    href: "/nutrient-tracker",
    gradient: "from-orange-400 to-yellow-400",
  },
  {
    icon: BookOpen,
    title: "Recipe Book",
    description: "Curated collection of healthy Indian recipes for different categories",
    href: "/recipes",
    gradient: "from-yellow-400 to-green-400",
  },
  {
    icon: Bell,
    title: "Food Reminders",
    description: "Set customizable reminders for meals and healthy eating habits",
    href: "/reminders",
    gradient: "from-green-400 to-blue-400",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen vintage-gradient relative overflow-hidden">
      <FloatingBackground />

      <div className="content-wrapper">
        <Navigation />

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 relative">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="flex items-center space-x-3 bg-white/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 sparkle">
                <Heart className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI-Powered Nutrition
                </span>
                <Sparkles className="h-5 w-5 text-pink-500" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="gradient-text">Smart Diet Planning</span>
                <br />
                <span className="text-gray-700">for Indian Cuisine</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Combine machine learning with traditional Indian food wisdom to create personalized diet plans, track
                nutrition, and achieve your health goals beautifully.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="vintage-button text-lg px-8 py-4" asChild>
                <Link href="/diet-planner">
                  <Target className="mr-3 h-6 w-6" />
                  Start Diet Planning
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/40 backdrop-blur-md border-white/30 hover:bg-white/50 text-lg px-8 py-4 rounded-xl"
                asChild
              >
                <Link href="/food-analysis">
                  <Search className="mr-3 h-6 w-6" />
                  Analyze Food
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Everything You Need for Healthy Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive suite of tools helps you make informed decisions about your diet and nutrition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="feature-card group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                      {feature.description}
                    </CardDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-white/50 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                      asChild
                    >
                      <Link href={feature.href}>
                        Try Now
                        <Sparkles className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="stats-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <div className="text-5xl font-bold gradient-text pulse-glow">1000+</div>
                <div className="text-xl text-gray-700 font-medium">Indian Dishes Analyzed</div>
                <div className="text-gray-600">Comprehensive nutritional database</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold gradient-text pulse-glow">AI-Powered</div>
                <div className="text-xl text-gray-700 font-medium">Personalized Recommendations</div>
                <div className="text-gray-600">Smart algorithms for better health</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold gradient-text pulse-glow">5 Categories</div>
                <div className="text-xl text-gray-700 font-medium">Specialized Diet Plans</div>
                <div className="text-gray-600">Tailored for your lifestyle</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
