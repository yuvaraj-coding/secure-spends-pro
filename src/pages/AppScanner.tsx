import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Loader2, Search, Download, TrendingUp, Star, Lock, FileText, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ScanResult {
  safetyScore: number;
  isSafe: boolean;
  analysis: string;
  risks: string[];
  recommendations: string[];
  statusMessage: string;
  categoryChecks?: {
    rbiVerification: { status: string; message: string };
    fraudReports: { status: string; message: string };
    appStoreRating: { status: string; message: string };
    developerAuth: { status: string; message: string };
    permissions: { status: string; message: string };
    websiteTrust: { status: string; message: string };
    userComplaints: { status: string; message: string };
    govtDatabase: { status: string; message: string };
  };
}

// Validation schema
const urlSchema = z.object({
  url: z.string()
    .url("Please enter a valid URL")
    .max(2048, "URL must be less than 2048 characters")
    .refine(
      (url) => url.startsWith('http://') || url.startsWith('https://'),
      "URL must start with http:// or https://"
    )
});

const AppScanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const scanApp = async () => {
    // Validate input
    const validationResult = urlSchema.safeParse({ url: url.trim() });
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid URL";
      toast({
        title: "Invalid URL",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-app', {
        body: { url }
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Scan Complete",
        description: "App analysis has been completed successfully",
      });
    } catch (error: any) {
      console.error('Error scanning app:', error);
      toast({
        title: "Scan Failed",
        description: error.message || "Failed to analyze the app. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const getSafetyColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getSafetyBgColor = (score: number) => {
    if (score >= 75) return "bg-green-500/10 border-green-500/20";
    if (score >= 50) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "fail":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4 shadow-glow animate-pulse">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
              App Safety Scanner
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Analyze financial apps for fraud, security risks, and regulatory compliance using AI-powered verification
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <Lock className="h-3 w-3 mr-1" />
                RBI Verified
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                <Shield className="h-3 w-3 mr-1" />
                SEBI Compliant
              </Badge>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                <Star className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>

          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Enter App or Website URL
              </CardTitle>
              <CardDescription>
                Paste the Play Store, App Store, or website link of the financial app you want to verify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="url"
                  placeholder="https://play.google.com/store/apps/details?id=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isScanning && scanApp()}
                  className="flex-1 h-12 text-base"
                />
                <Button 
                  onClick={scanApp} 
                  disabled={isScanning}
                  size="lg"
                  className="min-w-[140px] h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Scan Now
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                💡 Tip: Works with Play Store, App Store, and direct app website links
              </p>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Main Safety Score Card */}
              <Card className={`border-2 ${getSafetyBgColor(result.safetyScore)} shadow-xl`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-2xl mb-2">
                        {result.safetyScore >= 75 ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : result.safetyScore >= 50 ? (
                          <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-red-500" />
                        )}
                        Safety Score Report
                      </CardTitle>
                      <CardDescription className="text-base">
                        {result.statusMessage}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`text-6xl font-bold ${getSafetyColor(result.safetyScore)}`}>
                        {result.safetyScore}%
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          result.safetyScore >= 75 
                            ? "bg-green-500/20 text-green-500 border-green-500/30" 
                            : result.safetyScore >= 50
                            ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                            : "bg-red-500/20 text-red-500 border-red-500/30"
                        }
                      >
                        {result.safetyScore >= 75 ? "✔ Trusted" : result.safetyScore >= 50 ? "⚠ Use With Caution" : "❌ Avoid"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Safety Level</span>
                      <span className="text-sm text-muted-foreground">{result.safetyScore}%</span>
                    </div>
                    <Progress value={result.safetyScore} className="h-3" />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground/90 leading-relaxed">{result.analysis}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Category Checks Card */}
              {result.categoryChecks && (
                <Card className="border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Detailed Security Checklist
                    </CardTitle>
                    <CardDescription>
                      Comprehensive analysis across 8 security categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.rbiVerification.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">RBI/SEBI Verification</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.rbiVerification.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.fraudReports.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">Fraud & Scam Reports</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.fraudReports.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.appStoreRating.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">App Store Rating & Reviews</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.appStoreRating.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.developerAuth.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">Developer Authenticity</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.developerAuth.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.permissions.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">App Permissions</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.permissions.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.websiteTrust.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">Website Trust Check</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.websiteTrust.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.userComplaints.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">User Complaints</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.userComplaints.message}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(result.categoryChecks.govtDatabase.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">Govt Fraud Database</h4>
                          <p className="text-xs text-muted-foreground">{result.categoryChecks.govtDatabase.message}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.risks.length > 0 && (
                <Card className="border-red-500/30 shadow-lg bg-red-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <AlertTriangle className="h-6 w-6" />
                      Identified Security Risks
                    </CardTitle>
                    <CardDescription>Critical issues that require your attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.risks.map((risk, index) => (
                        <li key={index} className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                            <span className="text-red-500 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="flex-1 text-foreground/90">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.recommendations.length > 0 && (
                <Card className="border-blue-500/30 shadow-lg bg-blue-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-500">
                      <Shield className="h-6 w-6" />
                      Safety Recommendations
                    </CardTitle>
                    <CardDescription>Follow these guidelines to stay protected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="flex-1 text-foreground/90">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <Card className="border-primary/20 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.print()}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setUrl("");
                        setResult(null);
                      }}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Scan Another App
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="mt-8 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">How Our App Scanner Works</CardTitle>
              <CardDescription>Advanced AI-powered security analysis in 3 simple steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-gradient-primary/5 hover:bg-gradient-primary/10 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 shadow-glow">
                    <Globe className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2 text-lg">1. Submit App Link</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste any Play Store, App Store, or website URL of a financial app
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-primary/5 hover:bg-gradient-primary/10 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 shadow-glow">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2 text-lg">2. AI Security Scan</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes 8+ security factors including RBI compliance and fraud reports
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-primary/5 hover:bg-gradient-primary/10 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 shadow-glow">
                    <TrendingUp className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2 text-lg">3. Get Safety Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a detailed score with risks, recommendations, and trust indicators
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AppScanner;
