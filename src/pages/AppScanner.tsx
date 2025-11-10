import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface ScanResult {
  safetyScore: number;
  isSafe: boolean;
  analysis: string;
  risks: string[];
  recommendations: string[];
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
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getSafetyBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500/10 border-green-500/20";
    if (score >= 50) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">App Scanner</h1>
            <p className="text-muted-foreground">
              Analyze any app URL to check for safety and potential fraud using AI
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter App URL</CardTitle>
              <CardDescription>
                Paste the URL of the app or website you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && scanApp()}
                  className="flex-1"
                />
                <Button 
                  onClick={scanApp} 
                  disabled={isScanning}
                  className="min-w-[120px]"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Scanning
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Scan App
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <Card className={`border-2 ${getSafetyBgColor(result.safetyScore)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {result.isSafe ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      )}
                      Safety Score
                    </CardTitle>
                    <div className={`text-4xl font-bold ${getSafetyColor(result.safetyScore)}`}>
                      {result.safetyScore}%
                    </div>
                  </div>
                  <CardDescription>
                    {result.isSafe ? "This app appears to be safe" : "This app may be unsafe or fraudulent"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90">{result.analysis}</p>
                </CardContent>
              </Card>

              {result.risks.length > 0 && (
                <Card className="border-red-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-500">
                      <AlertTriangle className="h-5 w-5" />
                      Detected Risks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.risks.map((risk, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.recommendations.length > 0 && (
                <Card className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-500">
                      <Shield className="h-5 w-5" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Submit URL</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter the app or website URL you want to analyze
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI scans for security issues and fraud indicators
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Get Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a detailed safety report with recommendations
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
