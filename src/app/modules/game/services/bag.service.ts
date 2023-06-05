import { Injectable } from '@angular/core';
import { IBagItem } from "../models/IBag";

@Injectable({
  providedIn: 'root'
})
export class BagService {

  public list: IBagItem[] = [
    {name: 'Water', avatar: '', buff: 'health', buffPoint: 20, use: false, time: 0},
    {name: 'Rage', avatar: '', buff: 'damage', buffPoint: 40, use: false, time: 2000},
  ];

  constructor() { }

  get(): IBagItem[] {
    return this.list;
  }

  set(item: IBagItem): void {
    this.list.push(item);
  }


}
