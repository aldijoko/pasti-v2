import { fail, redirect } from '@sveltejs/kit';
import { dummyUsers } from "$lib/config/dummyUser.js";

function genCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1; // 1..9
  const b = Math.floor(Math.random() * 9) + 1; // 1..9
  const op = Math.random() < 0.5 ? '+' : '×';
  const answer = op === '+' ? a + b : a * b;
  return { question: `${a} ${op} ${b} = ?`, answer: String(answer) };
}

export const load = async ({ cookies }) => {
  const { question, answer } = genCaptcha();
  cookies.set('captcha_answer', answer, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 5 // 5 minutes
  });
  return { captchaQuestion: question };
};


export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '').trim();
    const captcha = String(formData.get('captcha') || '').trim();

    // Validate captcha
    const expected = cookies.get('captcha_answer') || '';
    if (!captcha || captcha !== expected) {
      const { question, answer } = genCaptcha();
      cookies.set('captcha_answer', answer, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 5
      });
      return fail(400, { error: 'Captcha salah. Coba lagi.', captchaQuestion: question });
    }

    // Validate credentials
    const user = dummyUsers.find((u) => u.username === username && u.password === password);
    if (!user) {
      const { question, answer } = genCaptcha();
      cookies.set('captcha_answer', answer, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 5
      });
      return fail(400, { error: "Username atau password salah!", captchaQuestion: question });
    }

    // Success: set session and clear captcha
    cookies.set('session', JSON.stringify(user), {
      path: '/',
      httpOnly: false, // set true if not using client JS to read it
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8 // 8 hours
    });
    cookies.delete('captcha_answer', { path: '/' });

    throw redirect(303, '/dashboard');
  }
};
