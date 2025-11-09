import { useState } from "react";
import { Calendar, Search, Filter, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
  merchant?: string;
}

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading] = useState(false);

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "debit",
      amount: 1250,
      description: "Grocery Shopping",
      category: "Food & Dining",
      date: "2024-01-15",
      status: "completed",
      merchant: "Fresh Mart",
    },
    {
      id: "2",
      type: "credit",
      amount: 5000,
      description: "Salary Deposit",
      category: "Income",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: "3",
      type: "debit",
      amount: 850,
      description: "Uber Ride",
      category: "Transportation",
      date: "2024-01-14",
      status: "completed",
      merchant: "Uber",
    },
    {
      id: "4",
      type: "debit",
      amount: 2500,
      description: "Online Shopping",
      category: "Shopping",
      date: "2024-01-13",
      status: "completed",
      merchant: "Amazon",
    },
    {
      id: "5",
      type: "debit",
      amount: 450,
      description: "Netflix Subscription",
      category: "Entertainment",
      date: "2024-01-12",
      status: "completed",
      merchant: "Netflix",
    },
    {
      id: "6",
      type: "debit",
      amount: 3200,
      description: "Restaurant Dinner",
      category: "Food & Dining",
      date: "2024-01-11",
      status: "completed",
      merchant: "The Gourmet Kitchen",
    },
    {
      id: "7",
      type: "debit",
      amount: 1200,
      description: "Electricity Bill",
      category: "Bills & Utilities",
      date: "2024-01-10",
      status: "completed",
    },
    {
      id: "8",
      type: "credit",
      amount: 2000,
      description: "Freelance Payment",
      category: "Income",
      date: "2024-01-09",
      status: "completed",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.merchant?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const totalCredit = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <LoadingSpinner message="Loading transactions" size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">Transaction History</h1>
            <p className="text-xl text-muted-foreground">
              Track all your financial transactions in one place
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Credit</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">₹{totalCredit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Money received</p>
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Debit</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">₹{totalDebit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Money spent</p>
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${totalCredit - totalDebit >= 0 ? 'text-success' : 'text-destructive'}`}>
                  ₹{(totalCredit - totalDebit).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">This period</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Search and filter your transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credit Only</SelectItem>
                    <SelectItem value="debit">Debit Only</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full md:w-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Transactions List */}
              <div className="space-y-4">
                {filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors animate-in fade-in slide-in-from-right-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full ${
                          transaction.type === "credit"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownRight className="h-5 w-5" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.category}</span>
                          {transaction.merchant && (
                            <>
                              <span>•</span>
                              <span>{transaction.merchant}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "credit" ? "text-success" : "text-destructive"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No transactions found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
