import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import Prayer from "../pages/prayers/prayer";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/prayers" element={<Prayer />} />
    </Routes>
  );
}
