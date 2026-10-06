import type { Dictionary } from '../dictionary';

/**
 * Alemão: tradução do pt-BR, registro neutro e profissional (sem "du" nem "Sie": frases impessoais).
 * NÃO REVISADO: o usuário revisa no diff do PR; `reviewed` em src/content/reviewed.json só vira true quando ele disser.
 * Termos propostos para o glossário: "bilhetagem eletrônica" = "elektronisches Fahrgeldmanagement (EFM)";
 * "Software Engineer" = "Softwareentwickler" (o legado usava "Softwaretechniker").
 */
export const de: Dictionary = {
  common: {
    siteName: 'Raphael Sena',
    tagline: 'Gazette eines Softwareentwicklers',
    dateline: {
      place: 'Belo Horizonte, Minas Gerais',
      edition: 'Ausgabe 2026',
      price: 'Preis: ein Klick',
      page: 'Seite',
    },
    mastheadBoxes: {
      left: ['Software Engineering', 'PUC Minas'],
      right: ['Belo Horizonte', 'Minas Gerais'],
    },
    nav: {
      label: 'Hauptmenü',
      home: 'Start',
      about: 'Über mich',
      experience: 'Erfahrung',
      projects: 'Projekte',
      technologies: 'Technologien',
      timeline: 'Zeitleiste',
      contact: 'Kontakt',
    },
    footer: { privacy: 'Datenschutz' },
    skipLink: 'Zum Inhalt springen',
    language: { label: 'Sprache', current: 'aktuelle Sprache' },
    ear: { hint: 'Ecke ziehen · Seite {n} →', aria: 'Seite umblättern: {section}, Seite {n}' },
    mac: {
      aria: 'Kompakter Computer in 3D: zum Drehen ziehen, die Pfeiltasten oder die Schaltflächen verwenden',
      caption: 'Abb. 1 — Kompakter Computer, drehbare Ansicht. Zum Betrachten ziehen.',
      left: 'Nach links drehen',
      reset: 'Zurücksetzen',
      right: 'Nach rechts drehen',
      angle: 'Horizontale Drehung: {angle} Grad',
      posterAlt: 'Kompakter Computer: ein Apple II mit Monitor, Tastatur und Diskettenlaufwerk.',
      credit: { model: '3D-Modell', by: 'von', modified: 'Geändert: Texturen und Netz für das Web komprimiert.' },
    },
    backHome: 'Zurück zur Startseite',
    present: 'heute',
    openRepo: 'Code auf GitHub →',
    placeholder: { role: '[POSITION]', period: '[ZEITRAUM]' },
  },
  meta: {
    home: {
      title: 'Raphael Sena | Softwareentwickler in Belo Horizonte',
      description:
        'Portfolio von Raphael Sena, Softwareentwickler in Belo Horizonte: Erfahrung, Projekte und Technologien, als Gazette von 1900.',
    },
    about: {
      title: 'Über mich | Raphael Sena',
      description:
        'Wer ist Raphael Sena: Softwareentwickler aus Belo Horizonte, Brasilien, im Studium der Softwaretechnik.',
    },
    experience: {
      title: 'Erfahrung und Ausbildung | Raphael Sena',
      description: 'Berufserfahrung, Ausbildung und Kurse von Raphael Sena, mit den jeweils eingesetzten Werkzeugen.',
    },
    projects: {
      title: 'Projekte | Raphael Sena',
      description: 'Von Raphael Sena auf GitHub veröffentlichte Projekte: Stack, Beschreibung und Link zum Code.',
    },
    technologies: {
      title: 'Technologien | Raphael Sena',
      description:
        'Sprachen, Frameworks, Datenbanken und Werkzeuge, die Raphael Sena in der Softwareentwicklung einsetzt.',
    },
    timeline: {
      title: 'Zeitleiste | Raphael Sena',
      description:
        'Die früheren Versionen dieses Portfolios, von der ältesten bis zur neuesten, jeweils mit eigenem Stack.',
    },
    contact: {
      title: 'Kontakt | Raphael Sena',
      description: 'Kontakt zu Raphael Sena für Stellen, Projekte oder Schach: GitHub, LinkedIn und E-Mail.',
    },
    privacy: {
      title: 'Datenschutz | Raphael Sena',
      description:
        'Wie diese Website Besuche misst: Analytics ohne Cookies, auf eigenem Server, ohne jemanden zu identifizieren.',
    },
  },
  pages: {
    home: {
      kicker: 'Neueste Ausgabe',
      headline: 'Softwareentwickler stellt Werke der Öffentlichkeit vor',
      lead: 'Aus dem Studium der Softwaretechnik: Projekte, Erfahrung und eine Maschine, die sich dreht.',
      body: 'Raphael Sena studiert Softwaretechnik an der PUC Minas und arbeitet mit Plattformen für elektronisches Fahrgeldmanagement und die Einnahmenverwaltung im Nahverkehr. Zu den Vorlieben zählen das Programmieren, das Erheben von Anforderungen und die Verbindung beider zu einem Produkt.',
      continue: 'Weiter unter Über mich, Seite 2 →',
      aside: {
        title: 'Im Blickpunkt',
        timeline: {
          title: 'So hat sich diese Website verändert',
          text: 'Jede Version des Portfolios bleibt online, von der ältesten bis zur neuesten.',
          link: 'Zur Zeitleiste →',
        },
        resume: {
          title: 'Lebenslauf als PDF',
          text: 'Zum Mitnehmen, Ausdrucken oder als E-Mail-Anhang.',
          link: 'Lebenslauf herunterladen →',
        },
        ad: { title: 'Gesucht: ein Gespräch', text: 'Über Stellen, Projekte und Schach.', link: 'Schreiben →' },
      },
    },
    about: {
      title: 'Wer diese Gazette schreibt',
      lead: 'Ein Softwareentwickler aus Belo Horizonte, in wenigen Absätzen und einem Steckbrief.',
      p1: 'Raphael Sena studiert Softwaretechnik an der PUC Minas und arbeitet mit Plattformen für elektronisches Fahrgeldmanagement und die Einnahmenverwaltung im Nahverkehr. Zu den Vorlieben zählen das Programmieren, das Erheben von Anforderungen und die Verbindung beider zu einem Produkt.',
      p2: '[ABSATZ ÜBER MICH: wie das Programmieren begann, was antreibt und was jetzt gesucht wird.]',
      quote: '[EIN EIGENER SATZ ZUM HERVORHEBEN]',
      p3: '[ZWEITER ABSATZ: eine Arbeitsweise, ein Wert, etwas, das der Leserschaft in Erinnerung bleiben soll.]',
      portrait: '[PORTRÄT]',
      portraitCaption: 'Abb. 1 — [PORTRÄTUNTERSCHRIFT]',
      portraitAlt: 'Platzhalter für das Porträt von Raphael Sena',
      sheet: {
        title: 'Steckbrief der Redaktion',
        city: 'Stadt',
        cityValue: 'Belo Horizonte, MG',
        education: 'Ausbildung',
        educationValue: 'Softwaretechnik, PUC Minas',
        interests: 'Interessen',
        interestsValue: 'Softwarearchitektur und Anforderungen',
        outside: 'Abseits des Codes',
        outsideValue: 'Schach',
      },
    },
    experience: {
      title: 'Erfahrung und Ausbildung',
      lead: 'Was bisher geleistet wurde, wo und mit welchen Werkzeugen.',
      jobsTitle: 'Erfahrung',
      jobs: {
        modaxo: {
          role: '[POSITION]',
          text: 'Plattformen für elektronisches Fahrgeldmanagement und die Einnahmenverwaltung im Nahverkehr.',
        },
        agencia: {
          role: 'Leitung des Back-End-Teams im Projekt Cuido Bem',
          text: 'Code-Reviews, Unit-Tests für die MVC-Struktur und ein GlobalExceptionHandler zur Behandlung von Back-End-Ausnahmen.',
        },
        avaso: {
          role: 'Field Support Engineer (Service Desk, freiberuflich)',
          text: 'Englischsprachiger Support für einen multikulturellen Nutzerkreis: Diagnose und Behebung von Problemen an Desktops, Notebooks, virtuellen Maschinen, Smartphones, Servern, Backups, VoIP-Telefonen und Peripheriegeräten, dokumentiert in einem Ticketsystem.',
        },
        puc: {
          role: 'IT-Techniker (Service Desk und Help Desk)',
          text: 'Konfiguration und Prüfung von Netzwerken, Hardwareinstallation, Wartung von Computern und Support der Stufe 1 mit Active Directory, Ticketsystem, VPN sowie Verzeichnis- und Druckerzuordnung, im Rahmen der vereinbarten Servicelevel. Mitarbeit an einem Migrationsprojekt für die Telefonie.',
        },
      },
      educationTitle: 'Ausbildung',
      education: {
        puc: {
          title: 'Bachelorstudium Softwaretechnik',
          place: 'Belo Horizonte, MG, Brasilien',
          text: 'Systementwicklung, Anforderungsanalyse und Softwarearchitektur, mit Schwerpunkt auf Back-End und agilen Methoden.',
        },
        kogarah: {
          title: 'Schüleraustausch (Klasse 11)',
          place: 'Sydney, NSW, Australien',
          text: 'Schüleraustausch in Sydney, Australien.',
        },
      },
      coursesTitle: 'Weitere Kurse',
      courses: {
        redhat: 'RH124: Red Hat System Administration I',
        udemy: 'Java: Komplettkurs',
        aluraJava: 'Java-Lehrgang: objektorientierte Programmierung',
        aluraJs: 'JavaScript-Back-End-Lehrgang',
      },
      certificate: 'Zertifikat ansehen →',
      aside: {
        title: 'Im Blickpunkt',
        text: 'Lieber auf einer einzigen Seite? Der Lebenslauf fasst all das zusammen.',
        callout: 'Lebenslauf als PDF',
        link: 'Lebenslauf herunterladen →',
      },
    },
    projects: {
      title: 'Veröffentlichte Werke',
      lead: 'Ausgewählte Projekte, jeweils mit Stack und Link zum Code.',
      stack: 'Stack',
      figure: 'Abb. {n} — [PROJEKT-SCREENSHOT]',
      figureAlt: 'Platzhalter für den Screenshot des Projekts {name}',
      descriptions: {
        remediar:
          'Webplattform, die Medikamentenspenden, Bestand und Verteilung der NGO Remediar organisiert, gebaut mit Spring-Boot-Microservices, Next.js und Docker.',
        'dress-manager':
          'Anwendung zur Verwaltung von Kleidern für Renata Senna: Fullstack-Software mit Java, Spring Boot, Next.js und TypeScript, gestaltet mit Tailwind CSS.',
        'recipes-and-flavors':
          'Webanwendung zum Teilen von Kochrezepten, mit Back-End in Java und Spring Boot und Front-End in Next.js, TypeScript und Tailwind CSS.',
        portfolio: 'Persönliches Portfolio.',
        'relatorio-fotografico':
          'Verwaltung für Fotoberichte: Windows-Anwendung auf Basis der Java JRE, entwickelt für die Unternehmen Eletronet und New Energy. Sie erzeugt PDF-Berichte mit den Positionen und Kundendaten für die von CEMIG geforderte REI-Inspektion; CEMIG ist Kunde beider Unternehmen.',
      },
    },
    technologies: {
      title: 'Handwerkszeug',
      lead: 'Sprachen, Frameworks und Werkzeuge aus Beruf und Projekten.',
      groups: {
        languages: 'Sprachen',
        frontend: 'Front-End',
        mobile: 'Mobile',
        backend: 'Back-End und Frameworks',
        databases: 'Datenbanken',
        devops: 'DevOps und Cloud',
        observability: 'Observability',
        messaging: 'Messaging und Caching',
        tools: 'Entwicklungswerkzeuge',
      },
    },
    timeline: {
      title: 'Frühere Ausgaben',
      lead: 'Jede Version des Portfolios bleibt online, von der ältesten bis zur neuesten.',
      stack: 'Stack',
      changed: 'Was sich geändert hat',
      learned: 'Was gelernt wurde',
      now: 'Jetzt',
      current: 'Aktuelle Ausgabe',
      open: '/{year} öffnen',
      soon: 'Demnächst',
      backCurrent: 'Zurück zur aktuellen Ausgabe',
      figure: '[SCREENSHOT DER VERSION {year}]',
      figureAlt: 'Platzhalter für den Screenshot der Version {year}',
      archivedStack: 'Next.js 14, React 18, TypeScript und Tailwind CSS 3',
      placeholderChanged: '[EIN SATZ ZU DESIGN UND CODE]',
      placeholderLearned: '[EIN SATZ ZUM GELERNTEN]',
      currentStack: 'Next.js 16, React 19, TypeScript, Tailwind CSS 4 und Cloudflare Workers',
      currentChanged: 'Gazette von 1900 in Schwarz-Weiß, mit Seitenumblättern und einem Computer, der sich dreht.',
      currentLearned: '[EIN SATZ ZUM GELERNTEN]',
    },
    contact: {
      title: 'Leserbriefe',
      lead: 'Drei Wege, die Redaktion dieser Gazette zu erreichen.',
      p1: 'Ein Gespräch über eine Stelle, ein Projekt oder eine Partie Schach? Gern schreiben. Leserbriefe werden in der Regel zügig beantwortet.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'E-Mail',
      ad: {
        title: 'Anzeige',
        callout: 'Gesucht: ein Gespräch',
        text: 'Über Stellen, Projekte und Schach.',
        link: 'Lebenslauf als PDF herunterladen →',
      },
    },
    privacy: {
      title: 'Datenschutz',
      lead: 'Wie diese Website Besuche misst.',
      intro: 'Diese Website zählt Besuche mit Umami, einem Analytics-Werkzeug, das auf einem eigenen Server läuft.',
      items: [
        'Es werden keine Cookies verwendet.',
        'Es werden keine Personen identifiziert: Es gibt weder Login noch Registrierung noch eine persönliche Kennung.',
        'Die Do-Not-Track-Einstellung des Browsers wird beachtet: Ist sie aktiv, wird kein Besuch und kein Ereignis gesendet.',
        'Erfasst werden nur aggregierte Nutzungsdaten, etwa besuchte Seiten, Herkunft des Besuchs, Land, Gerätetyp sowie Klicks auf Links und Schaltflächen der Website.',
        'Die Daten werden weder verkauft noch an Werbenetzwerke weitergegeben.',
      ],
    },
  },
  notFound: {
    title: 'Seite nicht gefunden | Raphael Sena',
    heading: 'Seite nicht gefunden',
    text: 'Die geöffnete Adresse existiert in dieser Ausgabe nicht.',
  },
};
