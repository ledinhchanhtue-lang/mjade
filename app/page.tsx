import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import StoryCertification from "@/components/home/StoryCertification";
import LimitedCollection from "@/components/home/LimitedCollection";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <StoryCertification />
      <LimitedCollection />
      <Testimonials />
    </>
  );
}
