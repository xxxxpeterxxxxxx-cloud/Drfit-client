import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { TitleBar } from "./components/TitleBar";
import { useSettingsStore } from "./store/settingsStore";
import HomePage from "./pages/HomePage";
import ModsPage from "./pages/ModsPage";
import CosmeticsPage from "./pages/CosmeticsPage";
import ProfilesPage from "./pages/ProfilesPage";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import CipherPage from "./pages/CipherPage";

export default function App() {
  const darkMode = useSettingsStore((s) => s.darkMode);
  const accentColor = useSettingsStore((s) => s.accentColor);
  const borderRadius = useSettingsStore((s) => s.borderRadius);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };
    const { h, s, l } = hexToHsl(accentColor);
    root.style.setProperty("--accent", `${h} ${s}% ${l}%`);
    root.style.setProperty("--accent-hover", `${h} ${s}% ${Math.max(l - 7, 0)}%`);
    root.style.setProperty("--accent-dark", `${h} ${s}% ${Math.max(l - 13, 0)}%`);
    root.style.setProperty("--accent-light", `${h} ${s}% ${Math.min(l + 12, 100)}%`);
    root.style.setProperty("--accent-rgb", `${parseInt(accentColor.slice(1, 3), 16)}, ${parseInt(accentColor.slice(3, 5), 16)}, ${parseInt(accentColor.slice(5, 7), 16)}`);
  }, [accentColor]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--radius", `${borderRadius}px`);
  }, [borderRadius]);

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
              <Route path="/cipher" element={<CipherPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}
