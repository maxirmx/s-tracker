// status.js
import { reactive, markRaw } from 'vue'

import CustomsStartIcon from './components/icons/IconCustomsStart.vue'
import CustomsEndIcon from './components/icons/IconCustomsEnd.vue'
import OutOfStorageIcon from './components/icons/IconOutOfStorage.vue'
import InStorageIcon from './components/icons/IconInStorage.vue'
import RegisteredIcon from './components/icons/IconRegistered.vue'
import CollectedIcon from './components/icons/IconCollected.vue'
import DeliveredIcon from './components/icons/IconDelivered.vue'
import UnknownIcon from './components/icons/IconUnknown.vue'

export const status = reactive({
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
