"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { apiClient, type BMIResult } from "@/lib/api"
import { Loader2, Calculator, TrendingUp, Target } from "lucide-react"

export default function BMICalculatorPage() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
  })

  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await apiClient.calculateBMI(
        Number.parseFloat(formData.weight),
        Number.parseFloat(formData.height),
        Number.parseInt(formData.age),
        formData.gender,
      )
      setBmiResult(result)
      toast({
        title: "BMI Calculated!",
        description: "Your BMI and health recommendations are ready.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate BMI. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getBMIColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "underweight":
        return "text-blue-600"
      case "normal":
        return "text-green-600"
      case "overweight":
        return "text-yellow-600"
      case "obese":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getBMIRecommendation = (category: string) => {
    switch (category.toLowerCase()) {
      case "underweight":
        return "Consider increasing your caloric intake with nutrient-dense foods and consult a healthcare provider."
      case "normal":
        return "Great! Maintain your current healthy lifestyle with balanced diet and regular exercise."
      case "overweight":
        return "Consider a balanced diet with portion control and regular physical activity."
      case "obese":
        return "Consult with a healthcare provider for a comprehensive weight management plan."
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your Body Mass Index and get personalized health recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>BMI Calculator</span>
                </CardTitle>
                <CardDescription>Enter your details to calculate your Body Mass Index</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="70"
                        value={formData.weight}
                        onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        placeholder="170"
                        value={formData.height}
                        onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Calculate BMI
                      </>
                    )}
                  </Button>
                </form>

                {/* BMI Categories Reference */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">BMI Categories</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Underweight</span>
                      <span className="text-blue-600">Below 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Normal weight</span>
                      <span className="text-green-600">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overweight</span>
                      <span className="text-yellow-600">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Obese</span>
                      <span className="text-red-600">30.0 and above</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {bmiResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Your BMI Results</span>
                  </CardTitle>
                  <CardDescription>Based on your height and weight measurements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* BMI Score */}
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <div className="text-4xl font-bold text-primary mb-2">{bmiResult.bmi.toFixed(1)}</div>
                    <div className={`text-lg font-semibold ${getBMIColor(bmiResult.category)}`}>
                      {bmiResult.category}
                    </div>
                  </div>

                  {/* Ideal Weight */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="font-medium">Ideal Weight Range</span>
                    </div>
                    <span className="font-semibold">{bmiResult.idealWeight} kg</span>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Health Recommendations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {getBMIRecommendation(bmiResult.category)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full" asChild>
                      <a href="/diet-planner">Get Personalized Diet Plan</a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/nutrient-tracker">Track Your Progress</a>
                    </Button>
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
