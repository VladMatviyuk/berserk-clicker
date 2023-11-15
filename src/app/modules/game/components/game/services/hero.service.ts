import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { IBagItem } from "../models/IBag";
import { BagService } from "./bag.service";
import { GameStore } from "../../../game.store";
import { IVisualEffectOptions } from "../models/IVisualEffect";
import { VisualEffectsService } from "./visual-effects.service";
import { IWeapon } from "../models/IWeapon";
import { getRandomMinMAx } from "../../../utils/random";


@Injectable({
  providedIn: 'root'
})
export class HeroService implements OnInit, OnDestroy{

  // Weapon
  public defaultWeapon: IWeapon = {name: 'arms', avatar: '', damage: 5, strength: -1 }
  public weapon: IWeapon[]  = [
    this.defaultWeapon
  ];


  // Bag
  public bag: IBagItem[] = this.bagService.get();
  public activeBuff: IBagItem[] = [];
  public weaponBuff = 0;


  constructor(
    public bagService: BagService,
    public gameStore: GameStore,
    private effect: VisualEffectsService
  ) {
  }

  ngOnInit() {
    this.gameStore.blockDamage.subscribe();
  }

  ngOnDestroy() {
    this.gameStore.blockDamage.unsubscribe();
  }

  public getNewWeapon() {
    const newWeapon: IWeapon = {
      name: 'sword',
      avatar: '',
      damage: getRandomMinMAx(10, 30),
      strength: getRandomMinMAx(15, 45)
    }
    console.log(this.weapon)
    this.weapon.push(newWeapon);
  }

  public getWeaponDamage() {
    return this.weapon[this.getIndexActiveWeapon()].damage + this.weaponBuff;
  }

  public getWeaponName(): string {
    return this.weapon[this.getIndexActiveWeapon()].name;
  }

  private getIndexActiveWeapon(): number {
    return this.weapon.length - 1;
  }

  public getActiveWeapon() {
    return this.weapon[this.getIndexActiveWeapon()];
  }

  public weaponBroken() {
    const weapon = this.getActiveWeapon();
    if(weapon.strength > 0) {
      weapon.strength--;
    } else {
      if(this.weapon.length > 1) {
        this.weapon.splice(-1);
        this.getActiveWeapon()
      }
    }
  }

  public useBuff(el: IBagItem) {
    this.setBuff(el);
    this.changeStateBuff(el);
  }

  private setBuff(el: IBagItem) {
    switch (el.buff) {
      case 'health':
        this.gameStore.heroHealth.next(this.gameStore.heroHealth.value + el.buffPoint);
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

    this.bagService.remove(el);
    this.bag = this.bagService.get();

  }

  private changeStateBuff(el: IBagItem) {
    el.use = true;
    setTimeout(() => {
      this.removeBuff(el)
    }, el.time)
  }

  public getDamage(damage: number) {
    if(this.gameStore.blockDamage.value) { return; }
    this.gameStore.heroHealth.next(this.gameStore.heroHealth.value - damage)
    this.showDamage(damage);
  }

  private showDamage(damage: number) {
    // Генерация опций для сообщения об полученном
    const effectOptions: IVisualEffectOptions = {
      element: 'div',
      text: String(damage),
      class: ['damage'],
      parentSelector: '.enemy__wrapper',
      autoRemove: true
    }

    // Генерация сообщения об полученном
    this.effect.generateEffect(effectOptions);
  }
}
