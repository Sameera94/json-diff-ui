import { describe, expect, it } from 'vitest'
import { JsonValidator } from '../../utils/jsonValidator'

describe('JsonValidator', () => {
  describe('validateJson', () => {
    it('validates correct JSON string', () => {
      const validJson = '{"name": "John", "age": 30}'
      const result = JsonValidator.validateJson(validJson, 'Test JSON')

      expect(result.isValid).toBe(true)
      expect(result.data).toEqual({ name: 'John', age: 30 })
      expect(result.error).toBeUndefined()
    })

    it('validates correct JSON array', () => {
      const validJson = '[1, 2, 3, "test"]'
      const result = JsonValidator.validateJson(validJson, 'Test Array')

      expect(result.isValid).toBe(true)
      expect(result.data).toEqual([1, 2, 3, 'test'])
      expect(result.error).toBeUndefined()
    })

    it('validates nested JSON object', () => {
      const validJson = '{"user": {"name": "John", "details": {"age": 30}}}'
      const result = JsonValidator.validateJson(validJson, 'Nested JSON')

      expect(result.isValid).toBe(true)
      expect(result.data).toEqual({
        user: {
          name: 'John',
          details: { age: 30 }
        }
      })
    })

    it('rejects invalid JSON syntax', () => {
      const invalidJson = '{"name": "John", "age":}'
      const result = JsonValidator.validateJson(invalidJson, 'Invalid JSON')

      expect(result.isValid).toBe(false)
      expect(result.data).toBeUndefined()
      expect(result.error).toContain('Invalid JSON')
    })

    it('rejects empty string', () => {
      const result = JsonValidator.validateJson('', 'Empty Input')

      expect(result.isValid).toBe(false)
      expect(result.data).toBeUndefined()
      expect(result.error).toContain('Empty Input cannot be empty')
    })
  })
})