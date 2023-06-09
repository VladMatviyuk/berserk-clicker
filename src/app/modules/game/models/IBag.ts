export interface IBagItem  {
  name: string;
  avatar: string;
  buff: string;
  buffPoint: number;
  use: boolean;
  time: number;
  hotKey: string;
}

type IBuffType = 'health' | 'damage';

export enum BUFF_TYPES {
  health = 'health',
  damage = 'damage'
}
