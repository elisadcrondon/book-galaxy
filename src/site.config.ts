import { withBase } from "./utils/helpers";

export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    eyebrowText?: string;
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type About = {
    title?: string;
    text?: string;
};

export type Blog = {
    description?: string;
};

export type ContactInfo = {
    title?: string;
    text?: string;
    email?: {
        text?: string;
        href?: string;
        email?: string;
    };
    socialProfiles?: {
        text?: string;
        href?: string;
    }[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    about?: About;
    contactInfo?: ContactInfo;
    subscribe?: Subscribe;
    blog?: Blog;
    postsPerPage?: number;
    recentPostLimit: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://example.com',
    title: 'Book Galaxy',
    description: 'Book Galaxy: o cantinho de livros da Elisa — resenhas, autores favoritos e coleções, com muito carinho. 📚',
    image: {
        src: '/space-ahead-preview.jpeg',
        alt: 'Book Galaxy — o blog de resenhas de livros da Elisa.'
    },
    headerNavLinks: [
        {
            text: 'Resenhas',
            href: withBase('/resenhas')
        },
        {
            text: 'Livros',
            href: withBase('/livros')
        },
        {
            text: 'Autores',
            href: withBase('/autores')
        },
        {
            text: 'Coleções',
            href: withBase('/colecoes')
        },
        {
            text: 'Mensais',
            href: withBase('/mensais')
        },
        {
            text: 'Vídeos',
            href: withBase('/videos')
        }
    ],
    footerNavLinks: [
        {
            text: 'Sobre',
            href: withBase('/about')
        },
        {
            text: 'Estilos',
            href: withBase('/estilos')
        },
        {
            text: 'RSS Feed',
            href: withBase('/rss.xml')
        },
                {
            text: 'Sitemap',
            href: withBase('/sitemap-index.xml')
        }
    ],
    socialLinks: [
        {
            text: 'Dribbble',
            href: 'https://dribbble.com/'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/'
        }
    ],
    hero: {
        eyebrowText: 'Um livro de cada vez 📖',
        title: 'Book Galaxy ✨',
        text: "Oi! Eu sou a Elisa e aqui eu escrevo o que achei dos livros que leio. Dá uma olhada nas minhas resenhas!",
        image: {
            src: '/assets/images/pixeltrue-space-discovery.svg',
            alt: 'Ilustração de leitura'
        },
        actions: [
            {
                text: 'Ler resenhas',
                href: withBase('/resenhas')
            },
            {
                text: 'Ver livros',
                href: withBase('/livros')
            }
        ]
    },
    about: {
        title: 'Sobre',
        text: 'Oi! Sou a Elisa, tenho 11 anos e gosto muito de livros, RPG e escrever. Criei o Book Galaxy pra compartilhar minhas resenhas e também guardar uma memória dos livros que vou lendo, assim não esqueço o que achei de cada um.',
    },
    contactInfo: {
        title: 'Contact',
        text: "Hi! Whether you have a question, a suggestion, or just want to share your thoughts, I'm all ears. Feel free to get in touch through any of the methods below:",
        email: {
            text: "Drop me an email and I’ll do my best to respond as soon as possible.",
            href: "mailto:example@example.com",
            email: "example@example.com"
        },
        socialProfiles: [
            {
                text: "LinkedIn",
                href: "https://www.linkedin.com/"
            },
            {
                text: "Peerlist",
                href: "https://www.peerlist.io/"
            },
            {
                text: "GitHub",
                href: "https://github.com/"
            }
        ]
    },
    subscribe: {
        title: 'Assine o Book Galaxy',
        text: 'Receba as novas resenhas no seu e-mail.',
        formUrl: 'https://assets.mailerlite.com/jsonp/2407821/forms/189376041774483040/subscribe'
    },
    blog: {
        description: "Todas as resenhas, da mais nova para a mais antiga."
    },
    postsPerPage: 6,
    recentPostLimit: 4
};

export default siteConfig;
