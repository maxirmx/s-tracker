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
      lastName: 'Иванов',
      isAdmin: true,
      isManager: true
    },
    {
      id: 1,
      email: 'manager@example.com',
      password: 'manager',
      firstName: 'Пётр',
      patronimic: 'Петрович',
      lastName: 'Петров',
      isAdmin: false,
      isManager: true
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user',
      firstName: 'Михаил',
      patronimic: 'Владленович',
      lastName: 'Сидоров',
      isAdmin: false,
      isManager: false
    }
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
          token: 'fake-jwt-token-' + user.id
        })
      }

      function getUsers() {
        if (!isAuthenticated()) return unauthorized()
        return ok(users)
      }

      // helper functions

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
