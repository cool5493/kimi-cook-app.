export default async function handler(req, res) {
  const { ingredients } = req.query;
  const APP_ID = process.env.EDAMAM_APP_ID;
  const APP_KEY = process.env.EDAMAM_APP_KEY;
  
  try {
    const response = await fetch(
      `https://api.edamam.com/search?q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    const recipes = data.hits.map(hit => ({
      id: hit.recipe.uri.split('#')[1],
      title: hit.recipe.label,
      items: hit.recipe.ingredientLines.map(i => i.toLowerCase()),
      time: `${hit.recipe.totalTime || 20} min`,
      img: hit.recipe.image
    }));
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
}
