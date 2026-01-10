import products from '../services/Products.json';

export class SearchHandler {
    static removeAccents(str: string): string {
        if (!str) return "";
        return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    static search(keyword: string): any[] {
        if (!keyword) return [];

        const normalizedKeyword = this.removeAccents(keyword);
        const searchTerms = normalizedKeyword.split(" ").filter(t => t !== "");

        return products.filter((product: any) => {
            try {
                const productInfo = this.removeAccents(
                    `${product.name || ""} ${product.category || ""} ${product.description || ""}`
                );
                return searchTerms.every(term => productInfo.includes(term));
            } catch {
                return false;
            }
        });
    }
}