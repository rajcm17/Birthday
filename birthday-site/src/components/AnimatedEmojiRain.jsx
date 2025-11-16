import React, { useEffect, useState } from "react";

const EMOJIS = ["💗", "✨", "💕", "💖", "💞", "💝"];

const random = (min, max) => Math.random() * (max - min) + min;

export default function AnimatedEmojiRain() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: random(0, 100),         // horizontal position
      size: random(20, 40),         // emoji size
      duration: random(4, 10),      // fall speed
      delay: random(0, 5),          // stagger animation
      path: Math.floor(random(1, 5)) // which animation path
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {items.map(item => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
          className={
            item.path === 1
              ? "emoji-fall"
              : item.path === 2
              ? "emoji-rise"
              : item.path === 3
              ? "emoji-diagonal-left"
              : "emoji-diagonal-right"
          }
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
