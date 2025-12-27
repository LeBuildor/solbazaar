"use client";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Twitter, Send, MessageCircle } from 'lucide-react';
import './Header.css';

// Dynamically import WalletMultiButton with SSR disabled to prevent hydration mismatch
const WalletMultiButton = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export default function Header() {
    return (
        <nav className="header">
            <div className="header-left">
                <Link href="/how-it-works" className="nav-link">[how it works]</Link>
                <Link href="/advanced" className="nav-link">[advanced]</Link>
                <div className="social-icons" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span>[support]</span>
                    <Twitter size={16} />
                    <Send size={16} />
                    <MessageCircle size={16} />
                </div>
            </div>

            <div className="header-center">
                <div className="pill">
                    <span>💊</span>
                    <span>75hxXc sold 0.0491 SOL of</span>
                    <span style={{ color: 'var(--accent-danger)' }}>▲</span>
                </div>
            </div>

            <div className="header-right">
                {/* Real Wallet Button */}
                <WalletMultiButton style={{ backgroundColor: 'transparent', border: '1px solid var(--text-main)', borderRadius: '0', fontFamily: 'var(--font-retro)', textTransform: 'uppercase', height: 'auto', padding: '8px 16px', fontSize: '0.8rem' }} />
            </div>
        </nav>
    );
}
