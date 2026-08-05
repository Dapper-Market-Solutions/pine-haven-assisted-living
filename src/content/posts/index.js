// Auto-aggregate every per-post JSON the DMS Weekly Blog Writer commits.
// Each file is src/content/posts/{slug}.json:
//   { id, slug, title, excerpt, date, modified, author, featuredImage,
//     inlineImages, contentHtml }
//
// GLOB LOADER ON PURPOSE. Dropping a JSON file in is all it takes — it gets a
// route, appears on the index, and sorts to the top by date. Do NOT introduce a
// hand-maintained posts-index.json: on two other DMS sites that manifest let a
// committed post exist with no route and appear nowhere, silently.

const modules = import.meta.glob('./*.json', { eager: true })

export const posts = Object.values(modules)
  .map((m) => m.default || m)
  .filter((p) => p && p.slug)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

export const postsBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))
export const postSlugs = posts.map((p) => p.slug)
