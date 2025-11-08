import { ArrowLeft, TrendingUp, Target, PieChart, BarChart3, Shield, Zap, Clock, TrendingDown, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const InvestmentOpportunity = () => {
  const navigate = useNavigate();

  const opportunities = [
    {
      icon: Target,
      title: "Mutual Funds (Equity)",
      description: "Diversified equity funds with professional management. Best for wealth creation over 5+ years.",
      risk: "Moderate-High",
      returns: "12-15% annually",
      minInvestment: "₹500/month",
      timeHorizon: "5+ years",
      taxBenefit: "LTCG tax after 1 year",
    },
    {
      icon: PieChart,
      title: "Fixed Deposits",
      description: "Guaranteed returns with zero market risk. Perfect for emergency funds and short-term goals.",
      risk: "Very Low",
      returns: "6-7% annually",
      minInvestment: "₹5,000",
      timeHorizon: "1-5 years",
      taxBenefit: "None",
    },
    {
      icon: BarChart3,
      title: "Index Funds",
      description: "Low-cost way to invest in entire market indices. Excellent for passive investing strategy.",
      risk: "Moderate",
      returns: "10-12% annually",
      minInvestment: "₹1,000/month",
      timeHorizon: "7+ years",
      taxBenefit: "LTCG tax after 1 year",
    },
    {
      icon: Shield,
      title: "Debt Mutual Funds",
      description: "Lower risk than equity with better returns than FD. Ideal for medium-term financial goals.",
      risk: "Low-Moderate",
      returns: "7-9% annually",
      minInvestment: "₹1,000/month",
      timeHorizon: "3+ years",
      taxBenefit: "Indexation benefit",
    },
    {
      icon: Zap,
      title: "Public Provident Fund (PPF)",
      description: "Government-backed savings with tax benefits. Great for long-term retirement planning.",
      risk: "Zero",
      returns: "7-7.5% annually",
      minInvestment: "₹500/year",
      timeHorizon: "15 years",
      taxBenefit: "EEE (Tax-free)",
    },
    {
      icon: Clock,
      title: "Recurring Deposits",
      description: "Regular monthly savings with fixed returns. Build disciplined saving habits with guaranteed returns.",
      risk: "Very Low",
      returns: "5.5-6.5% annually",
      minInvestment: "₹500/month",
      timeHorizon: "1-5 years",
      taxBenefit: "None",
    },
  ];

  const portfolioAllocation = [
    { category: "Equity (High Growth)", percentage: 50, amount: 2500, color: "bg-success" },
    { category: "Debt (Stability)", percentage: 30, amount: 1500, color: "bg-primary" },
    { category: "Emergency Fund", percentage: 20, amount: 1000, color: "bg-accent" },
  ];

  const investmentMilestones = [
    { year: "1 Year", amount: "₹65,000", growth: "₹5,000" },
    { year: "3 Years", amount: "₹2.1 Lakhs", growth: "₹21,000" },
    { year: "5 Years", amount: "₹4.2 Lakhs", growth: "₹60,000" },
    { year: "10 Years", amount: "₹11.5 Lakhs", growth: "₹3.5 Lakhs" },
    { year: "20 Years", amount: "₹49 Lakhs", growth: "₹37 Lakhs" },
  ];

  const taxBenefits = [
    "Section 80C: Save up to ₹1.5 Lakhs on ELSS investments",
    "LTCG: Only 10% tax on gains above ₹1 Lakh (equity)",
    "PPF: Completely tax-free returns (EEE status)",
    "Indexation: Reduce tax burden on debt fund gains",
  ];

  const riskProfile = {
    conservative: { allocation: "30% Equity, 70% Debt", risk: "Low", returns: "8-10%" },
    moderate: { allocation: "50% Equity, 50% Debt", risk: "Medium", returns: "10-12%" },
    aggressive: { allocation: "80% Equity, 20% Debt", risk: "High", returns: "12-15%" },
  };

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
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Recommended Portfolio Allocation</CardTitle>
                <CardDescription>Diversified investment strategy for ₹5,000/month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolioAllocation.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">₹{item.amount} ({item.percentage}%)</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <CardTitle>Long-term Growth Projection</CardTitle>
                </div>
                <CardDescription>Potential wealth accumulation with ₹5,000 monthly investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investmentMilestones.map((milestone, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">{milestone.year}</p>
                        <p className="text-sm text-muted-foreground">Total Value</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{milestone.amount}</p>
                        <p className="text-xs text-success">+{milestone.growth} returns</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Investment Options Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opportunity, index) => (
                  <Card key={index} className="shadow-elevated hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="p-2 bg-muted rounded-lg w-fit">
                        <opportunity.icon className="h-5 w-5 text-success" />
                      </div>
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                      
                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Risk Level:</span>
                          <span className="font-semibold">{opportunity.risk}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Returns:</span>
                          <span className="font-semibold text-success">{opportunity.returns}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min Investment:</span>
                          <span className="font-semibold">{opportunity.minInvestment}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Time Horizon:</span>
                          <span className="font-semibold">{opportunity.timeHorizon}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax Benefit:</span>
                          <span className="font-semibold">{opportunity.taxBenefit}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="shadow-elevated">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <CardTitle>Risk Profile Guide</CardTitle>
                </div>
                <CardDescription>Choose the strategy that matches your risk appetite</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Conservative</h3>
                      <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">Low Risk</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{riskProfile.conservative.allocation}</p>
                    <p className="text-sm font-semibold">Expected Returns: {riskProfile.conservative.returns}</p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Moderate (Recommended)</h3>
                      <span className="text-xs px-2 py-1 bg-warning/10 text-warning rounded-full">Medium Risk</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{riskProfile.moderate.allocation}</p>
                    <p className="text-sm font-semibold">Expected Returns: {riskProfile.moderate.returns}</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Aggressive</h3>
                      <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded-full">High Risk</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{riskProfile.aggressive.allocation}</p>
                    <p className="text-sm font-semibold">Expected Returns: {riskProfile.aggressive.returns}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated bg-success/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <CardTitle>Tax Benefits Available</CardTitle>
                </div>
                <CardDescription>Maximize your returns through tax-efficient investing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {taxBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-elevated bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <CardTitle>Important Disclaimer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  These recommendations are AI-generated suggestions based on your financial data and general market conditions. 
                  Investment returns are subject to market risks and past performance does not guarantee future results. 
                  Always consult with a certified financial advisor or SEBI registered investment advisor before making any investment decisions. 
                  Consider your financial goals, risk tolerance, and time horizon before investing.
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
