"use client";
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function CustomWalletButton() {
    const { connected, publicKey, disconnect } = useWallet();
    const { setVisible } = useWalletModal();

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-main)',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: 0,
        textTransform: 'lowercase'
    };

    if (connected && publicKey) {
        const base58 = publicKey.toBase58();
        const address = base58.slice(0, 4) + '..' + base58.slice(-4);
        return (
            <button
                onClick={disconnect}
                style={buttonStyle}
                title="Disconnect Wallet"
            >
                [{address}]
            </button>
        );
    }

    return (
        <button
            onClick={() => setVisible(true)}
            style={buttonStyle}
        >
            [connect wallet]
        </button>
    );
}
