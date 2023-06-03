import { Component, OnInit } from '@angular/core';
import { GameService } from "../../services/game.service";
import { HeroService } from "../../services/hero.service";

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
  }

}
