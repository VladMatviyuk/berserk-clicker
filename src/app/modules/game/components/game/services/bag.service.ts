import { Injectable } from '@angular/core';
import { BUFF_TYPES, IBagItem } from "../models/IBag";
import { getRandom, getRandomMinMAx } from "../../../utils/random";

@Injectable({
  providedIn: 'root'
})
export class BagService {

  public list: IBagItem[] = [
    {name: 'Water', avatar: '', buff: 'health', buffPoint: 20, use: false, time: 0, hotKey: 'KeyQ'},
    {name: 'Rage', avatar: '', buff: 'damage', buffPoint: 40, use: false, time: 2000, hotKey: 'KeyW'},
  ];

  private healthBuffNames: string[] = ['water', 'meat', 'bread', 'sugar'];
  private damageBuffNames: string[] = ['rage', 'self harm', 'god help'];

  private bugLength = 2;

  constructor() { }

  get(): IBagItem[] {
    return this.list;
  }

  set(item: IBagItem): void {
    this.list.push(item);
  }

  remove(item: IBagItem): void {
    const index = this.list.findIndex(i => i.name === item.name);
    this.list.splice(index, 1);
  }

   clear() {
    this.list = [];
  }

  generate() {
    if(this.list.length === this.bugLength) { return }

    const buff = getRandom() > 0.5 ? BUFF_TYPES.health : BUFF_TYPES.damage;
    const name = this.getBuffName(buff);
    const time = buff === BUFF_TYPES.health ? 0 :  getRandomMinMAx(3000, 10000);

    const newBuff = {
      name,
      avatar: '',
      buff,
      buffPoint: getRandomMinMAx(0,50),
      use: false,
      time,
      hotKey: BUFF_TYPES.health == buff? 'KeyQ' : 'KeyW'
    }

    console.log(newBuff)
    this.set(newBuff);
  }

    private getBuffName(buff: BUFF_TYPES): string {
      const rand = getRandomMinMAx(0, this[`${buff}BuffNames`].length - 1);
      switch (buff) {
        case BUFF_TYPES.health:
          return  this.healthBuffNames[rand];
        case BUFF_TYPES.damage:
          return this.damageBuffNames[rand]
      }
    }


}
