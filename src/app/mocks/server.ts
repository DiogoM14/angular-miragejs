import {Injectable} from '@angular/core';
import {Factory, Model, Response, Server} from 'miragejs';
import {CreateUserForm, User} from "../@types/user";
import {faker} from "@faker-js/faker";

@Injectable()
export default class MockService {

  public mirageJsServer(): Server {
    return new Server({
      models: {
        user: Model.extend<Partial<User>>({})
      },

      factories: {
        user: Factory.extend({
          id() {
            return faker.datatype.uuid()
          },
          name() {
            return faker.name.fullName()
          },
          email() {
            return faker.internet.email()
          },
          token() {
            return faker.random.alphaNumeric(10)
          },
          refreshToken() {
            return faker.random.alphaNumeric(10)
          }
        })
      },

      seeds(server) {
        server.createList('user', 10)
      },

      routes(): void {
        this.namespace = 'api'

        this.post('/auth', (schema, request) => {
          let attrs: CreateUserForm = JSON.parse(request.requestBody)

          let user: any = {
            id: faker.datatype.uuid(),
            name: attrs.name,
            email: attrs.email,
            token: faker.random.alphaNumeric(10),
            refreshToken: faker.random.alphaNumeric(10)
          }

          schema.create("user", user)

          return new Response(
            200,
            {},
            {user}
          )
        })

        this.get('/auth', (schema, request) => {
          const users: any = schema.all('user')

          return new Response(
            200,
            {},
            {users}
          )
        })

        this.delete('/auth', (schema, request) => {
          const id = request.queryParams!['id']

          console.log(id)

          schema.db['users'].remove(id)

          const users: any = schema.all('user')

          return new Response(
            200,
            {},
            {users}
          )
        })
      },
    });
  }
}
