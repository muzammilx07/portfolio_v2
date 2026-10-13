import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Experience from "@/components/home/Experience";
import SkillsShowcase from "@/components/home/SkillsShowcase";
import RecentBlog from "@/components/home/RecentBlog";
import CTASection from "@/components/home/CTASection";

export default function Page() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects />
      <Experience />
      <SkillsShowcase />
      <RecentBlog />
      <CTASection />
    </div>
  );
}
