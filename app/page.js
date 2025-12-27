"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import KingOfTheHill from './components/KingOfTheHill';
import FilterBar from './components/FilterBar';
import Card from './components/Card';
import Button from './components/Button';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container">
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/create">
          <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-retro)', color: 'var(--text-main)', cursor: 'pointer' }}>[sell a product]</span>
        </Link>
      </div>

      <KingOfTheHill />

      <FilterBar />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading marketplace...</div>
      ) : (
        <div className="card-grid">
          {products.length === 0 && <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>No products listed yet. Be the first!</div>}
          {products.map(p => (
            <Link key={p.id} href={`/board/${p.ticker}`}>
              <Card product={p} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
