import { useState, useEffect, useRef } from "react";
import { QrCode, Copy, ExternalLink, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onAddToExpense?: (amount: number, upiId: string) => void;
}

const QRScanner = ({ onAddToExpense }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const startScanning = async () => {
    setError(null);
    setScannedData(null);
    
    try {
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera access is not supported in this browser");
      }

      // Request camera permission first
      await navigator.mediaDevices.getUserMedia({ video: true });

      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScannedData(decodedText);
          stopScanner();
          setIsScanning(false);
          toast({
            title: "QR Code Scanned!",
            description: "Successfully scanned QR code",
          });
        },
        (errorMessage) => {
          // Ignore errors during scanning
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      console.error("Scanner error:", err);
      setError(err.message || "Failed to access camera. Please check permissions.");
      setIsScanning(false);
      toast({
        title: "Camera Error",
        description: err.message || "Failed to access camera",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    stopScanner();
    setIsScanning(false);
    setScannedData(null);
    setError(null);
  };

  const copyToClipboard = () => {
    if (scannedData) {
      navigator.clipboard.writeText(scannedData);
      toast({
        title: "Copied!",
        description: "Data copied to clipboard",
      });
    }
  };

  const openLink = () => {
    if (scannedData && (scannedData.startsWith("http://") || scannedData.startsWith("https://"))) {
      window.open(scannedData, "_blank");
    } else {
      toast({
        title: "Invalid URL",
        description: "The scanned data is not a valid URL",
        variant: "destructive",
      });
    }
  };

  const handleAddToExpense = () => {
    if (scannedData && onAddToExpense) {
      // Extract UPI ID or amount from scanned data
      // For demo purposes, we'll parse basic UPI format
      const upiMatch = scannedData.match(/upi:\/\/pay\?.*pa=([^&]+)/);
      const amountMatch = scannedData.match(/am=([0-9.]+)/);
      
      const upiId = upiMatch ? upiMatch[1] : scannedData;
      const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;
      
      onAddToExpense(amount, upiId);
      toast({
        title: "Added to Expenses",
        description: `Transaction recorded: ₹${amount}`,
      });
      setScannedData(null);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const isUrl = scannedData && (scannedData.startsWith("http://") || scannedData.startsWith("https://"));
  const isUpi = scannedData && (scannedData.includes("upi://") || scannedData.includes("@"));

  return (
    <>
      <Card className="relative overflow-hidden shadow-glow hover:shadow-elevated transition-all duration-300 border-primary/20">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            QR Code Scanner
          </CardTitle>
          <CardDescription>Scan UPI QR codes and payment links</CardDescription>
        </CardHeader>
        <CardContent className="relative flex justify-center">
          <Button
            onClick={startScanning}
            size="lg"
            variant="hero"
            className="h-24 w-24 rounded-full shadow-glow hover:scale-110 transition-transform duration-300"
          >
            <QrCode className="h-12 w-12" />
          </Button>
        </CardContent>
      </Card>

      {/* Scanning Dialog */}
      <Dialog open={isScanning} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scanning QR Code</DialogTitle>
            <DialogDescription>
              Point your camera at a QR code to scan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div id="qr-reader" className="w-full rounded-lg overflow-hidden" />
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
                <Button
                  onClick={startScanning}
                  variant="outline"
                  className="mt-2"
                  size="sm"
                >
                  Retry
                </Button>
              </div>
            )}
            <Button onClick={handleClose} variant="outline" className="w-full">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={!!scannedData} onOpenChange={() => setScannedData(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code Scanned Successfully!</DialogTitle>
            <DialogDescription>Choose an action below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="font-mono text-sm break-all">{scannedData}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Copy {isUpi ? "UPI ID" : "Data"}
              </Button>
              
              {isUrl && (
                <Button onClick={openLink} variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Link
                </Button>
              )}
              
              {onAddToExpense && (
                <Button onClick={handleAddToExpense} variant="default" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add to Expense
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QRScanner;
