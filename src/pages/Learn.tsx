import { useState } from "react";
import { GraduationCap, Trophy, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "What is compound interest?",
    options: [
      "Interest calculated only on the principal amount",
      "Interest calculated on principal and accumulated interest",
      "A fixed rate of interest",
      "Interest paid monthly",
    ],
    correctAnswer: 1,
    explanation: "Compound interest is calculated on both the principal amount and the accumulated interest from previous periods, allowing your money to grow exponentially over time.",
  },
  {
    question: "Which payment method is generally safest for online transactions?",
    options: [
      "Sending cash on delivery",
      "Bank transfer to unknown accounts",
      "Credit cards with fraud protection",
      "Sharing OTPs with sellers",
    ],
    correctAnswer: 2,
    explanation: "Credit cards typically offer the best fraud protection, including the ability to dispute charges and zero liability for unauthorized transactions.",
  },
  {
    question: "What should you do before making a large UPI payment?",
    options: [
      "Share your PIN with someone to verify",
      "Verify the recipient through alternate means",
      "Send the full amount immediately",
      "Ignore any warnings",
    ],
    correctAnswer: 1,
    explanation: "Always verify the recipient's identity through official channels or alternate communication methods before sending large amounts of money.",
  },
];

const Learn = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finCoins, setFinCoins] = useState(0);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setFinCoins(finCoins + 10);
      toast.success("Correct! +10 FinCoins earned! 🎉");
    } else {
      toast.error("Not quite right. Keep learning!");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      toast.success(`Quiz Complete! Total Score: ${score + 1}/${questions.length}`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  };

  const question = questions[currentQuestion];
  const isQuizComplete = currentQuestion === questions.length - 1 && showExplanation;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full">
                <GraduationCap className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Financial Literacy</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Learn & Earn</h1>
              <p className="text-xl text-muted-foreground">
                Test your financial knowledge and earn FinCoins
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-warning" />
                  <div>
                    <p className="text-2xl font-bold">{score}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <Coins className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">{finCoins}</p>
                    <p className="text-xs text-muted-foreground">FinCoins</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm col-span-2 md:col-span-1">
                <CardContent className="p-4 flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{currentQuestion + 1}/{questions.length}</p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Card */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1}</CardTitle>
                <CardDescription>{question.question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === question.correctAnswer;
                    const showCorrect = showExplanation && isCorrect;
                    const showIncorrect = showExplanation && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                          showCorrect
                            ? "border-success bg-success/10"
                            : showIncorrect
                            ? "border-destructive bg-destructive/10"
                            : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted"
                        } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              showCorrect
                                ? "border-success bg-success text-success-foreground"
                                : showIncorrect
                                ? "border-destructive bg-destructive text-destructive-foreground"
                                : isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground"
                            }`}
                          >
                            {showCorrect && "✓"}
                            {showIncorrect && "✗"}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="p-4 bg-muted rounded-lg space-y-2 animate-in fade-in slide-in-from-bottom-4">
                    <h4 className="font-semibold">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                  </div>
                )}

                {showExplanation && (
                  <div className="flex gap-3">
                    {!isQuizComplete ? (
                      <Button
                        onClick={handleNextQuestion}
                        variant="hero"
                        className="flex-1"
                      >
                        Next Question
                      </Button>
                    ) : (
                      <Button
                        onClick={resetQuiz}
                        variant="hero"
                        className="flex-1"
                      >
                        Start Over
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Coins className="h-8 w-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">What can you do with FinCoins?</h3>
                    <ul className="space-y-1 text-sm opacity-90">
                      <li>• Unlock premium AI insights and tips</li>
                      <li>• Access advanced investment simulators</li>
                      <li>• Donate to financial literacy programs</li>
                      <li>• Compete on the leaderboard</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Learn;
