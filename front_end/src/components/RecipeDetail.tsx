import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRecipe } from '../@types/recipe';

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`https://orecipesapi.onrender.com/api/recipes/${slug}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [slug]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!recipe) {
    return <p>Recette non trouvée</p>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <img src={recipe.thumbnail} alt={recipe.title} />
      <p>{recipe.description}</p>
      <h3>Ingrédients</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;