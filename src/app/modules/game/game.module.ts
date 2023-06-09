import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { EnemyComponent } from './components/enemy/enemy.component';
import { InfoComponent } from './components/info/info.component';
import { GameStore } from "./game.store";
import { CurrentKeyPipe } from './pipes/current-key.pipe';



@NgModule({
  declarations: [
    GameComponent,
    EnemyComponent,
    InfoComponent,
    CurrentKeyPipe,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GameStore
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
