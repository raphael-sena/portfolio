import archivesJson from './archives.json';

/** Dados neutros de idioma: datas ISO, links, nomes de tecnologias, empresas e projetos. Textos ficam em src/content/{pt,en,de}. */

export interface ArchiveEntry {
  year: number;
  tag: string;
  sha: string;
  node: string;
  build: 'next-export' | 'static-html';
  basePath: string;
  /** Stack da época (neutra de idioma). */
  label: string;
  /** `true` só depois que o G7 gerar archive/<ano>/ e a rota /<ano>/ existir. */
  archived: boolean;
}
export const archives: ArchiveEntry[] = archivesJson as ArchiveEntry[];

export const CONTACT = {
  github: 'https://github.com/raphael-sena',
  linkedin: 'https://www.linkedin.com/in/raphael-sena/',
  email: 'rsenares1@gmail.com',
} as const;

export const RESUME_FILES = {
  pt: '/curriculo-raphael-sena.pdf',
  en: '/resume-raphael-sena.pdf',
  de: '/resume-raphael-sena.pdf',
} as const;

export interface Job {
  id: 'newenergy' | 'modaxo' | 'avaso' | 'puc';
  company: string;
  /** Mês ISO (`YYYY-MM`). */
  from: string;
  to: string | null;
  /** `true` quando o vínculo é atual (o período mostra "atual" no fim). */
  current: boolean;
}

/** Fonte: currículo do autor (public/resume-raphael-sena.pdf), atualizado em 2026-10-06. Do mais recente para o mais antigo. */
export const jobs: Job[] = [
  { id: 'newenergy', company: 'New Energy Soluções Elétricas', from: '2026-03', to: null, current: true },
  { id: 'modaxo', company: 'Modaxo', from: '2025-05', to: null, current: true },
  { id: 'avaso', company: 'AVASO Technology Solutions', from: '2023-09', to: '2025-05', current: false },
  { id: 'puc', company: 'Sociedade Mineira de Cultura', from: '2021-09', to: '2023-09', current: false },
];

export interface EducationItem {
  id: 'puc' | 'kogarah';
  institution: string;
  from: string;
  to: string;
}
export const education: EducationItem[] = [
  { id: 'puc', institution: 'PUC Minas', from: '2023-07', to: '2027-07' },
  { id: 'kogarah', institution: 'Kogarah High School', from: '2017-07', to: '2017-12' },
];

