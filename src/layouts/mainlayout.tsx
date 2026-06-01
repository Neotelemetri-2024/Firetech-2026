import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { type ReactNode } from "react";

type MainLayoutProps = {
  children?: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
