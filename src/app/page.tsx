import CTASection from "@/components/home/CTASection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import RecentBlog from "@/components/home/RecentBlog";
import SkillsShowcase from "@/components/home/SkillsShowcase";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
      <RecentBlog />
      <CTASection />
    </div>
  );
}
