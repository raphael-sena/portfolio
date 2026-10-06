import type { Dictionary } from '../dictionary';

/** Inglês: tradução do pt-BR. Marcado como não revisado em src/content/reviewed.json. */
export const en: Dictionary = {
  common: {
    siteName: 'Raphael Sena',
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
    placeholder: { role: '[ROLE]', period: '[PERIOD]' },
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
      body: 'Raphael Sena studies Software Engineering at PUC Minas and works with electronic ticketing and transit revenue management platforms. Enjoys programming, gathering requirements and turning both into a product.',
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
      p1: 'Raphael Sena studies Software Engineering at PUC Minas and works with electronic ticketing and transit revenue management platforms. Enjoys programming, gathering requirements and turning both into a product.',
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
      },
    },
    experience: {
      title: 'Experience and education',
      lead: 'What has been done, where and with which tools.',
      jobsTitle: 'Experience',
      jobs: {
        modaxo: {
          role: '[ROLE]',
          text: 'Electronic ticketing and transit revenue management platforms.',
        },
        agencia: {
          role: 'Back-end team lead on the Cuido Bem project',
          text: 'Code review, unit tests for the MVC structure and a GlobalExceptionHandler to handle back-end exceptions.',
        },
        avaso: {
          role: 'Field Support Engineer (Service Desk, freelance)',
          text: 'English-language support for a multicultural user base: diagnosing and resolving issues on desktops, laptops, virtual machines, smartphones, servers, backups, VoIP phones and peripherals, tracked in a ticketing system.',
        },
        puc: {
          role: 'IT Technician (Service Desk and Help Desk)',
          text: 'Network configuration and checks, hardware installation, computer maintenance and level 1 support with Active Directory, a ticketing system, VPN and directory and printer mapping, within service level agreements. Took part in a telephony migration project.',
        },
      },
      educationTitle: 'Education',
      education: {
        puc: {
          title: "Bachelor's degree in Software Engineering",
          place: 'Belo Horizonte, MG, Brazil',
          text: 'System development, requirements analysis and software architecture, with a focus on back-end and agile methods.',
        },
        kogarah: {
          title: 'High school exchange (Year 11)',
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
          'A web platform that organises medication donations, inventory and distribution for the NGO Remediar, built with Spring Boot microservices, Next.js and Docker.',
        'dress-manager':
          'A dress management app for Renata Senna: full-stack software built with Java, Spring Boot, Next.js and TypeScript, styled with Tailwind CSS.',
        'recipes-and-flavors':
          'A web application for sharing cooking recipes, with a Java and Spring Boot back end and a Next.js, TypeScript and Tailwind CSS front end.',
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
        frontend: 'Front end',
        mobile: 'Mobile',
        backend: 'Back end and frameworks',
        databases: 'Databases',
        devops: 'DevOps and cloud',
        observability: 'Observability',
        messaging: 'Messaging and caching',
        tools: 'Development tools',
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
      figure: '[SCREENSHOT OF THE {year} VERSION]',
      figureAlt: 'Placeholder for the screenshot of the {year} version',
      archivedStack: 'Next.js 14, React 18, TypeScript and Tailwind CSS 3',
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
