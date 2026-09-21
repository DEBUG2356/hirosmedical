import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BodyMap from "@/components/BodyMap";
import Services from "@/components/Services";
import Treatments from "@/components/Treatments";
import Classes from "@/components/Classes";
import About from "@/components/About";
import Quote from "@/components/Quote";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <BodyMap />
      <Services />
      <Treatments />
      <Classes />
      <About />
      <Quote />
      <Gallery />
      <Contact />
    </>
  );
}
