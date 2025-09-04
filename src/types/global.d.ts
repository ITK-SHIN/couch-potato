declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | null;
    volumeChangeTimer: number;
  }
}

export {};
