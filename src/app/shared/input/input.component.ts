import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-shared-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class SharedInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() submitted: boolean = false;
  @Input() options: any[] = [];
  
  constructor() {}
  

}