// src/routes/(applicant)/+layout.server.js
import { redirect } from '@sveltejs/kit';
import { dummyMenu } from "$lib/config/dummyMenu.js";

import { dummyControllersMenu as dummyControllers } from '../../lib/utils/dummyMenuData.js';
import { menuTree, buildMenuFromMapping } from '$lib/utils/menuTree.js';
import { menuMapping } from '$lib/utils/menuMapping.js';


export const load = async ({ locals, url, cookies }) => {
  // Redirect to login if not authenticated
  console.log("layout server load", { locals });
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  // const mappedMenu = buildMenuFromMapping(dummyControllers, menuMapping);
  // mappedMenu.forEach((m) => {
  //   if (m.title === 'Puldata') {
  //     m.children = [];
  //   }
  // });

  const userCookie = cookies.get("session");
  if (!userCookie) {
    throw redirect(303, "/login");
  }

  const user = JSON.parse(userCookie);

   // Filter menu sesuai permission user
  const filterMenu = (menus, permissions) =>
    menus
      .filter((m) => {
        if (m.children) return true; // simpan parent, filter child nanti
        return permissions.includes(m.id);
      })
      .map((m) => ({
        ...m,
        children: m.children
          ? filterMenu(m.children, permissions)
          : undefined
      }))
      .filter((m) => m.children?.length || !m.children || permissions.includes(m.id));

  const menuItems =
    user.role === "superadmin"
      ? dummyMenu
      : filterMenu(dummyMenu, user.permissions);


  return {
    user: locals.user,
    menuItems
    // menuItems: mappedMenu
  };
};
