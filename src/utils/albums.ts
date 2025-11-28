import { imageMetadata } from "astro/assets/utils";

export async function getAlbumImages(albumId: string) {
    let images = import.meta.glob<{default: imageMetadata }>(
        "/src/content/albums/**/*.{jpeg,jpg,png}"
    );

    images = Object.fromEntries(
        Object.entries(images).filter(([key]) => key.includes(albumId))
    );

    const resolvedImages = await Promise.all(
        Object.values(images).map((image) => image().then((mod) => mod.default))
    );

    resolvedImages.sort(() => Math.random() - 0.5);
    return resolvedImages;
}