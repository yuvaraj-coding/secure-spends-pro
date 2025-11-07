import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const expenses = [
    { category: "Food & Dining", amount: 3200, color: "bg-accent", percentage: 32 },
    { category: "Transportation", amount: 1500, color: "bg-primary", percentage: 15 },
    { category: "Shopping", amount: 2800, color: "bg-warning", percentage: 28 },
    { category: "Bills & Utilities", amount: 1500, color: "bg-destructive", percentage: 15 },
    { category: "Entertainment", amount: 1000, color: "bg-success", percentage: 10 },
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const aiTips = [
    {
      title: "Reduce Food Spending",
      description: "You spent ₹3,200 on food last week. Reducing that by 25% could save you ₹800 this week.",
      icon: TrendingDown,
      color: "text-accent",
      link: "/reduce-food-spending",
    },
    {
      title: "Investment Opportunity",
      description: "Based on your savings pattern, you could invest ₹5,000 monthly in mutual funds.",
      icon: TrendingUp,
      color: "text-success",
      link: "/investment-opportunity",
    },
    {
      title: "Smart Savings Goal",
      description: "You're on track to save ₹15,000 this month. Great progress towards your goal!",
      icon: DollarSign,
      color: "text-primary",
      link: "/smart-savings-goal",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold">Financial Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Your personalized financial insights powered by AI
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-elevated">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">₹15,000</div>
                  <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                  <PieChartIcon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground mt-1">Budget utilized</p>
                </CardContent>
              </Card>
            </div>

            {/* Expense Breakdown */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Your spending by category this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="space-y-2 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{expense.category}</span>
                      <span className="text-muted-foreground">₹{expense.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${expense.color} transition-all duration-1000`}
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">AI Financial Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aiTips.map((tip, index) => (
                  <Link key={index} to={tip.link}>
                    <Card
                      className="shadow-elevated hover:shadow-glow transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 cursor-pointer h-full"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardHeader>
                        <div className={`p-2 bg-muted rounded-lg w-fit ${tip.color}`}>
                          <tip.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
