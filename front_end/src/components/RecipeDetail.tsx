import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRecipe } from '../@types/recipe';
import '../App.css';

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
        <div className="recipe-detail_header">
      <img src={recipe.thumbnail} alt={recipe.title} />
      <h2>{recipe.title}</h2>
        </div>
      <p>{recipe.description}</p>
      <div className="recipe-detail_meta">
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li className="quantityIngredient" key={ingredient.id}><span>{ingredient.quantity} {ingredient.unit}</span> {ingredient.name}</li>
        ))}
      </ul>
        </div>
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