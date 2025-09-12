import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    // Disable strict cross-site POST origin checks to support deployments behind
    // reverse proxies or when using IP/host mismatches during testing.
    // Re-enable after configuring proxy headers (see notes in docker-compose).
    csrf: { checkOrigin: false }
  }
};

export default config;
