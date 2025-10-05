import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '../../../components/atoms/Button.vue'

describe('Button', () => {
  it('renders button with title', () => {
    const wrapper = mount(Button, {
      props: {
        title: 'Click Me'
      }
    })

    expect(wrapper.text()).toContain('Click Me')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        title: 'Click Me'
      }
    })

    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('shows loading spinner when loading', () => {
    const wrapper = mount(Button, {
      props: {
        title: 'Submit',
        loading: true,
      }
    })

    expect(wrapper.find('.loading-spinner').exists()).toBe(true)
  })
})