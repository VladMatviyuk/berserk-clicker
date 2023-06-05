import { Component } from '@angular/core';
import { EnemyService } from "../../services/enemy.service";

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.scss']
})
export class EnemyComponent {

  constructor(public enemyService: EnemyService) { }

}
