import { adaptive } from "@toss-design-system/colors";
import { Tab } from "@toss-design-system/mobile";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

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
    <Tab
      className="w-full flex justify-between"
      fluid={false}
      size="large"
      style={{ backgroundColor: adaptive.background }}
      onChange={(index) => {
        if (index === 0) {
          navigate("/home");
          trackPageView("검색 탭", "/search");
        } else if (index === 1) {
          navigate("/group");
          trackPageView("그룹 지도 탭", "/map");
        } else if (index === 2) {
          navigate("/more");
          trackPageView("더보기 탭", "/more");
        }
      }}
    >
      <Tab.Item selected={pathname === "/home"}>장소</Tab.Item>
      <Tab.Item selected={pathname === "/group" || pathname === "/loading"}>
        그룹
      </Tab.Item>
      <Tab.Item
        selected={
          pathname === "/more" ||
          pathname === "/satisfaction" ||
          pathname === "/opinion" ||
          pathname === "/success"
        }
      >
        더보기
      </Tab.Item>
    </Tab>
  );
}

export default Header;
