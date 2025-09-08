import { error, redirect } from '@sveltejs/kit';
import { findUser, getRoles, buildPermissionTree, updateUser } from "$lib/services/users.js";

export const load = async ({ params, locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role !== 'superadmin') throw error(403, 'Forbidden');
  const user = findUser(params.username);
  return {
    user,
    roles: getRoles(),
    permissionTree: buildPermissionTree(),
  };
};

export const actions = {
  update: async ({ request, params, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    if (locals.user.role !== 'superadmin') throw error(403, 'Forbidden');
    const form = await request.formData();
    const username = String(form.get("username") || "").trim();
    const password = String(form.get("password") || "").trim();
    const role = String(form.get("role") || "").trim();
    const permissions = String(form.get("permissions") || "").split(",").filter(Boolean);

    try {
      updateUser({ original: params.username, username, password, role, permissions });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};

