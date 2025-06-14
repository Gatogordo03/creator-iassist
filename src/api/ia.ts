
// NOTE: This is a mock AI API.
// In a real application, these functions would make network requests to a real backend AI service.

const simulateProcessing = (ms: number = 800) => new Promise(res => setTimeout(res, ms));

/**
 * Mocks generating a title based on context.
 * TODO: Replace with real Gemini/AI API call in the backend.
 */
export const generateTitle = async (context: string): Promise<string> => {
  await simulateProcessing();
  if (!context.trim()) return "Título genérico sobre un tema interesante";
  const firstWords = context.split(' ').slice(0, 5).join(' ');
  return `Un Título Atractivo sobre ${firstWords}...`;
};

/**
 * Mocks generating a description based on context.
 * TODO: Replace with real Gemini/AI API call in the backend.
 */
export const generateDescription = async (context: string): Promise<string> => {
  await simulateProcessing();
  if (!context.trim()) return "Una descripción detallada que captura la esencia del proyecto, sus objetivos y su público objetivo.";
  const snippet = context.substring(0, 100);
  return `Resumen ejecutivo basado en la idea principal: "${snippet}...". Este proyecto busca innovar en el sector a través de una propuesta de valor única y diferenciada.`;
};

/**
 * Mocks generating tags based on context.
 * TODO: Replace with real Gemini/AI API call in the backend.
 */
export const generateTags = async (context: string): Promise<string[]> => {
  await simulateProcessing();
  const keywords = ["innovación", "tecnología", "IA", "desarrollo", "startup"];
  if (!context.trim()) return keywords;
  
  const contextWords = context.toLowerCase().split(/\s+/);
  const foundKeywords = keywords.filter(kw => contextWords.includes(kw));
  return [...new Set([...foundKeywords, "estrategia", "producto"])];
};
