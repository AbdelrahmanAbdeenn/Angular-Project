import { Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: BodyComponent },
  { path: 'users/add', component: FormComponent },
  { path: 'users/edit/:id', component: FormComponent },
  { path: 'users/delete/:id', component: DeleteDialogComponent},
  { path: '**', redirectTo: '' }
];