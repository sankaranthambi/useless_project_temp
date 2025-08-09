import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ProbabilityWheel } from "./ProbabilityWheel";
import { ResultDisplay } from "./ResultDisplay";
import { CheatCodeBanner } from "./CheatCodeBanner";

export const GachaCalculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [isSpinning, setIsSpinning] = useState(false);
  const [cheatCode, setCheatCode] = useState("");
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);
  const [result, setResult] = useState<{
    value: number;
    isCorrect: boolean;
    probability: number;
    rarity: string;
    message: string;
  } | null>(null);

  const getReactionMessage = (rarity: string, isCorrect: boolean) => {
    const correctMessages = [
      "Man ya got some luck! May gods bless ya next calculation! 🙏",
      "Holy moly! The RNG gods are with you today! ✨",
      "Blessed by the gambling spirits! Your calculations are divine! 🌟",
      "Fortune favors the bold! Keep that streak going! 💫",
      "The stars have aligned for your mathematical prowess! ⭐",
    ];
    
    const incorrectMessages = [
      "Ooof! The gambling gods need more offerings! 😅",
      "Close but no cigar! The RNG spirits are testing you! 🎭",
      "Math isn't your strong suit today, try again warrior! ⚔️",
      "The probability demons got you this time! 👹",
      "Better luck next spin, champion! 🎲",
    ];
    
    if (rarity === "Legendary" && isCorrect) {
      return "🌟 LEGENDARY MASTERY! The gods themselves bow to your calculation skills! 🌟";
    }
    
    return isCorrect 
      ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
      : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
  };

  const applyCheatCode = (code: string) => {
    const lowerCode = code.toLowerCase();
    if (lowerCode === "hari") {
      alert("🚫 Access Denied! Enter another code, mortal!");
      return null;
    }
    
    const powerUpUsers = ["ashik", "aswin", "sreenath", "aibel"];
    const cursedUsers = ["aadhi", "adithyan", "nirenjan", "manu"];
    
    if (powerUpUsers.includes(lowerCode)) {
      setActivePowerUp(lowerCode);
      return "powerup";
    } else if (cursedUsers.includes(lowerCode)) {
      setActivePowerUp(lowerCode);
      return "curse";
    }
    return null;
  };

  const handleSpin = () => {
    if (!num1 || !num2) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Apply cheat code effects
    let cheatEffect = null;
    if (cheatCode.trim()) {
      cheatEffect = applyCheatCode(cheatCode.trim());
    }
    
    setTimeout(() => {
      const correctAnswer = eval(`${num1} ${operation} ${num2}`);
      
      // Weighted probability system - harder to get high percentages
      let baseProbability = Math.random();
      baseProbability = Math.pow(baseProbability, 2); // Square it to make high values rarer
      let probability = baseProbability * 100;
      
      // Apply cheat code modifiers
      if (cheatEffect === "powerup") {
        probability = Math.max(probability, 60 + Math.random() * 40); // 60-100% range
      } else if (cheatEffect === "curse") {
        probability = Math.min(probability, Math.random() * 40); // 0-40% range
      }
      
      let rarity = "Common";
      let isCorrect = false;
      
      if (probability >= 95) {
        rarity = "Legendary";
        isCorrect = true;
      } else if (probability >= 80) {
        rarity = "Epic";
        isCorrect = Math.random() > 0.2;
      } else if (probability >= 50) {
        rarity = "Rare";
        isCorrect = Math.random() > 0.5;
      } else {
        rarity = "Common";
        isCorrect = Math.random() > 0.8;
      }
      
      const displayValue = isCorrect 
        ? correctAnswer 
        : correctAnswer + Math.floor(Math.random() * 20) - 10;
      
      const message = getReactionMessage(rarity, isCorrect);
      
      setResult({
        value: displayValue,
        isCorrect,
        probability: Math.round(probability),
        rarity,
        message
      });
      setIsSpinning(false);
      
      // Clear cheat code after one use
      if (cheatCode.trim()) {
        setCheatCode("");
        setTimeout(() => setActivePowerUp(null), 2000);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center gap-4">
      {activePowerUp && <CheatCodeBanner powerUpUser={activePowerUp} />}
      
      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          🎰 GAMBLE CALCULATOR 🎰
        </h1>
        <p className="text-lg text-muted-foreground">
          Will the RNG gods bless your calculation?
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-card/80 border-2 border-primary/20">
          <div className="flex items-center gap-2 mb-6">
            <Input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="First #"
              className="text-xl font-bold text-center"
            />
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="text-xl font-bold bg-input border border-border rounded-md px-3 py-2"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">/</option>
            </select>
            <Input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Second #"
              className="text-xl font-bold text-center"
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              value={cheatCode}
              onChange={(e) => setCheatCode(e.target.value)}
              placeholder="🎫 Enter Cheat Code (Optional)"
              className="text-center font-bold"
            />
          </div>

          <ProbabilityWheel isSpinning={isSpinning} />
          
          <div className="text-center mt-6">
            <Button
              onClick={handleSpin}
              disabled={!num1 || !num2 || isSpinning}
              className="btn-legendary text-xl px-8 py-4 disabled:opacity-50"
            >
              {isSpinning ? "🎯 SPINNING..." : "🎲 SPIN FOR RESULT!"}
            </Button>
          </div>
        </Card>

        <div className="flex items-center justify-center">
          {result && <ResultDisplay result={result} />}
        </div>
      </div>
    </div>
  );
};