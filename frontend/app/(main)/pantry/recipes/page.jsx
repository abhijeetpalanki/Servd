"use client";

import { useEffect } from "react";
import {
  ArrowLeft,
  ChefHat,
  Loader2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import { getRecipesByPantryIngredients } from "@/actions/recipe.actions";
import RecipeCard from "@/components/recipe-card";
import PricingModal from "@/components/pricing-modal";

export default function PantryRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchSuggestions,
  } = useFetch(getRecipesByPantryIngredients);

  console.log(recipesData);

  // Load suggestions on mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const recipes = recipesData?.recipes || [];
  const ingredientsUsed = recipesData?.ingredientsUsed || "";

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/pantry"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-red-600 transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pantry
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <ChefHat className="w-16 h-16 text-green-600" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                What Can I Cook?
              </h1>
              <p className="text-stone-600 font-light">
                AI-powered recipe suggestions based on your pantry
              </p>
            </div>
          </div>

          {/* Ingredients Used */}
          {ingredientsUsed && (
            <div className="bg-white p-4 border-2 border-stone-200 mb-4">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Your Available Ingredients:
                  </h3>
                  <p className="text-stone-600 text-sm font-light">
                    {ingredientsUsed}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Usage Stats */}
          {recipesData !== undefined && (
            <div className="bg-red-50 p-4 border-2 border-red-200 inline-flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-red-600" />
              <div className="text-sm">
                {recipesData.recommendationsLimit === "unlimited" ? (
                  <>
                    <span className="font-bold text-green-600">∞</span>
                    <span className="text-red-700 font-light">
                      {" "}
                      Unlimited AI recommendations (Pro Plan)
                    </span>
                  </>
                ) : (
                  <span className="text-red-700 font-light">
                    Upgrade to Pro for unlimited AI recommendations
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-stone-900 mb-2">
              Finding Perfect Recipes...
            </h2>
            <p className="text-stone-600 font-light">
              Our AI chef is analyzing your ingredients
            </p>
          </div>
        )}

        {/* Recipes Grid - Using RecipeCard Component */}
        {!loading && recipes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-bold text-stone-900">
                  Recipe Suggestions
                </h2>
              </div>
              <Badge
                variant="outline"
                className="border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-wide"
              >
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} variant="pantry" />
              ))}
            </div>

            {/* Refresh Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={() => fetchSuggestions(new FormData())}
                variant="outline"
                className="border-2 border-stone-900 hover:bg-stone-900 hover:text-white gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get New Suggestions
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Empty Pantry State */}
        {!loading && recipes.length === 0 && recipesData?.success === false && (
          <div className="bg-white p-12 text-center border-2 border-dashed border-stone-200">
            <div className="bg-red-50 w-20 h-20 border-2 border-red-200 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Your Pantry is Empty
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto font-light">
              Add ingredients to your pantry first so we can suggest delicious
              recipes you can make!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pantry/scan">
                <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                  <Sparkles className="w-4 h-4" />
                  Scan with AI
                </Button>
              </Link>
              <Link href="/pantry">
                <Button
                  variant="outline"
                  className="border-2 border-stone-900 hover:bg-stone-900 hover:text-white gap-2"
                >
                  Add Manually
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Rate Limit Reached */}
        {!loading && recipesData === undefined && (
          <div className="bg-linear-to-br from-red-50 to-amber-50 p-12 text-center border-2 border-red-200">
            <div className="bg-red-100 w-20 h-20 border-2 border-red-200 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Monthly Limit Reached
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto font-light">
              You&apos;ve used all your AI recipe recommendations this month.
              Upgrade to Pro for unlimited suggestions!
            </p>
            <PricingModal>
              <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            </PricingModal>
          </div>
        )}
      </div>
    </div>
  );
}
