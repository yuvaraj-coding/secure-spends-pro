import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface FraudResult {
  score: number;
  riskLevel: "low" | "medium" | "high";
  warnings: string[];
  recommendations: string[];
}

const FraudDetector = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<FraudResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeTransaction = () => {
    if (!upiId || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const numAmount = parseFloat(amount);
      let score = Math.floor(Math.random() * 100);
      const warnings: string[] = [];
      const recommendations: string[] = [];

      // Risk factors
      if (numAmount > 10000) {
        score += 20;
        warnings.push("Large transaction amount detected");
      }

      if (upiId.includes("random") || upiId.includes("unknown")) {
        score += 30;
        warnings.push("Suspicious UPI ID pattern detected");
      }

      if (numAmount % 100 === 0 && numAmount > 5000) {
        score += 10;
        warnings.push("Round number transactions can indicate scam patterns");
      }

      // Cap score at 100
      score = Math.min(score, 100);

      let riskLevel: "low" | "medium" | "high";
      if (score < 40) {
        riskLevel = "low";
        recommendations.push("Transaction appears safe");
        recommendations.push("Always verify recipient before sending money");
      } else if (score < 70) {
        riskLevel = "medium";
        recommendations.push("Exercise caution with this transaction");
        recommendations.push("Verify recipient identity through alternate means");
        recommendations.push("Consider using payment protection services");
      } else {
        riskLevel = "high";
        recommendations.push("⚠️ High risk - DO NOT proceed without verification");
        recommendations.push("Contact recipient through official channels");
        recommendations.push("Report suspicious activity to your bank");
      }

      setResult({
        score,
        riskLevel,
        warnings,
        recommendations,
      });

      setIsAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-success/10";
      case "medium":
        return "bg-warning/10";
      case "high":
        return "bg-destructive/10";
      default:
        return "bg-muted";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Protection</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Fraud Detection Assistant
              </h1>
              <p className="text-xl text-muted-foreground">
                Analyze transactions in real-time and get instant risk assessments
              </p>
            </div>

            {/* Input Form */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
                <CardDescription>
                  Enter transaction information to analyze potential fraud risk
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="upi">Receiver UPI ID</Label>
                  <Input
                    id="upi"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Transaction Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="5000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <Button
                  onClick={analyzeTransaction}
                  disabled={isAnalyzing}
                  className="w-full"
                  variant="hero"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      Analyze Transaction
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card className={`shadow-elevated animate-in fade-in slide-in-from-bottom-4 duration-500 ${getRiskBgColor(result.riskLevel)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.riskLevel === "low" && <CheckCircle className="h-6 w-6 text-success" />}
                    {result.riskLevel === "medium" && <Info className="h-6 w-6 text-warning" />}
                    {result.riskLevel === "high" && <AlertTriangle className="h-6 w-6 text-destructive" />}
                    Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Risk Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Risk Score</span>
                      <span className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>
                        {result.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          result.riskLevel === "low" ? "bg-success" :
                          result.riskLevel === "medium" ? "bg-warning" : "bg-destructive"
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <p className={`text-sm font-medium ${getRiskColor(result.riskLevel)} uppercase`}>
                      {result.riskLevel} Risk
                    </p>
                  </div>

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Warnings Detected
                      </h4>
                      <ul className="space-y-1">
                        {result.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-destructive mt-0.5">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Recommendations
                    </h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <p className="text-sm text-muted-foreground">Real-time Protection</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">99%</div>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center space-y-2">
                  <div className="text-3xl font-bold text-success">50K+</div>
                  <p className="text-sm text-muted-foreground">Scams Prevented</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FraudDetector;
