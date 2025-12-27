
const Jimp = require("jimp");

async function getDominantColor(imagePath) {
    try {
        // Try to handle different Jimp versions
        let jimpInstance;
        if (typeof Jimp.read === 'function') {
            jimpInstance = Jimp;
        } else if (Jimp.Jimp && typeof Jimp.Jimp.read === 'function') {
            jimpInstance = Jimp.Jimp;
        } else if (Jimp.default && typeof Jimp.default.read === 'function') {
            jimpInstance = Jimp.default;
        } else {
            // If all else fails, log what we have
            console.log("Jimp export structure:", Jimp);
            return;
        }

        const image = await jimpInstance.read(imagePath);
        // image.resize(50, 50); // Skipping resize to avoid version conflicts

        const colorCounts = {};

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const red = image.bitmap.data[idx + 0];
            const green = image.bitmap.data[idx + 1];
            const blue = image.bitmap.data[idx + 2];

            // Format to hex
            const hex = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);

            colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        });

        // Find most frequent
        let maxCount = 0;
        let dominantColor = "";

        for (const [color, count] of Object.entries(colorCounts)) {
            if (count > maxCount) {
                maxCount = count;
                dominantColor = color;
            }
        }

        console.log("Dominant Color:", dominantColor);
    } catch (err) {
        console.error("Error:", err);
    }
}

const imagePath = "/Users/powl/.gemini/antigravity/brain/9fdf3bb0-7a11-40f7-9e35-58b2791b8081/uploaded_image_1766821104170.png";
getDominantColor(imagePath);
