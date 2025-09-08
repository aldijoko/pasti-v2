import { findUser } from '$lib/services/users.js';

export const handle = async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get('session');
  if (sessionCookie) {
    try {
      const cookieUser = JSON.parse(sessionCookie);
      // Refresh user from dummy store to avoid stale permissions/session data
      const fresh = cookieUser?.username ? findUser(cookieUser.username) : null;
      event.locals.user = fresh || cookieUser || null;
    } catch (e) {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
};

// Surface a safe error message to +error.svelte (helps for 500s)
export const handleError = ({ error }) => {
  const message = typeof error?.message === 'string' ? error.message : '';
  return { message };
};


