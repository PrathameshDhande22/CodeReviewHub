export interface LegalPageFrontmatter {
    slug: string;
    title: string;
    description: string;
    date: string;
    published?: boolean;
    author?: string;
}

export interface LegalPage extends LegalPageFrontmatter {
    contentHtml: string;
}