import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EditableContentDirective } from '../editable-content.directive';
import { RatingOptions, RatingPickerComponent } from '../rating-picker/rating-picker.component';
import { ChangeDetectionStrategy } from '@angular/compiler';

interface Rating{
  reviewText: string,
  reviewRating: RatingOptions,
  test: boolean
}

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditableContentDirective, RatingPickerComponent],

  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss',

})
export class CustomFormComponent {

  form = this.fb.group<Rating>({
    reviewText: "",
    reviewRating: 'great',
    test: false
  })

  onSubmit(){
    console.log(this.form.value)
  }

  constructor(private fb: FormBuilder){
    // this.form.controls.reviewText.disable()
    // this.form.controls.reviewRating.disable()
  }
}
