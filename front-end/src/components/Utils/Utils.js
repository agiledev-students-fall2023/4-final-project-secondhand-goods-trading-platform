export const categories = ['Furniture', 'Study Supplies', 'Electronics', 'Clothes'];

export function getCategory(author) {
    const authorHashValue = parseInt(author.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 4;
    return categories[authorHashValue];
}