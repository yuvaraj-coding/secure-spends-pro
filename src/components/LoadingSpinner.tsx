import CircularCoinsAnimation from "./CircularCoinsAnimation";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({ message = "Loading", size = "md" }: LoadingSpinnerProps) => {
  const sizeConfig = {
    sm: { radius: 60, coinSize: 20 },
    md: { radius: 80, coinSize: 25 },
    lg: { radius: 120, coinSize: 35 },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <CircularCoinsAnimation 
        radius={config.radius} 
        coinSize={config.coinSize} 
        speed={2.5} 
      />
      {message && (
        <div className="text-center space-y-2 animate-pulse">
          <p className="text-lg font-semibold text-primary">{message}</p>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
