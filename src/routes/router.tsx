import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import Prayer from "../pages/prayers/prayer";
import EnergyCleasing from "../pages/energyCleasing/energyCleasing";
import Defense from "../pages/defenses/defence";
import Oracle from "../pages/oracle/oracle";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/prayers" element={<Prayer />} />
      <Route path="/cleansing" element={<EnergyCleasing />} />
      <Route path="/defense" element={<Defense />} />
      <Route path="/oracle" element={<Oracle />} />
    </Routes>
  );
}
