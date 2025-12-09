export async function getPhotographyAlbumPhotos(photographyAlbumId: string) {
    let photos = import.meta.glob<{ default: ImageMetadata }>("/src/content/photographyAlbums/**/*.{jpeg,jpg}");

    photos = Object.fromEntries(Object.entries(photos).filter(([key]) => key.includes(photographyAlbumId)));

    const resolvedPhotos = await Promise.all(Object.values(photos).map((photo) => photo().then((mod) => mod.default)));

    resolvedPhotos.sort(() => Math.random() - 0.5);
    return resolvedPhotos;
}