import re
import xml.etree.ElementTree as ET
import numpy as np

# Parse the clean SVG
tree = ET.parse('public/assets/brand/iei-emblem-clean.svg')
root = tree.getroot()
paths = root.findall('.//{http://www.w3.org/2000/svg}path')
if not paths:
    paths = root.findall('.//path')

center = (158.0, 158.0)

def parse_coords(d_str, tr_str):
    tx, ty = 0.0, 0.0
    if tr_str:
        m = re.search(r'translate\(([^,]+),([^)]+)\)', tr_str)
        if m:
            tx, ty = float(m.group(1)), float(m.group(2))
    nums = re.findall(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?', d_str)
    coords = []
    for i in range(0, len(nums)-1, 2):
        try:
            coords.append((float(nums[i]) + tx, float(nums[i+1]) + ty))
        except:
            pass
    if not coords:
        return None
    coords = np.array(coords)
    min_x, max_x = coords[:, 0].min(), coords[:, 0].max()
    min_y, max_y = coords[:, 1].min(), coords[:, 1].max()
    cx = (min_x + max_x) / 2.0
    cy = (min_y + max_y) / 2.0
    dist = np.sqrt((cx - center[0])**2 + (cy - center[1])**2)
    radius_span = max(max_x - min_x, max_y - min_y) / 2.0
    return {
        'min_x': min_x, 'max_x': max_x,
        'min_y': min_y, 'max_y': max_y,
        'cx': cx, 'cy': cy,
        'dist': dist,
        'radius_span': radius_span,
        'num_points': len(coords),
        'tx': tx, 'ty': ty
    }

# Path #2: Outer border ring (radius ~ 158)
# Path #1: Rope border (radius ~ 150)
# Path #3: Inner ring (radius ~ 107)
# Path #0: Central illustration (radius ~ 99)
# Paths #4-#95: Circular text glyphs and fine accents

outer_border_paths = [paths[2]]
rope_border_paths = [paths[1]]
inner_ring_paths = [paths[3]]
central_paths = [paths[0]]
text_paths = []
fine_detail_paths = []

for p in paths[4:]:
    info = parse_coords(p.attrib.get('d', ''), p.attrib.get('transform', ''))
    if info:
        # If it's very small or isolated accent
        if info['radius_span'] < 4.0:
            fine_detail_paths.append(p)
        else:
            text_paths.append(p)
    else:
        fine_detail_paths.append(p)

print(f"Outer border: {len(outer_border_paths)}")
print(f"Rope border: {len(rope_border_paths)}")
print(f"Inner ring: {len(inner_ring_paths)}")
print(f"Circular text: {len(text_paths)}")
print(f"Central: {len(central_paths)}")
print(f"Fine details: {len(fine_detail_paths)}")

def format_path(p, group_id):
    d = p.attrib.get('d', '')
    tr = p.attrib.get('transform', '')
    tr_attr = f' transform="{tr}"' if tr else ''
    return f'    <path class="emblem-path emblem-{group_id}" d="{d}"{tr_attr} />\n'

svg_content = '''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 316" width="100%" height="100%" aria-label="Official Institution of Engineers (India) Emblem Vector Geometry" fill="currentColor">
  <defs>
    <style>
      .emblem-group {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
      }
    </style>
  </defs>

  <!-- 01 — OUTER BORDER -->
  <g id="outer-border" class="emblem-group">
'''
for p in outer_border_paths:
    svg_content += format_path(p, 'outer-border')

svg_content += '''  </g>

  <!-- 02 — ROPE / BRAIDED PATTERN BORDER -->
  <g id="rope-border" class="emblem-group">
'''
for p in rope_border_paths:
    svg_content += format_path(p, 'rope-border')

svg_content += '''  </g>

  <!-- 03 — INNER CIRCULAR RING -->
  <g id="inner-ring" class="emblem-group">
'''
for p in inner_ring_paths:
    svg_content += format_path(p, 'inner-ring')

svg_content += '''  </g>

  <!-- 04 — CIRCULAR TEXT GLYPHS -->
  <g id="circular-text" class="emblem-group">
'''
for p in text_paths:
    svg_content += format_path(p, 'circular-text')

svg_content += '''  </g>

  <!-- 05 — CENTRAL FIGURE & ENGINEERING OBJECTS -->
  <g id="central-artwork" class="emblem-group">
'''
for p in central_paths:
    svg_content += format_path(p, 'central-artwork')

svg_content += '''  </g>

  <!-- 06 — FINE DETAILS & ACCENTS -->
  <g id="fine-details" class="emblem-group">
'''
for p in fine_detail_paths:
    svg_content += format_path(p, 'fine-details')

svg_content += '''  </g>
</svg>
'''

with open('public/assets/brand/iei-emblem.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Successfully generated public/assets/brand/iei-emblem.svg! Size: {len(svg_content)} bytes")
