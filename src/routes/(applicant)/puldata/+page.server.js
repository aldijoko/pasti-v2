import { redirect } from '@sveltejs/kit';
import { menuMapping } from '$lib/utils/menuMapping.js';

export const load = () => {
  const firstTab = menuMapping["Puldata"].submenus[0].name
    .toLowerCase()
    .replace(/\s+/g, '-');
  throw redirect(302, `/puldata/${firstTab}`);
};
