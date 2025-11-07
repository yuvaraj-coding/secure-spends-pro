import { ArrowLeft, TrendingUp, Target, PieChart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const InvestmentOpportunity = () => {
  const navigate = useNavigate();

  const opportunities = [
    {
      icon: Target,
      title: "Mutual Funds",
      description: "Start with ₹5,000/month in diversified equity funds. Expected returns: 12-15% annually.",
      risk: "Moderate",
    },
    {
      icon: PieChart,
      title: "Fixed Deposits",
      description: "Low-risk option with guaranteed returns of 6-7% annually. Ideal for emergency funds.",
      risk: "Low",
    },
    {
      icon: BarChart3,
      title: "Index Funds",
      description: "Track market performance with minimal fees. Good for long-term wealth building.",
      risk: "Moderate",
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
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Investment Opportunity</h1>
                  <p className="text-muted-foreground">Personalized investment recommendations based on your financial profile</p>
                </div>
              </div>
            </div>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Your Investment Capacity</CardTitle>
                <CardDescription>Based on your current savings pattern</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-3xl font-bold">₹15,000</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Recommended Investment</p>
                    <p className="text-3xl font-bold text-success">₹5,000</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Projected Annual Return</p>
                    <p className="text-3xl font-bold text-primary">12-15%</p>
                  </div>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg space-y-3">
                  <h3 className="font-semibold text-lg">Investment Plan</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Initial Investment (Monthly)</span>
                      <span className="font-semibold">₹5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projected Value (5 years)</span>
                      <span className="font-semibold text-success">₹4.5 - 5.2 Lakhs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projected Value (10 years)</span>
                      <span className="font-semibold text-success">₹11.5 - 14.8 Lakhs</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Recommended Investment Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.map((opportunity, index) => (
                  <Card key={index} className="shadow-elevated">
                    <CardHeader>
                      <div className="p-2 bg-muted rounded-lg w-fit">
                        <opportunity.icon className="h-5 w-5 text-success" />
                      </div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <div className="pt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          opportunity.risk === "Low" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {opportunity.risk} Risk
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="shadow-elevated bg-primary/5">
              <CardHeader>
                <CardTitle>Important Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  These recommendations are AI-generated suggestions based on your financial data. 
                  Always consult with a certified financial advisor before making investment decisions. 
                  Past performance does not guarantee future results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentOpportunity;
