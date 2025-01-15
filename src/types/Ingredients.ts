
export interface Ingredients {
  name: string;
  quantity: number;
  origin: Origin;
}

interface Origin {
  location: string;
  region: string;
}
