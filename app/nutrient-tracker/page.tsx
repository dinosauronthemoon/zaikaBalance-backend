"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { apiClient, type NutrientData } from "@/lib/api"
import { Loader2, Plus, BarChart3, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

export default function NutrientTrackerPage() {
  const [nutrients, setNutrients] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
  })
  const [history, setHistory] = useState<NutrientData[]>([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const data = await apiClient.getNutrientHistory(7)
      setHistory(data)
    } catch (error) {
      console.error("Failed to load history:", error)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.logNutrients({
        calories: Number(nutrients.calories),
        protein: Number(nutrients.protein),
        carbs: Number(nutrients.carbs),
        fat: Number(nutrients.fat),
        fiber: Number(nutrients.fiber),
      })

      toast({
        title: "Nutrients Logged!",
        description: "Your daily nutrition data has been recorded.",
      })

      // Reset form
      setNutrients({
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
      })

      // Reload history
      loadHistory()
    } catch (error) {
      toast({
        title: "Logging Failed",
        description: "There was an error logging your nutrients. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setNutrients((prev) => ({ ...prev, [field]: value }))
  }

  const todaysData = history.length > 0 ? history[history.length - 1] : null
  const averageCalories =
    history.length > 0 ? Math.round(history.reduce((sum, day) => sum + day.calories, 0) / history.length) : 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Nutrient Tracker</h1>
            <p className="text-muted-foreground">
              Track your daily nutrition intake and monitor your progress over time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Log Nutrients Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Log Today's Intake</span>
                </CardTitle>
                <CardDescription>Record your daily nutritional consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      placeholder="e.g., 2000"
                      value={nutrients.calories}
                      onChange={(e) => handleInputChange("calories", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      type="number"
                      placeholder="e.g., 80"
                      value={nutrients.protein}
                      onChange={(e) => handleInputChange("protein", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="carbs">Carbohydrates (g)</Label>
                    <Input
                      id="carbs"
                      type="number"
                      placeholder="e.g., 250"
                      value={nutrients.carbs}
                      onChange={(e) => handleInputChange("carbs", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      type="number"
                      placeholder="e.g., 65"
                      value={nutrients.fat}
                      onChange={(e) => handleInputChange("fat", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="fiber">Fiber (g)</Label>
                    <Input
                      id="fiber"
                      type="number"
                      placeholder="e.g., 25"
                      value={nutrients.fiber}
                      onChange={(e) => handleInputChange("fiber", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Log Nutrients
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Today's Summary</span>
                </CardTitle>
                <CardDescription>Your nutritional intake for today</CardDescription>
              </CardHeader>
              <CardContent>
                {todaysData ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary">{todaysData.calories}</div>
                      <div className="text-muted-foreground">Calories</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xl font-semibold">{todaysData.protein}g</div>
                        <div className="text-sm text-muted-foreground">Protein</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xl font-semibold">{todaysData.carbs}g</div>
                        <div className="text-sm text-muted-foreground">Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xl font-semibold">{todaysData.fat}g</div>
                        <div className="text-sm text-muted-foreground">Fat</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xl font-semibold">{todaysData.fiber}g</div>
                        <div className="text-sm text-muted-foreground">Fiber</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No data logged for today. Start tracking your nutrition!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Weekly Stats</span>
                </CardTitle>
                <CardDescription>Your nutrition trends over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold">{averageCalories}</div>
                    <div className="text-muted-foreground">Avg Daily Calories</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Days Tracked</span>
                      <span className="text-sm font-medium">{history.length}/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Consistency</span>
                      <span className="text-sm font-medium">{Math.round((history.length / 7) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          {!historyLoading && history.length > 0 && (
            <div className="mt-8 space-y-8">
              {/* Calorie Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Calorie Trend (Last 7 Days)</CardTitle>
                  <CardDescription>Track your daily calorie intake over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        }
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: any) => [value, "Calories"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="calories"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ fill: "#8884d8" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Macronutrient Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Macronutrient Breakdown (Last 7 Days)</CardTitle>
                  <CardDescription>Compare your protein, carbs, and fat intake</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        }
                      />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <Legend />
                      <Bar dataKey="protein" fill="#ef4444" name="Protein (g)" />
                      <Bar dataKey="carbs" fill="#f59e0b" name="Carbs (g)" />
                      <Bar dataKey="fat" fill="#3b82f6" name="Fat (g)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
