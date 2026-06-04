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

export const collections = {
    resenhas,
    livros,
    autores,
    estilos,
    colecoes,
};
