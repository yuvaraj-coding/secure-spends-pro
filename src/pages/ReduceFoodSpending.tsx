import { ArrowLeft, TrendingDown, Utensils, ShoppingBag, Coffee } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const ReduceFoodSpending = () => {
  const navigate = useNavigate();

  const tips = [
    {
      icon: Utensils,
      title: "Cook at Home More Often",
      description: "Preparing meals at home can save you up to 60% compared to eating out. Try meal planning for the week ahead.",
    },
    {
      icon: ShoppingBag,
      title: "Smart Grocery Shopping",
      description: "Make a shopping list and stick to it. Buy in bulk for non-perishables and use discount apps to find the best deals.",
    },
    {
      icon: Coffee,
      title: "Limit Takeout & Coffee Runs",
      description: "Those daily coffee and lunch orders add up quickly. Brewing coffee at home and packing lunch can save ₹500-800 per week.",
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
                    <p className="text-3xl font-bold text-primary">₹3,200</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Dining Out</span>
                      <span className="font-semibold">₹1,800 (56%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-full bg-accent rounded-full" style={{ width: "56%" }} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Groceries</span>
                      <span className="font-semibold">₹1,000 (31%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-full bg-primary rounded-full" style={{ width: "31%" }} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Coffee & Snacks</span>
                      <span className="font-semibold">₹400 (13%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-full bg-warning rounded-full" style={{ width: "13%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">AI Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tips.map((tip, index) => (
                  <Card key={index} className="shadow-elevated">
                    <CardHeader>
                      <div className="p-2 bg-muted rounded-lg w-fit">
                        <tip.icon className="h-5 w-5 text-accent" />
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReduceFoodSpending;
