
export interface Usage {
  instructions: string[];
  restrictions: Restrictions;
}

interface Restrictions {
  levelRequirement: number,
  classRestrictions: string[],
  warnings: string[];
}