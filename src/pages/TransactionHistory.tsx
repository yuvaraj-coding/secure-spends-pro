import { useState } from "react";
import { Calendar, Search, Filter, ArrowUpRight, ArrowDownRight, Download, AlertTriangle, Shield, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  category: string;
  date: string;
  status: "completed" | "pending" | "failed";
  merchant?: string;
  location?: string;
  isInternational?: boolean;
  deviceId?: string;
  upiAttempts?: number;
}

// User profile data for fraud analysis
interface UserProfile {
  lastActiveDate: string;
  phoneNumber: string;
  email: string;
  linkedDevice: string;
  accountChanges: number;
  upiFailedAttempts: number;
}

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading] = useState(false);
  const [showFraudDetails, setShowFraudDetails] = useState(false);

  // User profile with fraud indicators
  const userProfile: UserProfile = {
    lastActiveDate: "2024-01-15",
    phoneNumber: "+91-9876543210",
    email: "user@example.com",
    linkedDevice: "Device-ABC123",
    accountChanges: 2, // Recent changes to account details
    upiFailedAttempts: 5, // Total failed UPI attempts
  };

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
      location: "Mumbai, India",
      isInternational: false,
      deviceId: "Device-ABC123",
      upiAttempts: 1,
    },
    {
      id: "2",
      type: "credit",
      amount: 5000,
      description: "Salary Deposit",
      category: "Income",
      date: "2024-01-14",
      status: "completed",
      location: "Mumbai, India",
      isInternational: false,
      deviceId: "Device-ABC123",
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
      location: "Mumbai, India",
      isInternational: false,
      deviceId: "Device-ABC123",
      upiAttempts: 1,
    },
    {
      id: "4",
      type: "debit",
      amount: 15000,
      description: "International Purchase",
      category: "Shopping",
      date: "2024-01-13",
      status: "completed",
      merchant: "Amazon US",
      location: "New York, USA",
      isInternational: true,
      deviceId: "Device-XYZ789",
      upiAttempts: 3,
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
      location: "Mumbai, India",
      isInternational: false,
      deviceId: "Device-ABC123",
      upiAttempts: 1,
    },
    {
      id: "6",
      type: "debit",
      amount: 25000,
      description: "Large Transaction",
      category: "Shopping",
      date: "2024-01-11",
      status: "completed",
      merchant: "Electronics Store",
      location: "Delhi, India",
      isInternational: false,
      deviceId: "Device-XYZ789",
      upiAttempts: 2,
    },
    {
      id: "7",
      type: "debit",
      amount: 1200,
      description: "Electricity Bill",
      category: "Bills & Utilities",
      date: "2024-01-10",
      status: "completed",
      location: "Mumbai, India",
      isInternational: false,
      deviceId: "Device-ABC123",
      upiAttempts: 1,
    },
    {
      id: "8",
      type: "debit",
      amount: 500,
      description: "Failed UPI Payment",
      category: "Shopping",
      date: "2024-01-09",
      status: "failed",
      merchant: "Unknown Merchant",
      location: "Unknown",
      isInternational: false,
      deviceId: "Device-XYZ789",
      upiAttempts: 4,
    },
  ];

  // Calculate account inactivity
  const calculateInactivityDays = () => {
    const lastActive = new Date(userProfile.lastActiveDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculate average transaction amount
  const calculateAverageAmount = () => {
    const debitTransactions = transactions.filter((t) => t.type === "debit" && t.status === "completed");
    if (debitTransactions.length === 0) return 0;
    const total = debitTransactions.reduce((sum, t) => sum + t.amount, 0);
    return total / debitTransactions.length;
  };

  // Anomaly detection using statistical methods (similar to Isolation Forest)
  const detectAnomalies = (transaction: Transaction) => {
    const avgAmount = calculateAverageAmount();
    const stdDev = Math.sqrt(
      transactions
        .filter((t) => t.type === "debit" && t.status === "completed")
        .reduce((sum, t) => sum + Math.pow(t.amount - avgAmount, 2), 0) /
        transactions.filter((t) => t.type === "debit").length
    );

    const zScore = Math.abs((transaction.amount - avgAmount) / stdDev);
    return zScore > 2; // Anomaly if z-score > 2 (unusual transaction)
  };

  // Calculate fraud risk score for each transaction
  const calculateFraudRisk = (transaction: Transaction): number => {
    let riskScore = 0;

    // Failed transaction = high risk
    if (transaction.status === "failed") riskScore += 30;

    // International transaction = medium risk
    if (transaction.isInternational) riskScore += 20;

    // Multiple UPI attempts = risk
    if (transaction.upiAttempts && transaction.upiAttempts > 2) riskScore += 15;

    // Different device = risk
    if (transaction.deviceId !== userProfile.linkedDevice) riskScore += 15;

    // Anomalous amount = risk
    if (detectAnomalies(transaction)) riskScore += 20;

    // Large transaction (> ₹10,000) = medium risk
    if (transaction.amount > 10000) riskScore += 10;

    return Math.min(riskScore, 100);
  };

  // Calculate overall user fraud risk
  const calculateOverallFraudRisk = (): number => {
    let riskScore = 0;

    // Account inactivity
    const inactivityDays = calculateInactivityDays();
    if (inactivityDays > 30) riskScore += 20;
    else if (inactivityDays > 7) riskScore += 10;

    // UPI failed attempts
    if (userProfile.upiFailedAttempts > 5) riskScore += 25;
    else if (userProfile.upiFailedAttempts > 2) riskScore += 15;

    // Account detail changes
    if (userProfile.accountChanges > 3) riskScore += 20;
    else if (userProfile.accountChanges > 1) riskScore += 10;

    // Failed transactions count
    const failedCount = transactions.filter((t) => t.status === "failed").length;
    if (failedCount > 3) riskScore += 15;

    // International transactions count
    const intlCount = transactions.filter((t) => t.isInternational).length;
    if (intlCount > 2) riskScore += 10;

    return Math.min(riskScore, 100);
  };

  const overallRiskScore = calculateOverallFraudRisk();
  const inactivityDays = calculateInactivityDays();

  const getRiskLevel = (score: number): string => {
    if (score < 30) return "Low";
    if (score < 60) return "Medium";
    return "High";
  };

  const getRiskColor = (score: number): string => {
    if (score < 30) return "text-green-500";
    if (score < 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getRiskBgColor = (score: number): string => {
    if (score < 30) return "bg-green-500/10";
    if (score < 60) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Transaction History & Fraud Detection</h1>
          <p className="text-muted-foreground">Monitor transactions and detect suspicious activities</p>
        </div>

        {/* Overall Fraud Risk Alert */}
        <Alert className={`mb-6 ${getRiskBgColor(overallRiskScore)} border-2`}>
          <Shield className={`h-5 w-5 ${getRiskColor(overallRiskScore)}`} />
          <AlertTitle className="text-lg font-semibold">
            Overall Account Risk: {getRiskLevel(overallRiskScore)}
          </AlertTitle>
          <AlertDescription>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span>Risk Score: {overallRiskScore}/100</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFraudDetails(!showFraudDetails)}
                >
                  {showFraudDetails ? "Hide" : "Show"} Details
                </Button>
              </div>
              <Progress value={overallRiskScore} className="h-2" />
            </div>
          </AlertDescription>
        </Alert>

        {/* Fraud Analysis Details */}
        {showFraudDetails && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Fraud Risk Analysis
              </CardTitle>
              <CardDescription>Detailed breakdown of fraud indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Account Inactivity</p>
                      <p className="text-sm text-muted-foreground">
                        Last active: {inactivityDays} days ago
                      </p>
                      <Badge variant={inactivityDays > 30 ? "destructive" : inactivityDays > 7 ? "secondary" : "default"}>
                        {inactivityDays > 30 ? "High Risk" : inactivityDays > 7 ? "Medium Risk" : "Normal"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Failed UPI Attempts</p>
                      <p className="text-sm text-muted-foreground">
                        Total failed attempts: {userProfile.upiFailedAttempts}
                      </p>
                      <Badge variant={userProfile.upiFailedAttempts > 5 ? "destructive" : userProfile.upiFailedAttempts > 2 ? "secondary" : "default"}>
                        {userProfile.upiFailedAttempts > 5 ? "High Risk" : userProfile.upiFailedAttempts > 2 ? "Medium Risk" : "Normal"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Account Changes</p>
                      <p className="text-sm text-muted-foreground">
                        Recent account detail changes: {userProfile.accountChanges}
                      </p>
                      <Badge variant={userProfile.accountChanges > 3 ? "destructive" : userProfile.accountChanges > 1 ? "secondary" : "default"}>
                        {userProfile.accountChanges > 3 ? "Suspicious" : userProfile.accountChanges > 1 ? "Monitor" : "Normal"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">International Transactions</p>
                      <p className="text-sm text-muted-foreground">
                        Foreign transactions: {transactions.filter((t) => t.isInternational).length}
                      </p>
                      <Badge variant={transactions.filter((t) => t.isInternational).length > 2 ? "secondary" : "default"}>
                        {transactions.filter((t) => t.isInternational).length > 2 ? "Monitor" : "Normal"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium mb-2">Account Information</p>
                    <div className="space-y-1 text-sm">
                      <p>Phone: {userProfile.phoneNumber}</p>
                      <p>Email: {userProfile.email}</p>
                      <p>Device: {userProfile.linkedDevice}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium mb-2">Anomaly Detection</p>
                    <p className="text-sm text-muted-foreground">
                      Using statistical analysis to detect unusual spending patterns and transaction anomalies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credit</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">₹{totalCredit.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Money received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Debit</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">₹{totalDebit.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Money spent</p>
            </CardContent>
          </Card>

          <Card>
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
        <Card>
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
                  className="pl-9"
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

            <div className="space-y-2">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No transactions found
                </div>
              ) : (
                filteredTransactions.map((transaction) => {
                  const fraudRisk = calculateFraudRisk(transaction);
                  const isAnomaly = detectAnomalies(transaction);
                  
                  return (
                    <div
                      key={transaction.id}
                      className="p-6 hover:bg-accent/5 transition-colors border border-border rounded-lg"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`p-3 rounded-lg ${
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
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-semibold">{transaction.description}</h3>
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                              {fraudRisk >= 30 && (
                                <Badge 
                                  variant={fraudRisk >= 60 ? "destructive" : "secondary"}
                                  className="flex items-center gap-1"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  Risk: {fraudRisk}%
                                </Badge>
                              )}
                              {isAnomaly && (
                                <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                                  Anomaly
                                </Badge>
                              )}
                              {transaction.isInternational && (
                                <Badge variant="outline" className="border-blue-500 text-blue-500">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  International
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {transaction.date}
                              </span>
                              <span>{transaction.category}</span>
                              {transaction.merchant && <span>• {transaction.merchant}</span>}
                              {transaction.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {transaction.location}
                                </span>
                              )}
                            </div>
                            {(transaction.upiAttempts && transaction.upiAttempts > 1) && (
                              <div className="mt-2 text-sm text-yellow-600">
                                ⚠️ {transaction.upiAttempts} UPI attempts
                              </div>
                            )}
                            {transaction.deviceId !== userProfile.linkedDevice && (
                              <div className="mt-1 text-sm text-orange-600">
                                ⚠️ Different device used
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold ${
                              transaction.type === "credit" ? "text-success" : "text-destructive"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                          </p>
                          {fraudRisk >= 30 && (
                            <div className={`text-xs mt-1 ${getRiskColor(fraudRisk)}`}>
                              {getRiskLevel(fraudRisk)} Risk
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TransactionHistory;
