import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data - in a real app, these would come from user input or database
  const income = 30000;
  const savingsGoal = 8000;
  
  const expenses = [
    { category: "Food & Dining", amount: 7000, color: "bg-accent", icon: "🍔" },
    { category: "Transportation", amount: 3000, color: "bg-primary", icon: "🚗" },
    { category: "Entertainment", amount: 2000, color: "bg-success", icon: "🎬" },
    { category: "Shopping", amount: 5000, color: "bg-warning", icon: "🛍" },
    { category: "Utilities", amount: 2000, color: "bg-destructive", icon: "💡" },
    { category: "Others", amount: 1000, color: "bg-muted", icon: "📦" },
  ];

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const savings = income - totalExpenses;
  const savingsPercentage = ((savings / savingsGoal) * 100).toFixed(1);
  
  // Calculate budget status
  const getBudgetStatus = () => {
    if (savings >= savingsGoal) {
      return { status: "On track", icon: CheckCircle, color: "text-success", bgColor: "bg-success/10" };
    } else if (savings >= savingsGoal * 0.9) {
      return { status: "Slightly off track", icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/10" };
    } else {
      return { status: "Over budget", icon: XCircle, color: "text-destructive", bgColor: "bg-destructive/10" };
    }
  };
  
  const budgetStatus = getBudgetStatus();
  
  // Calculate expense remarks
  const getExpenseRemark = (percentage: number) => {
    if (percentage >= 30) return { label: "High", color: "destructive" };
    if (percentage >= 15) return { label: "Moderate", color: "default" };
    return { label: "Low", color: "secondary" };
  };
  
  // Add percentage to expenses
  const expensesWithDetails = expenses.map(exp => ({
    ...exp,
    percentage: ((exp.amount / totalExpenses) * 100).toFixed(0),
  }));

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-elevated">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{income.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{totalExpenses.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">Spent this month</p>
                </CardContent>
              </Card>

              <Card className="shadow-elevated">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">₹{savings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">Goal: ₹{savingsGoal.toLocaleString()} ({savingsPercentage}%)</p>
                </CardContent>
              </Card>

              <Card className={`shadow-elevated ${budgetStatus.bgColor}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                  <budgetStatus.icon className={`h-4 w-4 ${budgetStatus.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${budgetStatus.color}`}>{budgetStatus.status}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {savings >= savingsGoal ? "Great job!" : "Keep going!"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Expense Breakdown Table */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>🧾 Expense Breakdown</CardTitle>
                <CardDescription>Your spending by category this month</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                      <TableHead className="text-right">% of Total</TableHead>
                      <TableHead className="text-right">Remark</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expensesWithDetails.map((expense, index) => {
                      const remark = getExpenseRemark(Number(expense.percentage));
                      return (
                        <TableRow key={index} className="animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${index * 50}ms` }}>
                          <TableCell className="font-medium">
                            <span className="mr-2">{expense.icon}</span>
                            {expense.category}
                          </TableCell>
                          <TableCell className="text-right">₹{expense.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{expense.percentage}%</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={remark.color as any}>{remark.label}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow className="font-bold bg-muted/50">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right">₹{totalExpenses.toLocaleString()}</TableCell>
                      <TableCell className="text-right">100%</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Financial Summary & Insights */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>💡 Financial Insight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Income</p>
                    <p className="text-xl font-bold">₹{income.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Expense</p>
                    <p className="text-xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Savings</p>
                    <p className="text-xl font-bold text-success">₹{savings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Goal</p>
                    <p className="text-xl font-bold">₹{savingsGoal.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${budgetStatus.bgColor} border border-border`}>
                  <div className="flex items-center gap-2 mb-2">
                    <budgetStatus.icon className={`h-5 w-5 ${budgetStatus.color}`} />
                    <span className={`font-bold ${budgetStatus.color}`}>Budget Status: {budgetStatus.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {savings >= savingsGoal 
                      ? "Great job! You're maintaining healthy savings. Next month, try trimming your shopping expenses slightly to boost savings further."
                      : savings >= savingsGoal * 0.9
                      ? "You're close to your goal! Consider reducing high-expense categories like Food & Dining or Shopping to meet your target."
                      : "You're over budget. Focus on cutting down on Food & Dining and Shopping expenses to get back on track."
                    }
                  </p>
                </div>
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
