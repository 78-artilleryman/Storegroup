import { NextResponse } from "next/server";

const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  if (!KAKAO_REST_API_KEY) {
    console.error("Kakao REST API 키가 설정되지 않았습니다.");
    return NextResponse.json(
      { error: "서버 설정 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  try {
    console.log("카카오 API 요청:", query);

    // 1. 먼저 키워드로 장소 검색
    const placeResponse = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      }
    );

    if (!placeResponse.ok) {
      const errorData = await placeResponse.json();
      console.error("카카오 API 응답 오류:", errorData);
      return NextResponse.json(
        { error: "카카오 API 호출 중 오류가 발생했습니다." },
        { status: placeResponse.status }
      );
    }

    const placeData = await placeResponse.json();

    // 2. 각 장소에 대해 이미지 검색 수행
    const placesWithImages = await Promise.all(
      placeData.documents.map(async (place: any) => {
        try {
          const imageResponse = await fetch(
            `https://dapi.kakao.com/v2/search/image?query=${encodeURIComponent(
              place.place_name + " " + place.address_name
            )}&size=1`,
            {
              headers: {
                Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
              },
            }
          );

          const imageData = await imageResponse.json();
          const thumbnail_url = imageData.documents[0]?.thumbnail_url;

          return {
            place_name: place.place_name,
            address_name: place.address_name,
            road_address_name: place.road_address_name,
            x: place.x,
            y: place.y,
            thumbnail_url: thumbnail_url || null,
          };
        } catch (error) {
          console.error("이미지 검색 중 오류:", error);
          return {
            place_name: place.place_name,
            address_name: place.address_name,
            road_address_name: place.road_address_name,
            x: place.x,
            y: place.y,
            thumbnail_url: null,
          };
        }
      })
    );

    console.log("검색 결과:", placesWithImages);

    return NextResponse.json({
      places: placesWithImages,
    });
  } catch (error) {
    console.error("카카오 API 호출 중 오류:", error);
    return NextResponse.json(
      { error: "장소 검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
