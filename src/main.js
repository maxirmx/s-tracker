// Copyright (C) 2023 Maxim [maxirmx] Samsonov  (www.sw.consulting)
// All rights reserved.
// This file is a part of s-tracker applcation
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

import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// ------------ fontawesome --------------
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCalendarPlus,
  faDownload,
  faEye,
  faEyeSlash,
  faHouseChimneyMedical,
  faPen,
  faPenToSquare,
  faTrashCan,
  faTruckFast,
  faUserPlus,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCalendarPlus,
  faDownload,
  faEye,
  faEyeSlash,
  faHouseChimneyMedical,
  faPen,
  faPenToSquare,
  faTrashCan,
  faTruckFast,
  faUserPlus,
  faXmark
)

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
//import * as components from 'vuetify/components'
//import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import VuetifyUseDialog from 'vuetify-use-dialog'
//import { aliases, fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import App from '@/App.vue'
import router from '@/router'

import { useAuthStore } from '@/stores/auth.store.js'

const vuetify = createVuetify({
//  components,
//  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
      //      fa,
    }
  }
})

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .use(vuetify, { components: { VDataTable } })
  .use(VuetifyUseDialog)

const queryString = window.location.search
console.log(queryString)
const urlParams = new URLSearchParams(queryString)

var jwt = null
var tgt = null

if (urlParams.has('recover')) {
  jwt = urlParams.get('recover')
  tgt = 'recover'
} else if (urlParams.has('register')) {
  jwt = urlParams.get('register')
  tgt = 'register'
}

if (jwt) {
  const authStore = useAuthStore()
  authStore.re_jwt = jwt
  authStore.re_tgt = tgt
}

app.mount('#app')
