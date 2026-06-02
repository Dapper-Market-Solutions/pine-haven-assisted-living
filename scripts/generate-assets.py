#!/usr/bin/env python3
# Generate the favicon set + branded OG card for Pine Haven Assisted Living.
# Reuses the REAL logo artwork (public/logo.png — pine-tree arch with the
# alpaca) recolored to cream, so the favicon/OG match the brand exactly.
# Requires Pillow. Run from the app root: python3 scripts/generate-assets.py

from PIL import Image, ImageDraw, ImageFont

OUT = "./public"
LOGO = "./public/logo.png"
PINE = (35, 73, 58)            # deep pine — tile + gradient start
PINE_LIGHT = (63, 107, 84)     # gradient end
CREAM = (243, 239, 228)        # warm cream — recolored mark + wordmark
WORDMARK = "Pine Haven"
SUB = "Assisted Living"
TAGLINE = "Assisted Living · Memory Care · Hemlock, MI"


def font(size, bold=True):
    for p in [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Georgia.ttf",
        f"/System/Library/Fonts/Supplemental/Arial{' Bold' if bold else ''}.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()


def icon_mark(color):
    """Crop the arch+alpaca icon out of the real logo, recolor to `color`,
    return an RGBA image trimmed to its content."""
    logo = Image.open(LOGO).convert("RGBA")
    w, h = logo.size
    # Top ~half of the logo is the pine-arch + alpaca icon (text sits below).
    icon = logo.crop((0, 0, w, int(h * 0.50)))
    # Recolor every visible pixel to `color`, keep alpha.
    px = icon.load()
    for y in range(icon.height):
        for x in range(icon.width):
            r, g, b, a = px[x, y]
            if a > 20:
                px[x, y] = (color[0], color[1], color[2], a)
    return icon.crop(icon.getbbox())


def fit(img, box):
    """Scale img to fit within box (w,h) preserving aspect."""
    iw, ih = img.size
    s = min(box[0] / iw, box[1] / ih)
    return img.resize((max(1, int(iw * s)), max(1, int(ih * s))), Image.LANCZOS)


mark = icon_mark(CREAM)


def tile(size, frac=0.2):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * frac), fill=PINE)
    m = fit(mark, (int(size * 0.74), int(size * 0.74)))
    img.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return img


for s, name in [(16, "favicon-16.png"), (32, "favicon-32.png"), (180, "apple-touch-icon.png")]:
    tile(s).save(f"{OUT}/{name}")

# Favicon.svg fallback isn't regenerated here (keep the existing one); browsers
# use the PNGs above. OG card below:
W, H = 1200, 630
og = Image.new("RGB", (W, H), PINE)
px = og.load()
for y in range(H):
    for x in range(0, W, 2):
        t = (x / W) * 0.6 + (y / H) * 0.4
        c = tuple(int(PINE[i] + (PINE_LIGHT[i] - PINE[i]) * t) for i in range(3))
        px[x, y] = c
        if x + 1 < W:
            px[x + 1, y] = c
d = ImageDraw.Draw(og)
m = fit(mark, (360, 360))
og.paste(m, (70, (H - m.height) // 2 - 30), m)
x0 = 70 + m.width + 50
d.text((x0, 215), WORDMARK, font=font(104), fill=CREAM)
d.text((x0 + 4, 340), SUB, font=font(48, bold=False), fill=(220, 232, 224))
d.text((x0 + 4, 415), TAGLINE, font=font(28, bold=False), fill=(205, 222, 213))
og.save(f"{OUT}/og-preview.jpg", quality=88)
print("Wrote favicon-16/32, apple-touch-icon, og-preview.jpg (from real logo) to", OUT)
