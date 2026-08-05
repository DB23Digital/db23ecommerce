"""
Convert all PNG/JPG images in public/assets/blog/ to WebP.
Removes originals after successful conversion.
"""
import os
import sys
from pathlib import Path
from PIL import Image

BLOG_ASSETS = Path(__file__).parent / "public" / "assets" / "blog"
WEBP_QUALITY = 85  # Good quality/size tradeoff

def convert(src: Path) -> tuple[int, int]:
    dest = src.with_suffix(".webp")
    with Image.open(src) as img:
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
        elif img.mode != "RGB":
            img = img.convert("RGB")
        img.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)
    original_size = src.stat().st_size
    webp_size = dest.stat().st_size
    src.unlink()
    return original_size, webp_size

def main():
    extensions = {".png", ".jpg", ".jpeg"}
    files = [f for f in BLOG_ASSETS.iterdir() if f.suffix.lower() in extensions]

    if not files:
        print("No images found to convert.")
        return

    print(f"Converting {len(files)} image(s) in {BLOG_ASSETS}\n")

    total_before = total_after = 0
    for src in sorted(files):
        before, after = convert(src)
        saving = (1 - after / before) * 100
        print(f"  {src.name} -> {src.stem}.webp  "
              f"{before//1024}KB -> {after//1024}KB  ({saving:.0f}% smaller)")
        total_before += before
        total_after += after

    total_saving = (1 - total_after / total_before) * 100
    print(f"\nTotal: {total_before//1024}KB -> {total_after//1024}KB  "
          f"({total_saving:.0f}% reduction, saved {(total_before - total_after)//1024}KB)")

if __name__ == "__main__":
    main()
