import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from "rxjs";
import { IEnemy } from "../models/IEnemy";
import { HeroService } from "./hero.service";
import { GameStore } from "../game.store";
import { VisualEffectsService } from "./visual-effects.service";
import { IVisualEffectOptions } from "../models/IVisualEffect";
import { getRandom } from "../utils/random";
import { BagService } from "./bag.service";

@Injectable({
  providedIn: 'root'
})
export class EnemyService {
  private attack: any;
  private attackSub: Subscription;

  public countDead = 0;
  private maxCountDead = 100;


  /** Идентификатор активного врага */
  private enemyId = 1;
  private enemiesName = ['Chort', 'Voyaka', 'Boss', 'EasyBoy', 'Lupa', 'Pupa'];

  /** Список врагов */
  private enemyList: IEnemy[] = [
    {id: 1, name: 'Enemy 1', avatar: '1', health: 10, damage: 1, attackSpeed: 3000},
    {id: 2, name: 'Enemy 2', avatar: '1', health: 10, damage: 1, attackSpeed: 3000},
  ];

  /** Список врагов */
  public enemySource: BehaviorSubject<IEnemy> = new BehaviorSubject<IEnemy>(this.enemyList[0]);

  /** Активный враг */
  public enemy: IEnemy = this.enemyList[0];

  constructor(
    public hero: HeroService,
    public gameStore: GameStore,
    public effect: VisualEffectsService,
    private bag: BagService
  ) { }

  /** Получение врага  */
  public getEnemy(): void {
    this.generateEnemy();
    this.switchEnemyId();
    this.enemySource.next(this.enemyList.find(en => en.id === this.enemyId) || this.enemyList[-1]);
    // TODO логика конца игры
    if(!this.enemySource.value || this.countDead === this.maxCountDead) {
      this.gameStore.allEnemiesDie.next(true);
      return
    }

    // Увеличиваем счетчик убитых врагов
    this.countDead++;

    // Получаем бафф
    if(this.countDead % 2 === 0) {
      this.bag.generate();
    }

    // Получаем новое оружие
    if(this.countDead % 15 === 0) {
      this.hero.getNewWeapon();
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

      this.getEnemy();
    }
  }

  // TODO рефакторинг логики автоматической генерации противника
  public generateEnemy() {
    let id = this.enemyId == 1 ? 0 : 1;
    this.enemyList[id] = {
      id: id == 1 ? 2 : 1,
      name: this.getEnemyName(),
      avatar: '1',
      health: this.getRandomInt(100),
      damage: this.getRandomInt(40),
      attackSpeed: 2500
    };
  }

  public switchEnemyId() {
    this.enemyId = this.enemyId == 1 ? 2 : 1;
  }

  private getEnemyName(): string {
    return this.enemiesName[this.getRandomInt(this.enemiesName.length)]
  }

  private getRandomInt(val: number): number {
    return Math.floor(Math.random() * val);
  }

  public setAttack() {
    this.attack = interval(this.enemy.attackSpeed);
    this.attackSub = this.attack.subscribe(() => this.heroAttack());
  }

  private heroAttack() {
    this.showAttack();
    setTimeout(() => {
        this.hero.getDamage(this.enemy.damage);
    }, 500)
  }

  private showAttack() {
    // TODO refactor
    const rand = getRandom();
    const attackSide =  rand > 0.5 ? 'attack__left' : 'attack__right';
    // Формирование опций для эффекта предупреждения об атаке
    const effectOptions: IVisualEffectOptions = {
      element: 'div',
      class: ['attack', attackSide],
      parentSelector: '.enemy__wrapper',
      autoRemove: true
    }

    // Генерация предупреждения об атаке
    this.effect.generateEffect(effectOptions);
  }

  public unsubAttack() {
      this.attackSub.unsubscribe();
  }
}
