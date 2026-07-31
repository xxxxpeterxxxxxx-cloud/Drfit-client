import { HashRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { TitleBar } from "./components/TitleBar";
import HomePage from "./pages/HomePage";
import ModsPage from "./pages/ModsPage";
import CosmeticsPage from "./pages/CosmeticsPage";
import ProfilesPage from "./pages/ProfilesPage";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";

export default function App() {
  return (
    <HashRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <TitleBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mods" element={<ModsPage />} />
              <Route path="/cosmetics" element={<CosmeticsPage />} />
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}
