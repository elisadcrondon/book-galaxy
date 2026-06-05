import { glob } from "astro/loaders";
import { defineCollection, reference } from "astro:content";
import z from "astro/zod";

// ---------------------------------------------------------------------------
// AUTORES — quem escreveu os livros
// ---------------------------------------------------------------------------
const autores = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/autores" }),
    schema: z.object({
        nome: z.string(),
        nacionalidade: z.string().optional(),
        nascimento: z.string().optional(),
        bio: z.string().optional(),
        // caminho de uma imagem em /public/autores (ex: "/autores/tolkien.jpg")
        foto: z.string().optional(),
        draft: z.boolean().optional(),
    }),
});

// ---------------------------------------------------------------------------
// ESTILOS — gênero / estilo do livro (fantasia, aventura, etc.)
// ---------------------------------------------------------------------------
const estilos = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/estilos" }),
    schema: z.object({
        nome: z.string(),
        descricao: z.string().optional(),
        emoji: z.string().optional(),
        draft: z.boolean().optional(),
    }),
});

// ---------------------------------------------------------------------------
// COLEÇÕES — séries com mais de um livro (Harry Potter, Nárnia, etc.)
// ---------------------------------------------------------------------------
const colecoes = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/colecoes" }),
    schema: z.object({
        nome: z.string(),
        descricao: z.string().optional(),
        capa: z.string().optional(),
        draft: z.boolean().optional(),
    }),
});

// ---------------------------------------------------------------------------
// LIVROS — a ficha de cada livro, cruza com autores, estilos e coleção
// ---------------------------------------------------------------------------
const livros = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/livros" }),
    schema: z.object({
        titulo: z.string(),
        // um ou mais autores (referência aos arquivos em /autores)
        autores: z.array(reference("autores")).default([]),
        // um ou mais estilos (referência aos arquivos em /estilos)
        estilos: z.array(reference("estilos")).default([]),
        // coleção/série a que pertence (opcional)
        colecao: reference("colecoes").optional(),
        // posição dentro da coleção (1, 2, 3...)
        ordemNaColecao: z.number().optional(),
        anoPublicacao: z.number().optional(),
        paginas: z.number().optional(),
        // caminho de capa em /public/capas (ex: "/capas/o-hobbit.jpg")
        capa: z.string().optional(),
        // idioma da edição que a Elisa leu: "pt" (português) ou "en" (inglês).
        // Deve combinar com a capa mostrada (capa da edição lida).
        idioma: z.enum(["pt", "en"]).optional(),
        sinopse: z.string().optional(),
        draft: z.boolean().optional(),
    }),
});

// ---------------------------------------------------------------------------
// RESENHAS — o que a Elisa escreve. O texto fica no corpo do markdown.
// ---------------------------------------------------------------------------
const resenhas = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resenhas" }),
    schema: z.object({
        // livro resenhado (referência ao arquivo em /livros)
        livro: reference("livros"),
        pubDate: z.date(),
        // título opcional; se vazio, usamos o título do livro
        titulo: z.string().optional(),
        // nota de 0 a 5 (aceita meio, ex: 4.5)
        nota: z.number().min(0).max(5).optional(),
        favorita: z.boolean().optional(),
        draft: z.boolean().optional(),
    }),
});

// ---------------------------------------------------------------------------
// MENSAIS — retrospectiva dos livros lidos em cada mês.
// Um arquivo por mês. O texto fica no corpo do markdown; o frontmatter só
// lista os livros (referências a /livros) para montar a galeria de capas.
// ---------------------------------------------------------------------------
const mensais = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/mensais" }),
    schema: z.object({
        ano: z.number(),
        // 1 = Janeiro ... 12 = Dezembro
        mes: z.number().min(1).max(12),
        // data de publicação do post (geralmente o início do mês seguinte)
        pubDate: z.date(),
        // título opcional; se vazio, usamos "Mês de Ano"
        titulo: z.string().nullish(),
        // livros lidos no mês (referências aos arquivos em /livros)
        livros: z.array(reference("livros")).default([]),
        draft: z.boolean().optional(),
    }),
});

// ---------------------------------------------------------------------------
// VÍDEOS — entrevistas e outros vídeos do YouTube.
// Um arquivo por vídeo. O texto (opcional) fica no corpo do markdown.
// ---------------------------------------------------------------------------
const videos = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/videos" }),
    schema: z.object({
        titulo: z.string(),
        // link ou ID do vídeo no YouTube (ex: "https://youtu.be/abc123" ou "abc123")
        youtube: z.string(),
        // data de publicação (opcional; usada para ordenar)
        pubDate: z.date().nullish(),
        // miniatura própria em /public (opcional). Se vazio, usamos a do YouTube.
        thumb: z.string().nullish(),
        // descrição curta opcional, mostrada na listagem
        descricao: z.string().nullish(),
        draft: z.boolean().nullish(),
    }),
});

export const collections = {
    resenhas,
    livros,
    autores,
    estilos,
    colecoes,
    mensais,
    videos,
};
