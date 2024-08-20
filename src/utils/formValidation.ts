export enum Rule {
  Required = 'required',
  Email = 'email',
  ReCAPTCHA = 'recaptcha',
}

export type ValidationRule = {
  field: string;
  rule: Rule;
};

export type ErrorMessage = {
  message: string;
  type: ValidationRule;
};

export function validate(
  formData: FormData,
  validationRules: ValidationRule[],
): ErrorMessage[] {
  const errors: ErrorMessage[] = [];

  for (const rule of validationRules) {
    const value = formData.get(rule.field);

    switch (rule.rule) {
      case Rule.Required:
        if (!value) {
          errors.push({
            message: 'This field is required',
            type: rule,
          });
        }
        break;
      case Rule.Email:
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) {
          errors.push({
            message: 'Invalid email address',
            type: rule,
          });
        }
        break;
      case Rule.ReCAPTCHA:
        if (!value) {
          errors.push({
            message: 'Please complete the reCAPTCHA',
            type: rule,
          });
        }
        break;
    }
  }

  return errors;
}
