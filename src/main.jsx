import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './index.css';

// vite-react-ssg renders each route to static HTML at build time (real
// content + per-page <head> from react-helmet-async baked in), then hydrates
// on the client. HelmetProvider is wired internally by vite-react-ssg.
export const createRoot = ViteReactSSG({ routes });
