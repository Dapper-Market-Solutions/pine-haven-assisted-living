import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AssistedLivingPage from './pages/AssistedLivingPage.jsx';
import MemoryCarePage from './pages/MemoryCarePage.jsx';
import RespiteCarePage from './pages/RespiteCarePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import BlogIndexPage from '@/pages/BlogIndexPage.jsx';
import BlogPostPage from '@/pages/BlogPostPage.jsx';
import { postSlugs } from '@/content/posts';
import ContactPage from './pages/ContactPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import AreaPage from './pages/AreaPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import CookiesPage from './pages/CookiesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Shared chrome wraps every route. Header/Footer are rendered per-page (so each
// page controls its own hero). CookieConsent + Toaster are client-only.
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Toaster />
      <CookieConsent />
    </>
  );
}

// Per-area page data drives the three city landing pages from one component.
const AREAS = {
  saginaw: {
    city: 'Saginaw',
    distance: 'about 25 minutes west of',
    blurb:
      'Saginaw families choose Pine Haven for the small-home alternative to large institutional facilities — a real house in the country, just a short drive away.',
  },
  midland: {
    city: 'Midland',
    distance: 'a short drive south of',
    blurb:
      'For Midland families, Pine Haven offers an intimate, six-bedroom assisted living and memory care home with a registered nurse on staff and home-cooked meals every day.',
  },
  'bay-city': {
    city: 'Bay City',
    distance: 'a comfortable drive from',
    blurb:
      'Bay City families trust Pine Haven for personal, attentive care in a quiet country setting — never a crowded facility where a loved one becomes a room number.',
  },
};

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'assisted-living', element: <AssistedLivingPage /> },
      { path: 'memory-care', element: <MemoryCarePage /> },
      { path: 'respite-care', element: <RespiteCarePage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'blog', element: <BlogIndexPage /> },
      {
        path: 'blog/:slug',
        element: <BlogPostPage />,
        // Required so vite-react-ssg prerenders one static HTML file per post —
        // most AI crawlers and some search bots do not run JS.
        getStaticPaths: () => postSlugs.map((slug) => `/blog/${slug}`),
      },
      { path: 'contact', element: <ContactPage /> },
      { path: 'thank-you', element: <ThankYouPage /> },
      { path: 'assisted-living-saginaw', element: <AreaPage {...AREAS['saginaw']} slug="/assisted-living-saginaw" /> },
      { path: 'assisted-living-midland', element: <AreaPage {...AREAS['midland']} slug="/assisted-living-midland" /> },
      { path: 'assisted-living-bay-city', element: <AreaPage {...AREAS['bay-city']} slug="/assisted-living-bay-city" /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'cookies', element: <CookiesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
