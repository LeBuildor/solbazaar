import Button from './Button';
import './FilterBar.css';

export default function FilterBar() {
    return (
        <div className="filter-bar">
            <div className="search-group">
                <input type="text" placeholder="search for token" className="search-input" />
                <Button variant="secondary">search</Button>
            </div>

            <div className="filter-options">
                {/* Mock toggles */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>show animations:</span>
                    <span className="toggle-switch active">on</span>
                    <span className="toggle-switch">off</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>include nsfw:</span>
                    <span className="toggle-switch">on</span>
                    <span className="toggle-switch active">off</span>
                </div>
            </div>
        </div>
    );
}
