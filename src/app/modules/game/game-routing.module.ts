import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponent} from "./components/game/game.component";
import {MenuComponent} from "./components/menu/menu.component";
import {AboutComponent} from "./components/about/about.component";
import {SettingsComponent} from "./components/settings/settings.component";

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'game', component: GameComponent},
  {path: 'about', component: AboutComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
