import { ArrowLeft, DollarSign, Target, Calendar, Trophy, TrendingUp, Zap, Star, CheckCircle2, Flame } from "lucide-react";
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
      title: "Short Term Goal - Emergency Fund",
      description: "Save ₹15,000 this month",
      target: 15000,
      current: 15000,
      progress: 100,
      status: "completed",
      deadline: "This Month",
    },
    {
      icon: Target,
      title: "Medium Term Goal - Vacation Fund",
      description: "Save ₹1,00,000 in 6 months",
      target: 100000,
      current: 45000,
      progress: 45,
      status: "in-progress",
      deadline: "6 Months",
    },
    {
      icon: Trophy,
      title: "Long Term Goal - Home Down Payment",
      description: "Save ₹5,00,000 in 2 years",
      target: 500000,
      current: 75000,
      progress: 15,
      status: "in-progress",
      deadline: "24 Months",
    },
  ];

  const monthlySavings = [
    { month: "Jan", amount: 12000, target: 15000 },
    { month: "Feb", amount: 14500, target: 15000 },
    { month: "Mar", amount: 15000, target: 15000 },
    { month: "Apr", amount: 16000, target: 15000 },
    { month: "May", amount: 15500, target: 15000 },
    { month: "Current", amount: 15000, target: 15000 },
  ];

  const savingsBreakdown = [
    { category: "Emergency Fund", amount: 45000, percentage: 33, color: "bg-success" },
    { category: "Goal-based Savings", amount: 60000, percentage: 44, color: "bg-primary" },
    { category: "Investment Savings", amount: 30000, percentage: 23, color: "bg-accent" },
  ];

  const tips = [
    "You're saving consistently! Keep up the great work.",
    "Your savings rate is 30% of income - above average!",
    "Consider automating your savings with recurring transfers.",
    "You've maintained your streak for 4 months straight!",
    "Emergency fund goal: ₹2,00,000 (3 months expenses)",
    "On track to exceed your annual savings target by 12%",
  ];

  const savingsChallenges = [
    {
      title: "52-Week Challenge",
      description: "Save ₹1 in week 1, ₹2 in week 2, and so on",
      potentialSavings: "₹13,780/year",
      difficulty: "Easy",
    },
    {
      title: "No-Spend Weekend",
      description: "Skip all non-essential spending one weekend per month",
      potentialSavings: "₹4,000/month",
      difficulty: "Medium",
    },
    {
      title: "Round-Up Savings",
      description: "Round up every transaction and save the difference",
      potentialSavings: "₹2,500/month",
      difficulty: "Easy",
    },
  ];

  const achievementBadges = [
    { name: "4-Month Streak", icon: Flame, earned: true },
    { name: "First Goal Completed", icon: Trophy, earned: true },
    { name: "Super Saver", icon: Star, earned: true },
    { name: "6-Month Streak", icon: Flame, earned: false },
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

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>6-Month Savings History</CardTitle>
                <CardDescription>Your savings performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlySavings.map((data, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16">
                        <p className="text-sm font-medium">{data.month}</p>
                      </div>
                      <div className="flex-1">
                        <Progress value={(data.amount / data.target) * 100} className="h-2" />
                      </div>
                      <div className="w-24 text-right">
                        <p className={`text-sm font-semibold ${data.amount >= data.target ? "text-success" : "text-muted-foreground"}`}>
                          ₹{data.amount.toLocaleString()}
                        </p>
                      </div>
                      {data.amount >= data.target && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Total Savings Breakdown</CardTitle>
                <CardDescription>How your ₹1,35,000 in savings is allocated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savingsBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">₹{item.amount.toLocaleString()} ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
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
                          <div className="flex-1">
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
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress: ₹{milestone.current.toLocaleString()} / ₹{milestone.target.toLocaleString()}</span>
                        <span className="font-semibold">{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Deadline: {milestone.deadline}</span>
                        <span>₹{(milestone.target - milestone.current).toLocaleString()} remaining</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="shadow-elevated bg-success/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-success" />
                  <CardTitle>Achievement Badges</CardTitle>
                </div>
                <CardDescription>Celebrate your savings milestones!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievementBadges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg text-center ${
                        badge.earned ? "bg-success/10" : "bg-muted/50 opacity-50"
                      }`}
                    >
                      <badge.icon className={`h-8 w-8 mx-auto mb-2 ${badge.earned ? "text-success" : "text-muted-foreground"}`} />
                      <p className="text-xs font-medium">{badge.name}</p>
                      {badge.earned && (
                        <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-success" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Savings Challenges</h2>
              <p className="text-muted-foreground">Try these challenges to boost your savings even further</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savingsChallenges.map((challenge, index) => (
                  <Card key={index} className="shadow-elevated hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      </div>
                      <div className="pt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          challenge.difficulty === "Easy" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <div className="pt-2 border-t">
                        <p className="text-xs font-semibold text-success">Potential Savings: {challenge.potentialSavings}</p>
                      </div>
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
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
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
