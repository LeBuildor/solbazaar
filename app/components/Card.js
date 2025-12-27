import './Card.css';

export default function Card({ product }) {
    // product = { name, ticker, description, createdBy, timeAgo, marketCap, replies, image }

    return (
        <div className="card">
            {product.image ? (
                <img src={product.image} alt={product.name} className="card-img" />
            ) : (
                <div className="card-img-placeholder">
                    Unable to display image
                </div>
            )}

            <div className="card-content">
                <div className="card-header">
                    <span>created by</span>
                    <span className="card-user">{product.createdBy}</span>
                    <span>{product.timeAgo}</span>
                </div>

                <div className="card-stats">
                    <span className="mcap-badge" style={{ color: 'var(--accent-green)' }}>price: {product.price}</span>
                </div>

                <div className="card-replies">
                    replies: {product.replies}
                </div>

                <div className="card-body">
                    <span className="card-title">{product.name} ({product.ticker}):</span>
                    <span className="card-desc"> {product.description}</span>
                </div>
            </div>
        </div>
    );
}
