import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "../../components/section/user/dashboard";
import Timeline from "../../components/section/user/timeline";
import FAQ from "../../components/section/user/faq";
import Event from "../../components/section/user/event";
import Sponsor from "../../components/section/user/sponsor";
import MediaPartner from "../../components/section/user/mediapartner";
import Gallery from "../../components/section/user/gallery";
import Countdown from "../../components/section/user/countdown";
import SectionDivider from "../../components/section/divider/sectiondivider";

const allHashes = [
  "home",
  "event",
  "hackathon",
  "uiux",
  "ft",
  "ef",
  "timeline",
  "countdown",
  "sponsor",
  "mediapartner",
  "faq",
  "firetech",
];

function scrollToHash(hash: string) {
  const element = document.getElementById(hash);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const stored = sessionStorage.getItem("scrollTo");
    if (stored && allHashes.includes(stored)) {
      sessionStorage.removeItem("scrollTo");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToHash(stored);
      }, 100);
    }
  }, [location.pathname]);

  return (
    <>
      <section id="home" className="mt-10">
        <Dashboard />
      </section>

      <SectionDivider />

      <section id="event" className="scroll-mt-44">
        <Event />
      </section>

      <SectionDivider />

      <section id="countdown" className="scroll-mt-40">
        <Countdown />
      </section>

      <SectionDivider />

      <section id="timeline" className="scroll-mt-40">
        <Timeline />
      </section>

      <SectionDivider />

      <section id="sponsor" className="scroll-mt-40">
        <Sponsor />
      </section>

      <SectionDivider />

      <section id="mediapartner" className="scroll-mt-42">
        <MediaPartner />
      </section>

      <SectionDivider />

      <section id="gallery" className="scroll-mt-40">
        <Gallery />
      </section>

      <SectionDivider />

      <section id="faq" className="scroll-mt-40">
        <FAQ />
      </section>
    </>
  );
}
