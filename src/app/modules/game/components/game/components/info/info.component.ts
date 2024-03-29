import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { HeroService } from "../../services/hero.service";
import type { IBagItem } from "../../models/IBag";
import { GameStore } from "../../../../game.store";
import { EnemyService } from "../../services/enemy.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  constructor(public hero: HeroService,
              public gameStore: GameStore,
              public enemyService: EnemyService) { }

  // public heroHealth = this.gameStore.heroHealth.value
  @Output() selectBuff = new EventEmitter<IBagItem>()

    /**
     * Использование/выбор бафа
     */
  public useBuff(buff: IBagItem) {
    this.selectBuff.emit(buff);
  }
}
