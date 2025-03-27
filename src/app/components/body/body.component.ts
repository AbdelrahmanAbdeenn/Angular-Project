import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, TableComponent, ButtonModule, RouterModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

}
