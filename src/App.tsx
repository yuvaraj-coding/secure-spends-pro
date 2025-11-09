import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import FinancialCoach from "./pages/FinancialCoach";
import FraudDetector from "./pages/FraudDetector";
import AppScanner from "./pages/AppScanner";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import GetStarted from "./pages/GetStarted";
import ReduceFoodSpending from "./pages/ReduceFoodSpending";
import InvestmentOpportunity from "./pages/InvestmentOpportunity";
import SmartSavingsGoal from "./pages/SmartSavingsGoal";
import TransactionHistory from "./pages/TransactionHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/financial-coach" element={<FinancialCoach />} />
            <Route path="/fraud-detector" element={<FraudDetector />} />
            <Route path="/app-scanner" element={<AppScanner />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/reduce-food-spending" element={<ReduceFoodSpending />} />
            <Route path="/investment-opportunity" element={<InvestmentOpportunity />} />
            <Route path="/smart-savings-goal" element={<SmartSavingsGoal />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
