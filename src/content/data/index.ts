import archivesJson from './archives.json';

/** Dados neutros de idioma: datas ISO, links, nomes de tecnologias, empresas e projetos. Textos ficam em src/content/{pt,en,de}. */

export interface ArchiveEntry {
  year: number;
  tag: string;
  sha: string;
  node: string;
  build: 'next-export' | 'static-html';
  basePath: string;
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
  id: 'modaxo' | 'agencia' | 'avaso' | 'puc';
  company: string;
  /** Mês ISO (`YYYY-MM`); `null` onde o usuário ainda não confirmou (vira placeholder). */
  from: string | null;
  to: string | null;
  /** `true` quando o vínculo é atual (o período mostra "atual" no fim). */
  current: boolean;
  skills: string[];
}

export const jobs: Job[] = [
  { id: 'modaxo', company: 'Modaxo', from: null, to: null, current: false, skills: [] },
  {
    id: 'agencia',
    company: 'Agência Experimental de Software',
    from: '2024-09',
    to: null,
    current: true,
    skills: ['Java', 'Spring Boot', 'Mockito', 'Git', 'REST API'],
  },
  {
    id: 'avaso',
    company: 'Avaso Technology Solutions',
    from: '2023-09',
    to: null,
    current: true,
    skills: ['Hardware', 'Server maintenance', 'User support'],
  },
  {
    id: 'puc',
    company: 'PUC Minas',
    from: '2021-09',
    to: '2023-09',
    current: false,
    skills: ['Service Desk', 'MS Office', 'Active Directory', 'Windows', 'User support', 'Hardware support'],
  },
];

export interface EducationItem {
  id: 'puc' | 'kogarah';
  institution: string;
  from: string;
  to: string;
}
export const education: EducationItem[] = [
  { id: 'puc', institution: 'PUC Minas', from: '2023-07', to: '2027-07' },
  { id: 'kogarah', institution: 'Kogarah High School', from: '2017-07', to: '2018-01' },
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

/** Dados dos repositórios congelados em 2026-10-05 (uma consulta à API do GitHub, sem token): linguagens com 35.000 bytes ou mais, no máximo 3. */
export interface Project {
  slug: 'remediar' | 'dress-manager' | 'recipes-and-flavors' | 'portfolio' | 'relatorio-fotografico';
  name: string;
  repo: string;
  languages: string[];
}
export const projects: Project[] = [
  {
    slug: 'remediar',
    name: 'Remediar',
    repo: 'https://github.com/raphael-sena/remediar',
    languages: ['TypeScript', 'Java'],
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
  'languages' | 'frontend' | 'mobile' | 'backend' | 'databases' | 'devops' | 'observability' | 'messaging' | 'tools';

/** Lista do legado, sem duplicatas (Docker e Node.js apareciam duas vezes). */
export const technologies: Record<TechGroupId, string[]> = {
  languages: ['Java', 'TypeScript', 'C#', 'Dart', 'SQL'],
  frontend: ['HTML', 'CSS', 'React', 'Next.js', 'Angular', 'Tailwind CSS'],
  mobile: ['Flutter', 'Xamarin'],
  backend: ['Spring Boot', 'Node.js'],
  databases: ['Oracle', 'PostgreSQL', 'MySQL', 'SQLite'],
  devops: ['Docker', 'Cloudflare', 'Linux', 'GitHub Actions'],
  observability: ['Prometheus', 'Grafana'],
  messaging: ['RabbitMQ', 'Redis'],
  tools: [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Figma',
    'Git',
    'GitHub',
    'Insomnia',
    'IntelliJ IDEA',
    'Maven',
    'Postman',
    'VS Code',
  ],
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
