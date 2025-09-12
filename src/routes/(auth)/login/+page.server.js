import { fail, redirect } from '@sveltejs/kit';
import { dummyUsers } from "$lib/config/dummyUser.js";

function genCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1; // 1..9
  const b = Math.floor(Math.random() * 9) + 1; // 1..9
  const op = Math.random() < 0.5 ? '+' : '×';
  const answer = op === '+' ? a + b : a * b;
  return { question: `${a} ${op} ${b} = ?`, answer: String(answer) };
}

export const load = async ({ cookies, url, request }) => {
  const { question, answer } = genCaptcha();
  const xfProto = request.headers.get('x-forwarded-proto');
  const isHttps = url.protocol === 'https:' || (xfProto ? xfProto.includes('https') : false);
  const cookieSecure = process.env.COOKIE_SECURE === 'true' || (process.env.COOKIE_SECURE !== 'false' && isHttps);
  cookies.set('captcha_answer', answer, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSecure,
    maxAge: 60 * 5 // 5 minutes
  });
  return { captchaQuestion: question };
};


export const actions = {
  default: async ({ request, cookies, url }) => {
    const formData = await request.formData();
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '').trim();
    const captcha = String(formData.get('captcha') || '').trim();
    const bypassCaptcha = process.env.AUTH_DISABLE_CAPTCHA === 'true';

    // Validate captcha
    const expected = cookies.get('captcha_answer') || '';
    if (!bypassCaptcha && (!captcha || captcha !== expected)) {
      const { question, answer } = genCaptcha();
      const xfProto2 = request.headers.get('x-forwarded-proto');
      const isHttps2 = url.protocol === 'https:' || (xfProto2 ? xfProto2.includes('https') : false);
      const cookieSecure2 = process.env.COOKIE_SECURE === 'true' || (process.env.COOKIE_SECURE !== 'false' && isHttps2);
      cookies.set('captcha_answer', answer, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: cookieSecure2,
        maxAge: 60 * 5
      });
      return fail(400, { error: 'Captcha salah. Coba lagi.', captchaQuestion: question });
    }

    // Validate credentials
    const user = dummyUsers.find((u) => u.username === username && u.password === password);
    if (!user) {
      const { question, answer } = genCaptcha();
      const xfProto3 = request.headers.get('x-forwarded-proto');
      const isHttps3 = url.protocol === 'https:' || (xfProto3 ? xfProto3.includes('https') : false);
      const cookieSecure3 = process.env.COOKIE_SECURE === 'true' || (process.env.COOKIE_SECURE !== 'false' && isHttps3);
      cookies.set('captcha_answer', answer, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: cookieSecure3,
        maxAge: 60 * 5
      });
      return fail(400, { error: "Username atau password salah!", captchaQuestion: question });
    }
    // Decide cookie security dynamically: use HTTPS detection or env override
    const xfProto = request.headers.get('x-forwarded-proto');
    const isHttps = url.protocol === 'https:' || (xfProto ? xfProto.includes('https') : false);
    const cookieSecure = process.env.COOKIE_SECURE === 'true' || (process.env.COOKIE_SECURE !== 'false' && isHttps);

    // Success: set session and clear captcha
    cookies.set('session', JSON.stringify(user), {
      path: '/',
      httpOnly: false, // keep false since some pages read it in client; switch to true if not needed
      sameSite: 'lax',
      secure: cookieSecure,
      maxAge: 60 * 60 * 8 // 8 hours
    });
    cookies.delete('captcha_answer', { path: '/' });

    throw redirect(303, '/dashboard');
  }
};
