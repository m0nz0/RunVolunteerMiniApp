// импортируем все картинки из папки
const modules = import.meta.glob<string>("../assets/icons/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
});

export const images: string[] = Object.values(modules);

export function getRandomImage(): string {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
}
