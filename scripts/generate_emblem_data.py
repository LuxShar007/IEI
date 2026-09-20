import json
import xml.etree.ElementTree as ET

tree = ET.parse('public/assets/brand/iei-emblem.svg')
root = tree.getroot()

groups = {}
for g in root.findall('.//{http://www.w3.org/2000/svg}g'):
    gid = g.attrib.get('id')
    if gid:
        path_list = []
        for p in g.findall('.//{http://www.w3.org/2000/svg}path'):
            d = p.attrib.get('d')
            tr = p.attrib.get('transform', '')
            if d:
                path_list.append({'d': d, 'transform': tr})
        groups[gid] = path_list

ts_content = f'''// Generated official IEI Emblem vector path definitions
// Preserving high fidelity to the official circular seal
export interface EmblemPath {{
  d: string;
  transform?: string;
}}

export const EMBLEM_DATA: Record<string, EmblemPath[]> = {json.dumps(groups, indent=2)};
'''

with open('src/components/intro/emblemData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated src/components/intro/emblemData.ts successfully with {len(groups)} groups!")
for gid, p_list in groups.items():
    print(f"  {gid}: {len(p_list)} paths")
