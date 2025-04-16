"use client"

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { IconList, IconLayoutGrid, IconStack3, IconSquare } from "@tabler/icons-react";
import { useState } from "react";

type View = "list" | "card" | "pack";

type ViewItem = {
  id: View;
  title: string;
  icon: React.ReactElement;
};

type Item = {
  title: string;
  image: string;
  price: number;
  rank: string;
  angle?: number;
};

const TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.5,
  duration: 0.5,
};

const views: ViewItem[] = [
    { id: "list", title: "List view", icon: <IconList size={20} /> },
    { id: "pack", title: "Pack view", icon: <IconStack3 size={20} /> },
    { id: "card", title: "Card view", icon: <IconLayoutGrid size={20} /> },
];

const items: Item[] = [
  {
    title: "Skilled Fingers Series",
    image: "/item2.svg",
    price: 0.855,
    rank: "209",
    angle: -10
  },
  {
    title: "Vibrant Vibes Series",
    image: "/item1.svg",
    price: 0.209,
    rank: "808",
    angle: 15
  }
];

export default function Layouts() {
  const [activeView, setActiveView] = useState<View>("list");

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="max-w-4xl min-h-screen mx-auto p-8 flex flex-col items-center justify-center">
        <motion.h1 layoutId="title" className="text-4xl font-bold mb-8">
          Collectibles
        </motion.h1>
        
        {/* View Switcher */}
        <div className="flex gap-3 mb-8">
          {views.map((view) => (
            <motion.button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium relative
                ${activeView === view.id ? "text-white" : "text-gray-600 hover:text-gray-900"}
              `}
            >
              {activeView === view.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-[#00b3ff] rounded-full"
                  transition={TRANSITION}
                />
              )}
              <span className="z-1 flex items-center gap-2">
                {view.icon}
                {view.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full max-w-xl min-h-screen">
          <AnimatePresence mode="popLayout">
            {activeView === "list" && <ListView />}
            {activeView === "pack" && <PackView />}
            {activeView === "card" && <CardView />}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

function ListView() {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <ItemView
          key={idx}
          item={item}
          idx={idx}
          view="list"
          className="flex items-center gap-4"
        />
      ))}
    </div>
  );
}

function CardView() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <ItemView
          key={idx}
          item={item}
          idx={idx}
          view="card"
        />
      ))}
    </div>
  );
}

function PackView() {
  // State to track which item is at the front
  const [frontItemIndex, setFrontItemIndex] = useState<number | null>(null);

  // Handle click on an item
  const handleItemClick = (clickedIndex: number) => {
    setFrontItemIndex(clickedIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-44 w-full flex items-center justify-center mb-8">
        {items.map((item, idx) => (
          <ItemView
            key={idx}
            item={item}
            idx={idx}
            view="pack"
            className="absolute cursor-pointer"
            zIndex={frontItemIndex === idx ? 100 : items.length - idx}
            onClick={() => handleItemClick(idx)}
          />
        ))}
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center space-y-2"
        >
          <motion.p className="text-2xl font-bold">
            {items.length} Collectibles
          </motion.p>
          <motion.p className="text-xl text-gray-500">
            {items.reduce((sum, item) => sum + item.price, 0).toFixed(3)} ETH TOTAL
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ItemView({
  item,
  idx,
  view,
  className = "",
  onClick,
  zIndex
}: {
  item: Item;
  idx: number;
  view: View;
  className?: string;
  onClick?: () => void;
  zIndex?: number;
}) {
  return (
    <motion.div
      layoutId={`view-item-container-${idx}`}
      className={`${className}`}
      style={{
        rotate: view === "pack" ? item.angle : 0,
        zIndex: zIndex !== undefined ? zIndex : (view === "pack" ? items.length - idx : 0),
      }}
      onClick={onClick}
      whileHover={view === "pack" ? { scale: 1.05 } : undefined}
    >
      <motion.div
        layoutId={`view-item-image-container-${idx}`}
        className={`
          overflow-hidden bg-white shadow-md
          ${view === "card" ? "aspect-square rounded-xl" : ""}
          ${view === "list" ? "w-16 h-16 rounded-xl" : ""}
          ${view === "pack" ? "w-44 h-44 rounded-2xl" : ""}
        `}
      >
        <motion.img
          layoutId={`view-item-image-${idx}`}
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <AnimatePresence>
        {view !== "pack" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`
              flex ${view === "list" ? "flex-1" : "flex-col"}
              gap-2 mt-2
            `}
          >
            <div className={`flex flex-col gap-1 ${view === "list" ? "flex-1" : ""}`}>
              <motion.h3
                layoutId={`view-item-title-${idx}`}
                className="font-semibold"
              >
                {item.title}
              </motion.h3>
              <motion.div
                layoutId={`view-item-price-${idx}`}
                className="text-sm text-gray-600 flex items-center justify-between"
              >
                <span>{item.price} ETH</span>
                {view === "card" && (
                  <motion.span
                    layoutId={`view-item-rank-${idx}`}
                    className="flex items-center gap-1 text-gray-400"
                  >
                    <IconSquare size={16} />
                    #{item.rank}
                  </motion.span>
                )}
              </motion.div>
            </div>
            {view === "list" && (
              <motion.span
                layoutId={`view-item-rank-${idx}`}
                className="flex items-center gap-1 text-gray-400"
              >
                <IconSquare size={16} />
                #{item.rank}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}