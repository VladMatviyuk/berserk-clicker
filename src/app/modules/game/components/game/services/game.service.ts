import { Injectable } from '@angular/core';
import { HeroService } from "./hero.service";
import { EnemyService } from "./enemy.service";
import { IBagItem } from "../models/IBag";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private hero: HeroService,
    private enemyService: EnemyService
  ) {
    this.enemyService.setAttack();
  }

  /**
  * Урон по противнику
  */
  public damage() {
    this.enemyService.damage();
    this.hero.weaponBroken()
  }

  /**
   * Использование бафов
   */
  public useBuff(el: IBagItem) {
    this.hero.useBuff(el);
  }
}
