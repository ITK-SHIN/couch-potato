// YouTube Data API v3를 사용하여 채널 영상 정보를 가져오는 유틸리티

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_HANDLE = "@TryToShinDirect";

// 채널 핸들로 채널 ID를 가져오는 함수
export async function getChannelIdByHandle(handle) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
        handle
      )}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.channelId;
    }

    throw new Error("Channel not found");
  } catch (error) {
    console.error("Error fetching channel ID:", error);
    return null;
  }
}

// 채널의 업로드 플레이리스트 ID를 가져오는 함수
export async function getChannelUploadsPlaylistId(channelId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].contentDetails.relatedPlaylists.uploads;
    }

    throw new Error("Channel uploads playlist not found");
  } catch (error) {
    console.error("Error fetching uploads playlist ID:", error);
    return null;
  }
}

// 플레이리스트의 모든 비디오를 가져오는 함수
export async function getPlaylistVideos(playlistId, maxResults = 50) {
  try {
    let allVideos = [];
    let nextPageToken = "";

    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${Math.min(
        maxResults,
        50
      )}&pageToken=${nextPageToken}&key=${YOUTUBE_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`YouTube API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.items) {
        allVideos = allVideos.concat(data.items);
      }

      nextPageToken = data.nextPageToken || "";

      // maxResults에 도달했으면 중단
      if (allVideos.length >= maxResults) {
        break;
      }
    } while (nextPageToken && allVideos.length < maxResults);

    return allVideos.slice(0, maxResults);
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
    return [];
  }
}

// 비디오 상세 정보를 가져오는 함수 (조회수, 좋아요 수 등)
export async function getVideoDetails(videoIds) {
  try {
    const idsString = Array.isArray(videoIds) ? videoIds.join(",") : videoIds;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${idsString}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching video details:", error);
    return [];
  }
}

// 채널의 모든 영상 정보를 가져오는 메인 함수
export async function getChannelVideos(maxResults = 50) {
  try {
    console.log("Fetching YouTube channel videos...");

    // 1. 채널 ID 가져오기
    const channelId = await getChannelIdByHandle(CHANNEL_HANDLE);
    if (!channelId) {
      throw new Error("Failed to get channel ID");
    }

    console.log("Channel ID:", channelId);

    // 2. 업로드 플레이리스트 ID 가져오기
    const uploadsPlaylistId = await getChannelUploadsPlaylistId(channelId);
    if (!uploadsPlaylistId) {
      throw new Error("Failed to get uploads playlist ID");
    }

    console.log("Uploads Playlist ID:", uploadsPlaylistId);

    // 3. 플레이리스트의 모든 비디오 가져오기
    const playlistVideos = await getPlaylistVideos(
      uploadsPlaylistId,
      maxResults
    );
    if (playlistVideos.length === 0) {
      throw new Error("No videos found in playlist");
    }

    console.log(`Found ${playlistVideos.length} videos`);

    // 4. 비디오 ID 추출
    const videoIds = playlistVideos.map((item) => item.contentDetails.videoId);

    // 5. 비디오 상세 정보 가져오기 (배치로 처리)
    const batchSize = 50; // YouTube API 제한
    let videoDetails = [];

    for (let i = 0; i < videoIds.length; i += batchSize) {
      const batch = videoIds.slice(i, i + batchSize);
      const batchDetails = await getVideoDetails(batch);
      videoDetails = videoDetails.concat(batchDetails);
    }

    // 6. 데이터 포맷팅
    const formattedVideos = videoDetails.map((video, index) => {
      const snippet = video.snippet;
      const statistics = video.statistics;

      // 카테고리 자동 분류 (제목과 설명 기반)
      const title = snippet.title.toLowerCase();
      const description = snippet.description.toLowerCase();

      let category = "other";
      if (
        title.includes("웨딩") ||
        title.includes("wedding") ||
        description.includes("웨딩")
      ) {
        category = "wedding";
      } else if (
        title.includes("광고") ||
        title.includes("commercial") ||
        title.includes("cf")
      ) {
        category = "commercial";
      } else if (title.includes("브랜드") || title.includes("brand")) {
        category = "brand";
      } else if (title.includes("이벤트") || title.includes("event")) {
        category = "event";
      } else if (
        title.includes("교육") ||
        title.includes("tutorial") ||
        title.includes("how to")
      ) {
        category = "education";
      } else if (
        title.includes("sns") ||
        title.includes("소셜") ||
        title.includes("인스타")
      ) {
        category = "social";
      }

      return {
        id: index + 1,
        title: snippet.title,
        category: category,
        client: extractClientName(snippet.title, snippet.description),
        year: new Date(snippet.publishedAt).getFullYear().toString(),
        thumbnail:
          snippet.thumbnails.maxres?.url ||
          snippet.thumbnails.high?.url ||
          snippet.thumbnails.medium?.url ||
          snippet.thumbnails.default?.url,
        videoId: video.id,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        description:
          snippet.description.length > 150
            ? snippet.description.substring(0, 150) + "..."
            : snippet.description,
        publishedAt: snippet.publishedAt,
        viewCount: parseInt(statistics.viewCount || 0),
        likeCount: parseInt(statistics.likeCount || 0),
        duration: video.contentDetails.duration,
        tags: snippet.tags || [],
      };
    });

    // 최신순으로 정렬
    formattedVideos.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    console.log("Successfully formatted video data");
    return formattedVideos;
  } catch (error) {
    console.error("Error in getChannelVideos:", error);
    return [];
  }
}

// 클라이언트 이름 추출 (제목에서 브랜드명이나 클라이언트명 추출)
function extractClientName(title, description) {
  // 간단한 클라이언트명 추출 로직
  // 실제로는 더 정교한 로직이 필요할 수 있습니다

  const commonPatterns = [
    /\[(.*?)\]/g, // [브랜드명] 패턴
    /「(.*?)」/g, // 「브랜드명」 패턴
    /\((.*?)\)/g, // (브랜드명) 패턴
  ];

  for (const pattern of commonPatterns) {
    const matches = title.match(pattern);
    if (matches && matches.length > 0) {
      return matches[0].replace(/[\[\]「」()]/g, "").trim();
    }
  }

  // 특정 키워드가 포함된 경우
  if (title.includes("우지커피") || description.includes("우지커피")) {
    return "우지커피";
  }

  if (title.includes("패션") || description.includes("패션")) {
    return "패션 브랜드";
  }

  return "COUCH POTATO";
}

// API 키가 설정되어 있는지 확인하는 함수
export function isYouTubeAPIConfigured() {
  return !!YOUTUBE_API_KEY && YOUTUBE_API_KEY !== "your_youtube_api_key_here";
}
