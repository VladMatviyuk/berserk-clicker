import { Injectable } from '@angular/core';
import { HeroService } from "./hero.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public healthPoint = 100;
  constructor(private hero: HeroService) { }

  public damage() {
    this.healthPoint -= this.hero.getWeaponDamage();
  }
}
