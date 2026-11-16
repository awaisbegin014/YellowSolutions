import React, { useRef, type CSSProperties } from 'react';
import { useAnimIn } from './anim';
import { reviews } from './data';

const STAR = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z';
const MARK = 'M12 2l2.6 7.4H22l-6 4.5 2.3 7.6L12 16.9l-6.3 4.6L8 13.9 2 9.4h7.4z';

const Stars: React.FC = () => (
  <span className="pf-ClientReviews_stars" role="img" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR} />
      </svg>
    ))}
  </span>
);

const ClientReviews: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useAnimIn(ref, { threshold: 0.15 });

  return (
    <section ref={ref} className="container pf-ClientReviews_section" id="reviews" aria-labelledby="reviews-title">
      <div className="pf-ClientReviews_head">
        <h2 id="reviews-title" className="mono pf-ClientReviews_eyebrow">
          <span className="pf-ClientReviews_rule" aria-hidden="true" />
          Client reviews
        </h2>
      </div>

      <ol className="pf-ClientReviews_list">
        {reviews.map((r, i) => (
          <li key={r.name} className="pf-ClientReviews_review" style={{ '--i': i } as CSSProperties}>
            <div className="pf-ClientReviews_reviewLink">
              <article>
                <div className="pf-ClientReviews_top">
                  <Stars />
                </div>
                <div className="pf-ClientReviews_titleRow">
                  <h3 className="pf-ClientReviews_title">{r.title}</h3>
                  <span className="pf-ClientReviews_tpMark" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d={MARK} />
                    </svg>
                  </span>
                </div>
                <blockquote className="pf-ClientReviews_quote">
                  <p>“{r.quote}”</p>
                </blockquote>
                <p className="pf-ClientReviews_author">
                  <strong>{r.name}</strong>
                  <span>{r.role}</span>
                </p>
              </article>
            </div>
          </li>
        ))}
      </ol>

      <a className="pf-ClientReviews_trustpilot" href="/#contact">
        <span>Join 1000+ satisfied clients with</span>
        <span className="pf-ClientReviews_tpBrand">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={MARK} />
          </svg>
          The Yellow Solutions
        </span>
        <i aria-hidden="true">↗</i>
      </a>
    </section>
  );
};

export default ClientReviews;
