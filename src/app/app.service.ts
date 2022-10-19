import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreateUserForm, User} from "./@types/user";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  createUser(user: CreateUserForm) {
    return this.http.post<User>("/api/auth", {
      name: user.name,
      email: user.email,
      password: user.password
    })

  }

  readUser() {
    return this.http.get("/api/auth")
  }

  updateUser() {

  }

  deleteUser(id: string) {
    let searchParams = new HttpParams()
    searchParams = searchParams.append("id", id)

    return this.http.delete("/api/auth", {
      params: searchParams
    })
  }
}
