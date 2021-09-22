import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Person } from '../shared/person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  persons: Person[]=[]

  myUrl = "http://localhost:3000/persons";
  constructor(private httpclient: HttpClient) { }

  getPersonlist() {
    return this.httpclient.get(this.myUrl)
  }

  postPerson(pers:Person) {
    return this.httpclient.post(this.myUrl, pers)
  }

updatePerson(pers:Person,id:Person){
  console.log(pers)
  return this.httpclient.put(this.myUrl+ `/${id}`,pers )
 

}
  deletePerson(id:Person){
    alert(id)
    console.log(id)
    alert('deleting')
    // return this.httpclient.delete('http://localhost:3000/persons/61320366f19d647b5ece5896')
    return this.httpclient.delete('http://localhost:3000/persons'+'/'+id);
    

  }

  
}
