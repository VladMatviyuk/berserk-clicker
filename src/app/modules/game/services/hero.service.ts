import { Injectable } from '@angular/core';

export interface IBagItem  {
  name: string;
  avatar: string;
  buff: string;
  buffPoint: number;
  use: boolean;
  time: number;
}
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public healthPoint = 100;
  public weapon  = [
    {name: 'stick', avatar: '', damage: 1 }
  ];
  public activeBuff: IBagItem[] = [];
  public bag = [
    {name: 'water', avatar: '', buff: 'health', buffPoint: 20, use: false, time: 0},
    {name: 'selfHarm', avatar: '', buff: 'damage', buffPoint: 40, use: false, time: 2000},
  ];
  public weaponBuff = 0;

  constructor() { }

  private actualWeapon() {

  }

  public getWeaponDamage() {
    return this.weapon[0].damage + this.weaponBuff;
  }

  public getWeaponName(): string {
    return this.weapon[0].name;
  }

  public useBuff(el: IBagItem) {
    this.setBuff(el);
    this.changeStateBuff(el);
  }

  private setBuff(el: IBagItem) {
    switch (el.buff) {
      case 'health':
        this.healthPoint += el.buffPoint;
        break;
      case 'damage':
        this.weaponBuff += el.buffPoint;
        break;
    }
  }

  private removeBuff(el: IBagItem) {
    switch (el.buff) {
      case 'health':
        break;
      case 'damage':
        this.weaponBuff -= el.buffPoint;
        break;
    }

    this.bag = this.bag.filter(e => e.name !== el.name);
  }

  private changeStateBuff(el: IBagItem) {
    el.use = true;
    setTimeout(() => {
      this.removeBuff(el)
    }, el.time)
  }
}
