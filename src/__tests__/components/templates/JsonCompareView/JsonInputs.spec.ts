import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JsonInputs from '../../../../components/templates/JsonCompareView/JsonInputs.vue'

// Mock Textarea component
vi.mock('@/components/atoms/Textarea.vue', () => ({
  default: {
    name: 'Textarea',
    props: ['modelValue', 'placeholder', 'disabled'],
    emits: ['update:modelValue'],
    template: '<textarea class="textarea-mock" :placeholder="placeholder" :disabled="disabled" @input="$emit(\'update:modelValue\', $event.target.value)"></textarea>'
  }
}))

describe('JsonInputs', () => {
  it('renders two textarea inputs', () => {
    const wrapper = mount(JsonInputs, {
      props: {
        firstInputText: '',
        secondInputText: '',
        loading: false
      }
    })

    const textareas = wrapper.findAll('.textarea-mock')
    expect(textareas).toHaveLength(2)
  })

  it('shows correct placeholders', () => {
    const wrapper = mount(JsonInputs, {
      props: {
        firstInputText: '',
        secondInputText: '',
        loading: false
      }
    })

    const textareas = wrapper.findAll('.textarea-mock')
    expect(textareas[0].attributes('placeholder')).toContain('first')
    expect(textareas[1].attributes('placeholder')).toContain('second')
  })

  it('disables inputs when loading', () => {
    const wrapper = mount(JsonInputs, {
      props: {
        firstInputText: '',
        secondInputText: '',
        loading: true
      }
    })

    const textareas = wrapper.findAll('.textarea-mock')
    expect(textareas[0].attributes('disabled')).toBeDefined()
    expect(textareas[1].attributes('disabled')).toBeDefined()
  })

  it('displays current input values', () => {
    const firstJson = '{"name": "test"}'
    const secondJson = '{"name": "updated"}'

    const wrapper = mount(JsonInputs, {
      props: {
        firstInputText: firstJson,
        secondInputText: secondJson,
        loading: false
      }
    })

    const textareas = wrapper.findAllComponents({ name: 'Textarea' })
    expect(textareas[0].props('modelValue')).toBe(firstJson)
    expect(textareas[1].props('modelValue')).toBe(secondJson)
  })
})