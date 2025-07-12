"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { Loader2, Bell, Plus, Clock, Trash2 } from "lucide-react"

interface Reminder {
  id: string
  time: string
  message: string
  frequency: string
  isActive: boolean
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [newReminder, setNewReminder] = useState({
    time: "",
    message: "",
    frequency: "daily",
  })
  const [loading, setLoading] = useState(false)
  const [loadingReminders, setLoadingReminders] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadReminders()
  }, [])

  const loadReminders = async () => {
    try {
      const data = await apiClient.getReminders()
      setReminders(data)
    } catch (error) {
      console.error("Failed to load reminders:", error)
    } finally {
      setLoadingReminders(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.setReminder(newReminder)
      toast({
        title: "Reminder Set!",
        description: "Your food reminder has been created successfully.",
      })

      setNewReminder({
        time: "",
        message: "",
        frequency: "daily",
      })
      loadReminders()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set reminder. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const predefinedMessages = [
    "Time for breakfast! Start your day with a healthy meal.",
    "Lunch break! Don't skip your midday nutrition.",
    "Dinner time! Keep it balanced and nutritious.",
    "Snack time! Choose something healthy.",
    "Don't forget to drink water!",
    "Time to take your vitamins.",
    "Remember to eat your fruits today.",
    "Have you had enough protein today?",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Food Reminders</h1>
            <p className="text-muted-foreground">Set customizable reminders for meals and healthy eating habits</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create New Reminder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Reminder</span>
                </CardTitle>
                <CardDescription>Set up personalized reminders for your meals and nutrition</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder((prev) => ({ ...prev, time: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Input
                      id="message"
                      placeholder="Enter your reminder message..."
                      value={newReminder.message}
                      onChange={(e) => setNewReminder((prev) => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label>Frequency</Label>
                    <Select
                      value={newReminder.frequency}
                      onValueChange={(value) => setNewReminder((prev) => ({ ...prev, frequency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="weekdays">Weekdays Only</SelectItem>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting Reminder...
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Set Reminder
                      </>
                    )}
                  </Button>
                </form>

                {/* Quick Message Templates */}
                <div className="mt-6">
                  <Label className="text-sm font-medium">Quick Templates</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {predefinedMessages.slice(0, 4).map((message, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-left justify-start h-auto p-2 text-xs"
                        onClick={() => setNewReminder((prev) => ({ ...prev, message }))}
                      >
                        {message}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Your Reminders</span>
                </CardTitle>
                <CardDescription>Manage your active food and nutrition reminders</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingReminders ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : reminders.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No reminders set</h3>
                    <p className="text-sm text-muted-foreground">Create your first reminder to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">{reminder.time}</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {reminder.frequency}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{reminder.message}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Reminder Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Best Practices</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Set reminders 30 minutes before meal times</li>
                    <li>• Use specific, actionable messages</li>
                    <li>• Consider your daily schedule when setting times</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Popular Reminder Times</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Breakfast: 7:00 AM - 9:00 AM</li>
                    <li>• Lunch: 12:00 PM - 2:00 PM</li>
                    <li>• Dinner: 6:00 PM - 8:00 PM</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
