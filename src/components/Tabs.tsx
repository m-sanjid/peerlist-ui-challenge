import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TabProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  index: number;
}

const Tab = ({ children, active, onClick, index }: TabProps) => {
  return (
    <motion.button
      className={`relative px-6 py-3 rounded-lg text-sm transition-colors text-muted-foreground ${
        active ? 'font-semibold' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {active && (
        <motion.div
          className="absolute inset-0 bg-black/10 rounded-lg -z-10"
          layoutId="activeTab"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

interface TabsProps {
  children: React.ReactNode[];
}

export default function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleTabChange = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map((day, index) => (
            <Tab
              key={day}
              active={activeTab === index}
              onClick={() => handleTabChange(index)}
              index={index}
            >
              {day}
            </Tab>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={() => handleTabChange(Math.max(0, activeTab - 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={activeTab === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={() => handleTabChange(Math.min(4, activeTab + 1))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={activeTab === 4}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeTab}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
          transition={{ duration: 0.3 }}
          className="bg-black/10 rounded-2xl shadow-lg p-6 min-h-screen flex flex-col justify-center items-center"
        >
          {children[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 