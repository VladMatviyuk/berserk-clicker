import { Component, OnInit } from '@angular/core';
import { GameService } from "../../services/game.service";
import {HeroService, IBagItem} from "../../services/hero.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(
    public gameService: GameService,
    public hero: HeroService
  ) { }

  ngOnInit(): void {
  }

  public attack() {
    this.gameService.damage();
    console.log(this.hero.getWeaponDamage())
  }

  public selectBuff(el: IBagItem) {
    this.hero.useBuff(el);
  }

  // TODO реализовать метод генерации бафов
  // TODO реализовать метод использования бафов за счет клика по клавиатуре, для мобилки клик по элементу
  // TODO реализовать логику смерти и смены врага
  // TODO продумать бафы
  // TODO продумать и сделать логику получения урона
  // TODO продумать и сделать логику укланения от урона (уклонение по использованию events keyUp для компа, для телефона клик на кокнретную часть экрана)
}
