import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {CreateUserForm, User} from "./@types/user";
import {map} from "rxjs";
import MockService from "./mocks/server";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.mockService.mirageJsServer()
  }

  userId: string = ""

constructor(private crud: AppService, private mockService: MockService) {  }

  handleCreateUser() {
    const user: CreateUserForm = {
      email: "diogomartins200214@gmail.com",
      name: "Diogo",
      password: "asdasd"
    }

    this.crud.createUser(user).subscribe(res => {
      console.log(res)
    })
  }

  handleReadUsers() {
    this.crud.readUser().subscribe((res: any) => console.log(res))
  }

  handleDeleteUser() {
    this.crud.deleteUser(this.userId).subscribe(res => console.log(res))
  }
}
