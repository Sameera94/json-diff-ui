export interface JsonValidationResult {
  isValid: boolean;
  data?: object;
  error?: string;
}

export class JsonValidator {

  /**
   * JSON validation method
   * 
   * Validates a JSON string and returns detailed results including parsed data or error information.
   * Performs multiple validation checks.
   * 
   * @param jsonString - The raw JSON string to validate
   * @param fieldName - Human-readable field name for error messages (defaults to 'JSON')
   * @returns JsonValidationResult object containing validation status and data/error
   */
  static validateJson(jsonString: string, fieldName: string = 'JSON'): JsonValidationResult {
    // Check if empty or whitespace
    if (!jsonString || jsonString.trim() === '' || jsonString.trim().length === 0) {
      return {
        isValid: false,
        error: `${fieldName} cannot be empty`
      };
    }

    try {
      const parsedData = JSON.parse(jsonString);

      // Check if parsed data is primitive
      if (typeof parsedData !== 'object') {
        return {
          isValid: false,
          error: `${fieldName} must be a valid JSON object`
        };
      }

      return {
        isValid: true,
        data: parsedData
      };
    } catch {
      return {
        isValid: false,
        error:  `${fieldName} is invalid.`
      };
    }
  }

  static isValidJson(jsonString: string): boolean {
    return this.validateJson(jsonString).isValid;
  }
}