import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateIngredient } from '../utils/ingredientValidator';

const router = express.Router();

// Initialize Gemini API
if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Google API key not found');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const VALID_INGREDIENTS = new Set([
  'tomato', 'onion', 'potato', 'carrot', 'chicken',
  'beef', 'fish', 'rice', 'pasta', 'egg',
  // Add more valid ingredients
]);

router.post('/analyze-ingredients', async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image provided' 
      });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    // Use Gemini Vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const prompt = "List all food ingredients visible in this image. Only output the ingredients as a comma-separated list, nothing else. If no food ingredients are visible, output 'none'.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBuffer.toString('base64')
        }
      }
    ]);

    const response = await result.response;
    const text = response.text().toLowerCase();
    
    // Parse the comma-separated list
    const detectedIngredients = text === 'none' 
      ? [] 
      : text.split(',')
          .map(item => item.trim())
          .filter(item => validateIngredient(item, VALID_INGREDIENTS));

    if (detectedIngredients.length === 0) {
      return res.json({
        success: true,
        ingredients: [],
        message: 'No ingredients detected with high confidence'
      });
    }

    return res.json({
      success: true,
      ingredients: [...new Set(detectedIngredients)] // Remove duplicates
    });

  } catch (error) {
    console.error('Ingredient analysis error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to analyze ingredients'
    });
  }
});

export default router; 