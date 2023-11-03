import { Component, Input, HostListener, Output, EventEmitter, ContentChildren, QueryList, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-select-osqui',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: [
    trigger('dropDown',  [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1 ,0.45,1.34)')]),
      transition(':leave', [animate('320ms cubic-bezier(0.88, -0.7,0.86,0.85)')]),
    ])
  ]
})
export class SelectComponent implements AfterContentInit {
  @Input()
  label = "";

  @Input()
  value: string | null = null;

  @Output()
  readonly opened = new EventEmitter<void>()
  @Output()
  readonly closed = new EventEmitter<void>()

  @HostListener("click")
  open(){
    this.isOpen = true;
  }



  isOpen = false;

  close(){
    this.isOpen = false;
  }

  onPanelAnimationDone({fromState, toState}: AnimationEvent){
    if(fromState ==='void' && toState === null && this.isOpen){
      this.opened.emit();
    }
    if(fromState ==='*' && toState === "void" && !this.isOpen){
      this.closed.emit();
    }
  }

  @ContentChildren(OptionComponent, {descendants: true})
  options!: QueryList<OptionComponent>


  ngAfterContentInit(): void {
    this.highlightSelectedOptions(this.value);

  }

  private highlightSelectedOptions(value: string| null){
    this.findOptionsByValue(value)?.highligtAsSelected()
  }

  private findOptionsByValue(value: string | null){
    return this.options && this.options.find(o=> o.value === value)
  }


}
