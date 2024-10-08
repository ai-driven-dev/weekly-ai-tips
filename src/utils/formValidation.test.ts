import { Rule, validate, ValidationRule } from './formValidation';

describe('validate function', () => {
  const validationRules: ValidationRule[] = [
    { field: 'name', rule: Rule.Required },
  ];

  test('should return no errors for valid data', () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('description', 'Optional description');

    const errors = validate(formData, validationRules);

    expect(errors).toHaveLength(0);
  });

  test('should return error for empty name', () => {
    const formData = new FormData();
    formData.append('name', '');
    formData.append('description', 'Another optional description');

    const errors = validate(formData, validationRules);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toEqual({
      message: 'This field is required',
      type: { field: 'name', rule: Rule.Required },
    });
  });
});
