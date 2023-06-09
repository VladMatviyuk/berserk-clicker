import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";


@Injectable()
export class GameStore {
  constructor() {
  }

  public heroHealth: BehaviorSubject<number> = new BehaviorSubject<number>(100);
  public allEnemiesDie: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public blockDamage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
