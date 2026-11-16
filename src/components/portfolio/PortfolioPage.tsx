import React, { useEffect } from 'react';
import '../../styles/portfolio-page.css';
import PageIntro from './PageIntro';
import HeroSection from './HeroSection';
import ShowcaseCanvas from './ShowcaseCanvas';
import AboutSection from './AboutSection';
import ByTheNumbers from './ByTheNumbers';
import ClientReviews from './ClientReviews';
import CapabilityExplorer from './CapabilityExplorer';
import ProjectArticle from './ProjectArticle';
import { projects } from './data';
import { prefersReducedMotion } from './anim';

/** fades each [data-reveal] block up as it scrolls into view (blocks already on screen stay put) */
const useRevealOnScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.pf-root [data-reveal]'));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      el.classList.add('reveal-ready');
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
};

const PortfolioPage: React.FC = () => {
  useRevealOnScroll();

  useEffect(() => {
    const previous = document.title;
    document.title = 'Portfolio | The Yellow Solutions';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="pf-root">
      <PageIntro />
      <div className="pf-page">
        {/* clear the site's fixed navbar */}
        <main id="main" style={{ paddingTop: '4.5rem' }}>
          <HeroSection />
          <ShowcaseCanvas />
          <AboutSection />
          <ByTheNumbers />
          <ClientReviews />
          <CapabilityExplorer />

          <section id="work" className="container" aria-labelledby="work-title">
            <div className="pf-projects_sectionHead" data-reveal="true">
              <h2 id="work-title" className="pf-projects_h2">
                Selected work.
              </h2>
              <p className="pf-projects_sectionNote">
                One dominant visual per showcase, with supporting screens, details and proof. Move over a smaller image
                to bring it forward, or open any of them full screen.
              </p>
            </div>
            {projects.map((project, i) => (
              <ProjectArticle key={project.id} project={project} index={i} total={projects.length} priority={i === 0} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default PortfolioPage;
