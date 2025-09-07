import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  // GA4 가상 페이지 뷰 추적 함수
  const trackPageView = (pageTitle: string, pagePath: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "virtual_page_view",
        page_title: pageTitle,
        page_path: pagePath,
      });
    }
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="w-full flex justify-between">
        <Link
          to="/home"
          onClick={() => trackPageView("검색 탭", "/search")}
          className={`flex-1 w-full text-center py-2.5 font-medium transition-colors relative
            ${
              pathname === "/home"
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          장소
        </Link>
        <Link
          to="/group"
          onClick={() => trackPageView("그룹 지도 탭", "/map")}
          className={`flex-1 w-full text-center py-2.5 font-medium transition-colors relative
            ${
              pathname === "/group" || pathname === "/loading"
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500"
                : "text-gray-600 hover:text-gray-900"
            }`}
        >
          그룹
        </Link>
      </div>
    </div>
  );
}

export default Header;
