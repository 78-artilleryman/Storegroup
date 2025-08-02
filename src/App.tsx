import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import GroupPage from "@/pages/GroupPage";
import ListPage from "@/pages/ListPage";
import LoadingPage from "@/pages/LoadingPage";

function App() {
  return (
    <Router>
      <div className="max-w-[420px] mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
