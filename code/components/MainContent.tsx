import FeaturedProjects from "./FeaturedProjects";
import Footer from "./Footer";
import Intro from "./Intro";

// components/MainContent.tsx
const MainContent = () => {
  return (
    <div>
      <Intro />
      <section id="featured-projects">
        <h2 className="text-2xl font-bold text-start mb-4">
          Featured Projects
        </h2>
        <FeaturedProjects />
      </section>
      <Footer />
    </div>
  );
};

export default MainContent;
