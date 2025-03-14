import React, { useEffect, useState, createContext } from "react";
import { backgroundMusic } from "@/utils/soundManager";

// Create context to access music controls across the app
export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (isMuted) {
      backgroundMusic.volume(0.5);
      setIsMuted(false);
    } else {
      backgroundMusic.volume(0);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!backgroundMusic.playing()) {
        backgroundMusic.play();
      }
      // Remove event listener after first interaction
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    // Add event listeners to start music on user interaction
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      backgroundMusic.stop(); // Stop music when component unmounts (optional)
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return (
    <MusicContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;