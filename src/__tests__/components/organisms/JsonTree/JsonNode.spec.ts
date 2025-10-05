import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import JsonNode from '../../../../components/organisms/JsonTree/JsonNode.vue'

describe('JsonNode', () => {
  const sampleDiffs = [
    { path: 'name', value1: 'John', value2: 'Jane' },
    { path: 'user.age', value1: 30, value2: 25 }
  ]

  it('renders primitive string value', () => {
    const wrapper = mount(JsonNode, {
      props: {
        data: 'Hello World',
        displayKey: 'message',
        depth: 0,
        diffs: [],
        side: 'value1',
        path: 'message'
      }
    })

    expect(wrapper.text()).toContain('message')
    expect(wrapper.text()).toContain('Hello World')
  })

  it('renders primitive number value', () => {
    const wrapper = mount(JsonNode, {
      props: {
        data: 42,
        displayKey: 'count',
        depth: 0,
        diffs: [],
        side: 'value1',
        path: 'count'
      }
    })

    expect(wrapper.text()).toContain('count')
    expect(wrapper.text()).toContain('42')
  })

  it('renders boolean value', () => {
    const wrapper = mount(JsonNode, {
      props: {
        data: true,
        displayKey: 'active',
        depth: 0,
        diffs: [],
        side: 'value1',
        path: 'active'
      }
    })

    expect(wrapper.text()).toContain('active')
    expect(wrapper.text()).toContain('true')
  })

  it('renders null value', () => {
    const wrapper = mount(JsonNode, {
      props: {
        data: null,
        displayKey: 'nullable',
        depth: 0,
        diffs: [],
        side: 'value1',
        path: 'nullable'
      }
    })

    expect(wrapper.text()).toContain('nullable')
    expect(wrapper.text()).toContain('null')
  })

  it('renders object with child nodes', () => {
    const objectData = {
      name: 'John',
      age: 30
    }

    const wrapper = mount(JsonNode, {
      props: {
        data: objectData,
        displayKey: 'user',
        depth: 0,
        diffs: [],
        side: 'value1',
        path: 'user'
      }
    })

    expect(wrapper.text()).toContain('user')
    expect(wrapper.text()).toContain('name')
    expect(wrapper.text()).toContain('age')
  })

  it('renders array with indexed items', () => {
    const arrayData = ['item1', 'item2', 'item3']

    const wrapper = mount(JsonNode, {
      props: {
        data: arrayData,
        displayKey: 'items',
        depth: 0,
        diffs: [],
        side: 'value1',
        path: 'items'
      }
    })

    expect(wrapper.text()).toContain('items')
  })

  it('shows correct value for different sides', () => {
    // Test value1 side
    const wrapper1 = mount(JsonNode, {
      props: {
        data: 'John',
        displayKey: 'name',
        depth: 0,
        diffs: sampleDiffs,
        side: 'value1',
        path: 'name'
      }
    })

    expect(wrapper1.text()).toContain('John')

    // Test value2 side
    const wrapper2 = mount(JsonNode, {
      props: {
        data: 'Jane',
        displayKey: 'name',
        depth: 0,
        diffs: sampleDiffs,
        side: 'value2',
        path: 'name'
      }
    })

    expect(wrapper2.text()).toContain('Jane')
  })
})