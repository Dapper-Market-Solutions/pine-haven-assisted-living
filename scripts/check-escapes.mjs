// Fails the build when a raw `\uXXXX` escape could reach a visitor.
//
// THE PROBLEM THIS SOLVES. JSX does not process `\u` escapes in attribute
// values or text children, so `title="a — b"` paints the literal
// backslash sequence in the browser tab, the Google snippet and the page.
// The identical escape inside a JS string literal renders fine, which is why
// a file can be half-broken with nothing visibly wrong in most of it.
//
// The standing rule ("type the character, never the escape") has been in
// CLAUDE.md since 2026-08-09 and it reached production anyway, four times:
// dapperms.com (twice), getwellnorthville.com, and pinehavenassistedliving.com
// on 2026-09-17. The last one was not typed by anyone: the Visibility Analyst
// auto-apply rewrote a correct em dash as `—` in a `<MetaTags title>`
// and committed through the GitHub API, where no git hook runs. A rule only
// binds whoever reads it. A build step binds every committer.
//
// Two modes, both wired into `npm run build` via package.json:
//   node scripts/check-escapes.mjs          # prebuild: scan source
//   node scripts/check-escapes.mjs --dist   # postbuild: scan built HTML
//
// Source mode flags `\uXXXX` in .js/.jsx/.ts/.tsx under src/, skipping
// `//` comment lines and `\\u` (an escaped backslash, e.g. JsonLd's `$`
// guard). `.json` content files are not scanned: escapes there decode at
// parse and are legitimate.
//
// Dist mode strips every <script> block (SSG loader-data JSON legitimately
// holds escapes) and flags any `\uXXXX` left in the HTML. That is exactly
// what a visitor or a crawler would see.
//
// Fatal everywhere, CI included. A visible escape is a client-facing defect,
// and a failed deploy leaves the last good build serving, which is the
// better outcome.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distMode = process.argv.includes('--dist')

function walk(dir, exts, out = []) {
  let entries
  try { entries = readdirSync(dir) } catch { return out }
  for (const name of entries) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, exts, out)
    else if (exts.some((e) => name.endsWith(e))) out.push(p)
  }
  return out
}

// A `\u` preceded by another backslash is an escaped backslash, not an escape.
const ESCAPE_RE = /(?<!\\)\\u[0-9a-fA-F]{4}/g

const findings = []

if (distMode) {
  const dist = join(ROOT, 'dist')
  const files = walk(dist, ['.html'])
  if (files.length === 0) {
    console.error('✖ check:escapes --dist: no HTML under dist/ — run after the build')
    process.exit(1)
  }
  for (const f of files) {
    const html = readFileSync(f, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    const lines = html.split('\n')
    lines.forEach((line, i) => {
      for (const m of line.matchAll(ESCAPE_RE)) {
        const at = Math.max(0, m.index - 50)
        findings.push(`${relative(ROOT, f)}:${i + 1}  …${line.slice(at, m.index + 40).replace(/<[^>]+>/g, ' ').trim()}…`)
      }
    })
  }
} else {
  const files = walk(join(ROOT, 'src'), ['.js', '.jsx', '.ts', '.tsx'])
  for (const f of files) {
    const lines = readFileSync(f, 'utf8').split('\n')
    lines.forEach((line, i) => {
      if (/^\s*\/\//.test(line) || /^\s*\*/.test(line)) return
      for (const m of line.matchAll(ESCAPE_RE)) {
        findings.push(`${relative(ROOT, f)}:${i + 1}  ${m[0]}  ${line.trim().slice(0, 100)}`)
      }
    })
  }
}

if (findings.length) {
  console.error(`✖ check:escapes${distMode ? ' --dist' : ''}: ${findings.length} raw \\uXXXX escape(s)${distMode ? ' visible in built HTML' : ' in source'}.`)
  console.error('  Type the character itself (— ’ … → ™ ×). JSX attributes and text do not decode \\u escapes.')
  for (const line of findings.slice(0, 40)) console.error('   · ' + line)
  if (findings.length > 40) console.error(`   … and ${findings.length - 40} more`)
  process.exit(1)
}

console.log(`✓ check:escapes${distMode ? ' --dist' : ''}: no raw \\uXXXX escapes`)
