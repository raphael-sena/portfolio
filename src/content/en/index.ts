import type { Dictionary } from '../dictionary';

/** Inglês: tradução do pt-BR. Marcado como não revisado em src/content/reviewed.json. */
export const en: Dictionary = {
  common: {
    siteName: 'Raphael Sena',
    jobTitle: 'Software Engineer',
    tagline: "A software developer's gazette",
    dateline: {
      place: 'Belo Horizonte, Minas Gerais',
      edition: '2026 edition',
      price: 'Price: one click',
      page: 'Page',
    },
    mastheadBoxes: {
      left: ['Software Engineering', 'PUC Minas'],
      right: ['Belo Horizonte', 'Minas Gerais'],
    },
    nav: {
      label: 'Main',
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      technologies: 'Technologies',
      timeline: 'Timeline',
      contact: 'Contact',
    },
    footer: { privacy: 'Privacy' },
    skipLink: 'Skip to content',
    language: { label: 'Language', current: 'current language' },
    ear: { hint: 'Pull the corner · page {n} →', aria: 'Turn the page: {section}, page {n}' },
    mac: {
      aria: 'Compact computer in 3D: drag, use the arrow keys or the buttons to rotate',
      caption: 'Fig. 1 — Compact computer, rotating view. Drag to examine.',
      left: 'Rotate left',
      reset: 'Reset',
      right: 'Rotate right',
      angle: 'Horizontal rotation: {angle} degrees',
      posterAlt: 'Compact computer: an Apple II with a monitor, keyboard and disk drive.',
      credit: { model: '3D model', by: 'by', modified: 'Modified: textures and mesh compressed for the web.' },
    },
    backHome: 'Back to the home page',
    present: 'present',
    openRepo: 'Code on GitHub →',
  },
  meta: {
    home: {
      title: 'Raphael Sena | Software developer in Belo Horizonte',
      description:
        'Portfolio of Raphael Sena, software developer in Belo Horizonte: experience, projects and technologies, in a 1900 gazette.',
    },
    about: {
      title: 'About | Raphael Sena',
      description:
        'Who is Raphael Sena: a software developer from Belo Horizonte, Brazil, studying Software Engineering.',
    },
    experience: {
      title: 'Experience and education | Raphael Sena',
      description: 'Work experience, education and courses of Raphael Sena, with the tools used at each step.',
    },
    projects: {
      title: 'Projects | Raphael Sena',
      description: 'Projects published by Raphael Sena on GitHub: stack, description and a link to the code.',
    },
    technologies: {
      title: 'Technologies | Raphael Sena',
      description: 'Languages, frameworks, databases and tools used by Raphael Sena in software development.',
    },
    timeline: {
      title: 'Timeline | Raphael Sena',
      description: 'The previous versions of this portfolio, from oldest to newest, each with its own stack.',
    },
    contact: {
      title: 'Contact | Raphael Sena',
      description: 'Get in touch with Raphael Sena about jobs, projects or chess: GitHub, LinkedIn and e-mail.',
    },
    privacy: {
      title: 'Privacy | Raphael Sena',
      description:
        'How this site measures visits: cookie-free analytics on a self-hosted server, with no one identified.',
    },
  },
  pages: {
    home: {
      kicker: 'Latest edition',
      headline: 'Software developer presents their works to the public',
      lead: 'A Software Engineering student gathers projects, experience and a machine that spins.',
      body: 'Backend-focused software engineer, between production electronic ticketing systems at Modaxo and a multi-tenant ERP platform built from scratch with Java and Spring Boot. Software Engineering student at PUC Minas.',
      continue: 'Continued in About, page 2 →',
      aside: {
        title: 'Featured',
        timeline: {
          title: 'How this site changed',
          text: 'Every version of the portfolio is still online, from the oldest to the newest.',
          link: 'See the timeline →',
        },
        resume: {
          title: 'Résumé in PDF',
          text: 'To take away, print or attach to an e-mail.',
          link: 'Download the résumé →',
        },
        ad: { title: 'Wanted: a conversation', text: 'About jobs, projects and chess.', link: 'Write →' },
      },
    },
    about: {
      title: 'Who writes this gazette',
      lead: 'A software developer from Belo Horizonte, in a few paragraphs and a fact sheet.',
      p1: 'Backend-focused software engineer working across two concurrent Java/Spring Boot codebases: production ticketing systems serving 177,000+ users at Modaxo and, as a freelance backend developer, a multi-tenant ERP/tax platform built from scratch with Java 21, PostgreSQL, Flyway and event-driven architecture. Comfortable owning a feature from data model and JPA/Hibernate persistence through REST API design, testing and release. Software Engineering student at PUC Minas.',
      p2: '[PARAGRAPH ABOUT YOU: how you started programming, what drives you and what you are looking for now.]',
      quote: '[A PHRASE OF YOURS TO HIGHLIGHT]',
      p3: '[SECOND PARAGRAPH: a way of working, a value, something the reader should remember.]',
      portrait: '[PORTRAIT]',
      portraitCaption: 'Fig. 1 — [PORTRAIT CAPTION]',
      portraitAlt: 'Placeholder for the portrait of Raphael Sena',
      sheet: {
        title: "The writer's fact sheet",
        city: 'City',
        cityValue: 'Belo Horizonte, MG',
        education: 'Education',
        educationValue: 'Software Engineering, PUC Minas',
        interests: 'Interests',
        interestsValue: 'Software architecture and requirements',
        outside: 'Outside of code',
        outsideValue: 'Chess',
        languages: 'Languages',
        languagesValue: 'Portuguese (native), English (C1), Spanish (A2), German (B1)',
      },
    },
    experience: {
      title: 'Experience and education',
      lead: 'What has been done, where and with which tools.',
      jobsTitle: 'Experience',
      jobs: {
        newenergy: {
          role: 'Backend developer (freelance, remote)',
          items: [
            {
              title: 'Precifique: pricing and tax engine (from scratch)',
              text: 'Built a commercial pricing and Brazilian tax calculation system from the ground up on Java 21, Spring Boot 3.2, PostgreSQL and Flyway migrations, replacing a legacy Excel-based workflow. Modeled NCM-based fiscal classification via JPA/Hibernate entity relationships and integrated the IBPT tax-data API.',
            },
            {
              title: 'Kvaris: multi-tenant ERP platform',
              text: 'Evolved Precifique into a broader multi-tenant ERP serving two legal entities on a shared database, with tenant isolation via a request-scoped TenantContext/TenantInterceptor. Architected the Sales/Purchasing/WMS/Fiscal/Finance pipeline as a modular monolith with internal event-driven communication (Spring ApplicationEventPublisher) and a dedicated state machine owning order-status transitions.',
            },
            {
              title: 'Auth and integrations',
              text: 'Implemented OAuth2/OIDC single sign-on via Microsoft Entra ID (Azure AD) with role-based App Roles, and scheduled third-party API sync jobs against external ERP systems for both tenant companies.',
            },
            {
              title: 'Engineering judgment',
              text: 'Made deliberate architecture trade-offs to avoid over-engineering: chose a cost-effective VPS/PaaS deployment over managed cloud services, and a simplified internal Outbox pattern over a Kafka/Debezium event pipeline. Currently in active development on staging, with a live demo available.',
            },
          ],
        },
        modaxo: {
          role: 'Software Engineer',
          items: [
            {
              title: 'Sigom Cloud: payment reporting (Java)',
              text: 'Rebuilt Java/Spring Boot payment report generation on a revenue management platform, cutting estimated computational effort from 20M–1T to 1M operations at high data volumes, and delivered the supporting REST endpoints end to end.',
            },
            {
              title: 'Corrective and evolutionary maintenance (SIGO)',
              text: 'Develop and maintain Java/Spring Boot services behind an electronic ticketing product deployed across 47 cities with 695K+ downloads: investigate and resolve production incidents, evolve features and maintain REST integrations on a distributed, service-oriented back end.',
            },
            {
              title: 'Data integrity across systems',
              text: 'Automated database versioning and migrations across 120 production systems using Liquibase, eliminating manual SQL drift and cutting deployment risk for legacy Java services.',
            },
            {
              title: 'Ways of working',
              text: 'Work in Scrum squads: technical refinements and estimates, code review, Jira/Confluence tracking and documentation, and incremental delivery alongside product stakeholders.',
            },
          ],
        },
        avaso: {
          role: 'Field Support Engineer',
          items: [
            {
              title: 'Service Desk (freelance)',
              text: 'Resolved hardware and software incidents across desktops, laptops, VMs, servers, backup systems, VoIP devices and peripherals, sustaining 95% SLA compliance for a multicultural English-speaking user base, working as an allocated engineer for international clients.',
            },
          ],
        },
        puc: {
          role: 'IT Technician',
          items: [
            {
              title: 'Telephony migration',
              text: 'Drove a VoIP migration for 100+ users, reconfiguring logical network topology and deploying endpoint hardware during cutover.',
            },
            {
              title: 'Service Desk and Help Desk',
              text: 'Delivered L1 technical support using Active Directory, ticketing systems (CSC), VPN, and directory/printer mapping platforms under established SLA standards.',
            },
          ],
        },
      },
      pucNote: "PUC Minas' governing foundation",
      educationTitle: 'Education',
      education: {
        puc: {
          title: "Bachelor's degree in Software Engineering",
          place: 'Belo Horizonte, MG, Brazil',
          items: [
            {
              title: 'Experimental Software Agency (PMMG)',
              text: 'Tech Lead for the HR recruitment platform of the Military Police of Minas Gerais, serving 40,000+ candidates per examination cycle, owning scoping through delivery.',
            },
            {
              title: 'Interdisciplinary Project Champion (2x)',
              text: 'Led two award-winning teams delivering production software for external clients.',
            },
            {
              title: 'Research project',
              text: 'Member of a research group advised by Prof. Lucila Ishitani, publishing a paper on productivity in software engineering.',
            },
          ],
        },
        kogarah: {
          title: 'High school exchange program',
          place: 'Sydney, NSW, Australia',
          text: 'High school exchange in Sydney, Australia.',
        },
      },
      coursesTitle: 'Extra courses',
      courses: {
        redhat: 'RH124: Red Hat System Administration I',
        udemy: 'Java: complete course',
        aluraJava: 'Java track: object-oriented programming',
        aluraJs: 'JavaScript back-end track',
      },
      certificate: 'See certificate →',
      aside: {
        title: 'Featured',
        text: 'Prefer a one-page format? The résumé gathers all of this.',
        callout: 'Résumé in PDF',
        link: 'Download the résumé →',
      },
    },
    projects: {
      title: 'Published works',
      lead: 'Featured projects, each with its stack and a link to the code.',
      stack: 'Stack',
      figure: 'Fig. {n} — [PROJECT SCREENSHOT]',
      figureAlt: 'Placeholder for the {name} project screenshot',
      descriptions: {
        remediar:
          'Award-winning ERP platform built and deployed for the NGO Remediar, an organization focused on medicine donation, covering inventory, donations and reporting. Spring Boot microservices, Next.js, PostgreSQL, Docker, Nginx and CI/CD.',
        'dress-manager':
          'A dress management app for Renata Senna: full-stack software built with Java, Spring Boot, Next.js and TypeScript, styled with Tailwind CSS.',
        'recipes-and-flavors':
          'A web application for sharing cooking recipes, with a Java and Spring Boot back end and a Next.js, TypeScript and Tailwind CSS front end.',
        'rural-erp':
          'Capstone project: a modular ERP for small-scale producers with an irrigation control module, designed with DDD and validated through ATAM. It includes an LLM agronomist copilot with RAG over public agricultural datasets, and anomaly detection over sensor data.',
        portfolio: 'Personal portfolio.',
        'relatorio-fotografico':
          'Photographic Report Manager: a Windows application running on the Java JRE, developed for the companies Eletronet and New Energy. It generates PDF reports with the items and client data for the REI inspection required by CEMIG, a client of both companies.',
      },
    },
    technologies: {
      title: 'Tools of the trade',
      lead: 'Languages, frameworks and tools from the work and the projects.',
      groups: {
        languages: 'Languages',
        backend: 'Backend',
        architecture: 'Architecture',
        databases: 'Databases',
        auth: 'Auth and integration',
        devops: 'DevOps and cloud',
        testing: 'Testing and quality',
        observability: 'Observability and messaging',
        frontend: 'Front end',
        mobile: 'Mobile',
        practices: 'Practices',
        domain: 'Domain',
      },
      extra: {
        auth: ['Third-party API integrations'],
        testing: ['Automated testing', 'Code review'],
        practices: ['Remote collaboration'],
        domain: ['Fintech and Brazilian tax (ICMS, IPI, PIS/COFINS, NCM)', 'AI-enabled products'],
      },
    },
    timeline: {
      title: 'Previous editions',
      lead: 'Every version of the portfolio is still online, from the oldest to the newest.',
      stack: 'Stack',
      changed: 'What changed',
      learned: 'What I learned',
      now: 'Now',
      current: 'Current edition',
      open: 'Open /{year}',
      soon: 'Coming soon',
      backCurrent: 'Back to the current edition',
      figureAlt: 'Screenshot of the {year} version of the portfolio',
      figureAltCurrent: 'Screenshot of the current edition of the portfolio',
      placeholderChanged: '[A SENTENCE ABOUT THE DESIGN AND THE CODE]',
      placeholderLearned: '[A SENTENCE ABOUT WHAT WAS LEARNED]',
      currentStack: 'Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Cloudflare Workers',
      currentChanged: 'A black-and-white 1900 gazette, with page turning and a computer that spins.',
      currentLearned: '[A SENTENCE ABOUT WHAT WAS LEARNED]',
    },
    contact: {
      title: 'Letters to the editor',
      lead: 'Three ways to reach the author of this gazette.',
      p1: 'Want to talk about a job, a project or a game of chess? Write in. Letters to the editor are usually answered quickly.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'E-mail',
      ad: {
        title: 'Advertisement',
        callout: 'Wanted: a conversation',
        text: 'About jobs, projects and chess.',
        link: 'Download the résumé in PDF →',
      },
    },
    privacy: {
      title: 'Privacy',
      lead: 'How this site measures visits.',
      intro: 'This site counts visits with Umami, an analytics tool that runs on a self-hosted server.',
      items: [
        'It does not use cookies.',
        'It does not identify people: there is no login, sign-up or personal identifier.',
        "It respects the browser's Do Not Track setting: when it is on, no visit or event is sent.",
        'It records only aggregated usage data, such as pages visited, referrer, country, device type and clicks on links and buttons of the site.',
        'The data is not sold or shared with advertising networks.',
      ],
    },
  },
  notFound: {
    title: 'Page not found | Raphael Sena',
    heading: 'Page not found',
    text: 'The address you opened does not exist in this edition.',
  },
};
