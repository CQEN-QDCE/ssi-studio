import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropDisable]'
})
export class DropDisableDirective {

  constructor(private elmRef: ElementRef) { 
    var handler = function(event: any) {
      event.preventDefault();
      return false;
    }
    this.elmRef.nativeElement.on('dragenter', handler);
    this.elmRef.nativeElement.on('dragover', handler);
    this.elmRef.nativeElement.on('drop', handler);
  }

}

