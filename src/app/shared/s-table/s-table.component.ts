import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-s-table',
  standalone: true,
  imports: [CommonModule, TableModule, OverlayPanelModule, ButtonModule, RouterModule],
  templateUrl: './s-table.component.html',
  styleUrls: ['./s-table.component.css']
})
export class STableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string; header: string }[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  resolveField(row: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc?.[part], row);
  }
}
