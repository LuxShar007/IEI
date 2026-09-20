import re
import xml.etree.ElementTree as ET
import numpy as np

tree = ET.parse('public/assets/brand/iei-emblem-clean.svg')
root = tree.getroot()
paths = root.findall('.//{http://www.w3.org/2000/svg}path')
if not paths:
    paths = root.findall('.//path')

p0 = paths[0]
d = p0.attrib.get('d', '')
tr = p0.attrib.get('transform', '')
print(f"Path 0 transform: {tr}")

# Split d into subpaths by 'M' or 'm'
subpaths = re.split(r'(?=[Mm])', d.strip())
subpaths = [s for s in subpaths if s.strip()]
print(f"Path 0 contains {len(subpaths)} subpaths!")

tx, ty = 0.0, 0.0
if tr:
    m = re.search(r'translate\(([^,]+),([^)]+)\)', tr)
    if m:
        tx, ty = float(m.group(1)), float(m.group(2))

center = (158.0, 158.0)
for idx, sp in enumerate(subpaths[:10]):
    nums = re.findall(r'[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?', sp)
    coords = []
    for i in range(0, len(nums)-1, 2):
        coords.append((float(nums[i]) + tx, float(nums[i+1]) + ty))
    if coords:
        arr = np.array(coords)
        print(f"Subpath #{idx}: points={len(coords)}, bbox=({arr[:,0].min():.1f}, {arr[:,1].min():.1f}) to ({arr[:,0].max():.1f}, {arr[:,1].max():.1f})")

