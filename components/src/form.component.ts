import { Directive, Injector, Input } from '@angular/core';
import { ModelViewComponent } from './model-view.component';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { FormBuilderHelper, FormFieldOptions } from './form-builder-helper';
import { Observable } from 'rxjs';

@Directive()
export abstract class FormComponent<T> extends ModelViewComponent<T> {

  // Propiedades de formulario
  formModel!: UntypedFormGroup;
  formFields: { [key: string]: FormFieldOptions } = {};
  override model: T | any;
  modelIdProperty = 'id';
  override autoload = false;
  @Input()
  dataPath: string = '';
  // Texts
  fieldRequiredErrorMessageText = 'Requerido';
  invalidValuesMessageText = `<strong>El formulario contiene errores</strong>
                              <div>
                                Para continuar, corrija los errores indicados.
                              </div>`;
  msgSuccessfulCreateText = 'Creado correctamente';
  msgSuccessfulUpdateText = 'Actualizado correctamente';
  _isSaving = false;
  /**
   * This property is used to idenfify whe the form model don't exist yet
   */
  routeCreateKeyword = 'registrar';
  protected fbHelper: FormBuilderHelper;

  constructor(
    injector: Injector,
    protected api: any,
  ) {
    super(injector);
    this.api = api;
    this.fbHelper = injector.get(FormBuilderHelper);
  }

  override subscribeRouteParams() {
    const me = this;
    me.route.paramMap.subscribe(function (paramMap: any) {
      let id = paramMap.get('id') || '';
      // Creation
      if (id === me.routeCreateKeyword) {
        return;
      }
      // Edition
      // RegEx id válido
      const re = /^[1-9]{1}\d*/;

      // Id inválido.
      if (!re.test(id)) {
        alert('invalid route');
        return;
      }
      me.modelId = +id;
    });
  }

  override ngOnInit(): void {
    const me = this;
    super.ngOnInit();
    // Cargar datos
    me.loadDatasets();
    // Creation
    if (!me.isRecordStored()) {
      me.setModel(me.getNewModel());
      me.defineFormModel();
      return;
    }
    // Edition
    me.loadData();
  }

  override onData(model: any) {
    this.defineFormModel();
  }

  /**
   * Hook para cargar datasets relacionados como por ejemplo: listas de selección
   */
  loadDatasets() { };

  getPostData() {
    const me = this;
    return { ...me.model, ...me.formModel.value };
  }

  getNewModel(): T {
    const me = this;
    return {} as T;
  }

  getModelId() {
    return this.modelId || (this.model ? this.model[this.modelIdProperty] : null);
  }

  isFormValid() {
    return this.formModel.valid;
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

  hasError(fieldName: string, errorType: string) {
    return this.getFormControl(fieldName)?.hasError(errorType);
  }

  getFieldProperty(fieldName: string, prop: keyof FormFieldOptions) {
    return this.formFields[fieldName] ? this.formFields[fieldName][prop] : null;
  }

  getFieldValue(field: string) {
    return this.getFormControl(field)?.value;
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
  protected transformDefinedField(fieldName: string, field: FormFieldOptions) {
    return field;
  }

  /**
   * Permite modificar los valores que se usarán para construir el formControl
   * @param field
   * @returns
   */
  protected getValuesForFormModel(values: T | any) {
    return values;
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

  getRequiredErrorMessage(_fieldName: string = '') {
    return this.fieldRequiredErrorMessageText;
  }

  getMinLengthErrorMessage(fieldName: string) {
    return `Mín ${this.getFieldProperty(fieldName, 'minLength')} caracteres.`;
  }

  getMaxLengthErrorMessage(fieldName: string) {
    return `Máx ${this.getFieldProperty(fieldName, 'maxLength')} caracteres.`;
  }

  onSubmit() {
    const me = this;
    if (!me.isFormValid()) {
      me.notifications.snackWarning(me.invalidValuesMessageText);
      return;
    }
    me._isSaving = true;
    // Mostrar animación
    setTimeout(() => {
      me.getSaveService(me.getPostData()).subscribe(
        (model) => {
          me.notifications.snackSuccess(
            me.isRecordStored()
              ? me.msgSuccessfulUpdateText
              : me.msgSuccessfulCreateText
          );
          me.setModel(model);
          me._isSaving = false;
        },
        (xhr) => {
          me._isSaving = false;
          me.notifications.handleXhrError(xhr);
        }
      );
    }, 250);
  }

  resetValues() {
    this.setModel(this.model);
  }

  /**
   *
   * @returns true si el modelo posee un id.
   */
  isRecordStored(): boolean {
    return !!this.getModelId();
  }

  getDataService() {
    return this.api.get(this.modelId);
  }

  getSaveService(model: any): Observable<any> {
    return this.api.save(model, this.getModelId());
  }

}
