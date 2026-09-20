import re
import xml.etree.ElementTree as ET
import numpy as np

# Parse the SVG
tree = ET.parse('public/assets/brand/iei-emblem-clean.svg')
root = tree.getroot()

# The SVG has width 316, height 316
# Center is (158, 158)
center = (158.0, 158.0)

# In SVG, let's find all path elements
namespaces = {'svg': 'http://www.w3.org/2000/svg'}
# If root has no namespace prefix or default namespace
paths = root.findall('.//{http://www.w3.org/2000/svg}path')
if not paths:
    paths = root.findall('.//path')

print(f"Total paths found: {len(paths)}")

def get_approx_coords(d_str, transform_str):
    # extract numbers from d
    tx, ty = 0.0, 0.0
    if transform_str:
        m = re.search(r'translate\(([^,]+),([^)]+)\)', transform_str)
        if m:
            tx, ty = float(m.group(1)), float(m.group(2))
    
    nums = re.findall(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?', d_str)
    # pair them up approx
    coords = []
    for i in range(0, len(nums)-1, 2):
        try:
            x = float(nums[i]) + tx
            y = float(nums[i+1]) + ty
            coords.append((x, y))
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
        'dist_from_center': dist,
        'radius_span': radius_span,
        'num_points': len(coords)
    }

classified = []
for i, p in enumerate(paths):
    d = p.attrib.get('d', '')
    tr = p.attrib.get('transform', '')
    info = get_approx_coords(d, tr)
    if info:
        info['index'] = i
        classified.append(info)

# Sort by distance from center and size
print("\nTop 15 largest / most prominent elements:")
sorted_by_size = sorted(classified, key=lambda x: x['radius_span'], reverse=True)
for item in sorted_by_size[:15]:
    print(f"Path #{item['index']}: radius_span={item['radius_span']:.1f}, dist={item['dist_from_center']:.1f}, cx={item['cx']:.1f}, cy={item['cy']:.1f}, pts={item['num_points']}")

