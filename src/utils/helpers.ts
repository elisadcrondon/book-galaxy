import { type CollectionEntry } from 'astro:content';

// Ordena resenhas da mais nova para a mais antiga
export function sortResenhasByDateDesc(
    a: CollectionEntry<'resenhas'>,
    b: CollectionEntry<'resenhas'>
) {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
}

export function createSlugFromTitle(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/[^a-z0-9\s-]/g, '') // remove caracteres especiais
        .trim()
        .replace(/\s+/g, '-') // espaços viram hífens
        .replace(/-+/g, '-'); // múltiplos hífens viram um só
}

// Monta uma URL interna respeitando o BASE_URL configurado no astro.config
export const withBase = (path: string) => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${base}${clean}`;
};

// Nome do mês por extenso, em português (1 = Janeiro ... 12 = Dezembro)
const NOMES_MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
export function mesPorExtenso(mes: number): string {
    return NOMES_MESES[mes - 1] ?? '';
}

// Ordena os posts mensais do mais recente para o mais antigo (ano, depois mês)
export function sortMensaisDesc(
    a: CollectionEntry<'mensais'>,
    b: CollectionEntry<'mensais'>
) {
    return b.data.ano - a.data.ano || b.data.mes - a.data.mes;
}

// Ordena vídeos do mais recente para o mais antigo (vídeos sem data vão por último)
export function sortVideosDesc(
    a: CollectionEntry<'videos'>,
    b: CollectionEntry<'videos'>
) {
    const ta = a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0;
    const tb = b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0;
    return tb - ta;
}

// Extrai o ID de um vídeo do YouTube a partir de um link ou do próprio ID.
// Aceita formatos como youtu.be/ID, youtube.com/watch?v=ID, /embed/ID, /shorts/ID.
export function youtubeId(input: string): string {
    if (!input) return '';
    const s = input.trim();
    // já é um ID puro (11 caracteres típicos, sem barra nem ponto)
    if (/^[\w-]{11}$/.test(s) && !s.includes('/')) return s;
    const patterns = [
        /[?&]v=([\w-]{11})/, // watch?v=ID
        /youtu\.be\/([\w-]{11})/, // youtu.be/ID
        /\/embed\/([\w-]{11})/, // /embed/ID
        /\/shorts\/([\w-]{11})/, // /shorts/ID
    ];
    for (const re of patterns) {
        const m = s.match(re);
        if (m) return m[1];
    }
    return s;
}

// URL da miniatura (thumbnail) de um vídeo do YouTube
export function youtubeThumb(input: string): string {
    const id = youtubeId(input);
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

// URL de embed (player) de um vídeo do YouTube
export function youtubeEmbed(input: string): string {
    const id = youtubeId(input);
    return `https://www.youtube-nocookie.com/embed/${id}`;
}

// Renderiza uma nota (0-5) como estrelas, aceitando meia estrela
export function notaEmEstrelas(nota?: number): string {
    if (nota === undefined || nota === null) return '';
    const cheias = Math.floor(nota);
    const meia = nota - cheias >= 0.5 ? 1 : 0;
    const vazias = Math.max(0, 5 - cheias - meia);
    return '★'.repeat(cheias) + (meia ? '½' : '') + '☆'.repeat(vazias);
}
