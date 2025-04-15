import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Toggle() {
  const [plan, setPlan] = useState<"free" | "premium">("free");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full h-[70px] rounded-full bg-white shadow-lg p-2 overflow-hidden">
        {/* Container */}
        <div className="relative w-full h-full rounded-full bg-white flex">
          {/* Background Pill with improved animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-black"
            initial={false}
            animate={{
              left: plan === "free" ? "0%" : "50%",
              right: plan === "free" ? "50%" : "0%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
          />

          {/* Free Option with improved hover effects */}
          <motion.button
            className={`relative flex-1 rounded-full flex items-center justify-center font-medium text-lg transition-colors
              ${
                plan === "free"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
            onClick={() => setPlan("free")}
          >
            <motion.span>Free</motion.span>
          </motion.button>

          {/* Premium Option with improved animations */}
          <motion.button
            className={`relative flex-1 rounded-full flex flex-col items-center justify-center transition-colors
              ${
                plan === "premium"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
            onClick={() => setPlan("premium")}
          >
            <motion.span
              className="text-lg font-medium"
              animate={{ opacity: plan === "premium" ? 0 : 1 }}
            >
              Premium
            </motion.span>

            <AnimatePresence>
              {plan === "premium" ? (
                <motion.div
                  className="absolute inset-0 p-1 flex items-center justify-center rounded-full"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    layoutId="billing-toggle"
                    className="h-full w-full rounded-full flex items-center justify-center p-1 relative"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white text-black z-10"
                      initial={false}
                      animate={{
                        left: billing === "monthly" ? "0%" : "50%",
                        right: billing === "monthly" ? "50%" : "0%",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 1,
                      }}
                    />
                    <motion.button
                      layoutId="billing-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBilling("monthly");
                      }}
                      className={`z-20 rounded-full h-full flex-1 flex items-center justify-center transition-all ${
                        billing === "monthly"
                          ? "text-black font-medium"
                          : "text-white"
                      }`}
                    >
                      Monthly
                    </motion.button>
                        <motion.button
                      layoutId="billing-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBilling("annual");
                      }}
                      className={`z-20 rounded-full h-full flex-1 flex items-center justify-center transition-all ${
                        billing === "annual"
                          ? " text-black font-medium"
                          : "text-white"
                      }`}
                    >
                      Annual
                    </motion.button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  layoutId="billing-toggle"
                  className="text-xs flex items-center gap-1 mt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span>Monthly</span>
                  <span>•</span>
                  <span>Annual</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
