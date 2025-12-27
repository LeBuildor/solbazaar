import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function getProducts() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

async function saveProducts(products) {
    await fs.writeFile(dbPath, JSON.stringify(products, null, 4));
}

export async function GET() {
    const products = await getProducts();
    // Sort by newest
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return Response.json(products);
}

export async function POST(request) {
    const body = await request.json();
    const products = await getProducts();

    const newProduct = {
        id: Date.now(),
        ...body,
        createdAt: new Date().toISOString(),
        ticker: body.ticker || `ITEM-${Math.floor(Math.random() * 1000)}`,
        seller: body.seller || 'Anonymous', // In real app, get from wallet signature
        price: body.price || '0',
        replies: 0
    };

    products.unshift(newProduct);
    await saveProducts(products);

    return Response.json(newProduct);
}
