import { Component, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oscar-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent {

  @Input()
  value: string |null = null;

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Input()
  disabledReason = '';

  @Output()
  selected = new EventEmitter<OptionComponent>()



  @HostListener("click")
  protected select(){
    if(!this.disabled){
      this.isSelected = true;
      this.selected.emit(this)
    }
  }

  @HostBinding("class.selected")
  protected isSelected = false;

  highligtAsSelected(){
    if(!this.disabled){
      this.isSelected = true;
    }
  }


  deselect(){
    this.isSelected = false;
  }

}
