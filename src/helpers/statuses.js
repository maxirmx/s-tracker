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
//# ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS
// BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import { reactive, markRaw } from 'vue'

import CustomsStartIcon from '@/components/icons/IconCustomsStart.vue'
import CustomsEndIcon from '@/components/icons/IconCustomsEnd.vue'
import OutOfStorageIcon from '@/components/icons/IconOutOfStorage.vue'
import InStorageIcon from '@/components/icons/IconInStorage.vue'
import RegisteredIcon from '@/components/icons/IconRegistered.vue'
import CollectedIcon from '@/components/icons/IconCollected.vue'
import DeliveredIcon from '@/components/icons/IconDelivered.vue'
import UnknownIcon from '@/components/icons/IconUnknown.vue'

export const statuses = reactive({
  REGISTERED:0,
  COLLECTED:1,
  IN_STORAGE:2,
  OUT_OF_STORAGE:3,
  CUSTOMS_START:4,
  CUSTOMS_END:5,
  DELIVERED:6,
  names: [
    'Заявка на перевозку зарегистрирована',
    'Груз забран у отправителя',
    'Груз прибыл на склад',
    'Груз убыл со склада',
    'Начало таможенного оформления',
    'Окончание таможенного оформления',
    'Груз прибыл в пункт назначения'
  ],
  icons: [
    markRaw(RegisteredIcon),
    markRaw(CollectedIcon),
    markRaw(InStorageIcon),
    markRaw(OutOfStorageIcon),
    markRaw(CustomsStartIcon),
    markRaw(CustomsEndIcon),
    markRaw(DeliveredIcon)
  ],
  getName(code) {
    return code < this.names.length ? this.names[code] : 'Не известно (ошибка)'
  },
  getIcon(code) {
    return code < this.names.length ? this.icons[code] : UnknownIcon
  }
})
