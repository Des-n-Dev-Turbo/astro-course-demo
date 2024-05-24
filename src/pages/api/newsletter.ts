import type { APIRoute } from 'astro';
import { XataClient } from '../../xata';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });
    const formData = await request.formData();

    const email = formData.get('newsletter-email') as string;

    if (!email) {
      return redirect('/newsletter/failure', 307);
    }

    const existingEmail = await xata.db.subscribers
      .filter({ email })
      .getFirst();

    if (existingEmail) {
      return redirect('/newsletter/success?exists=true', 307);
    }

    await xata.db.subscribers.create({ email });

    return redirect('/newsletter/success', 307);
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
