"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './CreateCoin.css';
import Button from '../components/Button';
import Link from 'next/link';

export default function CreatePage() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        ticker: '', // Will be used as SKU/ID
        price: '',
        description: '',
        image: null
    });
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            // For a real app, you'd upload this to storage (S3/IPFS) and get a URL.
            // For this demo, we'll create a local Object URL or just pretend.
            // Let's try to convert to Base64 for local DB persistence to be "real" enough.
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price) return alert('Name and Price are required');

        setLoading(true);
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/');
            } else {
                alert('Failed to list product');
            }
        } catch (e) {
            console.error(e);
            alert('Error creating listing');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="create-container" style={{ width: '100%' }}>
                <Link href="/" className="back-link nav-link">[go back]</Link>

                <div className="form-group">
                    <label className="form-label">product name</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Vintage Leather Jacket"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">sku / ticker</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. JKT01"
                        value={formData.ticker}
                        onChange={e => setFormData({ ...formData, ticker: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">price (SOL)</label>
                    <input
                        type="number"
                        className="form-input"
                        placeholder="0.0"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">description</label>
                    <textarea
                        className="form-input form-textarea"
                        placeholder="describe condition, shipping, etc."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="form-label">product image</label>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    <div className="upload-box" onClick={handleBoxClick}>
                        {fileName ? (
                            <div style={{ color: 'var(--accent-green)' }}>Selected: {fileName}</div>
                        ) : (
                            <>
                                <span>⬆️</span>
                                <span>drag and drop an image of your product</span>
                                <Button variant="secondary" style={{ marginTop: '10px' }} onClick={(e) => { e.stopPropagation(); handleBoxClick(); }}>select file</Button>
                            </>
                        )}
                    </div>
                </div>


                <Button
                    variant="primary"
                    style={{ marginTop: '10px', width: '100%', fontSize: '1.2rem' }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'listing...' : 'list product'}
                </Button>

                <div className="helper-text">
                    funds are held in escrow until the buyer confirms receipt
                </div>
            </div>
        </div>
    );
}
