import { clickSound, gameOverSound, SpecialSound, spinSound, startSound, winSound } from "./soundManager";

export const playSpecialSound = () => {
    SpecialSound.play();
    setTimeout(() => {
      SpecialSound.stop();
    }, 3000);
  };

  export const playJackpotSound = () => {
    SpecialSound.play();
    setTimeout(() => {
      SpecialSound.stop();
    }, 3000);
  };

  export const playWinSound = () => {
    winSound.play();
      setTimeout(() => {
        winSound.stop();
      }, 3000);
    };

  export const playGameOverSound = () => {
    backgroundMusic.stop();
    gameOverSound.play();
    setTimeout(() => {
      gameOverSound.stop();
    }, 5000);

  }
    export const playSpinSound = () => {
        spinSound.play();
        setTimeout(() => {
        spinSound.stop();
        }, 8000);
    };

    export const playClickSound = () => {
        clickSound.play();
        setTimeout(() => {
        clickSound.stop();
        }, 3000);
    };

    export const playStartSound = () => {
        startSound.play();
        setTimeout(() => {
        startSound.stop();
        }, 2000);
    }