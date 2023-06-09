import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentKey'
})
export class CurrentKeyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(-1);
  }

}
