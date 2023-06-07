import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from "rxjs";
import { IEnemy } from "../models/IEnemy";
import { GameService } from "./game.service";
import { HeroService } from "./hero.service";
import { GameStore } from "../game.store";

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  /** Идентификатор активного врага */
  private faceToFaceEnemy: number = 1;

  private attack: any;
  private attackSub: Subscription;

  /** Список врагов */
  private enemyList: IEnemy[] = [
    {id: 1, name: 'Enemy 1', avatar: '1', health: 10, damage: 1, attackSpeed: 1000},
    {id: 2,name: 'Enemy 2', avatar: '2', health: 20, damage: 5, attackSpeed: 5000},
    {id: 3,name: 'Enemy 3', avatar: '3', health: 30, damage: 2, attackSpeed: 2000},
    {id: 4,name: 'Enemy 4', avatar: '4', health: 40, damage: 3, attackSpeed: 2000},
    {id: 5,name: 'Enemy 5', avatar: '5', health: 50, damage: 4, attackSpeed: 2000},
    {id: 6,name: 'Enemy 6', avatar: '6', health: 60, damage: 1, attackSpeed: 2000},
    {id: 7,name: 'Enemy 7', avatar: '7', health: 70, damage: 1, attackSpeed: 2000},
    {id: 8,name: 'Enemy 8', avatar: '8', health: 80, damage: 1, attackSpeed: 3000},
    {id: 9,name: 'Enemy 9', avatar: '9', health: 90, damage: 1, attackSpeed: 1000},
    {id: 10,name: 'Enemy 10', avatar: '10', health: 100, damage: 1, attackSpeed: 1000}
  ];

  /** Список врагов */
  public enemySource: BehaviorSubject<IEnemy> = new BehaviorSubject<IEnemy>(this.enemyList[0]);

  /** Активный враг */
  public enemy: IEnemy = this.enemyList[0];
  constructor(
    public hero: HeroService,
    public gameStore: GameStore
  ) {
  }

  /** Получение врага  */
  public getEnemy(): void {
    this.enemySource.next(this.enemyList.find(en => en.id === this.faceToFaceEnemy) || this.enemyList[-1]);
    // TODO логика конца игры
    if(!this.enemySource.value) {
      this.gameStore.allEnemiesDie.next(true);
      return
    }

    this.enemy = this.enemySource.value;
    this.setAttack();
  }

  /** Урок по врагу  */
  public damage() {
    if(this.gameStore.blockDamage.value) {
      return;
    }

    this.enemy.health -= this.hero.getWeaponDamage();
    if(this.enemy.health <= 0) {
      this.unsubAttack();
      this.attack = null;

      this.next();
      this.getEnemy();
    }
  }

  /** Изменение идентификатора врага  */
  public next() {
    this.faceToFaceEnemy++;
  }

  // TODO придумать логику автоматической генерации противника
  public generateEnemy() {

  }

  public setAttack() {
    this.attack = interval(this.enemy.attackSpeed);
    this.attackSub = this.attack.subscribe(() => this.heroAttack());
  }

  private heroAttack() {
    this.showAttack();
    setTimeout(() => {
      this.hero.getDamage(this.enemy.damage);
      this.hideAttack();
    }, this.enemy.attackSpeed - (this.enemy.attackSpeed / 2))
  }

  private showAttack() {
    const attack = document.createElement('div');
    attack.className = 'attack';
    document.body.appendChild(attack);
  }

  private hideAttack() {
    const attack = document.querySelector('.attack');
    attack?.remove()
  }

  public unsubAttack() {
      this.attackSub.unsubscribe();
  }
}
