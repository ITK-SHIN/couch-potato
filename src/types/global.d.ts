import { YouTubeAPI } from "./video";

declare global {
  interface Window {
    YT: YouTubeAPI;
    onYouTubeIframeAPIReady: (() => void) | null;
    volumeChangeTimer: number;
  }
}

export {};
