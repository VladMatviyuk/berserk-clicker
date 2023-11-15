import { Component } from '@angular/core';
import { EnemyService } from "../../services/enemy.service";
import { GameStore } from "../../../../game.store";

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent {

  constructor(
    public enemyService: EnemyService,
    public gameStore: GameStore
  ) { }

}
