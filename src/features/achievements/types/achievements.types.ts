export type Achievement = {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
};

export type UnlockedAchievement = {
  id: string;
  name: string;
  description: string;
  acquiredAt: string;
};
