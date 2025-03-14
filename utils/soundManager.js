import { Howl } from "howler";

export const pauseBackgroundMusic = () => {
    if (backgroundMusic.playing()) {
        backgroundMusic.pause();
    }
};

export const resumeBackgroundMusic = () => {
    if (!backgroundMusic.playing()) {
        backgroundMusic.play();
    }
};
export const backgroundMusic = new Howl({
    src: ["/audio/playingsound.mp3"],
    volume: 0.5,
    loop: true,
});
export const startSound = new Howl({
    src: ["/audio/start.mp3"],
    volume: 0.5,
    loop: true,
});

export const SpecialSound = new Howl({
    src: ["/audio/extended_cling.mp3"],
    volume: 0.5,
    loop: false,
    onend: resumeBackgroundMusic, 
});

export const spinSound = new Howl({
    src: ["/audio/spinningEffect.mp3"],
    volume: 1.0,
    loop: false,
    onend: resumeBackgroundMusic, 
});
export const clickSound = new Howl({
    src: ["/audio/tap.mp3"],
    volume: 1.0,
    loop: false,
    onend: resumeBackgroundMusic, 
});

export const winSound = new Howl({
    src: ["/audio/win.mp3"],
    volume: 1.0,
    loop: false,
    onend: resumeBackgroundMusic, 
});

export const gameOverSound = new Howl({
    src: ["/audio/click.mp3"],
    volume: 1.0,
    onend: resumeBackgroundMusic, 
});


export const LoadPageMusic = () => {
    console.log("Testing sound system.");
    try {
      // Test if the audio files can be loaded and played
      backgroundMusic.once('load', () => {
        console.log("Sound loaded successfully!");
      });
      
      backgroundMusic.once('loaderror', (id, err) => {
        console.error("Error loading sound:", err);
      });
      
      // Play a short sound to test
      backgroundMusic.play();
      console.log("Sound playback attempted");
    } catch (error) {
      console.error("Sound test failed:", error);
    }
  };