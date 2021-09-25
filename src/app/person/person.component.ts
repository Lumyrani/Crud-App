import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonService } from '../shared/person.service';
import { HttpClient } from '@angular/common/http';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  isEdit: boolean = false
  personObj: any = new Person()

  personData: Person[] = []
  constructor(private fb: FormBuilder, private personService: PersonService, private http: HttpClient) { }

  ngOnInit(): void {

    this.loadpersons()
    this.reset()
  }
  personForm = this.fb.group({
    _id: [''],
    name: [''],
    place: [''],
    state: [''],
    pin: []
  })

  onSubmit() {
    //if isEdit true , then submit button works
    if (!this.isEdit) {
      console.log("this.personObj._id ")
      this.personObj.name = this.personForm.value.name
      this.personObj.place = this.personForm.value.place
      this.personObj.state = this.personForm.value.state
      this.personObj.pin = this.personForm.value.pin
      this.personService.postPerson(this.personObj)
        .subscribe(
          (res) => {
            alert('inserted'),
              // loading new form data details
              this.loadpersons()
          },
          (err) => { alert('not inserted') }

        )
    }
    else {

      //to get data for edit
      this.personObj.name = this.personForm.value.name
      this.personObj.place = this.personForm.value.place
      this.personObj.state = this.personForm.value.state
      this.personObj.pin = this.personForm.value.pin


      this.onEdit(this.personObj)
      alert('updated')

      //to make isEdit false then  buttton save will appear
      this.isEdit = false

      //to make form empty
      this.personObj.name = ""
      this.personObj.place = ""
      this.personObj.state = ""
      this.personObj.pin = ""

      this.loadpersons()


    }

  }
  loadpersons() {
    this.personService.getPersonlist().subscribe(
      (result) => {
        console.log("result")
        this.personData = result as Person[]
      }
    )
  }

  //to delete data with given form data id 
  onDelete(pers: any) {
    this.personService.deletePerson(pers._id)
        .subscribe((res) => {
        console.log("deleted")
        alert('deleted'), this.loadpersons()
      })
  }

  // make form data details empty
  reset() {
    this.personForm.controls[""]
    this.personForm.controls['name'].setValue("")
    this.personForm.controls['place'].setValue("")
    this.personForm.controls['state'].setValue("")
    this.personForm.controls['pin'].setValue("")

  }

  onEdit(pers: any) {

    this.isEdit = true
    this.personService.updatePerson(pers, pers._id).
      subscribe((response) => {
        this.personObj._id = pers._id
        this.personForm.controls['name'].setValue(pers.name)
        this.personForm.controls['place'].setValue(pers.place)
        this.personForm.controls['state'].setValue(pers.state)
        this.personForm.controls['pin'].setValue(pers.pin)
        this.loadpersons()

      })

  }

}




