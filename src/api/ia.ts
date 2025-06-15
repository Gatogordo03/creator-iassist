import { Workspace } from './types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const extractKeywords = (text: string, num: number = 5): string[] => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b(\w{4,})\b/g) || [];
    const freq = words.reduce<Record<string, number>>((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, num);
};

export const generateTitle = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
    await sleep(1500);
    const base = `Genera 3 títulos llamativos y creativos para un video de ${platform} sobre: ${context}.`;
    return [
        "Título 1: " + context.substring(0, 20),
        "Título 2: " + context.substring(10, 30),
        "Título 3: " + context.substring(20, 40),
    ];
};

export const generateDescription = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
    await sleep(2000);
    return [
        `Descripción 1: ${context}. ${LOREM_IPSUM.substring(0, 100)}`,
        `Descripción 2: ${context}. ${LOREM_IPSUM.substring(100, 200)}`,
        `Descripción 3: ${context}. ${LOREM_IPSUM.substring(200, 300)}`,
    ];
};

export const generateTags = async (context: string, platform: Workspace['platform']): Promise<string[]> => {
    await sleep(1800);
    const keywords = extractKeywords(context);
    return [...keywords, "tag1", "tag2"];
};

export const generateSeoKeywords = async (context: string): Promise<string[]> => {
    await sleep(2200);
    const keywords = extractKeywords(context);
    return [...keywords, "seo1", "seo2"];
};

export const generateThumbnailPrompt = async (context: string): Promise<string[]> => {
    await sleep(1700);
    return [
        `Imagen 1: ${context}, alta calidad`,
        `Imagen 2: ${context}, estilo moderno`,
        `Imagen 3: ${context}, vista panorámica`,
    ];
};
