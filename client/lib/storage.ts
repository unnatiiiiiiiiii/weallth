import { getCurrentUser } from './auth';

interface GoalSaveData {
  name: string;
  targetAmount: number;
  timeline: number;
  currentInvestment: number;
  monthlySaving: number;
  dateSet?: string;
  sipActive?: boolean;
}

interface SavedGoal extends GoalSaveData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export function saveGoal(goal: GoalSaveData): SavedGoal | false {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const goals = JSON.parse(localStorage.getItem(`weallth_goals_${currentUser.id}`) || '[]');
    const newGoal: SavedGoal = {
      ...goal,
      id: Date.now().toString(),
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };
    
    goals.push(newGoal);
    localStorage.setItem(`weallth_goals_${currentUser.id}`, JSON.stringify(goals));
    return newGoal;
  } catch (error) {
    console.error('Error saving goal:', error);
    return false;
  }
}

export function getGoals(): SavedGoal[] {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    return JSON.parse(localStorage.getItem(`weallth_goals_${currentUser.id}`) || '[]');
  } catch (error) {
    console.error('Error getting goals:', error);
    return [];
  }
}

export function updateGoal(goalId: string, updates: Partial<GoalSaveData>): SavedGoal | false {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const goals = getGoals();
    const goalIndex = goals.findIndex(g => g.id === goalId);
    
    if (goalIndex === -1) return false;
    
    goals[goalIndex] = {
      ...goals[goalIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`weallth_goals_${currentUser.id}`, JSON.stringify(goals));
    return goals[goalIndex];
  } catch (error) {
    console.error('Error updating goal:', error);
    return false;
  }
}

export function deleteGoal(goalId: string): boolean {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const goals = getGoals();
    const filteredGoals = goals.filter(g => g.id !== goalId);
    
    localStorage.setItem(`weallth_goals_${currentUser.id}`, JSON.stringify(filteredGoals));
    return true;
  } catch (error) {
    console.error('Error deleting goal:', error);
    return false;
  }
}

interface FeedbackData {
  type: string;
  subject: string;
  message: string;
}

export function saveFeedback(feedback: FeedbackData) {
  try {
    const currentUser = getCurrentUser();
    const feedbacks = JSON.parse(localStorage.getItem('weallth_feedback') || '[]');
    
    const newFeedback = {
      id: Date.now().toString(),
      userId: currentUser?.id || 'anonymous',
      username: currentUser?.username || 'Anonymous',
      ...feedback,
      createdAt: new Date().toISOString()
    };
    
    feedbacks.push(newFeedback);
    localStorage.setItem('weallth_feedback', JSON.stringify(feedbacks));
    return newFeedback;
  } catch (error) {
    console.error('Error saving feedback:', error);
    return false;
  }
}

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber?: string;
  monthlySalary: number;
  fixedExpenses: number;
  variableExpenses: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  notifications?: boolean;
  newsletter?: boolean;
}

export function getUserProfile(): UserProfile | null {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    return JSON.parse(localStorage.getItem(`weallth_profile_${currentUser.id}`) || 'null');
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

export function saveUserProfile(profileData: UserProfile): boolean {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    localStorage.setItem(`weallth_profile_${currentUser.id}`, JSON.stringify(profileData));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
}
