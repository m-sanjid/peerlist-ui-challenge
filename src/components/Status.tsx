import { useEffect, useState } from "react";
import { Loader2, Check, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Status = () => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const statuses = [
    {
      id: "analyzing",
      status: "Analysing Transaction",
      color: "bg-blue-500/20",
      textColor: "text-blue-500",
      icon: <Loader2 />,
      isAnimating: true
    },
    {
      id: "safe",
      status: "Transaction Safe",
      color: "bg-green-500/20",
      textColor: "text-green-600",
      icon: <Check />,
      isAnimating: false
    },
    {
      id: "warning",
      status: "Transaction Warning",
      color: "bg-red-500/20",
      textColor: "text-red-600",
      icon: <AlertTriangle />,
      isAnimating: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus((prevStatus) => (prevStatus + 1) % statuses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentStatus((prevStatus) => 
      prevStatus === 0 ? statuses.length - 1 : prevStatus - 1
    );
  };

  const handleNext = () => {
    setCurrentStatus((prevStatus) => 
      (prevStatus + 1) % statuses.length
    );
  };

  const current = statuses[currentStatus];

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <motion.div 
        layoutId="status-container"
        className={`flex items-center gap-3 ${current.color} rounded-full px-4 py-3 shadow-sm transition-all duration-300`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={current.textColor}
          >
            {current.isAnimating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                {current.icon}
              </motion.div>
            ) : (
              current.icon
            )}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current.id}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`font-medium ${current.textColor}`}
            layoutId="status-text"
          >
            {current.status}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-4 items-center mt-26">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
          onClick={handlePrevious}
        >
          <ChevronLeft size={20} />
        </motion.button>
        
        <div className="flex gap-2">
          {statuses.map((status, index) => (
            <motion.button
              key={status.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentStatus ? status.color : "bg-gray-200"
              }`}
              onClick={() => setCurrentStatus(index)}
            />
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
          onClick={handleNext}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Status;