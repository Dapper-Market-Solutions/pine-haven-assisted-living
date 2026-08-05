import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MetaTags from '@/components/MetaTags.jsx';
import PageHero from '@/components/PageHero.jsx';
import CTASection from '@/components/CTASection.jsx';
import { NAP } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { posts } from '@/content/posts';

// Blog index. Reads the glob loader in src/content/posts — a committed post
// appears here automatically, newest first. Shows a friendly empty state until
// the first post lands.

function formatDate(iso) {
  if (!iso) return '';
  try {
    const [y, m, d] = String(iso).split('T')[0].split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return String(iso).split('T')[0];
  }
}

const BlogIndexPage = () => (
  <>
    <MetaTags
      title="Senior Care Guides & News"
      description="Practical guidance for Michigan families choosing assisted living, memory care, or respite care — from the team at Pine Haven in Hemlock."
      jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])}
    />
    <Header />
    <PageHero
      eyebrow="Blog"
      title="Senior Care Guides & News"
      subtitle="Straight answers for families weighing assisted living, memory care, and respite care in mid-Michigan."
    />

    <section className="py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {posts.length === 0 ? (
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Newspaper className="w-8 h-8" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Guides coming soon</h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              We&rsquo;re putting together practical guides on choosing a home, what memory care
              actually involves, and how families pay for care. Check back shortly — or call us
              and we&rsquo;ll answer your questions directly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition flex flex-col"
              >
                {/* `featuredImage` is the writer's key; `image` is the older hand-authored one. */}
                {(p.featuredImage || p.image) && (
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={p.featuredImage || p.image}
                      alt={p.title}
                      width="1200"
                      height="675"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">{p.title}</h2>
                  <p className="text-muted-foreground text-base leading-relaxed flex-1">{p.excerpt}</p>
                  {p.date && <span className="text-muted-foreground text-xs mt-4">{formatDate(p.date)}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>

    <CTASection />
    <Footer />
  </>
);

export default BlogIndexPage;
