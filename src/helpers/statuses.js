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

import { reactive, markRaw } from 'vue'

import CustomsStartIcon from '@/components/icons/IconCustomsStart.vue'
import CustomsEndIcon from '@/components/icons/IconCustomsEnd.vue'
import OutOfStorageIcon from '@/components/icons/IconOutOfStorage.vue'
import InStorageIcon from '@/components/icons/IconInStorage.vue'
import RegisteredIcon from '@/components/icons/IconRegistered.vue'
import CollectedIcon from '@/components/icons/IconCollected.vue'
import DeliveredIcon from '@/components/icons/IconDelivered.vue'
import UnknownIcon from '@/components/icons/IconUnknown.vue'

export const stcodes = {
  REGISTERED : 0,
COLLECTED: 1,
IN_STORAGE: 2,
OUT_OF_STORAGE: 3,
CUSTOMS_START: 4,
CUSTOMS_END: 5,
DELIVERED: 6,
}

export const statuses = reactive({
  items: [
    {
      id: stcodes.REGISTERED,
      name: 'Заявка на перевозку зарегистрирована',
      icon: markRaw(RegisteredIcon)
    },
    {
      id: stcodes.COLLECTED,
      name: 'Груз забран у отправителя',
      icon: markRaw(CollectedIcon)
    },
    {
      id: stcodes.IN_STORAGE,
      name: 'Груз прибыл на склад',
      icon: markRaw(InStorageIcon)
    },
    {
      id: stcodes.OUT_OF_STORAGE,
      name: 'Груз убыл со склада',
      icon: markRaw(OutOfStorageIcon)
    },
    {
      id: stcodes.CUSTOMS_START,
      name: 'Начало таможенного оформления',
      icon: markRaw(CustomsStartIcon)
    },
    {
      id: stcodes.CUSTOMS_END,
      name: 'Окончание таможенного оформления',
      icon: markRaw(CustomsEndIcon)
    },
    {
      id: stcodes.DELIVERED,
      name: 'Груз прибыл в пункт назначения',
      icon: markRaw(DeliveredIcon)
    }
  ],
  getName(code) {
    return code < this.items.length ? this.items[code].name : 'Не известно (ошибка)'
  },
  getIcon(code) {
    return code < this.items.length ? this.items[code].icon : markRaw(UnknownIcon)
  }
})
