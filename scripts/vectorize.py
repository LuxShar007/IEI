import os
import vtracer

input_path = os.path.abspath('public/assets/brand/iei-emblem.png')
output_path = os.path.abspath('public/assets/brand/iei-emblem.svg')

print(f"Converting {input_path} to {output_path}...")
try:
    vtracer.convert_image_to_svg_py(
        input_path,
        output_path,
        colormode='binary',
        hierarchical='stacked',
        mode='spline',
        filter_speckle=2,
        color_precision=8,
        layer_difference=16,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        splice_threshold=45,
        path_precision=3
    )
    print("Conversion complete! File size:", os.path.getsize(output_path))
except Exception as e:
    print("Error:", e)
