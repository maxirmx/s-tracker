import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloScreen from '../HelloScreen.vue'

describe('HelloScreen', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloScreen, { props: { appName: 'Hello S-Tracker' } })
    expect(wrapper.text()).toContain('Hello S-Tracker')
  })
})
