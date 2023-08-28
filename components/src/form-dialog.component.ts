import {
  UntypedFormGroup,
  AbstractControl,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OnInit, Directive, Injector, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from './services/dialog.service';
import { NotificationsService } from './services/notifications.service';
import { EMAIL_PATTERN, FormBuilderHelper, FormField, FormFieldOptions, URL_PATTERN } from './form-builder-helper';

/**
 * Form Component
 * EDITAR Y GUARDAR
 * Clase base para todos los formularios
 */
@Directive()
export class FormDialogComponent<T> implements OnInit {
  @HostBinding('class')
  hostCls: string = 'form-dialog';
  mode!: 'add' | 'edit';
  //
  data: any = {};
  parent: any = {};
  model: T;
  modelIdProperty = 'id';

  apiUrl: string = '';
  dataPath: string = '';
  // Texts
  fieldRequiredErrorMessageText = 'Requerido';
  msgSuccessfulCreateText = 'Creado correctamente';
  msgSuccessfulUpdateText = 'Actualizado correctamente';
  invalidValuesMessage =
    'Complete los campos requeridos y corrija los errores identificados';
  /**
   * FormGrup asignado al formulario
   */
  formModel!: UntypedFormGroup;
  protected formFields: { [key: string]: FormFieldOptions } = {};
  /**
   * Si es true se usará el metodo getRawValue() obtener los valores del formulari
   * caso contrario solo se usará la propiedad value.
   */
  useFormRawValue!: boolean;
  /**
   * Llamar al metodo buildFormModel al inicio.
   */
  buildFormModelOnInit: boolean = true;

  /**
   * @cfg
   * Definir los campos que tendrá el formulario
   */
  protected fields: FormField[] = [];

  /**
   * Valores iniciales del fomulario
   */
  protected values: any;
  // Services
  protected api;
  protected notifications: NotificationsService;
  protected formBuilder: UntypedFormBuilder;
  protected dialogService: DialogService;
  protected fbHelper: FormBuilderHelper;
  protected dialogRef: MatDialogRef<any>;
  _isReady!: boolean;
  _isSaving!: boolean;
  constructor(
    protected injector: Injector,
    api: any,
    dialogRef: any,
    inputData: any
  ) {
    this.notifications = injector.get(NotificationsService);
    this.formBuilder = injector.get(UntypedFormBuilder);
    this.dialogService = injector.get(DialogService);
    this.fbHelper = injector.get(FormBuilderHelper);
    this.api = api;
    this.dialogRef = dialogRef;
    this.model = inputData?.model ? inputData.model : this.createModel();
    this.parent = inputData ? inputData.parent : {};
    this.data = inputData ? inputData.data : {};
  }

  createModel() {
    return {};
  }

  /**
   * Enviar datos
   */
  onSubmit() {
    const me = this;
    // Si esta guardando.
    if (me._isSaving) {
      return;
    }
    // Si los datos son incorrectos
    if (!me.isValid()) {
      me.showInvalidValuesMessage();
      return;
    }
    me.setStatusSaving();
    let postModel = me.getPostData();
    me.getSaveService(postModel).subscribe(
      (rec) => {
        me.notifications.snackSuccess(
          me.isCreationMode()
            ? me.msgSuccessfulCreateText
            : me.msgSuccessfulUpdateText
        );
        me.dialogRef.close(rec);
      },
      (xhr) => {
        if (xhr.status == 401) {
          me.dialogRef.close();
          return;
        }
        me.handleServerError(xhr);
        me.setStatusReady();
      }
    );
  }

  isNew() {
    return this.mode == 'add';
  }

  getSaveService(model: any): Observable<any> {
    return this.api.save(model, model[this.modelIdProperty]);
  }

  showInvalidValuesMessage() {
    const me = this;
    me.notifications.snackWarning(me.invalidValuesMessage);
  }

  /**
   * Este metodo puede ser sobre escrito para manejar internamente las excepciones del servidor
   */
  handleServerError(xhr: any) {
    this.notifications.handleXhrError(xhr, this);
  }

  isCreationMode() {
    return this.mode == 'add';
  }

  isEditionMode() {
    return this.mode == 'edit';
  }

  ngOnInit(): void {
    const me = this;
    me.mode = me.model && (me.model as any)[me.modelIdProperty] ? 'edit' : 'add';
    if (me.buildFormModelOnInit) {
      me.defineFormModel();
    }
  }

  isValid() {
    return this.formModel.valid;
  }

  /**
   * Este metodo retorna los campos que son enviados al servidor
   */
  getPostData() {
    const me = this;
    if (this.useFormRawValue) {
      return { ...me.model, ...me.formModel.getRawValue() };
    }
    return { ...me.model, ...me.formModel.value };
  }
  /**
   * Permite determinar si el campo debe incluirse en el formulario
   * @param field
   * @returns
   */
  hasField(field: string): boolean {
    return this.formFields && this.formFields.hasOwnProperty(field);
  }
  /**
   * Retorna el campo del formulario solicitado
   * @param name
   */
  getFormControl(name: string): AbstractControl | null {
    return this.formModel.get(name);
  }

  getFieldProperty(fieldName: string, prop: keyof FormFieldOptions) {
    return this.formFields[fieldName] ? this.formFields[fieldName][prop] : null;
  }

  hasError(fieldName: string, errorType: string) {
    return this.getFormControl(fieldName)?.hasError(errorType);
  }

  isFieldRequired(fieldName: string) {
    return this.hasError(fieldName, 'required');
  }

  hasMinLengthError(fieldName: string) {
    return this.hasError(fieldName, 'minlength');
  }

  hasMaxLengthError(fieldName: string) {
    return this.hasError(fieldName, 'maxlength');
  }

  hasPatternError(fieldName: string) {
    return this.hasError(fieldName, 'pattern');
  }

  getRequiredErrorMessage(_fieldName: string = '') {
    return this.fieldRequiredErrorMessageText;
  }

  getMinLengthErrorMessage(fieldName: string) {
    return `Mín ${this.getFieldProperty(fieldName, 'minLength')} caracteres.`;
  }

  getMaxLengthErrorMessage(fieldName: string) {
    return `Máx ${this.getFieldProperty(fieldName, 'maxLength')} caracteres.`;
  }

  shouldShowErrorMessage(fieldName: string) {
    const me = this;
    let control = me.getFormControl(fieldName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getFieldValue(field: string) {
    return this.getFormControl(field)?.value;
  }

  setFieldValue(field: string, value: any) {
    this.getFormControl(field)?.setValue(value);
  }

  isFieldValid(field: string) {
    return this.getFormControl(field)?.valid;
  }

  private buildFormModel() {
    const me = this;
    let formGroupObjet: any = {},
      fieldValue,
      fieldPropsObj;
    me.fields.forEach((field) => {
      field = me.preProcessDefinedField(field);
      fieldValue = (me.model as any)[field.name];
      fieldValue = fieldValue !== undefined ? fieldValue : field.defaultValue;
      // disabled Field
      if (field.disabled) {
        fieldPropsObj = { value: fieldValue, disabled: true };
      } else {
        fieldPropsObj = fieldValue;
      }
      formGroupObjet[field.name] = [fieldPropsObj, me.getValidators(field)];
    });
    if (me.formBuilder) me.formModel = me.formBuilder.group(formGroupObjet);
  }

  defineFormModel() {
    const me = this;
    const fields: any = {};
    for (const fieldName of Object.keys(me.formFields)) {
      fields[fieldName] = me.transformDefinedField(fieldName, me.formFields[fieldName]);
    }
    me.formModel = me.fbHelper.buildFormModel(
      fields,
      me.getValuesForFormModel(me.model),
    );
  }

  /**
 * Permite modificar la definición original del campo antes de construir el formControl
 * @param field
 * @returns
 */
  protected transformDefinedField(_fieldName: string, field: FormFieldOptions) {
    return field;
  }

  /**
   * Permite modificar los valores que se usarán para construir el formControl
   * @param field
   * @returns
   */
  protected getValuesForFormModel(values: T): any {
    return values;
  }

  protected updateForm() {
    this.buildFormModel();
  }

  /**
   * Permite modificar la definición original del campo antes de construir un formControl
   * @param field
   * @returns
   */
  protected preProcessDefinedField(field: FormField) {
    return field;
  }

  /**
   * Retronar un arreglo de validadores
   * @param field
   */
  private getValidators(field: FormField) {
    let out = [];
    if (field.required) {
      out.push(Validators.required);
    }
    if (field.min) {
      out.push(Validators.min(field.min));
    }
    if (field.max) {
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

  setFieldDisabled(fieldName: string, disabled: boolean) {
    const me = this;
    me.fields = me.fields.map((field) => {
      if (field.name == fieldName) {
        field.disabled = disabled;
      }
      return field;
    });
    me.updateForm();
  }

  // Estado por defecto
  setStatusReady() {
    this._isReady = true;
    this._isSaving = false;
  }

  // Guardando...
  setStatusSaving() {
    this._isSaving = true;
    this._isReady = false;
  }

  // Cierra inmediatamente la interfaz
  protected __forceClose() {
    this.dialogRef.close();
  }

  getApiUrl() {
    return this.apiUrl;
  }

  getDataPath() {
    return this.dataPath;
  }

  getCollectionUrl() {
    return this.getApiUrl() + '/' + this.getDataPath();
  }

}
