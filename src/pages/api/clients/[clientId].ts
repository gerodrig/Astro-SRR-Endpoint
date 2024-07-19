import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  
  try {
    const { clientId = '' } = params;
    
    const client = await db.select().from(Clients).where(eq(Clients.id, +clientId));
  
    return new Response(
      JSON.stringify({
        method: 'GET',
        client,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Invalid request body',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const clientId = params.clientId ?? '';
    const { id, ...body } = await request.json();
    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientId));

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify(updatedClient.at(0)), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Invalid request body',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const { clientId = '' } = params;

    const { rowsAffected } = await db
      .delete(Clients)
      .where(eq(Clients.id, +clientId));

    if (rowsAffected > 0) {
      return new Response(
        JSON.stringify({
          message: `${clientId} deleted`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        message: `${clientId} not found`,
      }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Invalid request body',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
