import './KingOfTheHill.css';

export default function KingOfTheHill() {
    // Mock data for Featured Product
    const koth = {
        name: 'Rolex Submariner',
        ticker: 'RLX',
        price: '150 SOL',
        replies: 12,
        createdBy: 'LuxuryWatchTrader',
        timeAgo: '10m ago',
        image: 'https://placehold.co/150/gold/black'
    };

    return (
        <div className="koth-container">
            <img src="/koth-title.png" alt="king of the hill" style={{ height: '32px', marginBottom: '1rem', width: 'auto' }} />

            <div className="koth-content">
                <img src="/pump-mascot.jpg" alt="koth" className="koth-img" /> 
                <div className="koth-details">
                    <div style={{ fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        created by <img src="/default-avatar.png" style={{ width: '14px', height: '14px', borderRadius: '50%' }} /> YBtqKu in 1h
                    </div>
                    <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        sol price: 0.2 SOL <img src="/crown.png" alt="crown" style={{ height: '14px', width: 'auto' }} />
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#fff' }}>replies: 9</div>
                    <div style={{ marginTop: '4px', fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>
                        pump fun mascot [pumpy]
                    </div>
                </div>
            </div>
        </div>
    );
}
