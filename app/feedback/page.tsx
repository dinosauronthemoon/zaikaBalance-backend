"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { Loader2, MessageSquare, Star, Send } from "lucide-react"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
    feature: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await apiClient.submitFeedback(feedback)
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We appreciate your input!",
      })

      setFeedback({
        rating: 0,
        comment: "",
        feature: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const features = [
    "Diet Planner",
    "Food Analysis",
    "BMI Calculator",
    "Nutrient Tracker",
    "Recipe Book",
    "Food Reminders",
    "Overall App Experience",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Share Your Feedback</h1>
            <p className="text-muted-foreground">
              Help us improve Zaika Balance by sharing your thoughts and suggestions
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Feedback Form</span>
              </CardTitle>
              <CardDescription>Your feedback helps us make the app better for everyone</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feature Selection */}
                <div>
                  <Label>Which feature are you providing feedback about?</Label>
                  <Select
                    value={feedback.feature}
                    onValueChange={(value) => setFeedback((prev) => ({ ...prev, feature: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a feature" />
                    </SelectTrigger>
                    <SelectContent>
                      {features.map((feature) => (
                        <SelectItem key={feature} value={feature}>
                          {feature}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <Label className="mb-3 block">How would you rate your experience?</Label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedback((prev) => ({ ...prev, rating: star }))}
                        className={`p-2 rounded-lg transition-colors ${
                          star <= feedback.rating
                            ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                  {feedback.rating > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {feedback.rating === 1 && "Poor - Needs significant improvement"}
                      {feedback.rating === 2 && "Fair - Some issues to address"}
                      {feedback.rating === 3 && "Good - Generally satisfied"}
                      {feedback.rating === 4 && "Very Good - Mostly excellent"}
                      {feedback.rating === 5 && "Excellent - Exceeded expectations"}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <Label htmlFor="comment">Your Feedback</Label>
                  <Textarea
                    id="comment"
                    placeholder="Tell us about your experience, suggestions for improvement, or any issues you encountered..."
                    value={feedback.comment}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, comment: e.target.value }))}
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What We Value</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Honest feedback about your user experience</p>
                <p>• Suggestions for new features or improvements</p>
                <p>• Reports of bugs or technical issues</p>
                <p>• Ideas for better nutrition recommendations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How We Use Feedback</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Prioritize feature development and improvements</p>
                <p>• Fix bugs and enhance app performance</p>
                <p>• Improve our AI recommendations</p>
                <p>• Create a better user experience for everyone</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
