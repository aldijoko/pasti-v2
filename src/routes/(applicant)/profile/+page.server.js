import { fail, redirect } from '@sveltejs/kit';
import { findUser, updateUserProfile } from '$lib/services/users.js';

export const actions = {
  default: async ({ request, cookies, locals, url }) => {
    if (!locals.user) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const name = String(formData.get('name') || '');
    const username = String(formData.get('username') || '');
    const oldPassword = String(formData.get('oldPassword') || '');
    const password = String(formData.get('password') || '');
    const password2 = String(formData.get('password2') || '');
    const picture = formData.get('picture');

    // Basic validation
    if (!name || !username) {
      return fail(400, { error: 'Name and username are required' });
    }

    // Password change validation
    if (oldPassword || password || password2) {
      if (!oldPassword || !password || !password2) {
        return fail(400, { error: 'All password fields must be filled if changing password' });
      }

      if (password !== password2) {
        return fail(400, { error: 'New password and confirmation do not match' });
      }

      if (password.length < 8) {
        return fail(400, { error: 'Password must be at least 8 characters long' });
      }

      // Validate old password matches current one in dummy data
      const current = findUser(locals.user.username);
      if (!current) return fail(400, { error: 'User not found' });
      if (!current.password || current.password !== oldPassword) {
        return fail(400, { error: 'Old password is incorrect' });
      }
    }

    try {
      // NOTE: File upload is not persisted in this dummy setup.
      // We keep existing avatar or allow future handling.

      const updated = updateUserProfile({
        originalUsername: locals.user.username,
        username,
        name,
        password: password || undefined,
        // Keep avatar as-is for now; picture upload not persisted here
        avatarUrl: undefined
      });

      // Update session cookie with proper secure detection (works behind proxies)
      const xfProto = request.headers.get('x-forwarded-proto');
      const isHttps = url.protocol === 'https:' || (xfProto ? xfProto.includes('https') : false);
      const cookieSecure = process.env.COOKIE_SECURE === 'true' || (process.env.COOKIE_SECURE !== 'false' && isHttps);
      cookies.set('session', JSON.stringify(updated), {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: cookieSecure,
        maxAge: 60 * 60 * 8
      });

      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      return fail(500, { error: 'Failed to update profile. Please try again.' });
    }
  }
};
