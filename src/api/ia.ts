
import { Workspace } from "./types";

// NOTE: This is a mock AI API.
// In a real application, these functions would make network requests to a real backend AI service.

const simulateProcessing = (ms: number = 800) => new Promise(res => setTimeout(res, ms));

const extractKeywords = (text: string, num: number = 5): string[] => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b(\w{4,})\b/g) || [];
    const freq = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, num);
};


/**
 * Mocks generating title variants based on context and platform.
 */
export const generateTitle = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
  await simulateProcessing();
  const keywords = extractKeywords(context, 2);
  const kw1 = keywords[0] || 'tu idea';
  const kw2 = keywords[1] || 'éxito';

  if (!context.trim()) {
    return [
      "Un Título Increíble para Tu Próximo Video",
      "La Guía Definitiva que Estabas Esperando",
      "El Secreto que Nadie Te Había Contado",
      "Esto es todo lo que necesitas saber",
      "El video que cambiará tu perspectiva"
    ];
  }
  
  if (platform === 'tiktok') {
    return [
      `😱 NO CREERÁS este truco sobre ${kw1}`,
      `El secreto de ${kw1} que cambiará tu vida ✨`,
      `Storytime: Cómo ${kw1} me llevó al ${kw2}`,
      `POV: Descubres el potencial de ${kw1} 🔥 #${kw1} #hack`,
      `¿${kw1} o ${kw2}? El debate DEFINITIVO.`
    ];
  }
  
  // youtube / general
  return [
    `Guía Completa sobre ${kw1}: de Cero a Experto en 2025`,
    `Análisis Profundo de ${kw1}: ¿Realmente Vale la Pena?`,
    `Cómo usar ${kw1} para conseguir ${kw2} (TUTORIAL PRÁCTICO)`,
    `Mi Experiencia con ${kw1}: Lo Bueno, Lo Malo y Lo Sorprendente`,
    `${kw1.charAt(0).toUpperCase() + kw1.slice(1)}: La Herramienta Definitiva para ${kw2}`
  ];
};

/**
 * Mocks generating description variants based on context and platform.
 */
export const generateDescription = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
  await simulateProcessing(1200);
  const keywords = extractKeywords(context, 3);
  const kw1 = keywords[0] || 'este tema';
  const kw2 = keywords[1] || 'consejos';
  const kw3 = keywords[2] || 'trucos';
  const snippet = context.substring(0, 100);
  
  if (platform === 'tiktok') {
    return [
      `La verdad sobre '${snippet}...' ✨ ¡No te pierdas el final! #fyp #${kw1} #tendencia`,
      `Te enseño cómo hacer '${snippet}' en menos de 60 segundos. ¡LINK EN BIO! #tutorial #hack #${kw2}`,
      `Si te gusta '${kw1}', este video es para ti. ¡Dale like y sígueme para más! #vlog #dailyvlog #${kw3}`,
    ];
  }

  return [
    `En este video, exploramos a fondo ${kw1}. Descubre los mejores ${kw2}, ${kw3} y todo lo que necesitas saber. Perfecto para dominar "${snippet}...".\n\n➡️ No olvides suscribirte y activar la campanita!`,
    `¿Alguna vez te has preguntado sobre "${snippet}..."? En esta guía completa, desglosamos cada detalle sobre ${kw1}. Ideal para principiantes y expertos que buscan los mejores ${kw2}.`,
    `Acompáñame en este recorrido donde analizamos ${kw1} y te comparto mi opinión honesta. Veremos los pros, los contras y los ${kw3} más importantes.\n\nCapítulos:\n00:00 - Introducción\n01:30 - Punto Clave 1\n03:45 - Punto Clave 2`,
  ];
};

/**
 * Mocks generating tags based on context and platform.
 */
export const generateTags = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
  await simulateProcessing();
  const keywords = extractKeywords(context, 8);
  
  if (platform === 'tiktok') {
    return [...new Set([...keywords, 'fyp', 'parati', 'viral', 'lentejas', 'trend'])].slice(0, 15);
  }

  // youtube / general
  const baseTags = ['tutorial', 'guia', 'completa', '2025', 'cómo hacer'];
  return [...new Set([...keywords, ...baseTags])].slice(0, 15);
};


/**
 * Mocks generating SEO keywords based on context.
 */
export const generateSeoKeywords = async (context: string): Promise<string[]> => {
    await simulateProcessing(700);
    const keywords = extractKeywords(context, 5);
    if (keywords.length < 2) {
        return ["tutorial completo", "guía para principiantes", "cómo hacer", "mejores prácticas", "análisis detallado"];
    }
    return [
        `cómo ${keywords[0]}`,
        `mejores ${keywords[1]} para ${keywords[0]}`,
        `${keywords[0]} vs ${keywords[2] || 'alternativa'}`,
        `guía de ${keywords[0]} para principiantes`,
        `opiniones sobre ${keywords[0]}`,
        `precio de ${keywords[0]}`,
    ];
};

/**
 * Mocks generating a thumbnail prompt based on context.
 */
export const generateThumbnailPrompt = async (context: string): Promise<string[]> => {
    await simulateProcessing(900);
    const keywords = extractKeywords(context, 1);
    const keyConcept = keywords[0] || 'un objeto misterioso';
    
    return [
        `Estilo 3D vibrante, un personaje sorprendido señalando a un ícono de "${keyConcept}". Texto grande y audaz: "¡ALUCINANTE!". Fondo con degradado de colores llamativos.`,
        `Fotografía de alta calidad de ${keyConcept} sobre un fondo limpio y minimalista. Un destello de lente dramático. Texto en una esquina: "EL SECRETO".`,
        `Ilustración estilo cómic. Un antes y un después mostrando el impacto de ${keyConcept}. Flechas grandes y rojas apuntando al resultado.`,
        `Fondo oscuro y texturizado. En el centro, un ${keyConcept} iluminado por un foco de luz. Texto enigmático: "¿Funciona de verdad?".`,
        `Collage de imágenes relacionadas con ${keyConcept}, con una persona con expresión de duda en el centro. Un gran signo de interrogación sobrepuesto.`
    ];
};
