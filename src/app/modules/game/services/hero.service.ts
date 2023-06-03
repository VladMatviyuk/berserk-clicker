import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public healthPoint = 100;
  public weapon  = [
    {name: 'stick', avatar: '', damage: 8 }
  ];
  public activeBuff = [];
  public bag = [
    {name: 'water', avatar: '', buff: 'health', buffPoint: 20},
    {name: 'selfHarm', avatar: '', buff: 'damage', buffPoint: 40},
  ]

  constructor() { }

  private actualWeapon() {

  }
  public getWeaponDamage() {
    return this.weapon[0].damage;
  }

  public getWeaponName(): string {
    return this.weapon[0].name;
  }
}
