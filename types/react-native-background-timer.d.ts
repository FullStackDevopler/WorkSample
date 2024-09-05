declare module 'react-native-background-timer' {
    const BackgroundTimer: {
      runBackgroundTimer: (callback: () => void, interval: number) => void;
      stopBackgroundTimer: () => void;
      // Add other methods and properties as needed
    };
  
    export default BackgroundTimer;
  }
  