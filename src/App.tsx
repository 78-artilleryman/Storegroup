import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";
import Header from "@/components/Header";
import IntroPage from "@/pages/LandingPage";
import GroupPage from "@/pages/GroupPage";
import LoadingPage from "@/pages/LoadingPage";
import Home from "@/pages/Home";
import MorePage from "@/pages/MorePage";
import SatisfactionPage from "@/pages/SatisfactionPage";
import OpinionPage from "@/pages/OpinionPage";
import SuccessPage from "@/pages/SuccessPage";

function App() {
  return (
    <TDSMobileAITProvider>
      <Router>
        <Routes>
          {/* 헤더가 없는 페이지들 */}
          <Route path="/" element={<IntroPage />} />
          {/* 헤더가 있는 페이지들 */}
          <Route
            path="/home"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <Home />
              </div>
            }
          />
          <Route
            path="/loading"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <LoadingPage />
              </div>
            }
          />
          <Route
            path="/group"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <GroupPage />
              </div>
            }
          />
          <Route
            path="/more"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <MorePage />
              </div>
            }
          />
          <Route
            path="/satisfaction"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <SatisfactionPage />
              </div>
            }
          />
          <Route
            path="/opinion"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <OpinionPage />
              </div>
            }
          />
          <Route
            path="/success"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <SuccessPage />
              </div>
            }
          />
        </Routes>
      </Router>
    </TDSMobileAITProvider>
  );
}

export default App;
