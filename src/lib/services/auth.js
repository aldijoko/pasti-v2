// src/lib/services/auth.js
import { dummyUsers } from "$lib/config/dummyUser.js";

export function loginDummy(username, password) {
  const user = dummyUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return null;

  // Simulasi payload user login
  return {
    username: user.username,
    role: user.role,
    permissions: user.permissions
  };
}
