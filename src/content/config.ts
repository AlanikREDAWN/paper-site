import { defineCollection, z } from "astro:content";

const albums = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            cover: image(),
        }),
});

const photographyAlbums = defineCollection({
    type: "data",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            cover: image()
        })
})

export const collections = {
    albums,
    photographyAlbums,
};