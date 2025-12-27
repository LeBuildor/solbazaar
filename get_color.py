
from PIL import Image
from collections import Counter

def get_dominant_color(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGB")
        img = img.resize((50, 50))  # Resize to speed up
        pixels = list(img.getdata())
        # Filter out common transparent pixels if png (though we converted to RGB so distinct steps usually needed, but this is simple)
        
        # Most common color
        counts = Counter(pixels)
        most_common = counts.most_common(1)[0][0]
        
        return "#{:02x}{:02x}{:02x}".format(most_common[0], most_common[1], most_common[2])
    except Exception as e:
        return str(e)

image_path = "/Users/powl/.gemini/antigravity/brain/9fdf3bb0-7a11-40f7-9e35-58b2791b8081/uploaded_image_1766821104170.png"
print(get_dominant_color(image_path))
