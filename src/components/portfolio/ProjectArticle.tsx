import React, { type CSSProperties } from 'react';
import ProjectShowcase from './ProjectShowcase';
import { openQuote, useGoToSection } from './links';
import type { Project } from './data';

interface Props {
  project: Project;
  index: number;
  total: number;
  priority?: boolean;
}

const sd = (ms: number) => ({ '--sd': `${ms}ms` } as CSSProperties);
const pad = (n: number) => String(n).padStart(2, '0');

const ProjectArticle: React.FC<Props> = ({ project, index, total, priority }) => {
  const goTo = useGoToSection();
  const number = pad(index + 1);

  const quoteLink = (e: React.MouseEvent) => {
    e.preventDefault();
    openQuote();
  };

  return (
    <article
      id={project.id}
      className="pf-ProjectArticle_project"
      style={
        { '--accent': project.accent, '--accent-soft': project.accentSoft, '--dark': project.dark } as CSSProperties
      }
      data-sweep={project.sweep}
      data-wash={project.wash}
      data-reveal="true"
    >
      <header className="pf-ProjectArticle_head">
        <div className="pf-ProjectArticle_headMain">
          <p className="mono pf-ProjectArticle_index pf-ProjectArticle_st" style={sd(0)}>
            <span className="pf-ProjectArticle_indexDot" aria-hidden="true" />
            <span className="pf-ProjectArticle_num" aria-hidden="true">
              {number.split('').map((d, i) => (
                <span key={i} className="pf-ProjectArticle_digit" style={{ '--ci': i } as CSSProperties}>
                  <span>{d}</span>
                </span>
              ))}
            </span>
            <span className="sr-only">{number}</span> / {total}
            <span className="pf-ProjectArticle_indexSep" aria-hidden="true">
              —
            </span>
            {project.sector}
            <span className="pf-ProjectArticle_sectorRest">{project.sectorRest}</span>
          </p>
          <h2 className="pf-ProjectArticle_title pf-ProjectArticle_st" style={sd(70)}>
            <span>{project.name}</span>
          </h2>
          <p className="pf-ProjectArticle_headline pf-ProjectArticle_st" style={sd(140)}>
            {project.headline}
          </p>
          <p className="pf-ProjectArticle_brief pf-ProjectArticle_st" style={sd(140)}>
            {project.brief}
          </p>
        </div>

        <dl className="pf-ProjectArticle_meta">
          {project.meta.map((m, i) => (
            <div key={m.label} className="pf-ProjectArticle_st pf-ProjectArticle_metaDetail" style={sd(210 + i * 70)}>
              <dt className="mono">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
          <div className="pf-ProjectArticle_access pf-ProjectArticle_st" style={sd(350)} data-emphasis="app">
            <dt className="mono">Next step</dt>
            <dd className="pf-ProjectArticle_accessNote">{project.accessNote}</dd>
            <dd className="pf-ProjectArticle_accessLinks">
              <a
                href="/#contact"
                onClick={quoteLink}
                className="pf-ProjectArticle_accessLink pf-ProjectArticle_accessStrong"
                aria-label={`Start a project like ${project.name}`}
              >
                <span>Start a project</span>
                <i aria-hidden="true">
                  <span>↗</span>
                </i>
              </a>
              <a
                href="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  goTo('#services');
                }}
                className="pf-ProjectArticle_accessLink"
                aria-label="See our services"
              >
                <span>Our services</span>
                <i aria-hidden="true">
                  <span>↗</span>
                </i>
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <ProjectShowcase project={project} priority={priority} />

      <div className="pf-ProjectArticle_body">
        <div className="pf-ProjectArticle_copy pf-ProjectArticle_st" style={sd(420)}>
          <p className="pf-ProjectArticle_summary">{project.summary}</p>
          <h3 className="mono pf-ProjectArticle_builtTitle">What we deliver</h3>
          <ol className="pf-ProjectArticle_built">
            {project.built.map((item, i) => (
              <li key={i}>
                <span className="pf-ProjectArticle_builtNum" aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="pf-ProjectArticle_aside pf-ProjectArticle_st" style={sd(490)}>
          <p className="mono pf-ProjectArticle_asideLabel">Services</p>
          <ul className="pf-ProjectArticle_tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="pf-ProjectArticle_disclosure">{project.disclosure}</p>
          <div className="pf-ProjectArticle_ctas">
            <a href="/#contact" onClick={quoteLink} className="pf-ProjectArticle_primary">
              <span>Start a project</span>
              <span className="pf-ProjectArticle_primaryCircle" aria-hidden="true">
                <span>↗</span>
              </span>
            </a>
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                goTo('#services');
              }}
              className="pf-ProjectArticle_textLink"
            >
              <span>Explore services</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default ProjectArticle;
