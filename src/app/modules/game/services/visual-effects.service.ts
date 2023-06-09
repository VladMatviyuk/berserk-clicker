import { Injectable, Renderer2 ,RendererFactory2 } from '@angular/core';
import { IVisualEffectOptions } from "../models/IVisualEffect";


@Injectable({
  providedIn: 'root'
})
export class VisualEffectsService {
  private render: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  /**
   * Генерация эффекта и его отображение
   * @param options {IVisualEffectOptions} - опции для генерации и отображения эффекта
   */
  public generateEffect(options: IVisualEffectOptions) {
    // Создание самого элемента
    let effect = this.render.createElement(`div`) as Renderer2;

    // Навешиваем текст
    if(options?.text) {
      const text = this.render.createText(options?.text);
      this.render.appendChild(effect, text);
    }

    // Навешиваем классы
    options.class.map( className => this.render.addClass(effect, className));

    // Добавляем элемент на страницу
    this.render.appendChild(document.querySelector(options.parentSelector), effect)

    // Активируем авто-удаление, если необходимо
    if(options.autoRemove) {
      this.autoRemove(options, effect)
    }
  }

  /**
   * Установка авто-удаления
   * @param options {IVisualEffectOptions} - опции эффекта
   * @param ref {any} - эффект
   */
  private autoRemove(options: IVisualEffectOptions, ref: any) {
    setTimeout(() => {
      this.remove(options, ref)
    }, options.removeSpeed || 500)
  }

  /**
   * Удаление эффекта
   * @param options {IVisualEffectOptions} - опции эффекта
   * @param ref {any} - эффект
   */
  private remove(options: IVisualEffectOptions, ref: any) {
    this.render.removeChild(document.querySelector(options.parentSelector), ref);
  }
}
