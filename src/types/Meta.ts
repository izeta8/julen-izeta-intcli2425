
export interface Meta {
  created_by: string;
  lore: string;
  availability: Availability;
}

interface Availability {
  in_shops: boolean;
  quest_reward: boolean;
  drop_rate: DropRate;
}

interface DropRate {
  boss: string;
  chance: string;
}

