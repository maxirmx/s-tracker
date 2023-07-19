import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloScreen from '../HelloScreen.vue'

describe('HelloScreen', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloScreen, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
