import React, { useState, useEffect } from 'react';

export default function App() {
  const [pantry] = useState(["chicken", "rice", "garlic"]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`/api/recipes?ingredients=${pantry.join(',')}`)
      .then(res => res.json())
      .then(data => setRecipes(data.recipes || []));
  }, [pantry]);

  return (
    <div style={{ maxWidth: '375px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <h1 style={{ color: '#111827', fontSize: '24px', fontWeight: 'bold' }}>KimiCook</h1>
      <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '20px' }}>Your Pantry: {pantry.join(', ')}</p>
      <div style={{ display: 'grid', gap: '20px' }}>
        {recipes.map(recipe => (
          <div key={recipe.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee' }}>
            <img src={recipe.img} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} alt={recipe.title} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', fontSize: '18px', color: '#111827' }}>{recipe.title}</h3>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'white', backgroundColor: '#10B981', padding: '4px 8px', borderRadius: '6px' }}>READY TO COOK</span>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>{recipe.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
