import { Shield, TrendingUp, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Financial Technology Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/95 to-accent/20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-elevated animate-in fade-in slide-in-from-top-3 duration-500">
            <Brain className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">AI-Powered Financial Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-top-4 duration-700">
            Smart, Safe &{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Secure Finance
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-top-5 duration-900">
            Your AI companion for intelligent spending, fraud detection, and financial growth.
            Make smarter money decisions with confidence.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Scam Detection</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-sm">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Smart Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
