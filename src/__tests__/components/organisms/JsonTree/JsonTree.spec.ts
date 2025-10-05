import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JsonTree from '../../../../components/organisms/JsonTree/JsonTree.vue'

vi.mock('@/components/organisms/JsonTree/JsonNode.vue', () => ({
  default: {
    name: 'JsonNode',
    props: ['data', 'displayKey', 'depth', 'diffs', 'side', 'path'],
    template: '<div class="json-node-mock">{{ displayKey }}: {{ typeof data }}</div>'
  }
}))

describe('JsonTree', () => {
  const sampleData = {
    name: 'John',
    age: 30,
    active: true
  }

  it('renders JsonNode for root data', () => {
    const wrapper = mount(JsonTree, {
      props: {
        jsonData: sampleData,
        diffs: [],
        side: 'value1'
      }
    })

    const jsonNode = wrapper.findComponent({ name: 'JsonNode' })
    expect(jsonNode.exists()).toBe(true)
  })

  it('handles empty object', () => {
    const wrapper = mount(JsonTree, {
      props: {
        jsonData: {},
        diffs: [],
        side: 'value2'
      }
    })

    const jsonNode = wrapper.findComponent({ name: 'JsonNode' })
    expect(jsonNode.props('data')).toEqual({})
  })

  it('passes array data correctly', () => {
    const arrayData = ['item1', 'item2', 'item3']
    const wrapper = mount(JsonTree, {
      props: {
        jsonData: arrayData,
        diffs: [],
        side: 'value1'
      }
    })

    const jsonNode = wrapper.findComponent({ name: 'JsonNode' })
    expect(jsonNode.props('data')).toEqual(arrayData)
  })

  it('has correct CSS class', () => {
    const wrapper = mount(JsonTree, {
      props: {
        jsonData: sampleData,
        diffs: [],
        side: 'value1'
      }
    })

    expect(wrapper.classes()).toContain('json-tree')
  })
})