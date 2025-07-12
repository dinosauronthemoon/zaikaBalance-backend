"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { Loader2, BookOpen, Search, Clock, Users } from "lucide-react"

interface Recipe {
  id: string
  name: string
  category: string
  cookingTime: number
  servings: number
  difficulty: string
  ingredients: string[]
  instructions: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
}

const categories = ["All", "Gymrat", "9-5", "Pregnancy", "General Health"]

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadRecipes()
  }, [])

  useEffect(() => {
    filterRecipes()
  }, [recipes, selectedCategory, searchTerm])

  const loadRecipes = async () => {
    try {
      const data = await apiClient.getRecipes()
      setRecipes(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recipes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterRecipes = () => {
    let filtered = recipes

    if (selectedCategory !== "All") {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredRecipes(filtered)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Recipe Book</h1>
            <p className="text-muted-foreground">
              Curated collection of healthy Indian recipes for different lifestyle categories
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes or ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{recipe.name}</CardTitle>
                      <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{recipe.cookingTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {recipe.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Nutritional Info */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <div className="font-semibold text-primary">{recipe.calories}</div>
                        <div className="text-xs text-muted-foreground">Calories</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-primary">{recipe.protein}g</div>
                        <div className="text-xs text-muted-foreground">Protein</div>
                      </div>
                    </div>

                    {/* Ingredients Preview */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Ingredients</h4>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{recipe.ingredients.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Instructions Preview */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Instructions</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{recipe.instructions[0]}</p>
                    </div>

                    <Button variant="outline" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Full Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredRecipes.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
