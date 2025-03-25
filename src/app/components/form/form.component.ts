import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SharedInputComponent } from '../../shared/input/input.component';
import { UserService, UserData } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedInputComponent,
    RouterModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  editMode = false;
  userData: UserData | null = null;
  userForm!: FormGroup;
  submitted = false;
  userId: number | null = null;
  
  cities = [
    { label: 'New York', value: 'New York' },
    { label: 'Los Angeles', value: 'Los Angeles' },
    { label: 'Chicago', value: 'Chicago' },
    { label: 'Houston', value: 'Houston' },
    { label: 'Miami', value: 'Miami' },
    { label: 'Roscoeview', value: 'Roscoeview' }
  ];

  constructor(
    private fb: FormBuilder, 
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.editMode = true;
        this.loadUserData(this.userId);
      }
    });
  }

  loadUserData(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userData = user;
        this.populateForm();
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.toastService.show('error', 'Error', 'User not found');
        this.router.navigate(['/users']);
      }
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['', Validators.required],
        zipcode: ['', Validators.required]
      }),
      company: this.fb.group({
        name: ['', Validators.required],
        catchPhrase: ['', Validators.required],
        bs: ['', Validators.required]
      })
    });
  }

  populateForm() {
    if (this.userData) {
      this.userForm.patchValue({
        name: this.userData.name,
        username: this.userData.username,
        email: this.userData.email,
        address: {
          city: this.findCityOption(this.userData.address.city),
          street: this.userData.address.street,
          zipcode: this.userData.address.zipcode
        },
        company: {
          name: this.userData.company.name,
          catchPhrase: this.userData.company.catchPhrase,
          bs: this.userData.company.bs
        }
      });
    }
  }

  findCityOption(cityName: string) {
    const foundCity = this.cities.find(city => city.value === cityName);
    return foundCity ? foundCity.value : '';
  }

  get nameControl(): FormControl { return this.userForm.get('name') as FormControl; }
  get usernameControl(): FormControl { return this.userForm.get('username') as FormControl; }
  get emailControl(): FormControl { return this.userForm.get('email') as FormControl; }
  get cityControl(): FormControl { return this.userForm.get('address.city') as FormControl; }
  get streetControl(): FormControl { return this.userForm.get('address.street') as FormControl; }
  get zipcodeControl(): FormControl { return this.userForm.get('address.zipcode') as FormControl; }
  get companyNameControl(): FormControl { return this.userForm.get('company.name') as FormControl; }
  get companyCatchphraseControl(): FormControl { return this.userForm.get('company.catchPhrase') as FormControl; }
  get companyBsControl(): FormControl { return this.userForm.get('company.bs') as FormControl; }

  save() {
    this.submitted = true;
    
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.toastService.show('warn', 'Failed', 'Please fill all required fields');
      return;
    }

    const userData = this.userForm.value;
    
    if (this.editMode && this.userId) {
      // Update existing user
      this.userService.updateUser(this.userId, userData).subscribe({
        next: () => {
          this.toastService.show('info', 'Updated', 'User updated successfully');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.toastService.show('error', 'Error', 'Failed to update user');
        }
      });
    } else {
      // Create new user
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.toastService.show('success', 'Created', 'User created successfully');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error('Error creating user:', err);
          this.toastService.show('error', 'Error', 'Failed to create user');
        }
      });
    }
  }
}