export interface ExtraCourse {
  id: 'redhat' | 'udemy' | 'aluraJava' | 'aluraJs';
  provider: string;
  date: string;
  /** Certificado (Google Drive, links já públicos no site anterior); varia por idioma em alguns cursos. */
  certificate: { pt: string; en: string; de: string };
}
const drive = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=sharing`;
export const extraCourses: ExtraCourse[] = [
  {
    id: 'redhat',
    provider: 'Red Hat',
    date: '2024-05',
    certificate: {
      pt: drive('13e21aJ5wTt2Vu235F29Jl2chxPXo8mbi'),
      en: drive('13e21aJ5wTt2Vu235F29Jl2chxPXo8mbi'),
      de: drive('13e21aJ5wTt2Vu235F29Jl2chxPXo8mbi'),
    },
  },
  {
    id: 'udemy',
    provider: 'Udemy',
    date: '2023-12',
    certificate: {
      pt: drive('13xjOGajuXWw6j6GkfqPmN-6VmLmCvU1k'),
      en: drive('1bEq4DXe6MPFIYGv728N0PRkvfyA5CQiI'),
      de: drive('1bEq4DXe6MPFIYGv728N0PRkvfyA5CQiI'),
    },
  },
  {
    id: 'aluraJava',
    provider: 'Alura',
    date: '2023-12',
    certificate: {
      pt: drive('1my2dosjLglVMcyOGIlx-ZGS9_FuIb7rV'),
      en: drive('1dxsLorrXwDCNB_u1-X7IrlB74zbVwC8M'),
      de: drive('1dxsLorrXwDCNB_u1-X7IrlB74zbVwC8M'),
    },
  },
  {
    id: 'aluraJs',
    provider: 'Alura',
    date: '2021-11',
    certificate: {
      pt: drive('1CClEytR90nr3xdyrK3P2FkjaeePeCyEI'),
      en: drive('1CClEytR90nr3xdyrK3P2FkjaeePeCyEI'),
      de: drive('1CClEytR90nr3xdyrK3P2FkjaeePeCyEI'),
    },
  },
];

/**
 * Projetos. `languages` (repositórios do GitHub): consulta única à API em 2026-10-05, sem token (linguagens com 35.000
 * bytes ou mais, no máximo 3). `stack` (currículo): lista de tecnologias que substitui `languages`. Sem `repo`, o cartão
 * não tem link de código.
 */
export interface Project {
  slug: 'remediar' | 'rural-erp' | 'dress-manager' | 'recipes-and-flavors' | 'portfolio' | 'relatorio-fotografico';
  name: string;
  repo?: string;
  languages?: string[];
  stack?: string[];
}
export const projects: Project[] = [
  {
    slug: 'remediar',
    name: 'Remediar',
    repo: 'https://github.com/raphael-sena/remediar',
    stack: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker', 'TypeScript', 'Next.js'],
  },
  {
    slug: 'rural-erp',
    name: 'Rural ERP + AI Copilot',
    stack: ['Java', 'Spring Boot', 'PostgreSQL + pgvector', 'MQTT', 'Go', 'Flutter', 'AWS'],
  },
  {
    slug: 'dress-manager',
    name: 'Dress Manager',
    repo: 'https://github.com/raphael-sena/dress-manager',
    languages: ['TypeScript', 'Java'],
  },
  {
    slug: 'recipes-and-flavors',
    name: 'Recipes & Flavors',
    repo: 'https://github.com/raphael-sena/recipes-and-flavors',
    languages: ['TypeScript', 'Java', 'HTML'],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    repo: 'https://github.com/raphael-sena/portfolio',
    languages: ['HTML', 'TypeScript'],
  },
  {
    slug: 'relatorio-fotografico',
    name: 'Relatório Fotográfico',
    repo: 'https://github.com/raphael-sena/relatorio-fotografico',
    languages: ['Java'],
  },
];

export type TechGroupId =
  | 'languages'
  | 'backend'
  | 'architecture'
  | 'databases'
  | 'auth'
  | 'devops'
  | 'testing'
  | 'observability'
  | 'frontend'
  | 'mobile'
  | 'practices'
  | 'domain';

/**
 * Nomes de tecnologias (neutros de idioma). Fonte: seção "Skills" do currículo (2026-10-06); front-end e mobile vêm dos
 * projetos (TypeScript, Next.js, React, Flutter) e do legado. Itens descritivos (ex.: "Code review") ficam no dicionário.
 */
export const technologies: Record<TechGroupId, string[]> = {
  languages: ['Java 8 a 21', 'TypeScript', 'C#', 'Dart', 'Go', 'SQL'],
  backend: ['Spring Boot', 'Spring Framework', 'Spring Security', 'REST APIs', 'JPA/Hibernate', 'Node.js'],
  architecture: [
    'Microservices',
    'Modular Monolith',
    'Event-Driven Architecture',
    'Domain-Driven Design',
    'Multi-Tenancy',
    'State Machines',
    'Distributed Systems',
    'System Integration',
  ],
  databases: ['PostgreSQL', 'Flyway', 'Liquibase', 'Oracle', 'MySQL', 'SQLite'],
  auth: ['OAuth2/OIDC', 'Microsoft Entra ID (Azure AD SSO)', 'Firebase'],
  devops: [
    'Docker',
    'Git',
    'CI/CD',
    'GitHub Actions',
    'Maven',
    'AWS (EC2, Lightsail)',
    'Google Cloud (BigQuery)',
    'Linux',
  ],
  testing: ['JUnit', 'Mockito', 'SonarQube'],
  observability: ['Grafana', 'Prometheus', 'Zipkin', 'Crashlytics', 'RabbitMQ', 'Redis'],
  frontend: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'HTML', 'CSS'],
  mobile: ['Flutter', 'Xamarin'],
  practices: ['Scrum', 'Kanban', 'Jira', 'Confluence', 'Git Flow'],
  domain: ['ERP', 'SaaS'],
};

/** Formata um mês ISO (`YYYY-MM`) com Intl no idioma da página. */
export function formatMonth(locale: string, iso: string): string {
  const [ano, mes] = iso.split('-').map(Number) as [number, number];
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(ano, mes - 1, 1)));
}
