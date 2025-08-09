interface ProbabilityWheelProps {
  isSpinning: boolean;
}

export const ProbabilityWheel = ({ isSpinning }: ProbabilityWheelProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className={`w-64 h-64 spinner-wheel ${isSpinning ? 'animate-dramatic-spin' : ''} ${isSpinning ? 'flame-effect' : ''}`}>
          <div className="absolute inset-4 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-bold text-legendary mb-2">LEGENDARY</div>
              <div className="text-xs text-legendary">90-100%</div>
            </div>
          </div>
          
          {/* Probability segments */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black bg-yellow-400 px-2 py-1 rounded">
            99%
          </div>
          <div className="absolute top-8 right-8 text-xs font-bold text-white bg-purple-600 px-2 py-1 rounded">
            75%
          </div>
          <div className="absolute bottom-8 right-8 text-xs font-bold text-white bg-blue-600 px-2 py-1 rounded">
            50%
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black bg-green-400 px-2 py-1 rounded">
            25%
          </div>
          <div className="absolute bottom-8 left-8 text-xs font-bold text-black bg-gray-400 px-2 py-1 rounded">
            10%
          </div>
          <div className="absolute top-8 left-8 text-xs font-bold text-black bg-gray-300 px-2 py-1 rounded">
            1%
          </div>
        </div>
        
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
        </div>
      </div>
    </div>
  );
};