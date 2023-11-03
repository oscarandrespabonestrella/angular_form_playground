import { Directive, ElementRef, HostListener, Renderer2, SecurityContext } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


const DEFAULT_REVIEW_TEMPLATE = `<h4 data-placeholder="Title..."></h4>
<p data-placeholder="Describe your experience"></p>`;

@Directive({
  selector: '[formControlName] [contenteditable], [formControl] [contenteditable], [ngModel] [contenteditable] ',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableContentDirective,
      multi: true
    }
  ]
})
export class EditableContentDirective implements ControlValueAccessor{

  onChange!: (newValue: string) => void;
  onTouch!: () => void;

  @HostListener('input', ['$event'])
  onInput(e:Event){
    this.onChange((e.target as HTMLElement).innerHTML)
  }
  @HostListener('blur')
  onBlur(e:Event){
    this.onTouch()
  }

  writeValue(obj: any): void {
    console.log('write value called', obj);
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.sanitazer.sanitize(SecurityContext.HTML ,obj) || DEFAULT_REVIEW_TEMPLATE
    )

  }

  registerOnChange(fn: any): void {
    console.log('onchange value called', fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('ontouched value called', fn);
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('disabledf value called', isDisabled);
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'contentEditable',
      !isDisabled
    )
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private sanitazer: DomSanitizer) { }

}
