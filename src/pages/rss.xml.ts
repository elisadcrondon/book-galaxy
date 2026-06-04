import rss from "@astrojs/rss";
import { withBase } from "../utils/helpers";
import { getCollection, getEntry } from "astro:content";
import siteConfig from "../site.config";

export async function GET(context) {
  const resenhas = await getCollection("resenhas", ({ data }) => !data.draft);
  const items = await Promise.all(
    resenhas
      .sort(
        (a, b) =>
          new Date(b.data.pubDate).getTime() -
          new Date(a.data.pubDate).getTime()
      )
      .map(async (resenha) => {
        const livro = await getEntry(resenha.data.livro);
        const titulo =
          resenha.data.titulo || livro?.data.titulo || "Resenha";
        return {
          title: titulo,
          pubDate: resenha.data.pubDate,
          description: livro?.data.sinopse || livro?.data.titulo || "",
          link: withBase(`/resenhas/${resenha.id}/`),
        };
      })
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site + withBase("/"),
    trailingSlash: false,
    items,
    customData: `<language>pt-BR</language>`,
    stylesheet: withBase("/pretty-feed-v3.xsl"),
  });
}
