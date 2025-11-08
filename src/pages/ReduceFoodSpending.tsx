import { ArrowLeft, TrendingDown, Utensils, ShoppingBag, Coffee, Calendar, ChefHat, Lightbulb, Target, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const ReduceFoodSpending = () => {
  const navigate = useNavigate();

  const weeklyTrend = [
    { week: "Week 1", amount: 3500, target: 2400 },
    { week: "Week 2", amount: 3300, target: 2400 },
    { week: "Week 3", amount: 3100, target: 2400 },
    { week: "Week 4", amount: 3200, target: 2400 },
  ];

  const mealAnalysis = [
    { type: "Dining Out", count: 8, avgCost: 225, total: 1800, percentage: 56 },
    { type: "Groceries", count: 4, avgCost: 250, total: 1000, percentage: 31 },
    { type: "Coffee & Snacks", count: 12, avgCost: 33, total: 400, percentage: 13 },
  ];

  const tips = [
    {
      icon: Utensils,
      title: "Cook at Home More Often",
      description: "Preparing meals at home can save you up to 60% compared to eating out. Try meal planning for the week ahead.",
      savings: "₹800-1,200/week",
    },
    {
      icon: ShoppingBag,
      title: "Smart Grocery Shopping",
      description: "Make a shopping list and stick to it. Buy in bulk for non-perishables and use discount apps to find the best deals.",
      savings: "₹300-500/week",
    },
    {
      icon: Coffee,
      title: "Limit Takeout & Coffee Runs",
      description: "Those daily coffee and lunch orders add up quickly. Brewing coffee at home and packing lunch can save ₹500-800 per week.",
      savings: "₹500-800/week",
    },
    {
      icon: ChefHat,
      title: "Meal Prep on Weekends",
      description: "Prepare meals in batches on weekends. This saves time during the week and reduces the temptation to order food.",
      savings: "₹600-900/week",
    },
    {
      icon: Calendar,
      title: "Plan Your Meals Weekly",
      description: "Create a meal plan every Sunday. This helps you shop efficiently and avoid impulse purchases.",
      savings: "₹400-600/week",
    },
    {
      icon: Target,
      title: "Set Daily Spending Limits",
      description: "Allocate a fixed budget for food each day. Track your spending with apps to stay accountable.",
      savings: "₹300-500/week",
    },
  ];

  const quickWins = [
    "Cancel unused food delivery subscriptions - Save ₹200/month",
    "Pack lunch 3 days a week instead of buying - Save ₹2,400/month",
    "Make coffee at home instead of cafes - Save ₹1,200/month",
    "Use grocery store loyalty programs - Save ₹300/month",
    "Buy seasonal vegetables and fruits - Save ₹400/month",
  ];

  const mealIdeas = [
    {
      name: "Quick Breakfast",
      items: ["Oats with fruits", "Egg sandwich", "Smoothie bowl"],
      cost: "₹30-50 per meal",
    },
    {
      name: "Easy Lunch",
      items: ["Rice & dal combo", "Vegetable pulao", "Pasta with veggies"],
      cost: "₹60-90 per meal",
    },
    {
      name: "Simple Dinner",
      items: ["Roti with curry", "Khichdi", "Stir-fry with rice"],
      cost: "₹70-100 per meal",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <TrendingDown className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Reduce Food Spending</h1>
                  <p className="text-muted-foreground">AI-powered insights to help you save on food expenses</p>
                </div>
              </div>
            </div>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Your Current Spending</CardTitle>
                <CardDescription>Analysis of your food expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Last Week</p>
                    <p className="text-3xl font-bold">₹3,200</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Potential Savings (25%)</p>
                    <p className="text-3xl font-bold text-success">₹800</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Projection</p>
                    <p className="text-3xl font-bold text-primary">₹12,800</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Spending Breakdown by Meal Type</h3>
                  {mealAnalysis.map((meal, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{meal.type}</span>
                          <p className="text-xs text-muted-foreground">{meal.count} orders • Avg ₹{meal.avgCost} per order</p>
                        </div>
                        <span className="font-semibold">₹{meal.total} ({meal.percentage}%)</span>
                      </div>
                      <Progress value={meal.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>4-Week Spending Trend</CardTitle>
                <CardDescription>Your progress towards the ₹2,400/week target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyTrend.map((week, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{week.week}</span>
                        <div className="flex items-center gap-2">
                          <span className={week.amount > week.target ? "text-destructive" : "text-success"}>
                            ₹{week.amount}
                          </span>
                          {week.amount > week.target ? (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Progress value={(week.amount / 5000) * 100} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">Target: ₹{week.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated bg-success/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-success" />
                  <CardTitle>Quick Wins - Implement These First!</CardTitle>
                </div>
                <CardDescription>Start with these easy changes to see immediate savings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {quickWins.map((win, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{win}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">AI Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips.map((tip, index) => (
                  <Card key={index} className="shadow-elevated">
                    <CardHeader>
                      <div className="p-2 bg-muted rounded-lg w-fit">
                        <tip.icon className="h-5 w-5 text-accent" />
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <div className="pt-2 border-t">
                        <p className="text-xs font-semibold text-success">Potential Savings: {tip.savings}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="shadow-elevated">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <CardTitle>Budget-Friendly Meal Ideas</CardTitle>
                </div>
                <CardDescription>Save money by preparing these simple, cost-effective meals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mealIdeas.map((meal, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-lg">{meal.name}</h3>
                      <ul className="space-y-2">
                        {meal.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-semibold text-success pt-2 border-t">{meal.cost}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated bg-primary/5">
              <CardHeader>
                <CardTitle>Your Savings Goal Tracker</CardTitle>
                <CardDescription>Track your progress towards reducing food spending by 25%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Weekly Spend</p>
                    <p className="text-2xl font-bold">₹3,200</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Target Weekly Spend</p>
                    <p className="text-2xl font-bold text-success">₹2,400</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">25% reduction = ₹800 saved</span>
                  </div>
                  <Progress value={0} className="h-3" />
                  <p className="text-xs text-muted-foreground">Start implementing the tips above to track your progress!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReduceFoodSpending;
