
import { useState } from "react";
import Features from "./components/features";
import Footer from "./components/Footer";
import Hero from "./components/hero";
import HowItWorks from "./components/Howitworks";
import Problem from "./components/Problem";
import TechStack from "./components/Techstack";
import WhyDifferent from "./components/Whydifferent";
import DataCleaner from "./components/DataCleaner";
import CTA from "./components/CTA.jsx";

function App() {
  const [showCleaner, setShowCleaner] = useState(false);

  const handleNavigate = () => {
    console.log("Start Processing clicked");
    setShowCleaner(true);
  };

  if (showCleaner) {
    return <DataCleaner onBack={() => setShowCleaner(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Hero onNavigate={handleNavigate} />
      <Problem />
      <HowItWorks />
      <WhyDifferent />
      <Features />
      <TechStack />
      <CTA onNavigate={handleNavigate} />
      <Footer />
    </div>
  );
}

export default App;
