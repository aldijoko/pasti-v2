import { redirect } from '@sveltejs/kit';

export const load = async () => {
  // Redirect to first profiling submenu (kependudukan) by default
  throw redirect(302, '/profiling/kependudukan');
};

