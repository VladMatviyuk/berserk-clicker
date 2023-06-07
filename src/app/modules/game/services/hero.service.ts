import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { IBagItem } from "../models/IBag";
import { BagService } from "./bag.service";
import { GameStore } from "../game.store";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HeroService implements OnInit, OnDestroy{

  public healthPoint = this.gameStore.heroHealth.value;
  // public blockDamage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public weapon  = [
    {name: 'stick', avatar: '', damage: 5 }
  ];
  public activeBuff: IBagItem[] = [];

  public bag: IBagItem[] = [];
  public weaponBuff = 0;

  constructor(
    public bagService: BagService,
    public gameStore: GameStore
  ) {
    this.bag = bagService.get();
  }

  ngOnInit() {
    this.gameStore.blockDamage.subscribe();
  }

  ngOnDestroy() {
    this.gameStore.blockDamage.unsubscribe();
  }

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

    this.bag = this.bag.filter(e => e.name !== el.name);
  }

  private changeStateBuff(el: IBagItem) {
    el.use = true;
    setTimeout(() => {
      this.removeBuff(el)
    }, el.time)
  }

  getDamage(damage: number) {
    if(this.gameStore.blockDamage.value) { return; }
    this.gameStore.heroHealth.next(this.gameStore.heroHealth.value - damage)
  }
}
