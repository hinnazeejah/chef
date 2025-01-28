import axios from 'axios';

const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/food/ingredients';

export const searchIngredients = async (query: string): Promise<string[]> => {
  if (!SPOONACULAR_API_KEY) {
    console.error('Spoonacular API key is missing');
    return [];
  }

  try {
    console.log('Fetching ingredients with query:', query);
    const response = await axios.get(`${BASE_URL}/autocomplete`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query,
        number: 10
      }
    });
    console.log('API Response:', response.data);
    return response.data.map((item: any) => item.name);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }
}; 