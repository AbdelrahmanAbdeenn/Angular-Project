import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  @Input() title ='';
  @Input() message ='';
  @Input() confirmLabel= '';
  @Input() isVisible = false;

  @Output() confirm = new EventEmitter<void>();
  @Input() onConfirmAction: () => void = () => {};
  @Output() closed = new EventEmitter<void>();

  onConfirm(){
    this.onConfirmAction();
    this.confirm.emit();
  }
  onCancel(){
    this.closed.emit();
  }


}
