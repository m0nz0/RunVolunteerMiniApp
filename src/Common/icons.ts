const req = (require as any).context("../assets/icons", false, /\.(png|jpe?g|svg)$/);

export const images: string[] = req.keys().map(req);

export function getRandomImage(): string {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
}
