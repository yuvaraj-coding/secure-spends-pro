import { Shield, TrendingUp, PieChart, GraduationCap, Users, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const features = [
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Real-time scam detection with AI-powered risk scoring for every transaction.",
    color: "text-destructive",
    detailedInfo: {
      overview: "Our AI-powered fraud detection system analyzes every transaction in real-time to protect you from scams and fraudulent activities.",
      features: [
        "Real-time UPI transaction verification",
        "AI-based risk scoring (0-100 scale)",
        "Instant alerts for suspicious activities",
        "Historical fraud pattern analysis",
        "Protection against phishing and scam websites"
      ],
      howItWorks: "Simply enter transaction details before confirming, and our AI will analyze the recipient's history, amount patterns, and other risk factors to give you an instant security assessment."
    }
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description: "Get personalized financial advice based on your spending patterns and goals.",
    color: "text-accent",
    detailedInfo: {
      overview: "Receive AI-driven insights and recommendations tailored to your unique financial situation and spending behavior.",
      features: [
        "Personalized spending analysis",
        "Budget optimization suggestions",
        "Investment recommendations",
        "Savings goals tracking",
        "Monthly financial health reports"
      ],
      howItWorks: "Our AI analyzes your transaction history, identifies patterns, and provides actionable insights to help you make smarter financial decisions and achieve your goals faster."
    }
  },
  {
    icon: PieChart,
    title: "Expense Tracking",
    description: "Automatic categorization and visualization of your spending habits.",
    color: "text-primary",
    detailedInfo: {
      overview: "Effortlessly track and categorize all your expenses with automatic detection and beautiful visualizations.",
      features: [
        "Automatic expense categorization",
        "Visual spending breakdowns",
        "Monthly and yearly comparisons",
        "Budget vs actual tracking",
        "Custom category creation"
      ],
      howItWorks: "Link your payment methods, and our system automatically categorizes each transaction. View your spending patterns through interactive charts and graphs to understand where your money goes."
    }
  },
  {
    icon: GraduationCap,
    title: "Learn & Earn",
    description: "Interactive quizzes and financial literacy games with rewards.",
    color: "text-warning",
    detailedInfo: {
      overview: "Improve your financial knowledge while earning rewards through engaging quizzes and educational content.",
      features: [
        "Interactive financial literacy quizzes",
        "Earn FinCoins for correct answers",
        "Topics: budgeting, investing, taxes, and more",
        "Progress tracking and achievements",
        "Redeem FinCoins for rewards"
      ],
      howItWorks: "Take quizzes on various financial topics, earn FinCoins for correct answers, and redeem them for discounts, cashback, or other rewards. Learning about finance has never been this rewarding!"
    }
  },
  {
    icon: Users,
    title: "Peer Savings",
    description: "Collaborative saving groups to achieve financial goals together.",
    color: "text-accent",
    detailedInfo: {
      overview: "Join or create savings groups with friends and family to achieve common financial goals through collective effort.",
      features: [
        "Create private savings groups",
        "Set collective goals (vacation, gadgets, etc.)",
        "Track group contributions",
        "Automated savings reminders",
        "Transparent fund management"
      ],
      howItWorks: "Form a group with trusted people, set a savings goal, and everyone contributes regularly. The pooled money is kept secure until the goal is reached, making it easier to save together."
    }
  },
  {
    icon: Leaf,
    title: "Green Finance",
    description: "Track the environmental impact of your purchases and make sustainable choices.",
    color: "text-success",
    detailedInfo: {
      overview: "Make environmentally conscious financial decisions by tracking the carbon footprint of your spending.",
      features: [
        "Carbon footprint tracking per transaction",
        "Eco-friendly purchase recommendations",
        "Green investment options",
        "Monthly environmental impact reports",
        "Rewards for sustainable choices"
      ],
      howItWorks: "Each transaction is analyzed for its environmental impact. Get insights on your carbon footprint, discover eco-friendly alternatives, and earn rewards for making sustainable financial choices."
    }
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Financial Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools powered by AI to help you save, invest, and protect your money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card
                  className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className={`p-3 bg-muted rounded-lg w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <p className="text-sm text-primary font-medium">Click to learn more →</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 bg-muted rounded-lg`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <DialogTitle className="text-2xl">{feature.title}</DialogTitle>
                  </div>
                  <DialogDescription className="text-base pt-2">
                    {feature.detailedInfo.overview}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 pt-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {feature.detailedInfo.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">How It Works</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.detailedInfo.howItWorks}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
