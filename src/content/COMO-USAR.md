# Como usar este blog de livros 

Bem-vinda! Aqui você escreve suas resenhas de livros. Cada coisa fica numa pasta:

- **resenhas/** → o que você achou de cada livro (é aqui que você mais escreve!)
- **livros/** → a ficha de cada livro (título, autor, estilo, coleção)
- **autores/** → quem escreveu os livros
- **estilos/** → o tipo do livro (fantasia, aventura, fábula...)
- **colecoes/** → séries com vários livros (Harry Potter, Nárnia...)
- **videos/** → entrevistas e outros vídeos do YouTube
- **orbita/** → anotações livres (ideias, descobertas, amigas...), fora das resenhas

Tudo é em **Markdown** e pode ser editado aqui no Obsidian. 💛

---

## A regra mais importante: o "apelido" do arquivo (slug)

Cada arquivo tem um **nome** (sem o `.md`). Esse nome é o "apelido" que usamos para ligar as coisas.

Use sempre **letras minúsculas, sem acento e com hífen no lugar de espaço**:

- `o-pequeno-principe.md` → apelido `o-pequeno-principe`
- `j-k-rowling.md` → apelido `j-k-rowling`

Quando uma resenha precisa apontar para um livro, você escreve o **apelido do arquivo do livro**. É assim que tudo se conecta. 🔗

---

## Como adicionar um livro novo (passo a passo)

Imagine que você leu **"O Hobbit", do Tolkien, que é fantasia**.

**1. O autor** (se ainda não existir): na pasta `autores/`, crie `j-r-r-tolkien.md`:

```
---
nome: "J. R. R. Tolkien"
nacionalidade: "Inglaterra"
bio: "Autor de O Hobbit e O Senhor dos Anéis."
---
```

**2. O estilo** (se ainda não existir): na pasta `estilos/`, crie `fantasia.md` (esse já existe de exemplo).

**3. O livro**: na pasta `livros/`, crie `o-hobbit.md`:

```
---
titulo: "O Hobbit"
autores:
  - j-r-r-tolkien
estilos:
  - fantasia
anoPublicacao: 1937
sinopse: "Bilbo parte numa aventura inesperada com um grupo de anões."
---
```

**4. A resenha**: na pasta `resenhas/`, crie `o-hobbit.md`:

```
---
livro: o-hobbit
pubDate: 2026-06-04
nota: 5
favorita: true
---

Eu adorei o Bilbo! A parte com o dragão Smaug foi a minha favorita...
```

Pronto! O site liga sozinho a resenha ao livro, ao autor e ao estilo. ✨

---

## Coleções (séries com vários livros)

Se um livro faz parte de uma série, primeiro crie a coleção em `colecoes/` (ex: `harry-potter.md`).
Depois, em cada livro da série, preencha:

```
colecao: harry-potter
ordemNaColecao: 1
```

O número diz se é o 1º, 2º, 3º livro da série. A página da coleção mostra todos em ordem.

---

## Vídeos (entrevistas)

Cada vídeo é um arquivo dentro de `videos/`. O vídeo precisa estar no **YouTube** —
você só cola o link. A miniatura aparece sozinha (vem do próprio YouTube).

```
---
titulo: Entrevista com a autora Fulana
youtube: https://youtu.be/ID_DO_VIDEO
pubDate: 2026-06-10
descricao: Uma frase curtinha sobre o vídeo.
draft: false
---

Texto opcional sobre o vídeo (quem é, sobre o que é...).
```

- O `youtube` pode ser o link inteiro (`https://youtu.be/...` ou `youtube.com/watch?v=...`) ou só o ID.
- `descricao` e o texto embaixo são **opcionais**.
- Quer uma capa diferente da do YouTube? Coloque a imagem em `public/videos/` e escreva `thumb: /videos/minha-capa.jpg`.
- Modelo pronto em `_templates/Video.md`.

---

## Órbita (anotações livres)

A **Órbita** é o seu espaço para escrever o que não é resenha: ideias, anotações,
descobertas, coisas sobre as amigas... tudo que orbita a sua vida. Cada arquivo
dentro de `orbita/` é uma anotação independente — não precisa ter ligação com as
outras nem com os livros.

```
---
titulo: Título da anotação
pubDate: 2026-06-13
descricao: Uma frase curtinha que aparece na listagem.
draft: false
---

Escreva aqui o que quiser! Pode usar **negrito**, _itálico_, listas e emojis 💛.
```

- `descricao` é **opcional** (aparece só na listagem).
- Para guardar sem publicar, use `draft: true`.
- Modelo pronto em `_templates/Orbita.md`.

---

## Dicas

- **Vários autores ou estilos?** É só colocar um por linha embaixo de `autores:` ou `estilos:`.
- **Esconder algo que ainda não terminei?** Coloque `draft: true` no topo. Aparece só quando você publicar (tirando o draft ou deixando `false`).
- **Nota:** de 0 a 5, pode ter meia (ex: `4.5`).
- **Capa do livro:** coloque a imagem na pasta `public/capas/` e escreva no livro:
  `capa: /capas/o-hobbit.jpg`
- **Templates prontos:** ao criar um arquivo novo, use o comando do Obsidian "Inserir template" e escolha Resenha, Livro, Autor, Estilo ou Colecao. (Os modelos ficam em `_templates/`.)
- A pasta `_templates/` e este arquivo **não** viram páginas do site — são só ajuda.

---

## Para o papai (rodar o site)

Na pasta do projeto:

```
pnpm install     # só na primeira vez
pnpm dev         # abre o site em http://localhost:4321/book-galaxy
pnpm build       # gera a versão final em dist/
```

O endereço base do site é `/book-galaxy` (configurado em `astro.config.mjs`).
Os campos e validações estão em `src/content.config.ts`.
