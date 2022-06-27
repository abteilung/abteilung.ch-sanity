import createClient from 'picosanity';
import { dev } from '$app/env';

const token = (dev ? import.meta.env?.VITE_SANITY_TOKEN as string : undefined);

const sanity =  createClient({
  projectId: 'dmir81f8',
  dataset: dev ? 'production' : 'production',
  withCredentials: true,
  token
});

export { sanity };