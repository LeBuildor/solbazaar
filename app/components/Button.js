import './Button.css';

export default function Button({ children, variant = 'primary', onClick, className = '' }) {
    // If ghost, we might often want brackets contextually, but let's leave it to user
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
