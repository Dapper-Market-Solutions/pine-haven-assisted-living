import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import CTASection from '@/components/CTASection.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import { NAP, SITE_URL } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { postsBySlug } from '@/content/posts';

// Article page for a Weekly Blog Writer post. Body HTML renders into
// `.post-content` (styles in index.css) — the writer emits classless semantic
// HTML, so all body styling lives there rather than here.

function formatDate(iso) {
  if (!iso) return '';
  try {
    // Parse as a plain date: new Date('2026-08-05') is UTC midnight, which
    // renders as the previous day in US timezones.
    const [y, m, d] = String(iso).split('T')[0].split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return String(iso).split('T')[0];
  }
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = postsBySlug[slug];

  // Unknown slug → the real 404, so it matches the rest of the site instead of
  // rendering a half-empty article shell.
  if (!post) return <NotFoundPage />;

  const hero = post.featuredImage || post.image;
  const description = (post.excerpt || '').slice(0, 158);
  const author = post.author || NAP.name;

  return (
    <>
      <MetaTags
        title={post.title}
        description={description}
        image={hero ? `${SITE_URL}${hero}` : undefined}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            datePublished: post.date,
            dateModified: post.modified || post.date,
            author: { '@type': 'Person', name: author },
            publisher: {
              '@type': 'Organization',
              name: NAP.name,
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-preview.jpg` },
            },
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
            ...(hero ? { image: `${SITE_URL}${hero}` } : {}),
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Header />

      <article className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">{post.title}</h1>
            <div className="text-sm text-muted-foreground">
              By <span className="font-semibold text-foreground">{author}</span>
              {post.date && <> · {formatDate(post.date)}</>}
            </div>
          </header>

          {hero && (
            <img
              src={hero}
              alt={post.title}
              width="1200"
              height="675"
              className="w-full aspect-[16/9] object-cover rounded-2xl border border-border mb-10"
            />
          )}

          {/* Body HTML comes from the Weekly Blog Writer (server-side, no user
              input) and is reviewed in the portal before it is ever committed. */}
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
        </div>
      </article>

      <CTASection />
      <Footer />
    </>
  );
};

export default BlogPostPage;
