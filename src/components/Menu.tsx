// components/PremiumDownwardMenu.tsx
import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, Menu } from 'lucide-react';

export type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type PremiumDownwardMenuProps = {
  menuItems: MenuItem[];
  initialOpen?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
};

export default function PremiumDownwardMenu({
  menuItems,
  initialOpen = false,
  onSelect,
  className,
}: PremiumDownwardMenuProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    onSelect?.(id);
  };

  return (
    <div className={className}>
      <motion.div 
        className="absolute rounded-full bg-indigo-500/20 blur-xl"
        initial={{ width: 60, height: 60, top: -5, left: -5 }}
        animate={{ 
          width: isOpen ? 70 : 60, 
          height: isOpen ? 70 : 60,
          opacity: isOpen ? 0.6 : 0.3
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      <LayoutGroup>
        <motion.div
          className="relative bg-black/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl"
          layoutId="menuContainer"
          initial={{ width: 56, height: 56 }}
          animate={{ 
            width: isOpen && hoveredItem ? 150 : 56,
            height: isOpen ? (menuItems.length * 62) + 56 : 56,
            borderRadius: isOpen ? 16 : 28,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.button
            layoutId="menuToggle"
            className="w-full h-14 flex items-center justify-center relative cursor-pointer"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                className="h-px w-full bg-white/30"
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="w-full"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`h-[62px] w-full flex items-center justify-start px-4 cursor-pointer ${
                      activeItem === item.id ? 'bg-white/10' : ''
                    }`}
                    variants={{
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 40 }},
                      hidden: { opacity: 0, y: 20, transition: { duration: 0.2 }}
                    }}
                    onClick={() => handleItemClick(item.id)}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <motion.div
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center 
                        ${activeItem === item.id
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-black'
                          : 'text-black/80'}`}
                      animate={{ 
                        scale: hoveredItem === item.id || activeItem === item.id ? 1.1 : 1,
                        rotate: hoveredItem === item.id && !activeItem ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 400, damping: 10 },
                        rotate: { duration: 0.4, repeat: 0 }
                      }}
                    >
                      {item.icon}
                    </motion.div>

                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, x: -10 }}
                          animate={{ opacity: 1, width: "auto", x: 0 }}
                          exit={{ opacity: 0, width: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-16 text-black/90 font-medium text-sm whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}
