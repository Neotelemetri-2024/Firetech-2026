import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { type ReactNode } from "react";

type MainLayoutProps = {
  children?: ReactNode;
};

const gradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col text-white"
      style={gradientStyle}
    >
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
