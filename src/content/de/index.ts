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
    jobTitle: 'Softwareentwickler',
    tagline: 'Gazette eines Softwareentwicklers',
    dateline: {
      place: 'Belo Horizonte, Minas Gerais',
      edition: 'Ausgabe 2026',
      price: 'Preis: ein Klick',
      page: 'Seite',
    },
    nav: {
      label: 'Hauptmenü',
      home: 'Startseite',
      about: 'Über mich',
      experience: 'Erfahrung',
      projects: 'Projekte',
      technologies: 'Technologien',
      timeline: 'Zeitleiste',
      contact: 'Kontakt',
    },
    footer: {
      privacy: 'Datenschutz',
      mark: 'Vignette im Titel: Diagramm einer Linotype, der Maschine, die den Text der Zeitungen setzte. De Vinne, 1904. Gemeinfrei.',
      markSource: 'Wikimedia Commons',
      initial:
        'Initiale auf der Seite „Über mich“: Illustration aus „The Last Chronicle of Barset“, Band 1, von Anthony Trollope. Gemeinfrei.',
    },
    skipLink: 'Zum Inhalt springen',
    language: { label: 'Sprache', current: 'aktuelle Sprache' },
    ear: { hint: 'Ecke ziehen · Seite {n} →', aria: 'Seite umblättern: {section}, Seite {n}' },
    mac: {
      aria: 'Kompakter Computer in 3D: zum Drehen ziehen, die Pfeiltasten oder die Schaltflächen verwenden',
      caption: 'Abb. 1 — Kompakter Computer, drehbare Ansicht. Zum Betrachten ziehen.',
      captionStatic: 'Abb. 1 — Kompakter Computer, drehbare Ansicht.',
      left: 'Nach links drehen',
      reset: 'Zurücksetzen',
      right: 'Nach rechts drehen',
      angle: 'Horizontale Drehung: {angle} Grad',
      posterAlt: 'Kompakter Computer: ein Apple II mit Monitor, Tastatur und Diskettenlaufwerk.',
      credit: { model: '3D-Modell', by: 'von', modified: 'Geändert: Texturen und Netz für das Web komprimiert.' },
    },
    backHome: 'Zurück zur Startseite',
    present: 'heute',
    mobile: {
      menu: 'Abschnittsmenü',
      sections: 'Abschnitte',
      prev: 'Zurück',
      next: 'Weiter',
      prevAria: 'Vorherige Seite: {section}, Seite {n}',
      nextAria: 'Nächste Seite: {section}, Seite {n}',
      of: '{n} von {total}',
      lastEdition: 'Neueste Ausgabe',
    },
    openRepo: 'Code auf GitHub →',
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
      body: 'Softwareentwicklung mit Schwerpunkt Back-End, zwischen elektronischen Fahrgeldmanagement-Systemen im Produktivbetrieb bei Modaxo und einer von Grund auf entwickelten mandantenfähigen ERP-Plattform mit Java und Spring Boot, mit Anforderungserhebung direkt bei den Entscheidenden. Studium der Softwaretechnik an der PUC Minas.',
      continue: 'Weiter unter Über mich, Seite 2 →',
      edition: {
        title: 'In dieser Ausgabe',
        items: {
          about: {
            title: 'Wer diese Gazette schreibt',
            text: 'Ein Softwareentwickler aus Belo Horizonte und das Profil des Redakteurs.',
          },
          experience: {
            title: 'Erfahrung und Ausbildung',
            text: 'Was bisher entstanden ist, wo und mit welchen Werkzeugen.',
          },
          projects: { title: 'Veröffentlichte Werke', text: 'Ausgewählte Projekte, jeweils mit Stack und Ergebnis.' },
          technologies: { title: 'Werkzeuge des Handwerks', text: 'Was ich täglich nutze, nach Bereichen geordnet.' },
          timeline: { title: 'Frühere Ausgaben', text: 'Jede Version des Portfolios ist weiterhin online.' },
          contact: { title: 'Briefe an die Redaktion', text: 'Wege, den Autor dieser Gazette zu erreichen.' },
        },
      },
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
      p1: 'Raphael Sena ist Softwareentwickler mit Schwerpunkt Back-End und arbeitet parallel in zwei Java/Spring-Boot-Codebasen: Ticketing-Systeme im Produktivbetrieb mit über 177.000 Nutzenden bei Modaxo und, als freiberufliche Backend-Entwicklung, eine von Grund auf gebaute mandantenfähige ERP- und Steuerplattform mit Java 21, PostgreSQL, Flyway und ereignisgesteuerter Architektur. Sicher darin, ein Feature vom Datenmodell und der Persistenz mit JPA/Hibernate über das REST-API-Design und die Tests bis zum Release zu verantworten. In beiden Projekten bin ich außerdem direkt für die Anforderungserhebung und die Übersetzung fachlicher Bedürfnisse in technische Lösungen verantwortlich, ohne Product-/BA-Ebene zwischen mir und den Entscheidenden. Studium der Softwaretechnik an der PUC Minas. Englisch C1, Spanisch A2.',
      p2: 'Softwareentwickler bin ich heute, angefangen habe ich im IT-Support. Nach dem Auslandsaufenthalt in Sydney arbeitete ich im Service Desk und Help Desk und baute eine Grundlage in Troubleshooting, Netzwerken, Hardware und Unternehmenssupport auf. Diese kundennahe technische Basis führte mich zur Softwareentwicklung: Heute baue und modernisiere ich reale Mobilitäts- und ERP-Systeme und stärke meine Grundlagen an der PUC Minas (2023–2027).',
      quote: 'Der Kundensupport hat mich zur Softwareentwicklung geführt.',
      p3: 'Außerhalb des Codes spiele ich gern Schach, das Konzentration, logisches Denken und strategische Entscheidungen fördert und mir hilft, Problemlösung zu üben. Auch in der Musik bin ich vielseitig: Ich höre viel Bossa Nova, Samba und MPB sowie Neo-Psychedelia, Indie, Indie-Rock und Jazz.',
      figureCaption: 'Abb. 1 — „The Newspaper Correspondent“, Radierung von Edwin Forbes, 1876. Gemeinfrei.',
      figureSource: 'Wikimedia Commons',
      figureAlt:
        'Radierung von Edwin Forbes, 1876: ein Zeitungskorrespondent im Galopp auf einer Straße am dichten Wald, mit Nachrichten von der Schlacht.',
      sheet: {
        title: 'Steckbrief der Redaktion',
        city: 'Stadt',
        cityValue: 'Belo Horizonte, MG',
        education: 'Ausbildung',
        educationValue: 'Softwaretechnik, PUC Minas',
        interests: 'Interessen',
        interestsValue: 'Softwarearchitektur und Anforderungen',
        outside: 'Abseits des Codes',
        outsideValue: 'Schach und Musik',
        languages: 'Sprachen',
        languagesValue: 'Portugiesisch (Muttersprache), Englisch (C1), Spanisch (A2), Deutsch (B1)',
      },
    },
    experience: {
      title: 'Erfahrung und Ausbildung',
      lead: 'Was bisher geleistet wurde, wo und mit welchen Werkzeugen.',
      jobsTitle: 'Erfahrung',
      jobs: {
        newenergy: {
          role: 'Backend-Entwicklung (freiberuflich, remote)',
          items: [
            {
              title: 'Precifique: Preis- und Steuerberechnung (von Grund auf)',
              text: 'Ein kommerzielles System zur Preiskalkulation und brasilianischen Steuerberechnung von Grund auf gebaut, mit Java 21, Spring Boot 3.2, PostgreSQL und Flyway-Migrationen, als Ersatz für einen alten Excel-Ablauf. Die steuerliche Klassifizierung nach NCM über JPA/Hibernate-Beziehungen modelliert und die Steuerdaten-API von IBPT eingebunden.',
            },
            {
              title: 'Kvaris: mandantenfähige ERP-Plattform',
              text: 'Precifique zu einem breiteren mandantenfähigen ERP ausgebaut, das zwei juristische Personen auf einer gemeinsamen Datenbank bedient, mit Mandantentrennung über einen anfragebezogenen TenantContext/TenantInterceptor. Die Pipeline aus Vertrieb, Einkauf, WMS, Steuern und Finanzen als modularen Monolithen entworfen, mit interner ereignisgesteuerter Kommunikation (Spring ApplicationEventPublisher) und einer eigenen Zustandsmaschine für die Statuswechsel der Aufträge.',
            },
            {
              title: 'Anforderungen und Stakeholder',
              text: 'Als einzige technische Ansprechperson zwischen fachlichem Bedarf und System tätig: Die Anforderungen direkt bei den Gesellschaftern und im Betrieb beider betreuten Unternehmen erhoben, ohne Product Owner oder Business Analyst dazwischen, und einen manuellen Tabellenprozess in ein vollständiges Datenmodell und einen durchgängigen Systemablauf überführt.',
            },
            {
              title: 'Authentifizierung und Integrationen',
              text: 'Single Sign-on mit OAuth2/OIDC über Microsoft Entra ID (Azure AD) mit rollenbasierten App Roles umgesetzt, dazu geplante Synchronisierungsjobs mit APIs externer ERP-Systeme für beide Unternehmen.',
            },
            {
              title: 'Technisches Urteilsvermögen',
              text: 'Architekturentscheidungen bewusst gegen Überengineering getroffen: kostengünstiges VPS/PaaS-Hosting statt verwalteter Cloud-Dienste und ein vereinfachtes internes Outbox-Muster statt einer Kafka/Debezium-Pipeline. Aktuell in aktiver Entwicklung auf einer Staging-Umgebung, mit Live-Demo.',
            },
          ],
        },
        modaxo: {
          role: 'Software Engineer',
          items: [
            {
              title: 'Sigom Cloud: Zahlungsbericht (Java)',
              text: 'Die Erzeugung des Zahlungsberichts in Java/Spring Boot auf einer Plattform für Einnahmenverwaltung im Nahverkehr neu aufgebaut und den geschätzten Rechenaufwand bei großen Datenmengen von 20 Mio. bis 1 Billion auf 1 Mio. Operationen gesenkt; die zugehörigen REST-Endpunkte durchgängig geliefert.',
            },
            {
              title: 'Korrektive und evolutionäre Wartung (SIGO)',
              text: 'Entwicklung und Wartung von Java/Spring-Boot-Diensten hinter einem elektronischen Ticketing-Produkt, das in 47 Städten mit über 695.000 Downloads im Einsatz ist: Produktionsvorfälle untersuchen und beheben, Funktionen weiterentwickeln und REST-Integrationen in einem verteilten, dienstorientierten Back-End pflegen.',
            },
            {
              title: 'Datenintegrität über Systeme hinweg',
              text: 'Datenbankversionierung und Migrationen in 120 Produktivsystemen mit Liquibase automatisiert, manuelle SQL-Abweichungen beseitigt und das Deployment-Risiko für ältere Java-Dienste gesenkt.',
            },
            {
              title: 'Arbeitsweise',
              text: 'Arbeit in Scrum-Squads: technische Refinements und Schätzungen, Code-Reviews, Nachverfolgung und Dokumentation in Jira/Confluence sowie inkrementelle Lieferung gemeinsam mit den Produktverantwortlichen.',
            },
          ],
        },
        avaso: {
          role: 'Field Support Engineer',
          items: [
            {
              title: 'Service Desk (freiberuflich)',
              text: 'Hardware- und Softwarestörungen an Desktops, Notebooks, virtuellen Maschinen, Servern, Backup-Systemen, VoIP-Geräten und Peripherie behoben und dabei 95 % SLA-Einhaltung für einen multikulturellen englischsprachigen Nutzerkreis erreicht, als zugeteilte Fachkraft für internationale Kunden.',
            },
          ],
        },
        puc: {
          role: 'IT-Techniker',
          items: [
            {
              title: 'Telefonie-Migration',
              text: 'Eine VoIP-Migration für über 100 Nutzende geleitet, die logische Netzwerktopologie neu konfiguriert und die Endgeräte-Hardware während der Umstellung installiert.',
            },
            {
              title: 'Service Desk und Help Desk',
              text: 'Technischen Support der Stufe 1 mit Active Directory, Ticketsystem (CSC), VPN sowie Verzeichnis- und Druckerzuordnung geleistet, im Rahmen der vereinbarten Servicelevel.',
            },
          ],
        },
      },
      pucNote: 'Trägerstiftung der PUC Minas',
      educationTitle: 'Ausbildung',
      education: {
        puc: {
          title: 'Bachelorstudium Softwaretechnik',
          place: 'Belo Horizonte, MG, Brasilien',
          items: [
            {
              title: 'Experimentelle Softwareagentur (PMMG)',
              text: 'Tech Lead der HR-Recruiting-Plattform der Militärpolizei von Minas Gerais mit über 40.000 Bewerbenden pro Auswahlverfahren, mit Verantwortung für den Umfang von der Anforderungserhebung beim Kunden bis zur Lieferung.',
            },
            {
              title: 'Champion im interdisziplinären Projekt (2x)',
              text: 'Zwei ausgezeichnete Teams geleitet, die Produktivsoftware für externe Kunden lieferten, einschließlich der Erhebung der Bedürfnisse jedes Kunden.',
            },
            {
              title: 'Forschungsprojekt',
              text: 'Mitglied einer Forschungsgruppe unter der Leitung von Prof. Lucila Ishitani, mit Veröffentlichung eines Artikels über Produktivität in der Softwaretechnik.',
            },
          ],
        },
        kogarah: {
          title: 'Schüleraustausch',
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
          'Preisgekrönte ERP-Plattform, gebaut und eingeführt für die NGO Remediar, eine Organisation für Medikamentenspenden: Bestand, Spenden und Berichte, mit Anforderungen, die direkt mit dem Team der NGO erhoben wurden. Spring-Boot-Microservices, Next.js, PostgreSQL, Docker, Nginx und CI/CD.',
        'dress-manager':
          'Anwendung zur Verwaltung von Kleidern für Renata Senna: Fullstack-Software mit Java, Spring Boot, Next.js und TypeScript, gestaltet mit Tailwind CSS.',
        'rural-erp':
          'Abschlussprojekt: modulares ERP für Kleinerzeuger mit einem Modul zur Bewässerungssteuerung, entworfen mit DDD und mit ATAM validiert. Anforderungen direkt bei einem echten Agronomen, dem Kunden des Projekts, erhoben. Es umfasst einen agronomischen Copiloten mit LLM und RAG über öffentliche Agrardaten sowie Anomalieerkennung in Sensordaten.',
        portfolio: 'Persönliches Portfolio.',
      },
    },
    technologies: {
      title: 'Handwerkszeug',
      lead: 'Sprachen, Frameworks und Werkzeuge aus Beruf und Projekten.',
      groups: {
        languages: 'Sprachen',
        backend: 'Back-End',
        architecture: 'Architektur',
        databases: 'Datenbanken',
        auth: 'Authentifizierung und Integration',
        devops: 'DevOps und Cloud',
        testing: 'Tests und Qualität',
        observability: 'Observability und Messaging',
        requirements: 'Anforderungen und Produkt',
        frontend: 'Front-End',
        mobile: 'Mobile',
        practices: 'Arbeitsweisen',
        domain: 'Fachgebiete',
      },
      extra: {
        requirements: [
          'Anforderungserhebung und -klärung',
          'Direkte Kommunikation mit fachlichen Stakeholdern',
          'Übersetzung fachlicher Bedürfnisse in technische Lösungen',
          'Umfang und funktionale Dokumentation',
          'Brasilianische Steuer- und Fiskalfachlichkeit',
        ],
        auth: ['Anbindung von Drittanbieter-APIs'],
        testing: ['Automatisierte Tests', 'Code-Reviews'],
        practices: ['Remote-Zusammenarbeit'],
        domain: ['Fintech und brasilianisches Steuerrecht (ICMS, IPI, PIS/COFINS, NCM)', 'KI-gestützte Produkte'],
      },
    },
    timeline: {
      title: 'Frühere Ausgaben',
      lead: 'Jede Version des Portfolios bleibt online, von der ältesten bis zur neuesten.',
      stack: 'Stack',
      changed: 'Was sich geändert hat',
      now: 'Jetzt',
      current: 'Aktuelle Ausgabe',
      open: '/{year} öffnen',
      soon: 'Demnächst',
      backCurrent: 'Zurück zur aktuellen Ausgabe',
      figureAlt: 'Screenshot der Version {year} des Portfolios',
      figureAltCurrent: 'Screenshot der aktuellen Ausgabe des Portfolios',
      engravingAlt:
        'Stich eines Mannes im Frack mit Fliege, im Profil, der eine Uhrkette hält; vor ihm, im Vordergrund, eine große Taschenuhr.',
      engravingCaption:
        'Abb. 1 — „Left-handed watches for left-handed people“, Popular Science Monthly, Band 88 (1916). Gemeinfrei.',
      engravingSource: 'Wikimedia Commons',
      changedByYear: {
        '2025':
          'Ergänzt den Bereich mit zusätzlichen Kursen samt Zertifikaten und den Lebenslauf-Bereich; die Technologieliste wird neu aufgebaut.',
        '2026':
          'Vorstellung neu geschrieben, Erfahrung aktualisiert (Modaxo, AVASO, Experimentelle Softwareagentur) und Projekt-Screenshots ergänzt.',
      },
      placeholderChanged: '[EIN SATZ ZU DESIGN UND CODE]',
      currentStack: 'Next.js 16, React 19, TypeScript, Tailwind CSS 4 und Cloudflare Workers',
      currentChanged: 'Gazette von 1900 in Schwarz-Weiß, mit Seitenumblättern und einem Computer, der sich dreht.',
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
