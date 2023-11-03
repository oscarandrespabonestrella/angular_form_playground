import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, HostListener, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker.component.html',
  styleUrl: './rating-picker.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RatingPickerComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerComponent implements OnChanges, ControlValueAccessor{

  onChange!: (newValue: RatingOptions) => void;
  onTouch!: () => void;

  @Input()
  disabled = false;

  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex = 0;

  @HostListener('blur')
  onBlur(){
    this.onTouch()
  }

  writeValue(obj: RatingOptions): void {
    this.value = obj;
    this.cd.markForCheck()
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
    this.cd.markForCheck()
  }
  @Input()
  value: RatingOptions = null;

  @Output()
  change = new EventEmitter<RatingOptions>

  setValue(value:RatingOptions){
    if(!this.disabled){
      this.value = value;
      this.onChange(this.value);
      this.onTouch();
      this.change.emit(this.value);

    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes["value"]){
      this.onChange(changes["value"].currentValue);
    }
  }

  constructor(private cd: ChangeDetectorRef){}

}
