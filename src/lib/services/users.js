import { dummyUsers as seedUsers } from "$lib/config/dummyUser.js";
import { dummyMenu } from "$lib/config/dummyMenu.js";

/** @typedef {{ id: string, title?: string, path?: string, children?: DummyMenuItem[] }} DummyMenuItem */
/** @typedef {{ username: string, password?: string, role: string, permissions: string[], lastLogin?: string|null }} User */

let users = [...seedUsers];

/** @returns {User[]} */
export function listUsers() {
  return users;
}

/** @param {string} username @returns {User | null} */
export function findUser(username) {
  return users.find((u) => u.username === username) || null;
}

/** @returns {string[]} */
export function getRoles() {
  return Array.from(new Set(users.map((u) => u.role))).sort();
}

/** @returns {string[]} */
export function buildPermissions() {
  const permissions = new Set();
  const traverse = (node) => {
    if (node.id) permissions.add(node.id);
    (node.children || []).forEach(traverse);
  };
  dummyMenu.forEach(traverse);
  return Array.from(permissions).sort((a, b) => a.localeCompare(b));
}

/** @returns {Record<string, { controller: string, items: { key: string, title: string }[] }>} */
export function buildPermissionTree() {
  const tree = {};
  dummyMenu.forEach((menu) => {
    const groupName = menu.title || menu.id;
    if (!tree[groupName]) tree[groupName] = { controller: menu.id, items: [] };

    const addItems = (_parentTitle, children) => {
      (children || []).forEach((child) => {
        if (child.children && child.children.length > 0) {
          addItems(child.title || child.id, child.children);
        } else {
          tree[groupName].items.push({ key: child.id, title: child.title || child.id });
        }
      });
    };

    if (menu.children && menu.children.length > 0) {
      addItems(groupName, menu.children);
    } else {
      tree[groupName].items.push({ key: menu.id, title: menu.title || menu.id });
    }
  });
  return tree;
}

/** @param {{ username: string, password?: string, role: string, permissions?: string[] }} param0 */
export function createUser({ username, password, role, permissions }) {
  if (!username || !role) throw new Error("Username and role are required");
  if (users.find((u) => u.username === username)) throw new Error("Username already exists");

  users.push({
    username,
    password,
    role,
    permissions: permissions || [],
    lastLogin: null, // default new user with no login yet
    is_active: "Y" // default new user is active
  });
}

/** @param {{ original: string, username: string, password?: string, role: string, permissions?: string[] }} param0 */
export function updateUser({ original, username, password, role, permissions }) {
  const idx = users.findIndex((u) => u.username === original);
  if (idx === -1) throw new Error("User not found");
  if (!username || !role) throw new Error("Username and role are required");
  if (original !== username && users.find((u) => u.username === username)) throw new Error("Username already exists");

  users[idx] = {
    ...users[idx], // preserve lastLogin and any other future props
    username,
    password,
    role,
    permissions: permissions || [],
    is_active: users[idx].is_active || "Y" // preserve is_active or default to "Y"
  };
}

/** @param {string} username */
export function deleteUser(username) {
  const idx = users.findIndex((u) => u.username === username);
  if (idx === -1) throw new Error("User not found");
  users.splice(idx, 1);
}

/**
 * Update profile fields for a user (name, avatar, username, and password).
 * Does minimal validation; call-site should validate inputs.
 * @param {{ originalUsername: string, username?: string, name?: string, password?: string, avatarUrl?: string }} param0
 */
export function updateUserProfile({ originalUsername, username, name, password, avatarUrl }) {
  const idx = users.findIndex((u) => u.username === originalUsername);
  if (idx === -1) throw new Error("User not found");

  // If username changes, ensure no collision
  const newUsername = username?.trim() || users[idx].username;
  if (newUsername !== originalUsername && users.find((u) => u.username === newUsername)) {
    throw new Error("Username already exists");
  }

  users[idx] = {
    ...users[idx],
    username: newUsername,
    name: name?.trim() || users[idx].name,
    password: password?.trim() || users[idx].password,
    avatar: avatarUrl || users[idx].avatar
  };

  return users[idx];
}
