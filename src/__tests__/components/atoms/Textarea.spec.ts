import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Textarea from '../../../components/atoms/Textarea.vue'

describe('Textarea', () => {
  it('renders textarea with placeholder', () => {
    const wrapper = mount(Textarea, {
      props: {
        placeholder: 'Enter JSON...',
        modelValue: ''
      }
    })

    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter JSON...')
  })

  it('shows the text value', () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'Hello World',
        placeholder: 'Test'
      }
    })

    expect(wrapper.find('textarea').element.value).toBe('Hello World')
  })

  it('emits update when text changes', async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: '',
        placeholder: 'Test'
      }
    })

    await wrapper.find('textarea').setValue('New text')
    expect(wrapper.emitted('updateValue')).toBeTruthy()
    expect(wrapper.emitted('updateValue')?.[0]).toEqual(['New text'])
  })
})