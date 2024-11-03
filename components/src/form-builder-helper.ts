import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export const EMAIL_PATTERN =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const URL_PATTERN =
  /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?)/i;
export type FieldGroupType = 'object' | 'array';
export interface FieldValidations {
  //groupType?: FieldGroupType;
  groupType?: string;
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
  customValidation?: () => boolean;
  defaultValue?: any;
  valueType?: 'array' | 'object' | 'string' | 'number' | 'boolean';
  arrayValueType?: 'string' | 'number';
}

// This defines the structure of the form fields
export type FormFieldDefinition = FieldValidations | {
  [key: string]: FieldValidations | string;
  //groupType: FieldGroupType;
  groupType: string;
};
export interface FormField extends FieldValidations {
  name: string;
}
export type FormFields = {
  [key: string]: FormFieldDefinition;
};

@Injectable({
  providedIn: 'root',
})
export class FormBuilderHelper {

  constructor(private formBuilder: FormBuilder) { }

  buildFormGroup(fields: FormFields, values: { [key: string]: any } = {}): FormGroup {
    const me = this;
    const formGroupObjet: any = {};
    let formFieldDefinition: FormFieldDefinition;
    let fieldValue;
    values = values || {};
    for (const fieldName of Object.keys(fields)) {
      formFieldDefinition = fields[fieldName];
      fieldValue = values[fieldName];
      if (formFieldDefinition.groupType === 'object') {
        formGroupObjet[fieldName] = me.buildFormGroup(formFieldDefinition as FormFields, fieldValue);
        continue;
      }
      if (formFieldDefinition.groupType === 'array') {
        formGroupObjet[fieldName] = me.buildFormArray(formFieldDefinition as FormFields, fieldValue);
        continue;
      }
      formGroupObjet[fieldName] = me.getFormGroupFieldDefinition(formFieldDefinition, fieldValue);
    }
    return this.formBuilder.group(formGroupObjet);
  }

  /**
   * Retronar un arreglo de validadores
   *
   * @param field
   */
  getValidators(field: FieldValidations): any[] {
    const out: any[] = [];
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

  private buildFormArray(fields: FormFields, rows: { [key: string]: any }[]): FormArray {
    const me = this;
    const formArray: FormGroup[] = [];
    rows = rows || [];
    rows.forEach((item) => {
      formArray.push(me.buildFormGroup(fields, item));
    });
    return this.formBuilder.array(formArray);
  }

  private getFormGroupFieldDefinition(formFieldDefinition: FormFieldDefinition, fieldValue: any): [field: any, validators: any[]] {
    const me = this;
    let fieldPropsObj;
    // If the valueType is array and the value is a string, we need to convert it to an array
    if (formFieldDefinition.valueType === 'array' && typeof fieldValue === 'string') {
      fieldValue = fieldValue.split(',').map((value) => {
        if (formFieldDefinition.arrayValueType === 'number') {
          return Number(value);
        }
        return value.trim();
      });
    }
    fieldValue = fieldValue !== undefined ? fieldValue : formFieldDefinition.defaultValue;
    // disabled Field
    if (formFieldDefinition.disabled) {
      fieldPropsObj = { value: fieldValue, disabled: true };
    } else {
      fieldPropsObj = fieldValue;
    }
    return [fieldPropsObj, me.getValidators(formFieldDefinition)];
  }

}
