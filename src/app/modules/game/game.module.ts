import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { EnemyComponent } from './components/game/components/enemy/enemy.component';
import { InfoComponent } from './components/game/components/info/info.component';
import { GameStore } from "./game.store";
import { CurrentKeyPipe } from './pipes/current-key.pipe';
import {GameRoutingModule} from "./game-routing.module";
import { MenuComponent } from './components/menu/menu.component';
import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';



@NgModule({
  declarations: [
    GameComponent,
    EnemyComponent,
    InfoComponent,
    CurrentKeyPipe,
    MenuComponent,
    AboutComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  providers: [
    GameStore
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
