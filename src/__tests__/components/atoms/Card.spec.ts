import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card from '../../../components/atoms/Card.vue'

describe('Card', () => {
  it('renders card with title', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Card'
      }
    })

    expect(wrapper.text()).toContain('Test Card')
    expect(wrapper.find('.card').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Card'
      },
      slots: {
        default: '<p>Card content here</p>'
      }
    })

    expect(wrapper.text()).toContain('Card content here')
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Card'
      }
    })

    expect(wrapper.classes()).toContain('card')
  })
})