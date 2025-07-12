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
import { Search, Zap, Beef, Wheat, Droplets, Sparkles } from "lucide-react"
import FloatingBackground from "@/components/floating-background"

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
    <div className="min-h-screen vintage-gradient relative overflow-hidden">
      <FloatingBackground />

      <div className="content-wrapper">
        <Navigation />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl">
                  <Search className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Know Your Food</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Analyze Indian dishes to get detailed nutritional information instantly
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Search Form */}
              <Card className="vintage-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                    <span>Food Analysis</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    Enter the name of any Indian dish to get its nutritional breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleAnalyze} className="space-y-6">
                    <div>
                      <Label htmlFor="food-name" className="text-base font-medium">
                        Food Name
                      </Label>
                      <Input
                        id="food-name"
                        placeholder="e.g., Chicken Biryani, Dal Makhani..."
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        className="vintage-input mt-2"
                        required
                      />
                    </div>

                    <Button type="submit" className="vintage-button w-full text-lg py-3" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="vintage-spinner w-5 h-5 mr-3"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-3 h-5 w-5" />
                          Analyze Food
                          <Sparkles className="ml-3 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div>
                    <Label className="text-base font-medium">Popular Foods</Label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {popularFoods.map((food) => (
                        <Button
                          key={food}
                          variant="outline"
                          size="sm"
                          onClick={() => setFoodName(food)}
                          className="bg-white/50 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
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
                <Card className="vintage-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <span>Nutritional Information</span>
                    </CardTitle>
                    <CardDescription className="text-base">Per serving analysis for {foodData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Main Calories Display */}
                    <div className="text-center p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
                      <div className="text-5xl font-bold gradient-text mb-3">{foodData.calories}</div>
                      <div className="text-lg text-gray-600 font-medium">Calories per serving</div>
                    </div>

                    {/* Macronutrients */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                        <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-xl shadow-lg">
                          <Beef className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-600">{foodData.protein}g</div>
                          <div className="text-sm text-red-500 font-medium">Protein</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                        <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg">
                          <Wheat className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-600">{foodData.carbs}g</div>
                          <div className="text-sm text-yellow-500 font-medium">Carbs</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                          <Droplets className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{foodData.fat}g</div>
                          <div className="text-sm text-blue-500 font-medium">Fat</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                        <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-xl shadow-lg">
                          <Wheat className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{foodData.fiber}g</div>
                          <div className="text-sm text-green-500 font-medium">Fiber</div>
                        </div>
                      </div>
                    </div>

                    {/* Calorie Breakdown */}
                    <div className="space-y-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <Label className="text-lg font-semibold text-gray-800">Calorie Breakdown</Label>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                          <span className="font-medium text-gray-700">Protein</span>
                          <span className="font-bold text-purple-600">
                            {Math.round(((foodData.protein * 4) / foodData.calories) * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                          <span className="font-medium text-gray-700">Carbs</span>
                          <span className="font-bold text-purple-600">
                            {Math.round(((foodData.carbs * 4) / foodData.calories) * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/70 rounded-lg">
                          <span className="font-medium text-gray-700">Fat</span>
                          <span className="font-bold text-purple-600">
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
    </div>
  )
}
