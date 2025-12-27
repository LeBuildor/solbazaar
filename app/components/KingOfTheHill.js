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
            <h2 className="koth-title">featured product</h2>

            <div className="koth-content">
                <img src={koth.image} alt={koth.name} className="koth-img" />
                <div className="koth-details">
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        sold by <span style={{ color: 'var(--accent-green)' }}>{koth.createdBy}</span> {koth.timeAgo}
                    </div>
                    <div style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                        price: {koth.price} 👑
                    </div>
                    <div style={{ fontSize: '0.8rem' }}>replies: {koth.replies}</div>
                    <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {koth.name} [{koth.ticker}]
                    </div>
                </div>
            </div>
        </div>
    );
}
