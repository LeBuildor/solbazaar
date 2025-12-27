import './Card.css';

function timeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}

export default function Card({ product }) {
    let seller = product.seller || product.createdBy || 'Unknown';
    if (seller.length > 10) {
        seller = seller.substring(0, 6);
    }
    const time = product.timeAgo || timeAgo(product.createdAt) || 'just now';

    return (
        <div className="card">
            {product.image ? (
                <img src={product.image} alt={product.name} className="card-img" />
            ) : (
                <div className="card-img-placeholder" style={{ backgroundColor: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {product.ticker || '?'}
                </div>
            )}

            <div className="card-content">
                <div className="card-header">
                    <span>sold by</span>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginLeft: '5px', marginRight: '5px' }}>
                        <img src="/default-avatar.png" alt="avatar" style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                        <span className="card-user" style={{ padding: '2px 4px', borderRadius: '4px' }}>
                            {seller}
                        </span>
                    </div>
                    <span>{time}</span>
                </div>

                <div className="card-stats">
                    <span className="mcap-badge" style={{ color: 'var(--accent-green)' }}>price: {product.price}</span>
                </div>

                <div className="card-replies">
                    replies: {product.replies || 0}
                </div>

                <div className="card-body">
                    <span className="card-title">{product.name} ({product.ticker}):</span>
                    <span className="card-desc"> {product.description}</span>
                </div>
            </div>
        </div>
    );
}
