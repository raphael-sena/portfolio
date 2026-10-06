/** pt-BR: fonte de verdade. O tipo `Dictionary` é derivado deste objeto; en e de precisam ter as mesmas chaves. */
export const pt = {
  common: {
    siteName: 'Raphael Sena',
    tagline: 'Gazeta de um desenvolvedor de software',
    dateline: {
      place: 'Belo Horizonte, Minas Gerais',
      edition: 'Edição de 2026',
      price: 'Preço: um clique',
      page: 'Página',
    },
    mastheadBoxes: {
      left: ['Engenharia de Software', 'PUC Minas'],
      right: ['Belo Horizonte', 'Minas Gerais'],
    },
    nav: {
      label: 'Principal',
      home: 'Início',
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      technologies: 'Tecnologias',
      timeline: 'Linha do tempo',
      contact: 'Contato',
    },
    footer: { privacy: 'Privacidade' },
    skipLink: 'Pular para o conteúdo',
    language: { label: 'Idioma', current: 'idioma atual' },
    ear: { hint: 'Puxe a orelha · página {n} →', aria: 'Virar a página: {section}, página {n}' },
    mac: {
      aria: 'Computador compacto em 3D: arraste, use as setas do teclado ou os botões para girar',
      caption: 'Fig. 1 — Computador compacto, em vista giratória. Arraste para examinar.',
      left: 'Girar à esquerda',
      reset: 'Reiniciar',
      right: 'Girar à direita',
      angle: 'Rotação horizontal: {angle} graus',
    },
    backHome: 'Voltar ao início',
    present: 'atual',
    openRepo: 'Código no GitHub →',
    placeholder: { role: '[CARGO]', period: '[PERÍODO]' },
  },
  meta: {
    home: {
      title: 'Raphael Sena | Desenvolvedor de software em Belo Horizonte',
      description:
        'Portfólio de Raphael Sena, desenvolvedor de software em Belo Horizonte: experiência, projetos e tecnologias, numa gazeta de 1900.',
    },
    about: {
      title: 'Sobre | Raphael Sena',
      description:
        'Quem é Raphael Sena: desenvolvedor de software de Belo Horizonte, estudante de Engenharia de Software.',
    },
    experience: {
      title: 'Experiência e formação | Raphael Sena',
      description:
        'Experiência profissional, formação e cursos de Raphael Sena, com as ferramentas usadas em cada etapa.',
    },
    projects: {
      title: 'Projetos | Raphael Sena',
      description: 'Projetos publicados por Raphael Sena no GitHub: stack, descrição e link do código.',
    },
    technologies: {
      title: 'Tecnologias | Raphael Sena',
      description:
        'Linguagens, frameworks, bancos de dados e ferramentas que Raphael Sena usa no desenvolvimento de software.',
    },
    timeline: {
      title: 'Linha do tempo | Raphael Sena',
      description: 'As versões anteriores deste portfólio, da mais antiga à mais recente, cada uma com a sua stack.',
    },
    contact: {
      title: 'Contato | Raphael Sena',
      description: 'Fale com Raphael Sena sobre vagas, projetos ou xadrez: GitHub, LinkedIn e e-mail.',
    },
    privacy: {
      title: 'Privacidade | Raphael Sena',
      description: 'Como este site mede visitas: analytics sem cookies, em servidor próprio, sem identificar ninguém.',
    },
  },
  pages: {
    home: {
      kicker: 'Última edição',
      headline: 'Desenvolvedor de software apresenta suas obras ao público',
      lead: 'Estudante de Engenharia de Software reúne projetos, experiência e uma máquina que gira.',
      body: 'Raphael Sena estuda Engenharia de Software na PUC Minas e trabalha com plataformas de bilhetagem eletrônica e gestão de receita de transporte. Gosta de programar, de levantar requisitos e de transformar os dois em produto.',
      continue: 'Continua em Sobre, página 2 →',
      aside: {
        title: 'Em destaque',
        timeline: {
          title: 'Como este site mudou',
          text: 'Cada versão do portfólio continua no ar, da mais antiga à mais recente.',
          link: 'Ver a linha do tempo →',
        },
        resume: {
          title: 'Currículo em PDF',
          text: 'Para levar, imprimir ou anexar a um e-mail.',
          link: 'Baixar o currículo →',
        },
        ad: { title: 'Procura-se conversa', text: 'Sobre vagas, projetos e xadrez.', link: 'Escrever →' },
      },
    },
    about: {
      title: 'Quem escreve esta gazeta',
      lead: 'Um desenvolvedor de software de Belo Horizonte, em poucos parágrafos e uma ficha.',
      p1: 'Raphael Sena estuda Engenharia de Software na PUC Minas e trabalha com plataformas de bilhetagem eletrônica e gestão de receita de transporte. Gosta de programar, de levantar requisitos e de transformar os dois em produto.',
      p2: '[PARÁGRAFO SOBRE VOCÊ: como começou a programar, o que te move e o que você procura agora.]',
      quote: '[UMA FRASE SUA PARA DESTACAR]',
      p3: '[SEGUNDO PARÁGRAFO: um jeito de trabalhar, um valor, algo que o leitor deva lembrar.]',
      portrait: '[RETRATO]',
      portraitCaption: 'Fig. 1 — [LEGENDA DO RETRATO]',
      portraitAlt: 'Espaço reservado para o retrato de Raphael Sena',
      sheet: {
        title: 'Ficha do redator',
        city: 'Cidade',
        cityValue: 'Belo Horizonte, MG',
        education: 'Formação',
        educationValue: 'Engenharia de Software, PUC Minas',
        interests: 'Interesses',
        interestsValue: 'Arquitetura de software e requisitos',
        outside: 'Fora do código',
        outsideValue: 'Xadrez',
      },
    },
    experience: {
      title: 'Experiência e formação',
      lead: 'O que já foi feito, onde e com quais ferramentas.',
      jobsTitle: 'Experiência',
      jobs: {
        modaxo: {
          role: '[CARGO]',
          text: 'Plataformas de bilhetagem eletrônica e gestão de receita de transporte.',
        },
        agencia: {
          role: 'Líder do time de back-end no projeto Cuido Bem',
          text: 'Revisão de código, testes unitários da estrutura MVC e um GlobalExceptionHandler para tratar as exceções do back-end.',
        },
        avaso: {
          role: 'Field Support Engineer (Service Desk, freelance)',
          text: 'Suporte em inglês a uma base de usuários multicultural: diagnóstico e solução de problemas em desktops, notebooks, máquinas virtuais, smartphones, servidores, backup, telefonia VoIP e periféricos, com registro em sistema de chamados.',
        },
        puc: {
          role: 'Técnico de TI (Service Desk e Help Desk)',
          text: 'Configuração e verificação de redes, instalação de hardware, manutenção de computadores e suporte de nível 1 com Active Directory, sistema de chamados, VPN e mapeamento de diretórios e impressoras, dentro dos acordos de nível de serviço. Participação em um projeto de migração de telefonia.',
        },
      },
      educationTitle: 'Formação',
      education: {
        puc: {
          title: 'Bacharelado em Engenharia de Software',
          place: 'Belo Horizonte, MG, Brasil',
          text: 'Desenvolvimento de sistemas, análise de requisitos e arquitetura de software, com ênfase em back-end e metodologias ágeis.',
        },
        kogarah: {
          title: 'Intercâmbio no ensino médio (2º ano)',
          place: 'Sydney, NSW, Austrália',
          text: 'Intercâmbio de ensino médio em Sydney, na Austrália.',
        },
      },
      coursesTitle: 'Cursos extras',
      courses: {
        redhat: 'RH124: Red Hat System Administration I',
        udemy: 'Java: curso completo',
        aluraJava: 'Formação Java: orientação a objetos',
        aluraJs: 'Formação JavaScript back-end',
      },
      certificate: 'Ver certificado →',
      aside: {
        title: 'Em destaque',
        text: 'Prefere o formato de uma página só? O currículo reúne tudo isto.',
        callout: 'Currículo em PDF',
        link: 'Baixar o currículo →',
      },
    },
    projects: {
      title: 'Obras publicadas',
      lead: 'Projetos em destaque, cada um com a stack e o link do código.',
      stack: 'Stack',
      figure: 'Fig. {n} — [CAPTURA DO PROJETO]',
      figureAlt: 'Espaço reservado para a captura do projeto {name}',
      descriptions: {
        remediar:
          'Plataforma web que organiza doações, estoque e distribuição de medicamentos da ONG Remediar, feita com microsserviços Spring Boot, Next.js e Docker.',
        'dress-manager':
          'Aplicativo de gestão de vestidos para Renata Senna: software fullstack em Java, Spring Boot, Next.js e TypeScript, estilizado com Tailwind CSS.',
        'recipes-and-flavors':
          'Aplicação web para compartilhar receitas de culinária, com back-end em Java e Spring Boot e front-end em Next.js, TypeScript e Tailwind CSS.',
        portfolio: 'Portfólio pessoal.',
        'relatorio-fotografico':
          'Gerenciador de Relatório Fotográfico: aplicação para Windows, com Java JRE, desenvolvida para as empresas Eletronet e New Energy. Gera relatórios em PDF com os itens e o cliente, para a inspeção do REI exigido pela CEMIG, cliente das empresas.',
      },
    },
    technologies: {
      title: 'Ferramentas do ofício',
      lead: 'Linguagens, frameworks e ferramentas do trabalho e dos projetos.',
      groups: {
        languages: 'Linguagens',
        frontend: 'Front-end',
        mobile: 'Mobile',
        backend: 'Back-end e frameworks',
        databases: 'Bancos de dados',
        devops: 'DevOps e nuvem',
        observability: 'Observabilidade',
        messaging: 'Mensageria e cache',
        tools: 'Ferramentas de desenvolvimento',
      },
    },
    timeline: {
      title: 'Edições anteriores',
      lead: 'Cada versão do portfólio continua no ar, da mais antiga à mais recente.',
      stack: 'Stack',
      changed: 'O que mudou',
      learned: 'O que aprendi',
      now: 'Agora',
      current: 'Edição atual',
      open: 'Abrir /{year}',
      soon: 'Em breve',
      backCurrent: 'Voltar à edição atual',
      figure: '[CAPTURA DA VERSÃO DE {year}]',
      figureAlt: 'Espaço reservado para a captura da versão de {year}',
      archivedStack: 'Next.js 14, React 18, TypeScript e Tailwind CSS 3',
      placeholderChanged: '[UMA FRASE SOBRE O DESIGN E O CÓDIGO]',
      placeholderLearned: '[UMA FRASE SOBRE O APRENDIZADO]',
      currentStack: 'Next.js 16, React 19, TypeScript, Tailwind CSS 4 e Cloudflare Workers',
      currentChanged: 'Gazeta de 1900 em preto e branco, com virada de página e um computador que gira.',
      currentLearned: '[UMA FRASE SOBRE O APRENDIZADO]',
    },
    contact: {
      title: 'Cartas à redação',
      lead: 'Três maneiras de falar com o autor desta gazeta.',
      p1: 'Quer conversar sobre uma vaga, um projeto ou uma partida de xadrez? Escreva. As cartas à redação costumam ser respondidas com rapidez.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'E-mail',
      ad: {
        title: 'Anúncio',
        callout: 'Procura-se conversa',
        text: 'Sobre vagas, projetos e xadrez.',
        link: 'Baixar o currículo em PDF →',
      },
    },
    privacy: {
      title: 'Privacidade',
      lead: 'Como este site mede visitas.',
      intro:
        'Este site mede o número de visitas com o Umami, uma ferramenta de analytics que roda em servidor próprio.',
      items: [
        'Não usa cookies.',
        'Não identifica pessoas: não há login, cadastro nem identificador pessoal.',
        'Respeita o Do Not Track do navegador: com ele ligado, nenhuma visita ou evento é enviado.',
        'Registra apenas dados de uso agregados, como páginas visitadas, origem da visita, país, tipo de dispositivo e cliques em links e botões do site.',
        'Os dados não são vendidos nem compartilhados com redes de publicidade.',
      ],
    },
  },
  notFound: {
    title: 'Página não encontrada | Raphael Sena',
    heading: 'Página não encontrada',
    text: 'O endereço que você abriu não existe nesta edição.',
  },
};
