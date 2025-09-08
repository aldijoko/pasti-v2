// src/routes/(auth)/+layout.server.js
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
  // If user is already logged in and trying to access auth routes, redirect to dashboard
  if (locals.user && url.pathname === '/login') {
    throw redirect(303, '/dashboard');
  }

  return {
    user: locals.user
  };
};
