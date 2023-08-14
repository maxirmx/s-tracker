// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation  (test data set)
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

export { fakeBackend }

function fakeBackend() {
  let users = [
    {
      id: 0,
      email: 'admin@example.com',
      password: 'admin',
      firstName: 'Иван',
      patronimic: 'Иванович',
      organizationId: 0,
      lastName: 'Иванов',
      isAdmin: true,
      isManager: true
    },
    {
      id: 1,
      email: 'manager@example.com',
      password: 'manager',
      firstName: 'Роман',
      patronimic: 'Петрович',
      organizationId: 0,
      lastName: 'Ойра-Ойра',
      isAdmin: false,
      isManager: true
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user',
      firstName: 'Михаил',
      patronimic: 'Владленович',
      organizationId: 1,
      lastName: 'Сидоров',
      isAdmin: false,
      isManager: false
    },
    {
      id: 3,
      email: 'individual@example.com',
      password: 'individual',
      firstName: 'Янус',
      patronimic: 'Полуэктович',
      organizationId: -1,
      lastName: 'Невструев',
      isAdmin: false,
      isManager: false
    }
  ]

  let orgs = [
    { id: 0, name: 'OOO "Карго Менеджемент"' },
    { id: 1, name: 'OOO "Братан Турбо Дизель"' }
  ]


  let realFetch = window.fetch
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500)

      function handleRoute() {
        switch (true) {
          case url.endsWith('/users/authenticate') && opts.method === 'POST':
            return authenticate()
          case url.endsWith('/users') && opts.method === 'GET':
            return getUsers()
          case url.match(/\/users\/\d+$/) && opts.method === 'GET':
            return getUserById()
          case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
            return updateUser()
          case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
            return deleteUser()
          case url.endsWith('/orgs') && opts.method === 'GET':
            return getOrgs()
          case url.match(/\/orgs\/\d+$/) && opts.method === 'GET':
            return getOrgById()
          case url.match(/\/orgs\/\d+$/) && opts.method === 'PUT':
            return updateOrg()
          case url.match(/\/orgs\/\d+$/) && opts.method === 'DELETE':
            return deleteOrg()
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error))
        }
      }

      // route functions

      function authenticate() {
        const { email, password } = body()
        const user = users.find((x) => x.email === email && x.password === password)

        if (!user) return error('Неправильный пароль или адрес электронной почты')

        return ok({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          patronimic: user.patronimic,
          isAdmin: user.isAdmin,
          isManager: user.isManager,
          organizationId: user.organizationId,
          token: 'fake-jwt-token-' + user.id
        })
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized()
        return ok(users)
      }

      function getUserById() {
        if (!isAuthenticated()) return unauthorized()
        const user = users.find((x) => x.id === idFromUrl())
        return ok(basicDetails(user))
      }

      function updateUser() {
        if (!isAuthenticated()) return unauthorized()

        let params = body()
        let user = users.find((x) => x.id === idFromUrl())

        // only update password if entered
        if (!params.password) {
          delete params.password
        }

        // if email changed check if taken
        if (params.email !== user.email && users.find((x) => x.email === params.email)) {
          return error(
            'Пользователь с электронной почтой "' + params.email + '" уже зарегистрирован'
          )
        }

        // update and save user
        Object.assign(user, params)

        return ok()
      }

      function deleteUser() {
        if (!isAuthenticated()) return unauthorized()

        users = users.filter((x) => x.id !== idFromUrl())
        return ok()
      }

      function getOrgs() {
        if (!isAuthenticated()) return unauthorized()
        return ok(orgs)
      }

      function getOrgById() {
        if (!isAuthenticated()) return unauthorized()
        const org = orgs.find((x) => x.id === idFromUrl())
        return ok(org)
      }

      function updateOrg() {
        if (!isAuthenticated()) return unauthorized()

        let params = body()
        let org = orgs.find((x) => x.id === idFromUrl())

        // update and save user
        Object.assign(org, params)

        return ok()
      }

      function deleteOrg() {
        if (!isAuthenticated()) return unauthorized()

        orgs.filter((x) => x.id !== idFromUrl())
        return ok()
      }

      // helper functions
      function idFromUrl() {
        const urlParts = url.split('/')
        return parseInt(urlParts[urlParts.length - 1])
      }

      function ok(body) {
        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
      }

      function unauthorized() {
        resolve({
          status: 401,
          text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' }))
        })
      }

      function error(message) {
        resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
      }

      function isAuthenticated() {
        return opts.headers['Authorization'].startsWith('Bearer fake-jwt-token')
      }

      function basicDetails(user) {
        const { id, firstName, patronimic, lastName, email, isAdmin, isManager, organizationId } =
          user
        return { id, firstName, patronimic, lastName, email, isAdmin, isManager, organizationId }
      }
      /*
      function isManager() {
        if (!isAuthenticated()) return false
        const words = opts.headers['Authorization'].split('-')
        if (words.length < 3) return false
        const id = parseInt(words[words.length - 1])
        if (isNaN(id)) return false
        const user = users.find((x) => x.id === id)
        return user.isManager
      }

      function isAdmin() {
        if (!isAuthenticated()) return false
        const words = opts.headers['Authorization'].split('-')
        if (words.length < 3) return false
        const id = parseInt(words[words.length - 1])
        if (isNaN(id)) return false
        const user = users.find((x) => x.id === id)
        return user.isAdmin
      }
*/
      function body() {
        return opts.body && JSON.parse(opts.body)
      }
    })
  }
}
