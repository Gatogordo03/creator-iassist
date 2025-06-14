
import { v4 as uuidv4 } from 'uuid';
import { Workspace } from './types';

const WORKSPACES_KEY = 'iniciativa_workspaces';

const getStoredWorkspaces = (): Workspace[] => {
  try {
    const stored = localStorage.getItem(WORKSPACES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse workspaces from localStorage", error);
    return [];
  }
};

const saveWorkspaces = (workspaces: Workspace[]) => {
  localStorage.setItem(WORKSPACES_KEY, JSON.stringify(workspaces));
};

// Simulate network delay
const simulateDelay = (ms: number = 500) => new Promise(res => setTimeout(res, ms));

export const getWorkspaces = async (): Promise<Workspace[]> => {
  await simulateDelay();
  const workspaces = getStoredWorkspaces();
  return workspaces.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getWorkspaceById = async (id: string): Promise<Workspace | undefined> => {
  await simulateDelay();
  return getStoredWorkspaces().find(w => w.id === id);
};

export const createWorkspace = async (data: Omit<Workspace, 'id' | 'createdAt'>): Promise<Workspace> => {
  await simulateDelay();
  const workspaces = getStoredWorkspaces();
  const newWorkspace: Workspace = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  saveWorkspaces([...workspaces, newWorkspace]);
  return newWorkspace;
};

export const updateWorkspace = async (id: string, data: Partial<Workspace>): Promise<Workspace | undefined> => {
  await simulateDelay(300);
  const workspaces = getStoredWorkspaces();
  const index = workspaces.findIndex(w => w.id === id);
  if (index === -1) return undefined;
  
  const updatedWorkspace = { ...workspaces[index], ...data };
  workspaces[index] = updatedWorkspace;
  saveWorkspaces(workspaces);
  return updatedWorkspace;
};

export const deleteWorkspace = async (id: string): Promise<boolean> => {
  await simulateDelay();
  const workspaces = getStoredWorkspaces();
  const newWorkspaces = workspaces.filter(w => w.id !== id);
  if (workspaces.length === newWorkspaces.length) return false;
  
  saveWorkspaces(newWorkspaces);
  return true;
};
