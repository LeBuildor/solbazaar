"use client";
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Twitter, Send } from 'lucide-react';
import './Header.css';

// Dynamically import CustomWalletButton
const CustomWalletButton = dynamic(
    async () => (await import('./CustomWalletButton')).default,
    { ssr: false }
);

export default function Header() {
    return (
        <nav className="header">
            <div className="header-left">
                <Link href="/" style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Solbazar Logo" style={{ height: '38px', width: 'auto' }} />
                </Link>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem' }}>
                        <Link href="/how-it-works" className="nav-link">[how it works]</Link>
                        <Link href="/advanced" className="nav-link">[advanced]</Link>
                    </div>
                    <div className="social-icons" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem' }}>
                        <a href="https://t.me/solbazaarfunsupport" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>[support]</a>
                        {/* X (Twitter) */}
                        <a href="https://x.com/solbazaarfun" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Telegram */}
                        <a href="https://t.me/solbazaarfun" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                            <Send size={14} />
                        </a>

                    </div>
                </div>
            </div>

            <div className="header-center" style={{ display: 'flex', gap: '10px' }}>
                <div className="pill" style={{ backgroundColor: '#bdffcb', color: '#000', borderColor: '#bdffcb' }}>
                    <img src="/frog-pfp.png" alt="av" style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: 'bold' }}>bought 1 gift card</span>
                    <img src="/amazon-gift-card.png" alt="prod" style={{ width: '16px', height: '16px', objectFit: 'cover' }} />
                </div>
                <div className="pill" style={{ backgroundColor: '#a9d2ff', color: '#000', borderColor: '#a9d2ff' }}>
                    <span style={{ fontWeight: 'bold' }}>GVu75x</span>
                    <span>listed 21CARS</span>
                    <img src="/amazon-gift-card.png" alt="prod" style={{ width: '16px', height: '16px', objectFit: 'cover' }} />
                    <span>on 11/26/24</span>
                </div>
            </div>

            <div className="header-right">
                <CustomWalletButton />
            </div>
        </nav>
    );
}
