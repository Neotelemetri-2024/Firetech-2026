import Dashboard from "../../components/section/user/dashboard";
import Timeline from "../../components/section/user/timeline";
import FAQ from "../../components/section/user/faq";
import Event from "../../components/section/user/event";
import Sponsor from "../../components/section/user/sponsor";
import MediaPartner from "../../components/section/user/mediapartner";
import Countdown from "../../components/section/user/countdown";
import SectionDivider from "../../components/section/divider/sectiondivider";

export default function Home() {
  return (
    <>
      <section id="home" className="mt-10">
        <Dashboard />
      </section>

      <section id="event" className="scroll-mt-40">
        <Event />
      </section>

      <SectionDivider />

      <section id="timeline" className="scroll-mt-40">
        <Timeline />
      </section>

      <SectionDivider />

      <section id="countdown" className="scroll-mt-40">
        <Countdown />
      </section>

      <SectionDivider />

      <section id="sponsor" className="scroll-mt-40">
        <Sponsor />
      </section>

      <SectionDivider />

      <section id="media-partner" className="scroll-mt-40">
        <MediaPartner />
      </section>

      <SectionDivider />

      <section id="faq" className="scroll-mt-40">
        <FAQ />
      </section>
    </>
  );
}
