import type { APIRoute } from 'astro';
import { XataClient } from '../../xata';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const user = cookies.get('userId');

    if (!user) {
      return new Response(JSON.stringify({ message: 'Must be logged in!' }), {
        status: 401,
      });
    }

    const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });

    const { post, emoji } = await request.json();

    if (!post || !emoji) {
      return new Response(
        JSON.stringify({ message: 'Must include a post and an emoji' }),
        { status: 401 }
      );
    }

    const existingReaction = await xata.db.reactions
      .filter({
        post,
        emoji,
        'user.id': user.value,
      })
      .getFirst();

    if (existingReaction) {
      await existingReaction.delete();
      return new Response(
        JSON.stringify({
          reaction: existingReaction,
          message: 'Unreacted to the post!',
        }),
        { status: 200 }
      );
    }

    const createdReaction = await xata.db.reactions.create({
      post,
      emoji,
      user: user.value,
    });

    return new Response(
      JSON.stringify({
        reaction: createdReaction,
        message: 'Reacted to the post succesfully!',
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        message: 'Oops looks like something went wrong!',
      }),
      { status: 500 }
    );
  }
};
