interface CheatCodeBannerProps {
  powerUpUser: string;
}

const getUserImage = (user: string) => {
  const userImages: { [key: string]: string } = {
    ashik: "/lovable-uploads/94cdbaf2-d337-4e3d-b40f-ded9c6a124ba.png",
    aswin: "/lovable-uploads/b038c143-ed37-4d6a-b1d0-72d57a6c6099.png", 
    sreenath: "/lovable-uploads/d6180970-2946-42bd-967b-1702407300e5.png",
    aibel: "/lovable-uploads/e45c1bc8-bf13-4063-be56-30e0c4983bdb.png",
    aadhi: "/lovable-uploads/8020edeb-5297-4b9d-a797-1168519b0412.png",
    adithyan: "/lovable-uploads/8020edeb-5297-4b9d-a797-1168519b0412.png",
    manu: "/lovable-uploads/4e0f4fe8-0109-409a-85ea-e14f9659b23e.png",
    nirenjan: "/lovable-uploads/27a6df3f-1018-4c0a-86b4-fec8b8a07c5c.png"
  };
  return userImages[user] || "";
};

const getBannerMessage = (user: string) => {
  const powerUpUsers = ["ashik", "aswin", "sreenath", "aibel"];
  const cursedUsers = ["aadhi", "adithyan", "nirenjan", "manu"];
  
  if (powerUpUsers.includes(user)) {
    return "🌟 POWERED UP WISH ACTIVATED! 🌟";
  } else if (cursedUsers.includes(user)) {
    return "😈 CURSED FORTUNE ENGAGED! 😈";
  }
  return "";
};

export const CheatCodeBanner = ({ powerUpUser }: CheatCodeBannerProps) => {
  const userImage = getUserImage(powerUpUser);
  const message = getBannerMessage(powerUpUser);
  const powerUpUsers = ["ashik", "aswin", "sreenath", "aibel"];
  const isPowerUp = powerUpUsers.includes(powerUpUser);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center animate-pulse-glow ${
      isPowerUp ? 'bg-gradient-to-br from-yellow-400/95 to-orange-500/95' : 'bg-gradient-to-br from-red-500/95 to-purple-600/95'
    }`}>
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl border-4 border-white/50 backdrop-blur-sm">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
          <img 
            src={userImage} 
            alt={powerUpUser}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="128" height="128" fill="#6366f1"/>
                  <text x="64" y="80" text-anchor="middle" fill="white" font-family="Arial" font-size="48" font-weight="bold">${powerUpUser.charAt(0).toUpperCase()}</text>
                </svg>
              `)}`;
            }}
          />
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {message}
          </div>
          <div className="text-xl text-white/90 font-medium capitalize">
            {powerUpUser}'s {isPowerUp ? 'Blessing' : 'Curse'} Active
          </div>
        </div>
      </div>
    </div>
  );
};