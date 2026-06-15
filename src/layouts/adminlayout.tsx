import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/navbaradmin";

const gradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

export default function AdminLayout() {
  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={gradientStyle}
    >
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_38%)]">
        <NavbarAdmin />

        <main className="mx-auto w-full max-w-8xl px-8 pb-10 pt-10 sm:px-8 lg:px-10 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
