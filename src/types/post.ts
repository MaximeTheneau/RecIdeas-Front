// types/post.ts
export interface Category {
    id: number;
    name: string;
    slug: string;
  }

export interface Translation {
    id: number;
    heading: string;
    title: string;
    metaDescription: string;
    slug: string;
    contents: string;
    formattedDate: string;
    category: Category;
    altImg: string | null;
    subcategory: Category | null;
    comments: any[];
    keywords: string[];
    url: string;
    locale: string;
  }
export interface ParagraphPost {
    id: number;
    subtitle: string;
    paragraph: string;
    imgPostParagh: string | null;
    altImg: string | null;
    slug: string;
    link: string | null;
    linkSubtitle: string | null;
    imgWidth: number | null;
    imgHeight: number | null;
    imgPost: string | null;
    srcset: string | null;
}

export interface Post {
    id: number;
    heading: string;
    title: string;
    metaDescription: string;
    slug: string;
    contents: string;
    createdAt: string | null;
    updatedAt: string | null;
    formattedDate: string;
    listPosts: Post[];
    category: Category;
    altImg: string | null;
    imgPost: string | null;
    subcategory: Category | null;
    comments: any[];
    keywords: string[];
    url: string;
    imgWidth: number;
    imgHeight: number;
    srcset: string | null;
    locale: string;
    translation: Translation | Translation[];
    paragraphPosts: ParagraphPost[] | ParagraphPost[];
  }
