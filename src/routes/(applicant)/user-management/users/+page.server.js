import { error, redirect } from '@sveltejs/kit';
import { listUsers, getRoles, buildPermissions, buildPermissionTree, createUser, updateUser, deleteUser } from "$lib/services/users.js";

export const load = async ({ locals, url }) => {
  if (!locals.user) throw redirect(303, '/login');
  const perms = locals.user.permissions || [];
  const canAccess =
    locals.user.role === 'superadmin' ||
    perms.includes('user.management.users') ||
    perms.includes('user.management');
  if (!canAccess) throw error(403, 'Forbidden');
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const size = Math.min(50, Math.max(1, parseInt(url.searchParams.get('size') || '10')));
  const q = String(url.searchParams.get('search') || '').trim().toLowerCase();
  const role = String(url.searchParams.get('role') || '').trim();

  const all = listUsers();
  const filtered = all.filter((u) => {
    const matchSearch = !q || u.username.toLowerCase().includes(q);
    const matchRole = !role || u.role === role;
    return matchSearch && matchRole;
  });
  const total = filtered.length;
  const start = (page - 1) * size;
  const items = filtered.slice(start, start + size);

  return {
    // server-side paginated payload
    items,
    total,
    page,
    size,
    // reference data
    roles: getRoles(),
    permissions: buildPermissions(),
    permissionTree: buildPermissionTree(),
  };
};

export const actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) throw redirect(303, '/login');
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !(perms.includes('user.management.users') || perms.includes('user.management'))) throw error(403, 'Forbidden');
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
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !(perms.includes('user.management.users') || perms.includes('user.management'))) throw error(403, 'Forbidden');
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
    const perms = locals.user.permissions || [];
    if (locals.user.role !== 'superadmin' && !(perms.includes('user.management.users') || perms.includes('user.management'))) throw error(403, 'Forbidden');
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
