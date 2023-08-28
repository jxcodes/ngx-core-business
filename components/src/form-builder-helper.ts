import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
export const EMAIL_PATTERN =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const URL_PATTERN =
  /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?)/i;

export interface FormFieldOptions {
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: RegExp | string;
  emailPattern?: boolean | RegExp;
  urlPattern?: boolean | RegExp;
  customValidation?: Function;
  defaultValue?: any;
  valueType?: 'array' | 'object' | 'string' | 'number' | 'boolean';
  arrayValueType?: 'string' | 'number';
}
export interface FormField extends FormFieldOptions {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class FormBuilderHelper {
  constructor(private formBuilder: UntypedFormBuilder) { }
  buildFormModel(fields: { [key: string]: FormFieldOptions }, values: { [key: string]: any }) {
    const me = this;
    let formGroupObjet: any = {},
      field: FormFieldOptions,
      fieldValue,
      fieldPropsObj;
    values = values ? values : {};
    for (const fieldName of Object.keys(fields)) {
      field = fields[fieldName];
      fieldValue = values[fieldName];
      // If the valueType is array and the value is a string, we need to convert it to an array
      if (field.valueType === 'array' && typeof fieldValue === 'string') {
        fieldValue = fieldValue.split(',').map(value => {
          if (field.arrayValueType === 'number') {
            return Number(value);
          }
          return value.trim();
        });
      }
      fieldValue = fieldValue !== undefined ? fieldValue : field.defaultValue;
      // disabled Field
      if (field.disabled) {
        fieldPropsObj = { value: fieldValue, disabled: true };
      } else {
        fieldPropsObj = fieldValue;
      }
      formGroupObjet[fieldName] = [fieldPropsObj, me.getValidators(field)];
    }
    return this.formBuilder.group(formGroupObjet);
  }
  /**
   * Retronar un arreglo de validadores
   * @param field
   */
  getValidators(field: FormFieldOptions) {
    let out = [];
    if (field.required) {
      out.push(Validators.required);
    }
    if (field.min !== undefined) {
      out.push(Validators.min(field.min));
    }
    if (field.max !== undefined) {
      out.push(Validators.max(field.max));
    }
    if (field.minLength) {
      out.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      out.push(Validators.maxLength(field.maxLength));
    }
    if (field.email) {
      out.push(Validators.email);
    }
    if (field.emailPattern) {
      out.push(Validators.pattern(EMAIL_PATTERN));
    }
    if (field.urlPattern) {
      out.push(Validators.pattern(URL_PATTERN));
    }
    if (field.pattern) {
      out.push(Validators.pattern(field.pattern));
    }
    if (field.customValidation) {
      out.push(field.customValidation);
    }
    return out;
  }
}
