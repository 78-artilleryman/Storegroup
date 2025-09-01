import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TDSMobileBedrockProvider } from "@toss-design-system/mobile-bedrock";
import Header from "@/components/Header";
import IntroPage from "@/pages/LandingPage";
import GroupPage from "@/pages/GroupPage";
import ListPage from "@/pages/ListPage";
import LoadingPage from "@/pages/LoadingPage";

import Home from "@/pages/Home";

function App() {
  return (
    <TDSMobileBedrockProvider>
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
            path="/list"
            element={
              <div className="max-w-[420px] mx-auto">
                <Header />
                <ListPage />
              </div>
            }
          />
        </Routes>
      </Router>
    </TDSMobileBedrockProvider>
  );
}

export default App;
