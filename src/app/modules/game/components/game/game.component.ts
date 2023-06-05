import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GameService } from "../../services/game.service";

import type { IBagItem } from "../../models/IBag";
import { GameStore } from "../../game.store";
import { EnemyService } from "../../services/enemy.service";
import { HeroService } from "../../services/hero.service";

// TODO - done продумать и сделать логику получения урона
// TODO - done реализовать логику смерти и смены врага
// TODO - done продумать и сделать логику укланения от урона уклонение по использованию events keyUp


// Логика бафов
// TODO продумать бафы
// TODO реализовать метод генерации бафов
// TODO реализовать метод использования бафов за счет клика по клавиатуре, для мобилки клик по элементу

// Логика урона и уклонения
// TODO продумать и сделать урон от врага по конкретно траектории
// TODO продумать и сделать логику укланения от урона для телефона клик на кокнретную часть экрана

// Логика оружия
// TODO продумать оружие
// TODO продумать как его менять
// TODO продумать логику, как оно ломается
// TODO продумать логику, как выдавать оружие


// Марафет
// TODO - собрать ассеты для героя и отоброжения его ХП
// TODO - собрать ассеты для бафов
// TODO - собрать ассеты для врагов
// TODO - собрать ассеты фона
// TODO - собрать ассеты оружие

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  /** Флаг окончания игры */
  public endGameFlag: boolean = false;

  constructor(
    public gameService: GameService,
    public gameStore: GameStore,
    public enemyService: EnemyService,
    public hero: HeroService
  ) {
  }

  /**
   * Подписка на события
   */
  ngOnInit(): void {
    this.gameStore.heroHealth.subscribe((val) => this.endGame(val));
    this.gameStore.allEnemiesDie.subscribe((val) => this.winGame(val));
  }

  /**
   * Отписка от событий
   */
  ngOnDestroy(): void {
    this.gameStore.heroHealth.unsubscribe();
    this.gameStore.allEnemiesDie.unsubscribe();
  }


  /**
   * Атака по противнику
   */
  public attack() {
    this.gameService.damage();
  }

  /**
   * Выбор бафа
   */
  public selectBuff(el: IBagItem) {
    this.gameService.useBuff(el);
  }

  /**
   * Конец игры. Проигрыш
   */
  public endGame(health: number): void {
    if(health <= 0) {
      this.endGameFlag = true;
      this.enemyService.unsubAttack();
    }
  }

  /**
   * Конец игры. Победа
   */
  public winGame(flag: boolean): void {
    this.endGameFlag = flag;
  }

  /**
   * Действия с клавиатурой по нажатию кнопки
   */
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(event.code == 'KeyA' || event.code == 'KeyD') {
      this.hero.blockDamage.next(true);
    }
  }

  /**
   * Действия с клавиатурой по отжатию кнопки
   */
  @HostListener('window:keyup', ['$event'])
  onKeyUp() {
    this.hero.blockDamage.next(false);
  }
}
