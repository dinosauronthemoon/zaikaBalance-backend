"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { apiClient, type FoodItem } from "@/lib/api"
import { Loader2, Search, Zap, Beef, Wheat, Droplets } from "lucide-react"

export default function FoodAnalysisPage() {
  const [foodName, setFoodName] = useState("")
  const [foodData, setFoodData] = useState<FoodItem | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!foodName.trim()) return

    setLoading(true)

    try {
      const data = await apiClient.analyzeFoodItem(foodName)
      setFoodData(data)
      toast({
        title: "Food Analyzed!",
        description: `Nutritional information for ${foodName} is ready.`,
      })
    } catch (error) {
      // This shouldn't happen anymore since API client handles errors
      console.error("Unexpected error:", error)
    } finally {
      setLoading(false)
    }
  }

  const popularFoods = [
    "Biryani",
    "Dal Tadka",
    "Roti",
    "Rice",
    "Paneer Butter Masala",
    "Samosa",
    "Dosa",
    "Idli",
    "Rajma",
    "Chole Bhature",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Know Your Food</h1>
            <p className="text-muted-foreground">
              Analyze Indian dishes to get detailed nutritional information instantly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Search Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Food Analysis</span>
                </CardTitle>
                <CardDescription>Enter the name of any Indian dish to get its nutritional breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div>
                    <Label htmlFor="food-name">Food Name</Label>
                    <Input
                      id="food-name"
                      placeholder="e.g., Chicken Biryani, Dal Makhani..."
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze Food
                      </>
                    )}
                  </Button>
                </form>

                <div>
                  <Label className="text-sm font-medium">Popular Foods</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularFoods.map((food) => (
                      <Button
                        key={food}
                        variant="outline"
                        size="sm"
                        onClick={() => setFoodName(food)}
                        className="text-xs"
                      >
                        {food}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {foodData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Nutritional Information</span>
                  </CardTitle>
                  <CardDescription>Per serving analysis for {foodData.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Calories Display */}
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">{foodData.calories}</div>
                    <div className="text-muted-foreground">Calories per serving</div>
                  </div>

                  {/* Macronutrients */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded">
                        <Beef className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{foodData.protein}g</div>
                        <div className="text-sm text-muted-foreground">Protein</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded">
                        <Wheat className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{foodData.carbs}g</div>
                        <div className="text-sm text-muted-foreground">Carbs</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                        <Droplets className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{foodData.fat}g</div>
                        <div className="text-sm text-muted-foreground">Fat</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded">
                        <Wheat className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{foodData.fiber}g</div>
                        <div className="text-sm text-muted-foreground">Fiber</div>
                      </div>
                    </div>
                  </div>

                  {/* Calorie Breakdown */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Calorie Breakdown</Label>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Protein</span>
                        <span className="text-sm font-medium">
                          {Math.round(((foodData.protein * 4) / foodData.calories) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Carbs</span>
                        <span className="text-sm font-medium">
                          {Math.round(((foodData.carbs * 4) / foodData.calories) * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fat</span>
                        <span className="text-sm font-medium">
                          {Math.round(((foodData.fat * 9) / foodData.calories) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
