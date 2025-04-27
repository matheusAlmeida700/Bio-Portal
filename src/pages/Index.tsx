import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundScene from "@/components/BackgroundScene";
import TribalPortal from "@/components/TribalPortal";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-screen absolute">
      {loading ? (
        <LoadingScreen progress={progress} onComplete={handleLoadingComplete} />
      ) : (
        <>
          <BackgroundScene />
          <TribalPortal />
        </>
      )}
    </div>
  );
};

export default Index;
