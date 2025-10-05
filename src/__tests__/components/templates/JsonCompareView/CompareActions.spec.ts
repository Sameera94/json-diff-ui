import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import CompareActions from '../../../../components/templates/JsonCompareView/CompareActions.vue'

// Mock Button component
vi.mock('@/components/atoms/Button.vue', () => ({
  default: {
    name: 'Button',
    props: ['title', 'loading', 'disabled'],
    emits: ['click'],
    template: '<button class="button-mock" :disabled="disabled || loading" @click="$emit(\'click\')">{{ loading ? "Loading..." : title }}</button>'
  }
}))

describe('CompareActions', () => {
  it('renders compare button', () => {
    const wrapper = mount(CompareActions, {
      props: {
        loading: false,
        errorMessage: '',
        successMessage: ''
      }
    })

    const button = wrapper.find('.button-mock')
    expect(button.exists()).toBe(true)
  })

  it('shows loading state on button', () => {
    const wrapper = mount(CompareActions, {
      props: {
        loading: true,
        errorMessage: '',
        successMessage: ''
      }
    })

    const button = wrapper.find('.button-mock')
    expect(button.text()).toContain('Loading')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('emits compare event when button clicked', async () => {
    const wrapper = mount(CompareActions, {
      props: {
        loading: false,
        errorMessage: '',
        successMessage: ''
      }
    })

    const button = wrapper.find('.button-mock')
    await button.trigger('click')

    expect(wrapper.emitted('compare')).toBeTruthy()
    expect(wrapper.emitted('compare')).toHaveLength(1)
  })

  it('displays error message when provided', () => {
    const errorMessage = 'Invalid JSON format'
    const wrapper = mount(CompareActions, {
      props: {
        loading: false,
        errorMessage,
        successMessage: ''
      }
    })

    expect(wrapper.text()).toContain(errorMessage)
    expect(wrapper.find('.error-message').exists()).toBe(true)
  })

  it('displays success message when provided', () => {
    const successMessage = 'Comparison completed successfully'
    const wrapper = mount(CompareActions, {
      props: {
        loading: false,
        errorMessage: '',
        successMessage
      }
    })

    expect(wrapper.text()).toContain(successMessage)
    expect(wrapper.find('.success-message').exists()).toBe(true)
  })

  it('does not show messages when empty', () => {
    const wrapper = mount(CompareActions, {
      props: {
        loading: false,
        errorMessage: '',
        successMessage: ''
      }
    })

    expect(wrapper.find('.error-message').exists()).toBe(false)
    expect(wrapper.find('.success-message').exists()).toBe(false)
  })
})