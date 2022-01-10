import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  uploadForm: FormGroup; 
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.uploadForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      identification: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      add_attrs: ['', Validators.required]
    });
  }
  ngOnInit(){};
  id;
  public isError = false;

  onSubmit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    if (this.uploadForm.valid) {
      this.userService.updateUser(
        this.id,
        this.uploadForm.get('full_name')!.value,
        this.uploadForm.get('identification')!.value,
        this.uploadForm.get('age')!.value,
        this.uploadForm.get('gender')!.value,
        this.uploadForm.get('state')!.value,
        this.uploadForm.get('add_attrs')!.value)
      .subscribe(
      (res) => {console.log(res); this.router.navigate(['/']);},
      (err) => console.log(err)
    );
    } else {
      this.onIsError();
    }
  }

  onIsError(): void {
    this.isError = true;
  }
}
