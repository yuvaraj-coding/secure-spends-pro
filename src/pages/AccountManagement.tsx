import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Building2, Smartphone, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccountManagement = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [upiIds, setUpiIds] = useState([
    { id: 1, name: "Primary UPI", upiId: "user@paytm" },
    { id: 2, name: "Secondary UPI", upiId: "user@googlepay" },
  ]);

  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, name: "Savings Account", bank: "State Bank", accountNumber: "****5678", balance: "₹5,240" },
    { id: 2, name: "Current Account", bank: "HDFC Bank", accountNumber: "****1234", balance: "₹12,850" },
  ]);


  useEffect(() => {
    let mounted = true;

    // Listen for auth changes first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      
      if (!session) {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    });

    // Then check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      if (!session) {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Account Management</h1>
          <p className="text-muted-foreground">Manage your bank accounts, UPI IDs, and view transactions</p>
        </div>

        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
            <TabsTrigger value="upi">UPI IDs</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Bank Accounts</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bank Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Bank Account</DialogTitle>
                    <DialogDescription>Enter your bank account details to link it to your profile</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Name</Label>
                      <Input id="account-name" placeholder="e.g., Savings Account" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" placeholder="e.g., State Bank" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input id="account-number" placeholder="Enter account number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifsc">IFSC Code</Label>
                      <Input id="ifsc" placeholder="Enter IFSC code" />
                    </div>
                    <Button className="w-full">Add Account</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {bankAccounts.map((account) => (
                <Card key={account.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{account.name}</CardTitle>
                          <CardDescription>{account.bank}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Account Number</span>
                        <span className="font-mono">{account.accountNumber}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Balance</span>
                        <span className="text-2xl font-bold text-primary">{account.balance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upi" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your UPI IDs</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <Plus className="h-4 w-4 mr-2" />
                    Add UPI ID
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New UPI ID</DialogTitle>
                    <DialogDescription>Link a new UPI ID to your account</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-name">Name</Label>
                      <Input id="upi-name" placeholder="e.g., Primary UPI" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input id="upi-id" placeholder="yourname@paytm" />
                    </div>
                    <Button className="w-full">Add UPI ID</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {upiIds.map((upi) => (
                <Card key={upi.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Smartphone className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{upi.name}</CardTitle>
                          <CardDescription className="font-mono mt-1">{upi.upiId}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Make Payment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
};

export default AccountManagement;
