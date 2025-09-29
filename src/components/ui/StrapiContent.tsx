"use client";

import { useState, useEffect } from "react";
import { strapiApiClient } from "@/utils/strapi";

interface StrapiContentProps {
  children?: (data: unknown, loading: boolean) => React.ReactNode;
  render?: (data: unknown, loading: boolean) => React.ReactNode;
  endpoint: string;
}

export default function StrapiContent({
  children,
  render,
  endpoint,
}: StrapiContentProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;

        // Strapi 서버가 실행 중인지 확인
        try {
          switch (endpoint) {
            case "home":
              result = await strapiApiClient.getHomeContent();
              break;
            case "services":
              result = await strapiApiClient.getServices();
              break;
            case "portfolio":
              result = await strapiApiClient.getPortfolio();
              break;
            case "about":
              result = await strapiApiClient.getAboutContent();
              break;
            case "reviews":
              result = await strapiApiClient.getClientReviews();
              break;
            default:
              result = null;
          }
        } catch (strapiError) {
          console.log("Strapi 서버가 실행되지 않음, 기본 데이터 사용");
          result = null;
        }

        setData(result);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const renderFunction = render || children;

  if (!renderFunction) {
    return null;
  }

  return <>{renderFunction(data, loading)}</>;
}
