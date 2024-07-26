import { defineAction, z } from "astro:actions";
import { db, Posts, eq } from "astro:db";


export const getPostLikes = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (postId) => {
      //! Server only
      //read likes from database

      const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

      return {
        likes: posts.at(0)?.likes ?? 0,
      };
    },
  })