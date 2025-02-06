export const validateIngredient = (
  name: string, 
  validIngredients: Set<string>
): boolean => {
  // Clean the ingredient name
  const cleanName = name.toLowerCase().trim();
  
  // Direct match
  if (validIngredients.has(cleanName)) {
    return true;
  }

  // Partial match (e.g., "red tomato" matches "tomato")
  return Array.from(validIngredients).some(
    valid => cleanName.includes(valid)
  );
}; 