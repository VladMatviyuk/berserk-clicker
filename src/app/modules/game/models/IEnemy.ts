type IdEnemy = string | number;

export interface IEnemy {
  id: IdEnemy;
  name: string;
  avatar: string;
  health: number;
  damage: number;
  attackSpeed: number;
}
