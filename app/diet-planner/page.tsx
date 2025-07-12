"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { apiClient, type UserProfile, type DietPlan } from "@/lib/api"
import { Loader2, Utensils, Clock, Target } from "lucide-react"

export default function DietPlannerPage() {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    gender: "",
    weight: 70,
    height: 170,
    activityLevel: "",
    goal: "",
    dietaryRestrictions: [],
  })

  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("=== Diet Planner Form Submission ===")
      console.log("Profile data:", profile)

      // Validate required fields
      if (!profile.gender || !profile.activityLevel || !profile.goal) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields (gender, activity level, and goal).",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      console.log("Generating diet plan with profile:", profile)
      const plan = await apiClient.generateDietPlan(profile)
      console.log("Received diet plan:", plan)

      if (!plan || (!plan.breakfast && !plan.lunch && !plan.dinner && !plan.snacks)) {
        throw new Error("Invalid diet plan received")
      }

      setDietPlan(plan)
      toast({
        title: "Diet Plan Generated!",
        description: "Your personalized diet plan is ready with authentic Indian foods.",
      })
    } catch (error) {
      console.error("Diet plan generation error:", error)
      toast({
        title: "Generation Failed",
        description: "There was an error generating your diet plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    setProfile((prev) => ({
      ...prev,
      dietaryRestrictions: checked
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter((r) => r !== restriction),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Smart Diet Planner</h1>
            <p className="text-muted-foreground">
              Get AI-powered personalized diet recommendations based on your profile and goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Your Profile</span>
                </CardTitle>
                <CardDescription>Tell us about yourself to get personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={profile.age}
                        onChange={(e) => setProfile((prev) => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={profile.gender}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, gender: value }))}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={profile.weight}
                        onChange={(e) => setProfile((prev) => ({ ...prev, weight: Number.parseFloat(e.target.value) }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={profile.height}
                        onChange={(e) => setProfile((prev) => ({ ...prev, height: Number.parseFloat(e.target.value) }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Activity Level</Label>
                    <Select
                      value={profile.activityLevel}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, activityLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                        <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="very-active">Very Active (very hard exercise, physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Goal</Label>
                    <Select
                      value={profile.goal}
                      onValueChange={(value) => setProfile((prev) => ({ ...prev, goal: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="weight-gain">Weight Gain</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="general-health">General Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Dietary Restrictions</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "low-sodium"].map(
                        (restriction) => (
                          <div key={restriction} className="flex items-center space-x-2">
                            <Checkbox
                              id={restriction}
                              checked={profile.dietaryRestrictions.includes(restriction)}
                              onCheckedChange={(checked) => handleRestrictionChange(restriction, checked as boolean)}
                            />
                            <Label htmlFor={restriction} className="text-sm capitalize">
                              {restriction.replace("-", " ")}
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Utensils className="mr-2 h-4 w-4" />
                        Generate Diet Plan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Diet Plan Results */}
            {dietPlan && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Your Personalized Diet Plan</span>
                  </CardTitle>
                  <CardDescription>Daily nutritional breakdown and meal recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Nutritional Summary */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{dietPlan.totalCalories}</div>
                      <div className="text-sm text-muted-foreground">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{dietPlan.totalProtein}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{dietPlan.totalCarbs}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{dietPlan.totalFat}g</div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                  </div>

                  {/* Meal Plans */}
                  {Object.entries(dietPlan)
                    .filter(([key]) => !key.startsWith("total"))
                    .map(([mealType, foods]) => (
                      <div key={mealType}>
                        <h3 className="font-semibold capitalize mb-2">{mealType}</h3>
                        <div className="space-y-2">
                          {(foods as any[]).map((food, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                              <span className="font-medium">{food.name}</span>
                              <span className="text-sm text-muted-foreground">{food.calories} cal</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
