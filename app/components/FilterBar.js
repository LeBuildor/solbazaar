import Button from './Button';
import './FilterBar.css';

export default function FilterBar() {
    return (
        <div className="filter-bar">
            <div className="search-group">
                <input type="text" placeholder="search for product" className="search-input" />
                <Button variant="primary" style={{ backgroundColor: 'var(--accent-green)', color: 'var(--bg-dark)', fontWeight: 'bold' }}>search</Button>
            </div>
        </div>
    );
}
