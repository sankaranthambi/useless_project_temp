interface ResultDisplayProps {
  result: {
    value: number;
    isCorrect: boolean;
    probability: number;
    rarity: string;
    message: string;
  };
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "btn-legendary border-yellow-400";
      case "Epic":
        return "btn-epic border-purple-500";
      case "Rare":
        return "btn-rare border-blue-500";
      default:
        return "btn-common border-gray-500";
    }
  };

  const getRarityMessage = (rarity: string, isCorrect: boolean) => {
    if (rarity === "Legendary") return "🌟 LEGENDARY PULL! PERFECT CALCULATION! 🌟";
    if (rarity === "Epic") return isCorrect ? "✨ EPIC! Mathematical Genius! ✨" : "🔮 EPIC PULL! Close enough! 🔮";
    if (rarity === "Rare") return isCorrect ? "💎 RARE! Nice work! 💎" : "⚡ RARE PULL! Almost there! ⚡";
    return isCorrect ? "✅ Common but correct!" : "❌ Common pull... try again!";
  };

  return (
    <div className={`result-popup p-6 rounded-2xl border-4 ${getRarityStyles(result.rarity)} text-center max-w-sm`}>
      <div className="text-lg font-bold mb-3">
        {getRarityMessage(result.rarity, result.isCorrect)}
      </div>
      
      <div className="text-4xl font-bold mb-3">
        {result.value}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="text-sm">
          Probability: <span className="font-bold">{result.probability}%</span>
        </div>
        <div className="text-sm">
          Rarity: <span className="font-bold">{result.rarity}</span>
        </div>
        <div className="text-sm">
          Result: <span className={`font-bold ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {result.isCorrect ? 'CORRECT! 🎯' : 'INCORRECT 😅'}
          </span>
        </div>
      </div>
      
      <div className="text-sm font-medium text-center bg-black/20 rounded-lg p-3">
        {result.message}
      </div>
    </div>
  );
};