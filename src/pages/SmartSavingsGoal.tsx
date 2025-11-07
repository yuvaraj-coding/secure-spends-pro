import { ArrowLeft, DollarSign, Target, Calendar, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const SmartSavingsGoal = () => {
  const navigate = useNavigate();

  const milestones = [
    {
      icon: Calendar,
      title: "Short Term Goal",
      description: "Save ₹15,000 this month - You're at 100%! Goal achieved!",
      progress: 100,
      status: "completed",
    },
    {
      icon: Target,
      title: "Medium Term Goal",
      description: "Save ₹1,00,000 in 6 months - Currently at 45% (₹45,000)",
      progress: 45,
      status: "in-progress",
    },
    {
      icon: Trophy,
      title: "Long Term Goal",
      description: "Save ₹5,00,000 in 2 years - On track at 15% (₹75,000)",
      progress: 15,
      status: "in-progress",
    },
  ];

  const tips = [
    "You're saving consistently! Keep up the great work.",
    "Your savings rate is 30% of income - above average!",
    "Consider automating your savings with recurring transfers.",
    "Emergency fund goal: ₹2,00,000 (3 months expenses)",
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
                <div className="p-3 bg-primary/10 rounded-lg">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Smart Savings Goal</h1>
                  <p className="text-muted-foreground">Track your progress and achieve your financial goals</p>
                </div>
              </div>
            </div>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Current Month Progress</CardTitle>
                <CardDescription>You're making excellent progress!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monthly Goal</p>
                    <p className="text-3xl font-bold">₹15,000</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Savings</p>
                    <p className="text-3xl font-bold text-success">₹15,000</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Goal Status</p>
                    <p className="text-3xl font-bold text-primary">100%</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Monthly Progress</span>
                    <span className="text-success font-semibold">Goal Achieved! 🎉</span>
                  </div>
                  <Progress value={100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Savings Milestones</h2>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="shadow-elevated">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <milestone.icon className={`h-5 w-5 ${
                              milestone.status === "completed" ? "text-success" : "text-primary"
                            }`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{milestone.title}</CardTitle>
                            <CardDescription className="mt-1">{milestone.description}</CardDescription>
                          </div>
                        </div>
                        {milestone.status === "completed" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                            Completed
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={milestone.progress} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>AI Insights & Tips</CardTitle>
                <CardDescription>Personalized recommendations to boost your savings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmartSavingsGoal;
