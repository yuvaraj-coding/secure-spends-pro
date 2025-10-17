import { Shield, TrendingUp, PieChart, GraduationCap, Users, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "Real-time scam detection with AI-powered risk scoring for every transaction.",
    color: "text-destructive",
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description: "Get personalized financial advice based on your spending patterns and goals.",
    color: "text-accent",
  },
  {
    icon: PieChart,
    title: "Expense Tracking",
    description: "Automatic categorization and visualization of your spending habits.",
    color: "text-primary",
  },
  {
    icon: GraduationCap,
    title: "Learn & Earn",
    description: "Interactive quizzes and financial literacy games with rewards.",
    color: "text-warning",
  },
  {
    icon: Users,
    title: "Peer Savings",
    description: "Collaborative saving groups to achieve financial goals together.",
    color: "text-accent",
  },
  {
    icon: Leaf,
    title: "Green Finance",
    description: "Track the environmental impact of your purchases and make sustainable choices.",
    color: "text-success",
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
            <Card
              key={index}
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`p-3 bg-muted rounded-lg w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
