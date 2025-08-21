import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TDSMobileBedrockProvider } from "@toss-design-system/mobile-bedrock";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import GroupPage from "@/pages/GroupPage";
import ListPage from "@/pages/ListPage";
import LoadingPage from "@/pages/LoadingPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";

function App() {
  return (
    <TDSMobileBedrockProvider>
      <Router>
        <div className="max-w-[420px] mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </TDSMobileBedrockProvider>
  );
}

export default App;
