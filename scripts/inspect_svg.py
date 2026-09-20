import re

with open('public/assets/brand/iei-emblem-clean.svg', 'r', encoding='utf-8') as f:
    svg = f.read()

print('SVG Length:', len(svg))
paths = re.findall(r'<path[^>]+fill="([^"]+)"', svg)
fills = {}
for fill in paths:
    fills[fill] = fills.get(fill, 0) + 1
print('Fills summary:', fills)
