import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crudAngular';

  employeForm: FormGroup;
  employeList: any[] = [];
  selectedIndex: number = -1;

  constructor(private formBuilder: FormBuilder) {
    this.employeForm = this.formBuilder.group({
      Nom: [''],
      Email: [''],
      Adresse: [''],
      Telephone: [''],
    });
  }

  ngOnInit(): void {
    let data = localStorage.getItem('employeList');
    this.employeList = JSON.parse(data || '[]');
  }

  

  ajoutEmploye() {
    this.employeList.push(this.employeForm.value);
    localStorage.setItem('employeList', JSON.stringify(this.employeList));
    window.location.reload()
  }

  supprimer(i: number) {
    this.employeList.splice(i, 1);
    localStorage.setItem('employeList', JSON.stringify(this.employeList));
    window.location.reload()
  }

  editEmploye(i: number) {
    this.employeForm.setValue(this.employeList[i]);
    this.supprimer(i);
    window.location.reload()
  }

  modifierEmploye() {
    if (this.selectedIndex !== -1) {
      this.employeList[this.selectedIndex].Nom = this.employeForm.value.Nom;
      this.employeList[this.selectedIndex].Email = this.employeForm.value.Email;
      this.employeList[this.selectedIndex].Adresse = this.employeForm.value.Adresse;
      this.employeList[this.selectedIndex].Telephone = this.employeForm.value.Telephone;
      localStorage.setItem('employeList', JSON.stringify(this.employeList));
    }
  }

  selectAllItem(){
    const selected = document.getElementById('selectAll') as HTMLInputElement;
    const checkboxes = document.getElementsByName('checkbox');
    if (selected.checked == true) {
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i] as HTMLInputElement;
        checkbox.checked = true;
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i] as HTMLInputElement;
        checkbox.checked = false;
      }
    }
	}

  deleteAllItem(){
    const checkboxes = document.getElementsByName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      if (checkbox.checked == true) {
        this.employeList.splice(i, 1);
        localStorage.setItem('employeList', JSON.stringify(this.employeList));
      }
    }
  }

  verificationCheckbox(){
    const selected = document.getElementById('selectAll') as HTMLInputElement;
    const checkboxes = document.getElementsByName('checkbox');
    if (selected.checked == true) {
      this.deleteAllItem();
      window.location.reload();
    } else {
       alert("Veuillez cocher sur la case à cocher");
    }

	}

  


}
  

