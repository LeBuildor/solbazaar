"use client";
import React, { useState, useEffect } from 'react';
import '../Board.css';
import Button from '../../components/Button';
import Link from 'next/link';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function BoardPage({ params }) {
    const ticker = params.ticker;
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    // Fetch product data
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.ticker === ticker);
                setProduct(found);
                setLoading(false);
            });
    }, [ticker]);

    const handleBuy = async () => {
        if (!publicKey) return alert('Please connect your wallet!');
        if (!product) return;

        setProcessing(true);

        try {
            const recipient = new PublicKey("75hxXc4k97z38Ub8d8c7c9438d8c7c9438d8c7c943"); // Use a fixed mock seller address or valid devnet address
            // ideally we would use product.sellerAddress if we stored it

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipient,
                    lamports: parseFloat(product.price) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature, 'processed');

            alert(`Purchase successful! Signature: ${signature}`);
        } catch (error) {
            console.error(error);
            alert('Transaction failed!');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '50px', textAlign: 'center' }}>Loading product...</div>;
    if (!product) return <div className="container" style={{ padding: '50px', textAlign: 'center' }}>Product not found</div>;

    return (
        <div className="container">
            <Link href="/" className="nav-link" style={{ display: 'inline-block', marginTop: '20px' }}>[go back]</Link>

            <div className="board-container">
                {/* Left: Product Info */}
                <div className="chart-section">
                    <div className="token-info-header">
                        {product.image && <img src={product.image} className="token-img-lg" alt={product.name} />}
                        <div>
                            <h2 style={{ fontSize: '1.5rem' }}>{product.name}</h2>
                            <div style={{ color: 'var(--text-muted)' }}>SKU: {product.ticker}</div>
                            <div style={{ color: 'var(--accent-green)', marginTop: '5px' }}>Price: {product.price} SOL</div>
                        </div>
                    </div>

                    <div className="chart-placeholder" style={{ background: 'transparent', border: 'none', height: 'auto', display: 'block' }}>
                        <div style={{ border: '1px solid var(--border-color)', padding: '20px', background: '#191b23' }}>
                            <h3 style={{ marginBottom: '10px' }}>Product Description</h3>
                            <p>{product.description}</p>
                            <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Sold by: <span style={{ color: 'var(--accent-blue)' }}>{product.seller}</span></p>
                        </div>
                    </div>
                </div>

                {/* Right: Trade Panel (Escrow Interface) */}
                <div className="trade-panel">
                    <div className="trade-tabs">
                        <div className="trade-tab active-buy">buy now</div>
                    </div>

                    <div className="trade-input-group">
                        <div className="trade-input-label">
                            <span>confirm price</span>
                        </div>
                        <div style={{ padding: '10px', fontSize: '1.2rem', textAlign: 'right', fontWeight: 'bold' }}>{product.price} SOL</div>
                    </div>

                    <Button
                        variant="primary"
                        style={{ width: '100%' }}
                        onClick={handleBuy}
                        disabled={processing || !publicKey}
                    >
                        {!publicKey ? 'connect wallet first' : (processing ? 'processing...' : 'purchase item')}
                    </Button>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        funds held in escrow until delivery confirmed
                    </div>
                </div>
            </div>
        </div>
    );
}
