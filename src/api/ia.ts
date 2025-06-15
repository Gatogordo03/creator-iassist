
import { Workspace } from "./types";

// NOTE: This is a mock AI API.
// In a real application, these functions would make network requests to a real backend AI service.

const simulateProcessing = (ms: number = 800) => new Promise(res => setTimeout(res, ms));

/**
 * Mocks generating title variants based on context and platform.
 */
export const generateTitle = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
  await simulateProcessing();
  if (!context.trim()) {
    return [
      "Un Título Increíble para Tu Próximo Video",
      "La Guía Definitiva que Estabas Esperando",
      "El Secreto que Nadie Te Había Contado",
    ];
  }
  
  const firstWords = context.split(' ').slice(0, 4).join(' ');

  if (platform === 'tiktok') {
    return [
      `😱 NO CREERÁS lo que pasó con ${firstWords}`,
      `El hack de ${firstWords} que necesitas AHORA`,
      `Storytime: ${firstWords} cambió mi vida`,
      `POV: Descubres el secreto de ${firstWords}`
    ];
  }
  
  // youtube / general
  return [
    `Guía Completa sobre ${firstWords}: Todo lo que Necesitas Saber`,
    `Análisis Profundo de ${firstWords}: ¿Vale la pena?`,
    `Cómo Empezar con ${firstWords} desde Cero (Paso a Paso)`,
    `Mi Experiencia con ${firstWords}: Lo Bueno y Lo Malo`
  ];
};

/**
 * Mocks generating description variants based on context and platform.
 */
export const generateDescription = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
  await simulateProcessing(1200);
  const snippet = context.substring(0, 100);
  
  if (platform === 'tiktok') {
    return [
      `La verdad sobre '${snippet}...' ✨ ¡No te pierdas el final! #fyp #parati #tendencia`,
      `Te enseño cómo hacer '${snippet}' en menos de 60 segundos. ¡LINK EN BIO! #tutorial #hack #aprendeentiktok`,
      `Si te gusta '${snippet}', este video es para ti. ¡Dale like y sígueme para más! #vlog #dailyvlog`,
    ];
  }

  return [
    `En este video, exploramos a fondo: "${snippet}...". Descubre los secretos, consejos y todo lo que necesitas saber para dominar este tema. ¡No olvides suscribirte y activar la campanita!`,
    `¿Alguna vez te has preguntado sobre "${snippet}..."? En esta guía completa, desglosamos cada detalle. Ideal para principiantes y expertos.`,
    `Acompáñame en este recorrido donde analizamos "${snippet}...". Veremos los pros, los contras y te daré mi opinión honesta.`,
  ];
};

/**
 * Mocks generating tags based on context and platform.
 */
export const generateTags = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
  await simulateProcessing();
  const baseKeywords = ["innovación", "tecnología", "desarrollo", "startup"];
  const contextWords = context.toLowerCase().match(/\b(\w+)\b/g) || [];
  
  let tags = [...new Set([...baseKeywords, ...contextWords.slice(0,5)])].slice(0, 10);

  if (platform === 'tiktok') {
    return [...tags, 'fyp', 'parati', 'viral', 'lentejas'].slice(0, 15);
  }

  // youtube / general
  return [...tags, 'tutorial', 'guia', 'completa', '2025'].slice(0, 15);
};


/**
 * Mocks generating SEO keywords based on context.
 */
export const generateSeoKeywords = async (context: string): Promise<string[]> => {
    await simulateProcessing(700);
    if (!context.trim()) {
        return ["tutorial completo", "guía para principiantes", "cómo hacer", "mejores prácticas"];
    }
    const words = context.toLowerCase().match(/\b(\w{4,})\b/g) || [];
    const uniqueWords = [...new Set(words)];
    return ["cómo " + uniqueWords[0], ...uniqueWords.slice(0, 10)];
};

/**
 * Mocks generating a thumbnail prompt based on context.
 */
export const generateThumbnailPrompt = async (context: string): Promise<string[]> => {
    await simulateProcessing(900);
    if (!context.trim()) {
        return ["Un emoji gigante y un signo de interrogación, colores vibrantes, estilo de dibujos animados."];
    }
    const keyConcept = context.split(' ').slice(0, 5).join(' ');
    return [
        `Fotografía de estudio de ${keyConcept}, con un fondo de color sólido y texto llamativo que dice '¡INCREÍBLE!'.`,
        `Primer plano de una persona con cara de sorpresa mirando a un objeto que representa ${keyConcept}.`,
        `Ilustración minimalista de ${keyConcept}, con un estilo de arte moderno y una paleta de colores contrastantes.`,
    ];
};
