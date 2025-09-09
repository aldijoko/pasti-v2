import { error, redirect } from '@sveltejs/kit';
import { listUsers, getRoles, buildPermissions, buildPermissionTree, createUser, updateUser, deleteUser } from "$lib/services/users.js";

export const load = async ({ locals }) => {
  if (!locals.user) throw redirect(303, '/login');
  if (locals.user.role !== 'superadmin') throw error(403, 'Forbidden');
  return {
    users: listUsers(),
    roles: getRoles(),
    permissions: buildPermissions(),
    permissionTree: buildPermissionTree(),
  };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    if (locals.user.role !== 'superadmin') throw error(403, 'Forbidden');
    const form = await request.formData();
    const username = String(form.get("username") || "").trim();
    const password = String(form.get("password") || "").trim();
    const role = String(form.get("role") || "").trim();
    const permissions = String(form.get("permissions") || "").split(",").filter(Boolean);

    try {
      createUser({ username, password, role, permissions });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  update: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    if (locals.user.role !== 'superadmin') throw error(403, 'Forbidden');
    const form = await request.formData();
    const original = String(form.get("original") || "").trim();
    const username = String(form.get("username") || "").trim();
    const password = String(form.get("password") || "").trim();
    const role = String(form.get("role") || "").trim();
    const permissions = String(form.get("permissions") || "").split(",").filter(Boolean);

    try {
      updateUser({ original, username, password, role, permissions });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  delete: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    if (locals.user.role !== 'superadmin') throw error(403, 'Forbidden');
    const form = await request.formData();
    const username = String(form.get('username') || '').trim();
    try {
      deleteUser(username);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
};
