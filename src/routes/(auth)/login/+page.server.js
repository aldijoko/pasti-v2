import { fail, redirect } from '@sveltejs/kit';
import { dummyUsers } from "$lib/config/dummyUser.js";


export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '').trim();

    console.log('Login attempt:', { username, password });

    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return fail(400, { error: "Username atau password salah!" });
    }


    // if (!username || !password) {
    //   return fail(400, { error: 'Username and password are required' });
    // }

    // Dummy auth: accept any non-empty credentials
    // const user = { username, role: 'Administrator', loginAt: Date.now() };

    cookies.set('session', JSON.stringify(user), {
      path: '/',
      httpOnly: false, // set true if not using client JS to read it
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8 // 8 hours
    });

    throw redirect(303, '/dashboard');
  }
};

