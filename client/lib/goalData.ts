export interface Goal {
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export function getGoalsByType(goalType: 'personal' | 'professional'): Goal[] {
  try {
    if (goalType === 'personal') {
      return [
        { name: 'Buy a Car', icon: 'car', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
        { name: 'Buy a House', icon: 'home', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
        { name: 'Go on a Vacation', icon: 'plane', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
        { name: 'Wedding Planning', icon: 'heart', bgColor: 'bg-pink-100', iconColor: 'text-pink-600' },
        { name: 'Emergency Fund', icon: 'shield', bgColor: 'bg-red-100', iconColor: 'text-red-600' },
        { name: 'Furnish/Renovate Home', icon: 'wrench', bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
        { name: 'Gadget Purchase', icon: 'smartphone', bgColor: 'bg-indigo-100', iconColor: 'text-indigo-600' },
        { name: 'Rainy Day Fund', icon: 'umbrella', bgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
        { name: 'Pet or Adoption', icon: 'heart', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
        { name: 'Start a Side Hustle', icon: 'lightbulb', bgColor: 'bg-teal-100', iconColor: 'text-teal-600' },
        { name: 'Big Event or Celebration', icon: 'gift', bgColor: 'bg-rose-100', iconColor: 'text-rose-600' },
        { name: "Child's Education or Marriage", icon: 'graduation-cap', bgColor: 'bg-cyan-100', iconColor: 'text-cyan-600' },
        { name: 'Retirement Plans', icon: 'calendar', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
        { name: 'Healthcare / Life Insurance', icon: 'activity', bgColor: 'bg-red-100', iconColor: 'text-red-600' }
      ];
    } else if (goalType === 'professional') {
      return [
        { name: 'Expansion (New City / Scale)', icon: 'trending-up', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
        { name: 'Marketing', icon: 'megaphone', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
        { name: 'Production & Quality', icon: 'settings', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
        { name: 'Customer Support', icon: 'headphones', bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
        { name: 'Equipment & Upgrades', icon: 'monitor', bgColor: 'bg-indigo-100', iconColor: 'text-indigo-600' }
      ];
    }
    return [];
  } catch (error) {
    console.error('getGoalsByType error:', error);
    return [];
  }
}
