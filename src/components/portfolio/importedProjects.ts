import type { Project } from './data';

/* ─────────────────────────────────────────────────────────────────────────────
   Additional showcases: the 24 projects listed on https://portfolio.bytesplatform.com/
   (names, scope, copy, figures and links are reproduced from that page; images are
   stored locally in /public/images/portfolio/projects). Added after the original
   showcases in data.ts. Edit or remove entries here at any time.
   ───────────────────────────────────────────────────────────────────────────── */

export const importedProjects: Project[] = [
  {
    "id": "quantiva-hq",
    "sector": "FinTech",
    "sectorRest": " · Trading platform",
    "name": "Quantiva HQ",
    "headline": "One trading terminal for crypto and equities.",
    "brief": "Links a trader's own exchange and brokerage accounts by API, scores live market signals and places the order from the same screen. Designed and engineered from onboarding to billing.",
    "meta": [
      {
        "label": "Client",
        "value": "Quantiva Nexus LLC"
      },
      {
        "label": "Scope",
        "value": "Product strategy · UI / UX · Mobile & web engineering"
      }
    ],
    "accessNote": "",
    "summary": "Quantiva HQ links a trader's own exchange and brokerage accounts by API, never takes custody, scores live market signals and places the order from the screen it appeared on. We designed and engineered the product from onboarding to billing, and it shipped complete: KYC, risk controls, VC Pools, an on-chain rewards token on Base and a nine-SKU subscription system all live in version 1.0.",
    "built": [
      "66 mobile screens across 39 flows, resolved into four persistent surfaces: Trades, AI Insights, VC Pool and Profile.",
      "One connection flow for Binance, Bybit, KuCoin, Bitget, Interactive Brokers, Alpaca and Robinhood, with a Crypto / Stocks switch that swaps the data model while the interface stays identical.",
      "A resumable four-step KYC pipeline on SumSub, session-level security, and four entitlement tiers enforced per feature inside the product."
    ],
    "tags": [
      "Product strategy",
      "UI / UX",
      "Mobile & web engineering",
      "API integrations",
      "KYC & billing"
    ],
    "disclosure": "Quantiva HQ is a recent release. Download volume, ratings, revenue, signal accuracy and strategy returns are deliberately not claimed.",
    "accent": "#F9B918",
    "accentSoft": "#FCD34D",
    "dark": "#0c0b08",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/quantiva-01-desktop.webp",
        "width": 2000,
        "height": 1250,
        "alt": "Quantiva HQ web landing experience with AI-powered insights headline",
        "label": "Web experience",
        "caption": "Landing · AI-powered trading across crypto and stocks"
      },
      "feature": {
        "src": "/images/portfolio/projects/quantiva-03-feature.webp",
        "width": 1400,
        "height": 1050,
        "alt": "Quantiva HQ feature screens: exchange connections, live market intelligence, recommendations and order execution",
        "label": "Feature detail",
        "caption": "Exchange connections · signals · order ticket"
      },
      "secondary": {
        "src": "/images/portfolio/projects/quantiva-04-secondary.webp",
        "width": 1300,
        "height": 731,
        "alt": "Quantiva HQ app live on iOS and Android announcement",
        "label": "Proof",
        "caption": "Live on the App Store and Google Play"
      },
      "mobile": {
        "src": "/images/portfolio/projects/quantiva-02-app.webp",
        "width": 1400,
        "height": 826,
        "alt": "Quantiva HQ app screens: open trade ideas, portfolio dashboard with holdings and market, and the buy / sell order ticket",
        "label": "App experience",
        "caption": "Trades · dashboard · order ticket"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "66",
        "label": "Mobile screens across 39 flows"
      },
      {
        "value": "8",
        "label": "Market connectivity sources"
      },
      {
        "value": "9",
        "label": "Subscription SKUs live on the stores"
      },
      {
        "value": "2",
        "label": "App stores approved at launch"
      }
    ],
    "metricsSource": "Public store listings and the running application · figures read 15–16 September 2026",
    "builtTitle": "What we built",
    "liveUrl": "https://www.quantivahq.com/",
    "access": {
      "label": "Platforms",
      "note": "Live trading platform on iOS and Android (v1.0.1), alongside its web experience at quantivahq.com.",
      "links": [
        {
          "href": "https://apps.apple.com/us/app/quantiva-hq/id6762023500",
          "label": "View on iOS",
          "strong": true
        },
        {
          "href": "https://play.google.com/store/apps/details?id=com.quantivahq",
          "label": "View on Android",
          "strong": true
        },
        {
          "href": "https://www.quantivahq.com/",
          "label": "View Website",
          "strong": false
        }
      ]
    }
  },
  {
    "id": "intellimaint-ai",
    "sector": "AI product",
    "sectorRest": " · Industrial & defence maintenance",
    "name": "IntelliMaint AI",
    "headline": "Turn a shelf of equipment manuals into field-ready answers.",
    "brief": "A virtual mechanic: technicians photograph, speak or type the problem and get repair guidance retrieved from that equipment's own documentation.",
    "meta": [
      {
        "label": "Client",
        "value": "IntelliMaint AI"
      },
      {
        "label": "Scope",
        "value": "AI product build · Product design · RAG retrieval"
      }
    ],
    "accessNote": "",
    "summary": "IntelliMaint AI is a virtual mechanic. A technician photographs a failing unit, asks a question out loud or types the symptom, and gets repair guidance retrieved from that equipment's own documentation rather than improvised from general knowledge. We designed and built the product, from the interface to the retrieval workflow behind it.",
    "built": [
      "Retrieval first, generation second: documents are chunked, embedded and indexed on upload; the LLM is the fallback, not the source of truth.",
      "Input parity for gloved hands: typing, speaking and photographing are equivalent ways to ask, on a dark, high-contrast interface built for a plant room at night.",
      "Identity decides what the assistant can read: civilian, military (.mil verified, isolated knowledge base) and student accounts, across four plan tiers from free to enterprise."
    ],
    "tags": [
      "AI product build",
      "Product design",
      "RAG retrieval",
      "Voice & vision"
    ],
    "disclosure": "A capability engagement at the pre-measurement stage. No user counts, revenue, diagnostic accuracy or repair-time figures are claimed.",
    "accent": "#FACC15",
    "accentSoft": "#FDE047",
    "dark": "#0a0a0a",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/intellimaint-01-desktop.webp",
        "width": 2000,
        "height": 1250,
        "alt": "IntelliMaint AI web landing page: your troubleshooting assistant",
        "label": "Web experience",
        "caption": "Landing · ask, don't search"
      },
      "feature": {
        "src": "/images/portfolio/projects/intellimaint-03-feature.webp",
        "width": 1260,
        "height": 945,
        "alt": "IntelliMaint AI core capabilities: document analysis, manual library, visual diagnostics and hands-free support",
        "label": "Feature detail",
        "caption": "Four capabilities · documents, manuals, vision, voice"
      },
      "secondary": {
        "src": "/images/portfolio/projects/intellimaint-04-secondary.webp",
        "width": 1300,
        "height": 812,
        "alt": "IntelliMaint AI pricing: free, pro, military and enterprise plans",
        "label": "Proof",
        "caption": "Four tiers priced against three distinct buyers"
      },
      "mobile": {
        "src": "/images/portfolio/projects/intellimaint-02-app.webp",
        "width": 1448,
        "height": 1086,
        "alt": "IntelliMaint AI app screens: recent history of equipment photos, the Resolve. Repair. Reinforce. welcome screen, and document upload",
        "label": "App experience",
        "caption": "History · welcome · document upload"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": true,
      "edgeTrace": true,
      "pan": 8.0,
      "zoom": 1.025
    },
    "metrics": [
      {
        "value": "4",
        "label": "Capability pillars: documents, manual library, vision, voice"
      },
      {
        "value": "3",
        "label": "Identity types with separate knowledge boundaries"
      },
      {
        "value": "4",
        "label": "Plan tiers, free to enterprise"
      },
      {
        "value": "9",
        "label": "Screens built, sign-up to password reset"
      }
    ],
    "metricsSource": "Product review, September 2026 · built on Next.js and hosted on Render",
    "builtTitle": "What we built",
    "liveUrl": "https://intellimaint-ai.onrender.com/",
    "access": {
      "label": "Platforms",
      "note": "Responsive AI maintenance app: diagnose by text, voice or photo, grounded in the equipment's own documentation.",
      "links": [
        {
          "href": "https://intellimaint-ai.onrender.com/",
          "label": "View Website",
          "strong": false
        }
      ]
    }
  },
  {
    "id": "aegis-creek",
    "sector": "B2B",
    "sectorRest": " · Government funding advisory",
    "name": "Aegis Creek",
    "headline": "Make deep expertise visible before the first sales call.",
    "brief": "A content engine, LinkedIn publishing rhythm and paid video campaign that put the firm's non-dilutive funding expertise in front of a quarter of a million professional feeds.",
    "meta": [
      {
        "label": "Client",
        "value": "Aegis Creek"
      },
      {
        "label": "Scope",
        "value": "Brand positioning · LinkedIn content strategy · Thought leadership"
      }
    ],
    "accessNote": "",
    "summary": "Aegis Creek helps deep-tech companies raise non-dilutive government capital, and almost none of that expertise was visible to the founders who needed it. We built a repeatable content engine, a LinkedIn publishing rhythm and a paid video campaign that put the firm's core argument in front of a quarter of a million professional feeds.",
    "built": [
      "Positioning on the outcome, not the paperwork: non-dilutive capital, named sectors in the H1, practitioners first.",
      "Nine Insights articles on live federal funding vehicles (DARPA, BARDA, DCSA, Army Corps of Engineers, Navy T&E, NIH SBIR/STTR), each published to the feed and republished on the firm's own domain as owned, indexable pages for long-term search visibility.",
      "Three escalating video creatives built on one argument, carried by a LinkedIn video-views campaign targeted by role, seniority and industry."
    ],
    "tags": [
      "Brand positioning",
      "LinkedIn content strategy",
      "Thought leadership",
      "LinkedIn video ads"
    ],
    "disclosure": "No leads, revenue, pipeline or ROI are claimed; conversion tracking was not in place during the period.",
    "accent": "#F5A80F",
    "accentSoft": "#FBD066",
    "dark": "#100d07",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/aegis-01-desktop.webp",
        "width": 2000,
        "height": 1250,
        "alt": "Aegis Creek website positioning: raising government funds for AI, cleantech and semi",
        "label": "Positioning",
        "caption": "Named sectors in the H1 · non-dilutive capital"
      },
      "feature": {
        "src": "/images/portfolio/projects/aegis-03-feature.webp",
        "width": 1400,
        "height": 1050,
        "alt": "Aegis Creek strategic expertise and non-dilutive capital service areas",
        "label": "Feature detail",
        "caption": "Expertise made explicit · grant strategy to contract pursuit"
      },
      "secondary": {
        "src": "/images/portfolio/projects/aegis-04-secondary.webp",
        "width": 1440,
        "height": 812,
        "alt": "Aegis Creek Insights library of federal funding articles",
        "label": "Proof",
        "caption": "Owned Insights library · nine indexable articles"
      },
      "mobile": {
        "src": "/images/portfolio/projects/aegis-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Aegis Creek mobile screens: positioning and contact with Calendly booking",
        "label": "Mobile experience",
        "caption": "Conversion path · form and Calendly"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "261,101",
        "label": "Paid impressions delivered"
      },
      {
        "value": "249,266",
        "label": "Video views recorded"
      },
      {
        "value": "22.62s",
        "label": "Average dwell time"
      },
      {
        "value": "$269.21",
        "label": "Total campaign spend"
      }
    ],
    "metricsSource": "LinkedIn Campaign Manager export · 20 August – 18 September 2026",
    "builtTitle": "What we built",
    "liveUrl": "https://aegiscreek.com/",
    "wash": "strong",
    "metaLink": "https://aegiscreek.com/"
  },
  {
    "id": "team-smith-logistics",
    "sector": "Logistics",
    "sectorRest": " · Website + local SEO",
    "name": "Team Smith Logistics",
    "headline": "Turn specialised logistics services into search demand.",
    "brief": "A seven-page site built around how buyers actually search, with the client's own fleet in every photograph, reached page one of Google in its first quarter.",
    "meta": [
      {
        "label": "Client",
        "value": "Team Smith Logistics LLC"
      },
      {
        "label": "Scope",
        "value": "Website design · Development · Local SEO architecture"
      }
    ],
    "accessNote": "",
    "summary": "A twenty-year Southern California transport company ran mobile EV charging, EV fire response, container hauling and dealership fleet moves that most towing operators can't match, and none of it was visible online. A seven-page site built around how buyers actually search, with the client's own fleet in every photograph, reached page one in its first quarter.",
    "built": [
      "Service-page architecture: seven pages with one job each and ten titled service blocks, each opening on the customer's situation and each its own search entry point, with a Call Now action in every header, hero and footer.",
      "Positioned as transport and logistics while keeping the head terms, then widened to specialist terms no competitor targets: mobile EV charging, shipping container transport, container hauling.",
      "Local SEO and search-driven content: a seven-question FAQ written for answer engines, a six-post blog cluster, and Los Angeles, Riverside County and San Bernardino named in body copy, Areas We Serve and every footer."
    ],
    "tags": [
      "Website design",
      "Development",
      "Local SEO architecture",
      "Content strategy",
      "UX & information architecture"
    ],
    "disclosure": "",
    "accent": "#FCD34D",
    "accentSoft": "#FEE9A0",
    "dark": "#0b0a06",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/team-smith-01-desktop.webp",
        "width": 2000,
        "height": 1250,
        "alt": "Team Smith Logistics homepage: mobile EV charging, wherever you need it",
        "label": "Web experience",
        "caption": "Homepage · the client's own fleet, no stock imagery"
      },
      "feature": {
        "src": "/images/portfolio/projects/team-smith-03-feature.webp",
        "width": 1400,
        "height": 1050,
        "alt": "Team Smith Logistics services: dealership transport, emergency towing, mobile EV charging, EV fire cleanup",
        "label": "Feature detail",
        "caption": "Ten services, ten separate answers"
      },
      "secondary": {
        "src": "/images/portfolio/projects/team-smith-04-secondary.webp",
        "width": 1300,
        "height": 1040,
        "alt": "Team Smith Logistics gallery of real fleet work across Southern California",
        "label": "Proof",
        "caption": "Gallery · real jobs, real trucks"
      },
      "mobile": {
        "src": "/images/portfolio/projects/team-smith-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Team Smith Logistics mobile screens: dealership transport and fleet gallery",
        "label": "Mobile experience",
        "caption": "Mobile-first · a phone call from every screen"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "8.9",
        "label": "Average Google position across tracked queries"
      },
      {
        "value": "+70%",
        "label": "Indexed pages, 30 → 51 in one quarter"
      },
      {
        "value": "1,810",
        "label": "Search impressions in seven days (≈7,800/month)"
      },
      {
        "value": "148ms",
        "label": "Average server response, 98% of crawl requests OK"
      }
    ],
    "metricsSource": "Google Search Console · 1 January – 26 March 2026, first quarter after launch",
    "builtTitle": "What we built",
    "liveUrl": "https://teamsmithlogistics.com/",
    "metaLink": "https://teamsmithlogistics.com/"
  },
  {
    "id": "the-benavente-group",
    "sector": "Commercial real estate appraisal",
    "sectorRest": " · Search authority",
    "name": "The Benavente Group",
    "headline": "Turn valuation expertise into a search-driven authority platform.",
    "brief": "A five-page platform and definition-led content engine that ranks MAI- and SRA-designated appraisers for the technical terms their buyers search.",
    "meta": [
      {
        "label": "Client",
        "value": "The Benavente Group LLC"
      },
      {
        "label": "Scope",
        "value": "Website design · Development · SEO architecture"
      }
    ],
    "accessNote": "",
    "summary": "Honolulu-based MAI- and SRA-designated appraisers with defensible valuations across six Pacific regions since 2017, known only to the attorneys and lenders who already used them. A five-page platform and a definition-led content engine now rank the firm for the technical vocabulary its buyers actually search.",
    "built": [
      "Five pages, each carrying one burden of proof: can they do this work, are they credible, have they done it before, do they understand my problem, how do I reach them discreetly.",
      "MAI and SRA credentials in the hero and beside every name; a portfolio of eleven filterable asset classes in the firm's own photography; coverage named jurisdiction by jurisdiction, which also carries the search signal into body copy.",
      "Search-driven content, not a blog: every article follows “What is [technical term]? A guide for Hawai‘i [professional audience]”, answering the valuation terms buyers search mid-problem, with weekly Search Console reporting on performance and indexing."
    ],
    "tags": [
      "Website design",
      "Development",
      "SEO architecture",
      "Content strategy",
      "UX strategy",
      "Weekly search reporting"
    ],
    "disclosure": "",
    "accent": "#F9B918",
    "accentSoft": "#FCD34D",
    "dark": "#0c0b08",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/benavente-01-desktop.webp",
        "width": 2000,
        "height": 1250,
        "alt": "The Benavente Group homepage: real estate valuation and consultancy over Honolulu",
        "label": "Web experience",
        "caption": "Homepage · credentials before sales language"
      },
      "feature": {
        "src": "/images/portfolio/projects/benavente-03-feature.webp",
        "width": 1240,
        "height": 930,
        "alt": "The Benavente Group portfolio filtered by asset class with the firm's own photography",
        "label": "Feature detail",
        "caption": "Eleven filterable asset classes · the firm's own archive"
      },
      "secondary": {
        "src": "/images/portfolio/projects/benavente-04-secondary.webp",
        "width": 1360,
        "height": 735,
        "alt": "The Benavente Group: a trusted name in Pacific real estate",
        "label": "Proof",
        "caption": "Pacific coverage, named jurisdiction by jurisdiction"
      },
      "mobile": {
        "src": "/images/portfolio/projects/benavente-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "The Benavente Group mobile screens: homepage and selected projects",
        "label": "Mobile experience",
        "caption": "Responsive · portfolio by asset class"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 10.0,
      "zoom": 1.04
    },
    "metrics": [
      {
        "value": "9.92K",
        "label": "Search impressions in 60+ days"
      },
      {
        "value": "61",
        "label": "Pages indexed, up from 54"
      },
      {
        "value": "9 of 14",
        "label": "Ranking queries are educational valuation terms"
      },
      {
        "value": "5 of 10",
        "label": "Highest-click pages are blog articles"
      }
    ],
    "metricsSource": "Google Search Console · 60+ days to 10 September 2026",
    "builtTitle": "What we built",
    "liveUrl": "https://benaventegroup.com/",
    "metaLink": "https://benaventegroup.com/"
  },
  {
    "id": "cascadia-health",
    "sector": "Healthcare staffing",
    "sectorRest": " · Workforce & care",
    "name": "Cascadia Health",
    "headline": "One domain, three sides of care, each with its own way in.",
    "brief": "A healthcare staffing site that sorts facilities, clinicians and families in the first screen, each with its own pathway and its own seven-step intake.",
    "meta": [
      {
        "label": "Client",
        "value": "Cascadia Health LLC"
      },
      {
        "label": "Scope",
        "value": "Strategy · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "Cascadia Health is a human-led healthcare staffing company and care-support partner. A hospital coordinator with an unfilled shift, a clinician deciding where to register and a family arranging care at home all arrive at the same domain. We built the architecture that gives each of them a route of their own without fracturing a single brand.",
    "built": [
      "Segmentation first: the homepage opens on three doors, Request Staff, Join the Talent Team and Request Family Support, with healthcare advisory reached from navigation and footer.",
      "Six services arranged as one ladder, from immediate per-diem cover to workforce partnership: start with one shift, stay for the partnership.",
      "Three seven-step intakes sharing one pattern, each opening with the lightest possible ask, and eleven clinical disciplines named on both sides of the market."
    ],
    "tags": [
      "Strategy",
      "UX / UI",
      "Web",
      "Service architecture"
    ],
    "disclosure": "No performance metrics were supplied for this engagement. No staffing volumes, placements, fill rates, response times, revenue or conversion figures are claimed.",
    "accent": "#FACC15",
    "accentSoft": "#FDE047",
    "dark": "#0a0a0a",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/cascadia-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "Cascadia Health homepage: the right care team, right when it matters, with Request Staff, Join the Talent Team and Find Care for a Loved One",
        "label": "Web experience",
        "caption": "Homepage · three audiences declared in the first screen"
      },
      "feature": {
        "src": "/images/portfolio/projects/cascadia-03-feature.webp",
        "width": 1440,
        "height": 814,
        "alt": "Cascadia Health facility staffing request, step 1 of 7: facility and coordinator details",
        "label": "Feature detail",
        "caption": "Facility staffing request · step 1 of 7"
      },
      "secondary": {
        "src": "/images/portfolio/projects/cascadia-04-secondary.webp",
        "width": 2000,
        "height": 956,
        "alt": "Cascadia Health pages for families and for healthcare professionals",
        "label": "Audience pathways",
        "caption": "Families and professionals · each with its own page"
      },
      "mobile": {
        "src": "/images/portfolio/projects/cascadia-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Cascadia Health mobile screens: the homepage and the facility staffing request",
        "label": "Mobile experience",
        "caption": "Responsive · homepage and staffing request"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "4",
        "label": "Distinct pathways, each with its own named action"
      },
      {
        "value": "3",
        "label": "Seven-step intakes, one per audience"
      },
      {
        "value": "11",
        "label": "Clinical disciplines named on both sides of the market"
      },
      {
        "value": "19",
        "label": "Facility types routed in the staffing request"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://cascadiahealthllc.com/",
    "metaLink": "https://cascadiahealthllc.com/"
  },
  {
    "id": "goldway-capital",
    "sector": "Senior financial services",
    "sectorRest": " · Georgia",
    "name": "Goldway Capital",
    "headline": "A regulated conversation, made easy to follow.",
    "brief": "One brand, four regulated services: separate pathways, forms and per-page disclosures, with entry by the visitor's situation rather than by product.",
    "meta": [
      {
        "label": "Client",
        "value": "Goldway Capital LLC"
      },
      {
        "label": "Scope",
        "value": "Strategy · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "Goldway Capital is a Georgia senior solutions company working across Medicare, final expense, probate property and investment lending: four regulatory regimes aimed at the same family. We built one brand with separated pathways, forms and disclosures, so the site stays truthful at every step and is still easy for a 64-year-old reading it with their daughter to know what to do next.",
    "built": [
      "Entry by situation, not by product: the home page opens on Where You Are Today, with four questions such as Turning 65? and Need Flexible Financing?",
      "Five audience-specific forms, each asking only what is needed to prepare a conversation and telling the visitor what not to send.",
      "A disclosure written per page, three licences published where a sceptical adult child will find them, and 28 plain-language articles before any request for a phone number."
    ],
    "tags": [
      "Strategy",
      "UX / UI",
      "Web",
      "Content"
    ],
    "disclosure": "No performance data was supplied. No clients, consultations, enrolments, policies, loans, traffic or rankings are claimed, and nothing here is financial, insurance or legal advice.",
    "accent": "#F5A80F",
    "accentSoft": "#FBD066",
    "dark": "#100d07",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/goldway-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "Goldway Capital homepage: helping seniors navigate important life decisions, with Medicare and senior solutions consultation buttons",
        "label": "Web experience",
        "caption": "Homepage · senior solutions in Georgia"
      },
      "feature": {
        "src": "/images/portfolio/projects/goldway-03-feature.webp",
        "width": 1700,
        "height": 1150,
        "alt": "Goldway Capital Medicare options page on desktop and mobile: Medicare Advantage, Part D, Medicare Supplement and Final Expense",
        "label": "Feature detail",
        "caption": "Medicare options · explained, never ranked"
      },
      "secondary": {
        "src": "/images/portfolio/projects/goldway-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "Goldway Capital Medicare consultation request form, asking visitors not to include medical or enrolment details",
        "label": "Request form",
        "caption": "Medicare request · says what not to send"
      },
      "mobile": {
        "src": "/images/portfolio/projects/goldway-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Goldway Capital homepage on mobile with two consultation buttons",
        "label": "Mobile experience",
        "caption": "Large type · two clear consultation paths"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "10",
        "label": "Pages published, none more than one level deep"
      },
      {
        "value": "5",
        "label": "Audience-specific request forms"
      },
      {
        "value": "28",
        "label": "Plain-language educational articles"
      },
      {
        "value": "3",
        "label": "Licences published, so a sceptic can check them"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://goldwaycapital.com/",
    "metaLink": "https://goldwaycapital.com/"
  },
  {
    "id": "trident-foundation-systems",
    "sector": "Foundation & structural engineering",
    "sectorRest": " · Brand experience",
    "name": "Trident Foundation Systems",
    "headline": "Connect the crack you can see to the engineering you can't.",
    "brief": "A single-page experience that teaches homeowners to read the damage they can see, then explains the below-grade engineering that answers it.",
    "meta": [
      {
        "label": "Client",
        "value": "Trident Foundation Systems"
      },
      {
        "label": "Scope",
        "value": "Brand experience · UX / UI · Development"
      }
    ],
    "accessNote": "",
    "summary": "Trident Foundation Systems sells work nobody will ever see, in a trade where every site looks the same. We built a single continuous experience organised around translation rather than persuasion: it starts with the symptom a homeowner already has, explains the condition below grade, and presents the systems that answer it as one engineered sequence.",
    "built": [
      "Four symptoms decoded in the visitor's own words, from stair-step cracking to floors that dip, bounce or cup, each translated into the condition it points to.",
      "Four systems named with verbs, Stabilize, Reinforce, Protect and Restore, and framed as one engineered sequence rather than a menu to choose from.",
      "Below-grade work shown with six numbered callouts, and a six-field evaluation form with Not sure as an issue type, so nobody has to self-diagnose to ask for help."
    ],
    "tags": [
      "Brand experience",
      "UX / UI",
      "Development",
      "Technical storytelling"
    ],
    "disclosure": "No enquiry, project-value, conversion or search figures were supplied and none are claimed. Credentials are the client's own statements.",
    "accent": "#FCD34D",
    "accentSoft": "#FEE9A0",
    "dark": "#0b0a06",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/trident-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "Trident Foundation Systems hero: what holds everything above, over a modern home",
        "label": "Web experience",
        "caption": "Hero · what holds everything above"
      },
      "feature": {
        "src": "/images/portfolio/projects/trident-03-feature.webp",
        "width": 1440,
        "height": 814,
        "alt": "Trident Foundation Systems Protect stage: drainage and membrane, one step of the engineered sequence",
        "label": "Feature detail",
        "caption": "Protect · one stage of an engineered sequence"
      },
      "secondary": {
        "src": "/images/portfolio/projects/trident-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "Trident Foundation Systems: the damage starts quietly, decoding stair-step cracking and movement in block",
        "label": "Symptoms decoded",
        "caption": "What you can see · four symptoms, translated"
      },
      "mobile": {
        "src": "/images/portfolio/projects/trident-02-mobile.webp",
        "width": 1300,
        "height": 1000,
        "alt": "Trident Foundation Systems mobile screens: helical piles below grade, and stair-step cracking explained",
        "label": "Mobile experience",
        "caption": "Responsive · symptom first, then the evaluation"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.035
    },
    "metrics": [
      {
        "value": "4",
        "label": "Symptoms decoded into the conditions they indicate"
      },
      {
        "value": "4",
        "label": "Systems presented as one engineered sequence"
      },
      {
        "value": "6",
        "label": "Numbered below-grade callouts over the real work"
      },
      {
        "value": "1",
        "label": "Continuous page, because the argument is cumulative"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://tridentxyz.netlify.app/",
    "metaLink": "https://tridentxyz.netlify.app/"
  },
  {
    "id": "gilbert-and-sons",
    "sector": "Roofing & stucco",
    "sectorRest": " · Website + local SEO",
    "name": "Gilbert & Sons",
    "headline": "Built for the moment someone finds water on their ceiling.",
    "brief": "Nine roofing service pages, thirteen Southern New Mexico markets named, and call, text or estimate one tap away on every screen.",
    "meta": [
      {
        "label": "Client",
        "value": "Gilbert & Sons Roofing and Stucco"
      },
      {
        "label": "Scope",
        "value": "UX / UI · Development · Local SEO architecture"
      }
    ],
    "accessNote": "",
    "summary": "Roofing is bought in a hurry, locally, by people who have never hired a roofer. Gilbert & Sons has worked in Las Cruces since 2010, and we built it a site structured around exactly that moment: a page for every roofing service, trust signals a homeowner can check, and call, text or estimate one tap away on every screen.",
    "built": [
      "Service-page architecture: nine roofing services at their own URLs, from repairs and emergency roofing to tile and silicone restoration, each written for a different search.",
      "Local SEO with the place in the title, not just the footer: a Las Cruces page written for the climate, and thirteen Southern New Mexico markets named.",
      "Call, text and estimate side by side at every decision point, a six-field estimate form, and sixteen question-led articles for the research stage."
    ],
    "tags": [
      "UX / UI",
      "Development",
      "Local SEO architecture",
      "Conversion strategy"
    ],
    "disclosure": "No performance data was supplied. No leads, calls, traffic, rankings, conversion rates or revenue are claimed; licensing and accreditation are the client's own statements.",
    "accent": "#F9B918",
    "accentSoft": "#FCD34D",
    "dark": "#0c0b08",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/gilbert-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "Gilbert & Sons homepage: roofing that stands up to the elements, with an estimate form beside the hero",
        "label": "Web experience",
        "caption": "Homepage · an estimate form in the first screen"
      },
      "feature": {
        "src": "/images/portfolio/projects/gilbert-03-feature.webp",
        "width": 1440,
        "height": 814,
        "alt": "Gilbert & Sons roofing services: installations, repairs, replacements and inspections",
        "label": "Feature detail",
        "caption": "Every roofing service · its own page"
      },
      "secondary": {
        "src": "/images/portfolio/projects/gilbert-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "Gilbert & Sons recent work: underlayment staged on site, ready to go up",
        "label": "Recent work",
        "caption": "Built in the field · materials staged on site"
      },
      "mobile": {
        "src": "/images/portfolio/projects/gilbert-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Gilbert & Sons mobile screens with Call Now and Estimate buttons fixed to every screen",
        "label": "Mobile experience",
        "caption": "Call or estimate · one tap on every screen"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "9",
        "label": "Roofing service pages, each at its own URL"
      },
      {
        "value": "13",
        "label": "Southern New Mexico markets named"
      },
      {
        "value": "16",
        "label": "Question-led articles for the research stage"
      },
      {
        "value": "3",
        "label": "Ways to make contact, side by side"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://gilbertandsonsroofingandstucco.com/",
    "metaLink": "https://gilbertandsonsroofingandstucco.com/"
  },
  {
    "id": "rob-does-it",
    "sector": "Entertainment",
    "sectorRest": " · Events & media",
    "name": "Rob Does It",
    "headline": "A website that moves the way the night does.",
    "brief": "Host, interviewer and professional crowd mover: a site that shows the energy before explaining it, with booking never more than one tap away.",
    "meta": [
      {
        "label": "Client",
        "value": "ROB DOES IT"
      },
      {
        "label": "Scope",
        "value": "Creative direction · UX / UI · Booking experience"
      }
    ],
    "accessNote": "",
    "summary": "Rob is a host, interviewer and professional crowd mover working events across Los Angeles and Hollywood. A conventional portfolio would have shown the footage and lost the reason anyone books him, so we built a site that behaves like the night: fast, loud, in motion, and never more than one tap from booking.",
    "built": [
      "Show the energy before explaining it: poster-scale type, real rooms above the fold, and copy written the way Rob talks, with Watch Rob and Book Rob open at once.",
      "A feed, not a gallery: 31 published clips tagged with their platform, and nine filters that turn one library into audience-specific showreels.",
      "Three access levels priced openly with counted deliverables, and a five-step availability check framed as a conversation, not paperwork."
    ],
    "tags": [
      "Creative direction",
      "UX / UI",
      "Booking experience",
      "Web",
      "Content"
    ],
    "disclosure": "No views, followers, bookings, enquiries, revenue or traffic are claimed. None were supplied.",
    "accent": "#FACC15",
    "accentSoft": "#FDE047",
    "dark": "#0a0a0a",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/rob-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "Rob Does It homepage: host, interviewer, professional crowd mover, Hollywood, let's get it",
        "label": "Web experience",
        "caption": "Homepage · Watch Rob and Book Rob, side by side"
      },
      "feature": {
        "src": "/images/portfolio/projects/rob-03-feature.webp",
        "width": 1440,
        "height": 814,
        "alt": "Rob Does It booking: check availability, step 1 of 5, choosing the event type",
        "label": "Feature detail",
        "caption": "Check availability · step 1 of 5"
      },
      "secondary": {
        "src": "/images/portfolio/projects/rob-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "Rob Does It top-viewed clips, each tagged with the platform it was published on",
        "label": "The library",
        "caption": "Top viewed · clips tagged by platform"
      },
      "mobile": {
        "src": "/images/portfolio/projects/rob-02-mobile.webp",
        "width": 1300,
        "height": 1000,
        "alt": "Rob Does It mobile screens: check availability and the homepage",
        "label": "Mobile experience",
        "caption": "Booking flow · five quick steps"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 10.0,
      "zoom": 1.04
    },
    "metrics": [
      {
        "value": "31",
        "label": "Clips published in the library"
      },
      {
        "value": "9",
        "label": "Filters on the watch page"
      },
      {
        "value": "3",
        "label": "Access levels, priced openly"
      },
      {
        "value": "5",
        "label": "Steps to check availability"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://itsrobdoesit.com/",
    "metaLink": "https://itsrobdoesit.com/"
  },
  {
    "id": "weisz-sports-management",
    "sector": "Professional sports",
    "sectorRest": " · Athlete representation",
    "name": "Weisz Sports Management",
    "headline": "A digital home for athletes, and the families behind them.",
    "brief": "An agency site written for two readers at once, athlete and parent: nine services on one screen, named people, and an introduction instead of an application.",
    "meta": [
      {
        "label": "Client",
        "value": "Weisz Sports Management"
      },
      {
        "label": "Scope",
        "value": "Digital strategy · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "Weisz Sports Management represents baseball players, amateur, drafted and professional, and the families standing behind them. The site is read by a nineteen-year-old and a parent at the same time, so it answers the scope question once and completely, puts real people with checkable histories in front of the reader early, and makes first contact feel like an introduction rather than an application.",
    "built": [
      "Nine services with one-line descriptions settle the scope question on one screen, from draft preparation and NIL to financial and family guidance.",
      "Three named leaders with titles and full histories, and a roster kept small on purpose, presented as the reason to sign.",
      "An FAQ on NCAA eligibility and agent certification, and a contact form that accepts a file, so the first message can carry video or a resume."
    ],
    "tags": [
      "Digital strategy",
      "UX / UI",
      "Web",
      "High-trust design"
    ],
    "disclosure": "No athletes, contract values, signings, client count, traffic or revenue are claimed. Experience and certification are the client's own statements.",
    "accent": "#F5A80F",
    "accentSoft": "#FBD066",
    "dark": "#100d07",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/weisz-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "Weisz Sports Management homepage: take your career to the next level",
        "label": "Web experience",
        "caption": "Homepage · representation, relationships, results"
      },
      "feature": {
        "src": "/images/portfolio/projects/weisz-04-secondary.webp",
        "width": 1700,
        "height": 1150,
        "alt": "Weisz Sports Management full-service agency page on desktop and mobile, listing draft preparation and contract negotiation",
        "label": "Feature detail",
        "caption": "Full-service agency · every stage of a career"
      },
      "secondary": {
        "src": "/images/portfolio/projects/weisz-03-feature.webp",
        "width": 1440,
        "height": 814,
        "alt": "Weisz Sports Management account login page",
        "label": "Account access",
        "caption": "Login · access your Weisz Sports account"
      },
      "mobile": {
        "src": "/images/portfolio/projects/weisz-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Weisz Sports Management homepage on mobile",
        "label": "Mobile experience",
        "caption": "Responsive · the same promise on a phone"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": true,
      "pan": 7.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "9",
        "label": "Services published, each with a one-line description"
      },
      {
        "value": "3",
        "label": "People named on the team page, with full biographies"
      },
      {
        "value": "2",
        "label": "FAQ answers, on NCAA eligibility and agent certification"
      },
      {
        "value": "5",
        "label": "Destinations in the navigation, no maze"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://weiszsports.com/",
    "metaLink": "https://weiszsports.com/"
  },
  {
    "id": "sqush-llc",
    "sector": "Courier & concierge",
    "sectorRest": " · Las Vegas",
    "name": "SQUSH LLC",
    "headline": "Turning local courier requests into jobs ready to run.",
    "brief": "Four service pathways and a three-step request flow that captures route, contents and deadline before a person reads the request.",
    "meta": [
      {
        "label": "Client",
        "value": "SQUSH LLC"
      },
      {
        "label": "Scope",
        "value": "Strategy · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "SQUSH LLC runs local courier, transportation and concierge services across Las Vegas and North Las Vegas. A delivery business loses money on requests that arrive incomplete, so we separated the demands before designing the inputs: four pathways, a three-step request flow and forms that capture route, contents and deadline before a person reads them.",
    "built": [
      "Four kinds of demand, four separate doors: courier, concierge, priority and federal, each with its own form, so the click itself is routing information.",
      "Every field is an operational question: both locations and a needed-by date required, item type as a short list, and an optional Your Offer field.",
      "Two cities stated on every page, and a federal inquiry route kept entirely out of the delivery queue."
    ],
    "tags": [
      "Strategy",
      "UX / UI",
      "Web",
      "Workflow design"
    ],
    "disclosure": "No deliveries, response times, pricing, contracts, clients or metrics are claimed. None were supplied.",
    "accent": "#FCD34D",
    "accentSoft": "#FEE9A0",
    "dark": "#0b0a06",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/sqush-01-desktop-hero.webp",
        "width": 1440,
        "height": 814,
        "alt": "SQUSH LLC homepage: local courier and concierge services in Las Vegas and North Las Vegas",
        "label": "Web experience",
        "caption": "Homepage · two cities, stated up front"
      },
      "feature": {
        "src": "/images/portfolio/projects/sqush-03-feature.webp",
        "width": 1700,
        "height": 1056,
        "alt": "SQUSH LLC request status page on desktop and mobile, showing each stage of a delivery",
        "label": "Feature detail",
        "caption": "Status page · each stage of a request"
      },
      "secondary": {
        "src": "/images/portfolio/projects/sqush-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "SQUSH LLC request flow, step 1 of 3: courier, concierge or federal contracts",
        "label": "Request flow",
        "caption": "Step 1 of 3 · choose the service"
      },
      "mobile": {
        "src": "/images/portfolio/projects/sqush-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "SQUSH LLC homepage on mobile with Request a Service and call buttons",
        "label": "Mobile experience",
        "caption": "Request or call · from the first screen"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.05
    },
    "metrics": [
      {
        "value": "4",
        "label": "Service pathways, each with its own door"
      },
      {
        "value": "3",
        "label": "Steps to send a request, about a minute"
      },
      {
        "value": "12",
        "label": "Fields on the priority form, 8 of them required"
      },
      {
        "value": "2",
        "label": "Cities in the service area, stated everywhere"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts from the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://squshllc.com/",
    "metaLink": "https://squshllc.com/"
  },
  {
    "id": "amins-consult",
    "sector": "Software engineering consulting",
    "sectorRest": " · Federal, healthcare & finance",
    "name": "Amins Consult",
    "headline": "Deep engineering expertise, organised so a buyer can check it.",
    "brief": "A consulting site read by federal, healthcare and fintech buyers, organised by industry, with named standards a technical evaluator can check.",
    "meta": [
      {
        "label": "Client",
        "value": "Amins Consult"
      },
      {
        "label": "Scope",
        "value": "Digital strategy · UX / UI · Web development"
      }
    ],
    "accessNote": "",
    "summary": "Amins Consult is a Scranton, Pennsylvania software engineering consultancy working across federal, healthcare and finance. Its buyers read for one thing: has this firm worked in my regulatory environment, and can I verify it? We built a site that answers with specifics rather than adjectives, organised by industry, then discipline, then proof.",
    "built": [
      "Service cards ordered by sector first, each pairing a regulated context with the standard or platform a buyer already searches for, such as FedRAMP, FHIR and ISO 20022.",
      "Security on the first screen and repeated wherever a buyer looks, with AI presented as one engineering discipline among six pillars, not the headline.",
      "A seven-category technology stack a technical evaluator can check, and one labelled door at the end: Partner With Us."
    ],
    "tags": [
      "Digital strategy",
      "UX / UI",
      "Web development"
    ],
    "disclosure": "No performance data was supplied. No clients, contracts, certifications, revenue, traffic, rankings or conversion rates are claimed.",
    "accent": "#F9B918",
    "accentSoft": "#FCD34D",
    "dark": "#0c0b08",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/amins-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Amins Consult homepage: innovative software solutions, with Explore Services and Contact Us",
        "label": "Web experience",
        "caption": "Homepage · engineering for regulated industries"
      },
      "feature": {
        "src": "/images/portfolio/projects/amins-03-feature.webp",
        "width": 2000,
        "height": 771,
        "alt": "Amins Consult specialized services for federal, healthcare and fintech, beside the three-phase acceleration model",
        "label": "Feature detail",
        "caption": "Services by sector · a three-phase delivery model"
      },
      "secondary": {
        "src": "/images/portfolio/projects/amins-04-secondary.webp",
        "width": 1520,
        "height": 978,
        "alt": "Amins Consult careers page: join our mission",
        "label": "Careers",
        "caption": "Join our mission · open leadership roles"
      },
      "mobile": {
        "src": "/images/portfolio/projects/amins-02-mobile.webp",
        "width": 1700,
        "height": 1100,
        "alt": "Amins Consult mobile screens: homepage, specialized services and the acceleration model",
        "label": "Mobile experience",
        "caption": "Responsive · services and delivery model"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": true,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "6",
        "label": "Service pillars named on the site"
      },
      {
        "value": "3",
        "label": "Regulated industries, each with its own section"
      },
      {
        "value": "7",
        "label": "Technology stack categories published"
      },
      {
        "value": "1",
        "label": "Route to make contact, labelled for the buyer"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://aminsconsult.com/",
    "metaLink": "https://aminsconsult.com/"
  },
  {
    "id": "dawg-team-apparel-usa",
    "sector": "Local pet care",
    "sectorRest": " · Grooming & boarding",
    "name": "Dawg Team Apparel USA",
    "headline": "Four kinds of pet care, one place to book.",
    "brief": "Boarding, mobile grooming, in-store grooming and a self-serve wash, each with its own page, its price published and booking one tap away.",
    "meta": [
      {
        "label": "Client",
        "value": "DAWG Team USA"
      },
      {
        "label": "Scope",
        "value": "Digital strategy · UX / UI · Web development"
      }
    ],
    "accessNote": "",
    "summary": "DAWG Team USA is a Memphis pet-care business in the Crosstown neighbourhood offering boarding, mobile grooming, in-store grooming and a self-serve dog wash. An owner arrives needing one of those, usually on a phone, so the site gives each service its own page, puts the price on the page and the rules before the booking button.",
    "built": [
      "Four services, four pages: the home page's cards are headed with questions, so an owner self-selects in a scroll and lands on the one service that is theirs.",
      "The price is on the page: grooming priced by weight, every add-on priced, boarding by weight and the wash a flat rate, before anyone reaches the booking system.",
      "Rules before the booking button, from vaccinations to drop-off windows, and a book online or call choice at the end of every service page."
    ],
    "tags": [
      "Digital strategy",
      "UX / UI",
      "Web development"
    ],
    "disclosure": "No performance data was supplied. No bookings, customers, reviews, ratings, revenue, traffic or rankings are claimed.",
    "accent": "#FACC15",
    "accentSoft": "#FDE047",
    "dark": "#0a0a0a",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/dawgteam-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Dawg Team homepage: Memphis dog grooming, mobile grooming and boarding, all in one DAWG Team",
        "label": "Web experience",
        "caption": "Homepage · four services, one local place"
      },
      "feature": {
        "src": "/images/portfolio/projects/dawgteam-03-feature.webp",
        "width": 1520,
        "height": 876,
        "alt": "Dawg Team reserve boarding in three simple steps: check availability, complete the requirements, drop off with confidence",
        "label": "Feature detail",
        "caption": "Three steps · requirements before the booking"
      },
      "secondary": {
        "src": "/images/portfolio/projects/dawgteam-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "Dawg Team dependable dog boarding in Memphis, with Check Boarding Availability and Call DAWG Team",
        "label": "Service page",
        "caption": "Boarding · check availability or call"
      },
      "mobile": {
        "src": "/images/portfolio/projects/dawgteam-02-mobile.webp",
        "width": 1700,
        "height": 1150,
        "alt": "Dawg Team boarding page and its three-step reservation section",
        "label": "Boarding",
        "caption": "Boarding · dependable care, three steps to book"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "4",
        "label": "Services, each with a page of its own"
      },
      {
        "value": "6",
        "label": "Boarding rates published, by weight"
      },
      {
        "value": "6",
        "label": "Questions answered in the FAQ"
      },
      {
        "value": "2",
        "label": "Ways to book: online and by phone"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://www.dawgteamapparelusa.com/",
    "metaLink": "https://www.dawgteamapparelusa.com/"
  },
  {
    "id": "em-painting-tx",
    "sector": "Residential & commercial painting",
    "sectorRest": " · Greater Houston",
    "name": "EM Painting TX",
    "headline": "A broad painting operation, turned into a local search platform.",
    "brief": "Five service pages, seven city pages and eighteen named service areas, so a Houston-area buyer finds their job, their city and the work.",
    "meta": [
      {
        "label": "Client",
        "value": "E&M Commercial and Residential Painting"
      },
      {
        "label": "Scope",
        "value": "Strategy · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "E&M Commercial and Residential Painting is a Houston-area contractor serving homeowners and property managers. Before either picks up the phone they ask three things: do you do my kind of job, do you come to my city, and can I see your work. We gave each question a page: one per kind of job, one per city, and a gallery of the work itself.",
    "built": [
      "A page for each kind of job, each with a city in the title and the job in the heading, with exterior prep described in six steps before colour.",
      "Local SEO architecture: city pages written for the place, such as Katy's climate, linking to service pages for that city, and eighteen service areas in every footer.",
      "Two buyers, two burdens of proof: workmanship for the homeowner, named property types for the property manager, and a quote form that asks project type and budget."
    ],
    "tags": [
      "Strategy",
      "UX / UI",
      "Web",
      "Local SEO architecture"
    ],
    "disclosure": "No performance data was supplied. No rankings, project counts, lead volumes or revenue are claimed; experience and accreditation statements are the client's own.",
    "accent": "#F5A80F",
    "accentSoft": "#FBD066",
    "dark": "#100d07",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/empainting-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "EM Painting homepage: providing affordable painting services",
        "label": "Web experience",
        "caption": "Homepage · residential and commercial painting"
      },
      "feature": {
        "src": "/images/portfolio/projects/empainting-03-feature.webp",
        "width": 1700,
        "height": 1148,
        "alt": "EM Painting quote form on desktop and mobile, asking contact details, how they heard and project type",
        "label": "Feature detail",
        "caption": "Quote form · project type before the callback"
      },
      "secondary": {
        "src": "/images/portfolio/projects/empainting-04-secondary.webp",
        "width": 1520,
        "height": 978,
        "alt": "EM Painting work gallery: residential, interior and commercial painting",
        "label": "Gallery",
        "caption": "The work · residential, interior, commercial"
      },
      "mobile": {
        "src": "/images/portfolio/projects/empainting-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "EM Painting mobile screens: the homepage and residential and interior painting services",
        "label": "Mobile experience",
        "caption": "Responsive · a free quote from every screen"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 10.0,
      "zoom": 1.04
    },
    "metrics": [
      {
        "value": "5",
        "label": "Service pages, one per kind of job"
      },
      {
        "value": "7",
        "label": "Cities with a page of their own"
      },
      {
        "value": "18",
        "label": "Service areas named in every footer"
      },
      {
        "value": "4",
        "label": "Ways to ask for a quote"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://empaintingtx.com/",
    "metaLink": "https://empaintingtx.com/"
  },
  {
    "id": "royalty-with-a-purpose",
    "sector": "Cleaning & contract staffing",
    "sectorRest": " · Navarre, FL",
    "name": "Royalty With A Purpose LLC",
    "headline": "One front door for three kinds of visitor.",
    "brief": "A cleaning and staffing site whose first screen routes homeowners, businesses needing staff and job-seekers onto three separate paths.",
    "meta": [
      {
        "label": "Client",
        "value": "Royalty With a Purpose LLC"
      },
      {
        "label": "Scope",
        "value": "Digital strategy · UX / UI · Web development"
      }
    ],
    "accessNote": "",
    "summary": "Royalty With a Purpose is a Navarre, Florida cleaning company that also places contract workers with hospitality, retail and facilities businesses along the Emerald Coast. A homeowner wants to book, a hotel manager wants staff and a job-seeker wants to apply, so the first screen routes each down a path that never crosses the others again.",
    "built": [
      "Three buttons in the first screen: Book Now in the header, Request Staff and Apply for Work in the hero, so each visitor's first click resolves who the site is for.",
      "Home and business cleaning kept apart, with eight services under two headings and four add-ons, so a daycare director never reads about move-out cleaning.",
      "Separation, not integration: three plain routes, a call to book, a staffing request and a job application, that never meet after the first screen."
    ],
    "tags": [
      "Digital strategy",
      "UX / UI",
      "Web development"
    ],
    "disclosure": "No performance data was supplied. No bookings, placements, clients, revenue, conversion figures or rankings are claimed.",
    "accent": "#FCD34D",
    "accentSoft": "#FEE9A0",
    "dark": "#0b0a06",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/royalty-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Royalty With a Purpose homepage: cleaning services for home and business, with Request Staff and Apply for Work",
        "label": "Web experience",
        "caption": "Homepage · three paths in the first screen"
      },
      "feature": {
        "src": "/images/portfolio/projects/royalty-03-feature.webp",
        "width": 2000,
        "height": 771,
        "alt": "Royalty With a Purpose staffing services for hospitality, retail and facilities, beside the request staff form",
        "label": "Feature detail",
        "caption": "Staffing · services and the request form"
      },
      "secondary": {
        "src": "/images/portfolio/projects/royalty-04-secondary.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Royalty With a Purpose request staff form on mobile",
        "label": "Request form",
        "caption": "Request staff · role, workers, message"
      },
      "mobile": {
        "src": "/images/portfolio/projects/royalty-02-mobile.webp",
        "width": 1240,
        "height": 1000,
        "alt": "Royalty With a Purpose mobile screens: the homepage and hospitality staffing services",
        "label": "Mobile experience",
        "caption": "Responsive · cleaning and staffing on a phone"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "8",
        "label": "Cleaning services, four home and four business"
      },
      {
        "value": "3",
        "label": "Audiences, each with a route of their own"
      },
      {
        "value": "10",
        "label": "Roles an applicant can choose"
      },
      {
        "value": "5",
        "label": "Areas named for staffing requests"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://www.royaltywithapurposellc.com/",
    "metaLink": "https://www.royaltywithapurposellc.com/"
  },
  {
    "id": "safe-travel-charters",
    "sector": "Charter bus rental",
    "sectorRest": " · Chicago, Milwaukee & Indianapolis",
    "name": "Safe Travel Charters",
    "headline": "A charter purchase, turned into a path a coordinator can trust.",
    "brief": "Six trip types, the company's own fleet and fifty-three area pages, so a group coordinator can match their trip and get a quote.",
    "meta": [
      {
        "label": "Client",
        "value": "Safe Travel Charters"
      },
      {
        "label": "Scope",
        "value": "Digital strategy · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "Safe Travel Charters is a charter bus rental company based in North Chicago with offices in Milwaukee and Indianapolis. A coordinator booking a wedding shuttle, a school trip or an airport transfer cannot test-drive the product, so the site matches their trip, shows the real buses and separates a free quote from a reservation.",
    "built": [
      "Six trip types, each published with a one-line promise and an ideal-for tag, so a coordinator sees their kind of trip before reading anything else.",
      "Proof before the ask: the company's own fleet photographs, five mission pillars and three office addresses, then a free quote kept separate from a reservation.",
      "Local SEO architecture: a city in every title and fifty-three area pages across Illinois, Indiana and Wisconsin, each with a town in its heading."
    ],
    "tags": [
      "Digital strategy",
      "UX / UI",
      "Web",
      "Local SEO"
    ],
    "disclosure": "No performance data was supplied. No fleet size, passenger volume, safety statistics, on-time figures, ratings or rankings are claimed.",
    "accent": "#F9B918",
    "accentSoft": "#FCD34D",
    "dark": "#0c0b08",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/safetravel-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Safe Travel Charters homepage: your premier charter bus rental in Chicago, with Reserve Your Bus Now",
        "label": "Web experience",
        "caption": "Homepage · charter bus rental in Chicago"
      },
      "feature": {
        "src": "/images/portfolio/projects/safetravel-03-feature.webp",
        "width": 1520,
        "height": 978,
        "alt": "Safe Travel Charters make a reservation form",
        "label": "Feature detail",
        "caption": "Reservation · a trip goes in, a quote comes out"
      },
      "secondary": {
        "src": "/images/portfolio/projects/safetravel-04-secondary.webp",
        "width": 2000,
        "height": 875,
        "alt": "Safe Travel Charters trip types, from corporate and weddings to school trips, beside the fleet page",
        "label": "Trip types",
        "caption": "Six trip types · and the company's own fleet"
      },
      "mobile": {
        "src": "/images/portfolio/projects/safetravel-02-mobile.webp",
        "width": 1700,
        "height": 1100,
        "alt": "Safe Travel Charters mobile screens: trip types, the homepage and the reservation form",
        "label": "Mobile experience",
        "caption": "Responsive · trip types to reservation"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "6",
        "label": "Trip types, each with ideal-for tags"
      },
      {
        "value": "3",
        "label": "Offices with a street address"
      },
      {
        "value": "53",
        "label": "Area pages across Illinois, Indiana and Wisconsin"
      },
      {
        "value": "10",
        "label": "Blog articles on the first of six pages"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://safetravelcharters.com/",
    "metaLink": "https://safetravelcharters.com/"
  },
  {
    "id": "on-top-home-services",
    "sector": "Exterior cleaning & home services",
    "sectorRest": " · Salem, OR",
    "name": "On Top Home Services",
    "headline": "Sixteen services and seventeen cities, one acquisition platform.",
    "brief": "Sixteen services and seventeen Oregon cities, each with its own page, built as a grid that meets every service-in-town search.",
    "meta": [
      {
        "label": "Client",
        "value": "On Top Home Services LLC"
      },
      {
        "label": "Scope",
        "value": "Information architecture · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "On Top Home Services is a veteran-owned home services company in Salem, Oregon, from roof and gutter cleaning to soft washing, decks and remodeling. Homeowners search for the problem in their own town, so the site meets each search with its own page, explains the Oregon conditions behind it, and proves the company is real and local.",
    "built": [
      "The grid is the strategy: a page for every service, every city and the pairings between them, such as roof cleaning in Salem.",
      "Oregon in the content, not only the title: fir needles in gutters, moss lifting shingles and north-wall algae explained, with twenty-two of thirty articles titled for Oregon.",
      "An explainer that prevents the wrong job, soft washing versus pressure washing, and a contact form that pre-selects the service and accepts photographs."
    ],
    "tags": [
      "Information architecture",
      "UX / UI",
      "Web",
      "Local SEO"
    ],
    "disclosure": "No performance data was supplied. No lead volume, revenue, rankings, traffic, conversion figures or verified review figures are claimed.",
    "accent": "#FACC15",
    "accentSoft": "#FDE047",
    "dark": "#0a0a0a",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/ontop-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "On Top Home Services homepage: home services done the right way, Salem, Oregon",
        "label": "Web experience",
        "caption": "Homepage · veteran-owned, Salem, Oregon"
      },
      "feature": {
        "src": "/images/portfolio/projects/ontop-03-feature.webp",
        "width": 1700,
        "height": 1148,
        "alt": "On Top Home Services roof rejuvenation service page on desktop and mobile",
        "label": "Feature detail",
        "caption": "Service page · roof rejuvenation"
      },
      "secondary": {
        "src": "/images/portfolio/projects/ontop-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "On Top Home Services services grid: decks, Christmas lights, roof rejuvenation, gutter and roof cleaning, washing",
        "label": "Services",
        "caption": "Every service · its own page"
      },
      "mobile": {
        "src": "/images/portfolio/projects/ontop-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "On Top Home Services mobile screens: the homepage and services built around your home's needs",
        "label": "Mobile experience",
        "caption": "Responsive · services on a phone"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 9.0,
      "zoom": 1.035
    },
    "metrics": [
      {
        "value": "16",
        "label": "Services, each with its own page"
      },
      {
        "value": "17",
        "label": "Oregon cities, each with its own page"
      },
      {
        "value": "15",
        "label": "Service-in-city pages linked from the Salem hub"
      },
      {
        "value": "30",
        "label": "Blog articles, 22 titled for Oregon"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://ontophomeservices.com/",
    "metaLink": "https://ontophomeservices.com/"
  },
  {
    "id": "jobco-supply",
    "sector": "Industrial process heating",
    "sectorRest": " · B2B commerce",
    "name": "Jobco Supply",
    "headline": "A complex heater catalog, turned into a spec-first buying experience.",
    "brief": "An industrial heater catalog organised by the specs a buyer already has, with stock to cart, custom to a quote form, and documents that prove the fit.",
    "meta": [
      {
        "label": "Client",
        "value": "Jobco Supply, Inc."
      },
      {
        "label": "Scope",
        "value": "Information architecture · UX / UI · Web"
      }
    ],
    "accessNote": "",
    "summary": "Jobco Supply is an industrial heater and sensor supplier in Fort Smith, Arkansas. Its buyers arrive with a bore diameter, a voltage and a machine that is down, not a part number, so the site narrows by attribute, proves the fit with documentation, and offers three honest routes: a cart for stock, a quote form for custom, and a phone.",
    "built": [
      "Sixteen product families, each split by the attribute that decides it: cartridge heaters by diameter then voltage, band heaters by voltage first.",
      "Part-row tables that do the validating, stock shown before custom, and six custom quote forms, one per heater type, for anything the tables do not cover.",
      "A library of eighty-four guides, data sheets and manuals grouped by family, plus stated shipping times instead of the word fast."
    ],
    "tags": [
      "Information architecture",
      "UX / UI",
      "Web",
      "Technical SEO"
    ],
    "disclosure": "No performance data was supplied. No order volumes, customers, revenue, conversion rates, inventory levels, rankings or company certifications are claimed.",
    "accent": "#F5A80F",
    "accentSoft": "#FBD066",
    "dark": "#100d07",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/jobco-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Jobco Supply homepage: product search and heater category tiles, from band and cartridge to silicone heaters",
        "label": "Web experience",
        "caption": "Homepage · search and sixteen product families"
      },
      "feature": {
        "src": "/images/portfolio/projects/jobco-03-feature.webp",
        "width": 2000,
        "height": 771,
        "alt": "Jobco Supply stock cartridge heater types beside a cartridge heater product page",
        "label": "Feature detail",
        "caption": "Stock first · then the exact part"
      },
      "secondary": {
        "src": "/images/portfolio/projects/jobco-04-secondary.webp",
        "width": 1700,
        "height": 1148,
        "alt": "Jobco Supply homepage on desktop and mobile",
        "label": "Responsive catalog",
        "caption": "The same catalog · desktop and phone"
      },
      "mobile": {
        "src": "/images/portfolio/projects/jobco-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "Jobco Supply cartridge heater product page on mobile",
        "label": "Mobile experience",
        "caption": "Product page · the spec, the price, the cart"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "16",
        "label": "Product categories on the home page"
      },
      {
        "value": "7",
        "label": "Cartridge heater diameters, one page each"
      },
      {
        "value": "6",
        "label": "Custom quote forms, one per heater type"
      },
      {
        "value": "84",
        "label": "Guides, data sheets and manuals in the library"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://jobcosupply.com/",
    "metaLink": "https://jobcosupply.com/"
  },
  {
    "id": "this-week-in-public-health",
    "sector": "Public-health research intelligence",
    "sectorRest": " · Product",
    "name": "This Week in Public Health",
    "headline": "A week of journals, turned into research a health official can cite.",
    "brief": "A research digest that monitors, filters and translates public-health studies into plain language, with every finding tied to its source.",
    "meta": [
      {
        "label": "Client",
        "value": "This Week in Public Health, by PubTrawlr"
      },
      {
        "label": "Scope",
        "value": "Product strategy · Editorial architecture · UX / UI"
      }
    ],
    "accessNote": "",
    "summary": "This Week in Public Health is a research intelligence product made by PubTrawlr, a Lancaster, Pennsylvania company. Its readers face a volume problem, a jargon problem and a credibility problem at once, so the product curates the research, translates it into plain language and keeps every answer tied to a citation.",
    "built": [
      "Four editorial steps made visible, Monitor, Filter, Translate and Deliver, and a library where every entry carries the same fields: source, date, authors, summary and link.",
      "A personalised issue in three dropdowns: work setting, one of eight topics and a role, promising five findings and why they matter.",
      "A clear ladder from a free weekly highlight to a paid digest, with long-form posts that show the evidence standard and a cited assistant for the next question."
    ],
    "tags": [
      "Product strategy",
      "Editorial architecture",
      "UX / UI",
      "Web",
      "SEO/GEO"
    ],
    "disclosure": "No performance data was supplied. No subscriber, user, engagement, traffic or ranking figures are claimed, and no AI model or health outcome is claimed.",
    "accent": "#FCD34D",
    "accentSoft": "#FEE9A0",
    "dark": "#0b0a06",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/twiph-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "This Week in Public Health homepage: stay ahead of the next public health challenge",
        "label": "Web experience",
        "caption": "Homepage · research, distilled into take-aways"
      },
      "feature": {
        "src": "/images/portfolio/projects/twiph-03-feature.webp",
        "width": 1700,
        "height": 1148,
        "alt": "This Week in Public Health build your public health issue form on desktop and mobile",
        "label": "Feature detail",
        "caption": "Build my issue · three dropdowns and an email"
      },
      "secondary": {
        "src": "/images/portfolio/projects/twiph-04-secondary.webp",
        "width": 2000,
        "height": 908,
        "alt": "This Week in Public Health research articles library beside the subscription plans",
        "label": "The library",
        "caption": "Research articles · free preview to paid digest"
      },
      "mobile": {
        "src": "/images/portfolio/projects/twiph-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "This Week in Public Health mobile screens: the homepage and the research article library",
        "label": "Mobile experience",
        "caption": "Responsive · the library on a phone"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": true,
      "pan": 6.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "4",
        "label": "Editorial steps: monitor, filter, translate, deliver"
      },
      {
        "value": "9",
        "label": "Blog categories of long-form analysis"
      },
      {
        "value": "8",
        "label": "Topic options in the issue builder"
      },
      {
        "value": "2",
        "label": "Plans: a free preview and a paid digest"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://thisweekinpublichealth.com/",
    "metaLink": "https://thisweekinpublichealth.com/"
  },
  {
    "id": "cfws-llc",
    "sector": "Residential water treatment",
    "sectorRest": " · Central Florida",
    "name": "CFWS LLC",
    "headline": "Orange stains, turned into a water test a homeowner will book.",
    "brief": "A water-treatment site that leads with the symptom, explains the cause plainly and offers a free water test before naming a system.",
    "meta": [
      {
        "label": "Client",
        "value": "Central Florida Water Solutions, LLC"
      },
      {
        "label": "Scope",
        "value": "Digital strategy · Content architecture · UX / UI"
      }
    ],
    "accessNote": "",
    "summary": "Central Florida Water Solutions is a family-owned water treatment company in Lakeland, Florida. Homeowners search for the symptom, spots on the glasses or a sulfur smell, not the system, so the site names the symptom, explains the cause in plain words and offers a free water analysis before it ever names a product.",
    "built": [
      "The symptom in the headline, not the system: service pages written as No More Orange Stains rather than iron filtration, so a visitor recognises their problem.",
      "Softener versus filter explained where the confusion starts, with limits stated beside the claims, such as what UV treatment does not remove.",
      "The site sells a diagnosis, not a product: a free water analysis on every page, and sixteen Central Florida cities each given a line of local knowledge."
    ],
    "tags": [
      "Digital strategy",
      "Content architecture",
      "UX / UI",
      "Web",
      "Local SEO"
    ],
    "disclosure": "No performance data was supplied. No lead volume, tests booked, installations, customers, revenue, rankings or review figures are claimed.",
    "accent": "#F9B918",
    "accentSoft": "#FCD34D",
    "dark": "#0c0b08",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/cfws-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Central Florida Water Solutions homepage: cleaner, safer water for every home and business, with Get a Free Water Analysis",
        "label": "Web experience",
        "caption": "Homepage · a free water analysis first"
      },
      "feature": {
        "src": "/images/portfolio/projects/cfws-03-feature.webp",
        "width": 1520,
        "height": 978,
        "alt": "Central Florida Water Solutions claim your free water analysis form",
        "label": "Feature detail",
        "caption": "Free water analysis · what are you noticing?"
      },
      "secondary": {
        "src": "/images/portfolio/projects/cfws-04-secondary.webp",
        "width": 2000,
        "height": 771,
        "alt": "Central Florida Water Solutions services beside the water filter versus water softener comparison",
        "label": "Services",
        "caption": "Filter or softener · explained before the sale"
      },
      "mobile": {
        "src": "/images/portfolio/projects/cfws-02-mobile.webp",
        "width": 1700,
        "height": 1100,
        "alt": "Central Florida Water Solutions mobile screens: services, the homepage and the water analysis form",
        "label": "Mobile experience",
        "caption": "Responsive · from symptom to free test"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "8",
        "label": "Treatment services, a page each"
      },
      {
        "value": "16",
        "label": "Central Florida cities named"
      },
      {
        "value": "6",
        "label": "Parameters in the free water test"
      },
      {
        "value": "4",
        "label": "Steps from test to ongoing support"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://www.cfwsllc.com/",
    "metaLink": "https://www.cfwsllc.com/"
  },
  {
    "id": "5dccs",
    "sector": "Modular containment systems",
    "sectorRest": " · San Jose",
    "name": "5D CCS",
    "headline": "An unknown service, turned into five words a buyer remembers.",
    "brief": "Modular temporary walls framed by five problems, Dust, Debris, Decibels, Demolition and Disruption, with a quote one click from every page.",
    "meta": [
      {
        "label": "Client",
        "value": "Construction Containment Services (5DCCS)"
      },
      {
        "label": "Scope",
        "value": "B2B strategy · Information architecture · UX / UI"
      }
    ],
    "accessNote": "",
    "summary": "Construction Containment Services, trading as 5DCCS, rents, installs, sells and removes modular temporary walls for construction inside occupied buildings. Buyers search for how to keep a ward open during demolition, not for modular containment, so the site frames five problems, states its standards carefully and puts the quote one click from every page.",
    "built": [
      "The 5 Ds turn a product nobody asked for into five problems everybody has: Dust, Debris, Decibels, Demolition and Disruption.",
      "Four ways of working, full service, self-service, sale and consulting, plus the argument against plastic sheeting and temporary drywall.",
      "Ten sector pages in each sector's own vocabulary, standards stated with care as specified to meet, and a San Jose page that names the permit desk."
    ],
    "tags": [
      "B2B strategy",
      "Information architecture",
      "UX / UI",
      "Web",
      "Local and technical SEO"
    ],
    "disclosure": "No performance data was supplied. No project count, clients, contract value, revenue, lead volume or ranking is claimed, and no certification of any standard is claimed.",
    "accent": "#FACC15",
    "accentSoft": "#FDE047",
    "dark": "#0a0a0a",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/5dccs-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "5DCCS homepage: fast, clean and professional temporary walls, with Get a Free Quote",
        "label": "Web experience",
        "caption": "Homepage · modular containment specialists"
      },
      "feature": {
        "src": "/images/portfolio/projects/5dccs-03-feature.webp",
        "width": 1700,
        "height": 1148,
        "alt": "5DCCS full-service containment in five steps, on desktop and mobile",
        "label": "Feature detail",
        "caption": "Five steps · first call to final removal"
      },
      "secondary": {
        "src": "/images/portfolio/projects/5dccs-04-secondary.webp",
        "width": 1520,
        "height": 978,
        "alt": "5DCCS flexible containment for every need: full-service and self-service wall rentals",
        "label": "Ways of working",
        "caption": "Full-service or self-service · four ways in"
      },
      "mobile": {
        "src": "/images/portfolio/projects/5dccs-02-mobile.webp",
        "width": 1240,
        "height": 1000,
        "alt": "5DCCS mobile screens: the homepage and flexible containment for every need",
        "label": "Mobile experience",
        "caption": "Responsive · a quote from every screen"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 7.0,
      "zoom": 1.035
    },
    "metrics": [
      {
        "value": "5",
        "label": "Ds the brand is built on"
      },
      {
        "value": "4",
        "label": "Ways to work with the company"
      },
      {
        "value": "10",
        "label": "Sector application pages"
      },
      {
        "value": "5",
        "label": "Steps from first call to final removal"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://5dccs.com/",
    "metaLink": "https://5dccs.com/"
  },
  {
    "id": "nexus-alliance",
    "sector": "Government-contract operational support",
    "sectorRest": " · Federal",
    "name": "Nexus Alliance Inc",
    "headline": "Making a supporting role read as the stronger choice.",
    "brief": "A one-page partner site that answers a federal prime contractor's own question: why would bringing Nexus on make my contract stronger?",
    "meta": [
      {
        "label": "Client",
        "value": "Nexus Alliance Inc."
      },
      {
        "label": "Scope",
        "value": "B2B positioning · Messaging strategy · UX / UI"
      }
    ],
    "accessNote": "",
    "summary": "Nexus Alliance supports prime contractors executing federal contracts in operational areas where the prime's own experience is limited. A prime is not looking for a competitor, so the one-page site opens with the prime's own question, defines the role by contrast, names its work in the government's own codes and ends on a conversation, not a quote.",
    "built": [
      "Open with the prime's own question, set in large type, and answer it: you won the contract, now let's make it work.",
      "Define the role by contrast, pairing every we don't with a we do, and prove it with one anonymised scenario that ends: the prime leads, Nexus strengthens.",
      "Seven NAICS codes where a procurement reader looks, and a contact block that opens with a qualifying question instead of a quote request."
    ],
    "tags": [
      "B2B positioning",
      "Messaging strategy",
      "UX / UI",
      "Web",
      "SEO/GEO"
    ],
    "disclosure": "No performance data was supplied. No federal award, contract value, agency, customer, certification or ranking is claimed; experience statements are the client's own.",
    "accent": "#F5A80F",
    "accentSoft": "#FBD066",
    "dark": "#100d07",
    "sweep": "ltr",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/nexus-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "Nexus Alliance homepage: why would bringing Nexus Alliance on to my team make my contract stronger?",
        "label": "Web experience",
        "caption": "Homepage · the prime's own question"
      },
      "feature": {
        "src": "/images/portfolio/projects/nexus-03-feature.webp",
        "width": 1520,
        "height": 978,
        "alt": "Nexus Alliance contact form: let's explore the fit",
        "label": "Feature detail",
        "caption": "Contact · a conversation about fit"
      },
      "secondary": {
        "src": "/images/portfolio/projects/nexus-04-secondary.webp",
        "width": 1440,
        "height": 814,
        "alt": "Nexus Alliance our vision and experience: a specialized government support partner",
        "label": "Position",
        "caption": "Our vision · an extension of your team"
      },
      "mobile": {
        "src": "/images/portfolio/projects/nexus-02-mobile.webp",
        "width": 1700,
        "height": 1100,
        "alt": "Nexus Alliance mobile screens: the homepage, our vision and contact us",
        "label": "Mobile experience",
        "caption": "Responsive · one page, one position"
      }
    },
    "motion": {
      "swap": "diagonal",
      "direction": "ltr",
      "parallax": false,
      "edgeTrace": false,
      "pan": 8.0,
      "zoom": 1.03
    },
    "metrics": [
      {
        "value": "1",
        "label": "Page carrying the whole position"
      },
      {
        "value": "7",
        "label": "NAICS codes listed in the footer"
      },
      {
        "value": "4",
        "label": "We don't / we do pairs"
      },
      {
        "value": "3",
        "label": "Policy documents behind the form"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://nexusallianceinc.com/",
    "metaLink": "https://nexusallianceinc.com/"
  },
  {
    "id": "fairpath-consultants",
    "sector": "Adaptive & assistive devices",
    "sectorRest": " · Gardena, CA",
    "name": "Fairpath Consultants",
    "headline": "Assistive devices, made easier to find and understand.",
    "brief": "Two assistive devices named by what they do, with the terms, warranty and standards a caregiver or institutional buyer needs published before the cart.",
    "meta": [
      {
        "label": "Client",
        "value": "FairPath Consultants LLC"
      },
      {
        "label": "Scope",
        "value": "Product strategy · Accessibility UX · Web"
      }
    ],
    "accessNote": "",
    "summary": "FairPath Consultants is a Gardena, California supplier of adaptive and assistive devices, selling a standing bed and a portable bedside shower system to individuals, caregivers and institutional buyers. Someone with a specific need may not share the manufacturer's vocabulary, so the site names each device by what it does and publishes the terms a buyer will be asked for.",
    "built": [
      "Name the device by what it does, so a caregiver can tell what the bathing system does from its name and category label.",
      "Define the words before selling into them: six articles sort adaptive from assistive devices, the vocabulary a buyer may not share.",
      "Answer the buyer's form in public: a fourteen-entry FAQ covering manufacturer, lead times, warranty, delivery and returns, with standards attributed to the product."
    ],
    "tags": [
      "Product strategy",
      "Accessibility UX",
      "Web",
      "SEO/GEO"
    ],
    "disclosure": "No performance data was supplied. No sales, users, leads or rankings are claimed, no medical benefit or coverage is claimed, and no accessibility conformance level is asserted.",
    "accent": "#FCD34D",
    "accentSoft": "#FEE9A0",
    "dark": "#0b0a06",
    "sweep": "rtl",
    "images": {
      "desktop": {
        "src": "/images/portfolio/projects/fairpath-01-desktop.webp",
        "width": 1440,
        "height": 814,
        "alt": "FairPath Consultants homepage with the standing bed",
        "label": "Web experience",
        "caption": "Homepage · adaptive and assistive devices"
      },
      "feature": {
        "src": "/images/portfolio/projects/fairpath-03-feature.webp",
        "width": 1700,
        "height": 1148,
        "alt": "FairPath Consultants Switle Body portable bedside shower system product page on desktop and mobile",
        "label": "Feature detail",
        "caption": "Product page · named by what it does"
      },
      "secondary": {
        "src": "/images/portfolio/projects/fairpath-04-secondary.webp",
        "width": 1520,
        "height": 978,
        "alt": "FairPath Consultants products: the standing bed, the bedside shower system and assistive devices",
        "label": "Products",
        "caption": "Two devices · and the words that explain them"
      },
      "mobile": {
        "src": "/images/portfolio/projects/fairpath-02-mobile.webp",
        "width": 1200,
        "height": 1000,
        "alt": "FairPath Consultants homepage on mobile",
        "label": "Mobile experience",
        "caption": "Responsive · the same clarity on a phone"
      }
    },
    "motion": {
      "swap": "drift",
      "direction": "rtl",
      "parallax": false,
      "edgeTrace": false,
      "pan": 6.0,
      "zoom": 1.05
    },
    "metrics": [
      {
        "value": "2",
        "label": "Named products, described by function"
      },
      {
        "value": "14",
        "label": "FAQ entries answering a buyer's form"
      },
      {
        "value": "6",
        "label": "Articles defining the category's words"
      },
      {
        "value": "2",
        "label": "Ways in: a cart and a consultation"
      }
    ],
    "metricsSource": "Case study, October 2026 · counts published on the delivered site; no performance data was supplied",
    "builtTitle": "What we built",
    "liveUrl": "https://www.fairpathconsultants.com/",
    "metaLink": "https://www.fairpathconsultants.com/"
  }
];
