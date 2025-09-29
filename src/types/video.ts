// YouTube Player 관련 타입들
export interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  setVolume(volume: number): void;
  getVolume(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getPlayerState(): number;
  getCurrentTime(): number;
  getDuration(): number;
  getVideoLoadedFraction(): number;
  destroy(): void;
  loadVideoById(videoId: string): void;
}

export interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

export interface YouTubePlayerConfig {
  height?: string | number;
  width?: string | number;
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    loop?: 0 | 1;
    mute?: 0 | 1;
    rel?: 0 | 1;
    showinfo?: 0 | 1;
    fs?: 0 | 1;
    cc_load_policy?: 0 | 1;
    iv_load_policy?: 1 | 3;
    modestbranding?: 0 | 1;
    playsinline?: 0 | 1;
    playlist?: string;
    start?: number;
    end?: number;
  };
  events?: {
    onReady?: (event: YouTubePlayerEvent) => void;
    onStateChange?: (event: YouTubePlayerEvent) => void;
    onError?: (event: YouTubePlayerEvent) => void;
  };
}

// YouTube API
export interface YouTubeAPI {
  Player: new (elementId: string | HTMLElement, config: YouTubePlayerConfig) => YouTubePlayer;
  PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };
}

// 비디오 태그 타입
export interface VideoTag {
  id: string;
  text: string;
  color: string;
}

// 비디오 통계 타입
export interface VideoStats {
  views: string;
  likes: string;
}

// 홈 비디오 타입
export interface HomeVideo {
  _id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  isActive: boolean;
  order: number;
  lastUpdated: string;
  client?: string;
  year?: string;
  category?: string;
  stats?: VideoStats;
  tags?: VideoTag[];
}

// 포트폴리오 비디오 타입
export interface PortfolioVideo {
  _id: string;
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  client?: string;
  year?: string;
  stats?: VideoStats;
  tags?: VideoTag[];
  order: number;
}

// 비디오 모달 관련 타입
export interface VideoModalState {
  isOpen: boolean;
  selectedVideo: string | null;
  isMuted: boolean;
  volume: number;
  showVolumeSlider: boolean;
  isPlayerReady: boolean;
  player: YouTubePlayer | null;
}

// 서비스 타입
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

// 후기 타입
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}
