#!/usr/bin/env python3
# Generate the favicon set + branded OG card for Pine Haven Assisted Living.
# Requires Pillow. Run from the app root: python3 scripts/generate-assets.py

from PIL import Image, ImageDraw, ImageFont

OUT = "./public"
PINE = (35, 73, 58)            # deep pine — favicon tile + gradient start
PINE_LIGHT = (63, 107, 84)     # gradient end
CREAM = (243, 239, 228)        # warm cream — monogram + wordmark
WORDMARK = ["Pine Haven"]
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


def pine_tree(d, cx, top, h, color):
    """Draw a simple 3-tier pine tree centered at cx, spanning vertical h from top."""
    w = h * 0.62
    tiers = [(0.0, 0.42), (0.28, 0.70), (0.56, 1.0)]
    for ty, by in tiers:
        y0 = top + h * ty
        y1 = top + h * (by * 0.95)
        half = w * (by) / 2
        d.polygon([(cx, y0), (cx - half, y1), (cx + half, y1)], fill=color)
    # trunk
    tw = w * 0.12
    d.rectangle([cx - tw / 2, top + h, cx + tw / 2, top + h * 1.12], fill=color)


def tile(size, frac=0.2):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * frac), fill=PINE)
    pine_tree(d, size / 2, size * 0.16, size * 0.6, CREAM)
    return img


for s, name in [(16, "favicon-16.png"), (32, "favicon-32.png"), (180, "apple-touch-icon.png")]:
    tile(s).save(f"{OUT}/{name}")

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
pine_tree(d, 150, 110, 230, CREAM)
y = 360
for line in WORDMARK:
    d.text((80, y), line, font=font(96), fill=CREAM)
    y += 110
d.text((84, y), SUB, font=font(46, bold=False), fill=(220, 232, 224))
d.text((84, y + 75), TAGLINE, font=font(30, bold=False), fill=(205, 222, 213))
og.save(f"{OUT}/og-preview.jpg", quality=88)
print("Wrote favicon-16/32, apple-touch-icon, og-preview.jpg to", OUT)
