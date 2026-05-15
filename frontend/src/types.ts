export interface Skill {
  name: string;
  level: number;
}

export interface UserProfile {
  name: string;
  role: string;
  targetRole: string;
  level: number;
  progress: number;
  skills: Skill[];
}

export enum NodeStatus {
  LOCKED = 'LOCKED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface RouteNode {
  id: string;
  title: string;
  type: string;
  description: string;
  estimatedTime: string;
  status: NodeStatus;
  x: number;
  y: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}