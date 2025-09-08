import { error } from '@sveltejs/kit';
import { menuMapping } from '$lib/utils/menuMapping.js';

export const load = async ({ params }) => {
  const slug = params.slug;

  const tab = menuMapping["Puldata"].submenus.find(
    (s) => s.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  if (!tab) throw error(404, 'Tab not found');

  // Di sini nanti bisa fetch data API pakai tab.method/tab.controller
  return { tab, slug };
};
