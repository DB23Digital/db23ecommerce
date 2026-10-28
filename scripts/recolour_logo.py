"""Shift the blue/cyan parts of the DB23 logo to signal vermilion (#ff4f1f).
Neutral (silver/black) pixels are left alone so the metallic letters and glow survive."""
import sys, colorsys
from PIL import Image

TARGET_H = colorsys.rgb_to_hsv(0xff/255, 0x4f/255, 0x1f/255)[0]  # ~0.036

def recolour(src, dst, preview=None):
    im = Image.open(src).convert('RGBA')
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            *rgb, a = px[x, y]
            r, g, b = (c / 255 for c in rgb)
            h, s, v = colorsys.rgb_to_hsv(r, g, b)
            # blue-cyan band only, with enough colour to matter
            if not 0.45 <= h <= 0.72:
                continue
            if s > 0.4:
                # saturated blue: becomes vermilion
                nr, ng, nb = colorsys.hsv_to_rgb(TARGET_H, min(1, s * 1.05), v)
            else:
                # blue-tinted silver: drop the tint so it stays neutral
                nr = ng = nb = v * (1 - s / 2)
            px[x, y] = (round(nr * 255), round(ng * 255), round(nb * 255), a)
    im.save(dst, 'WEBP', quality=95, method=6, lossless=im.getextrema()[3][0] < 255)
    if preview:
        im.resize((im.width * 4, im.height * 4), Image.LANCZOS).save(preview)

if __name__ == '__main__':
    recolour(*sys.argv[1:4])
