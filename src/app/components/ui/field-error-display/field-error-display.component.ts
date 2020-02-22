import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent implements OnInit {

  @Input()
  control: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

  get hidden(): boolean {
    return this.control.touched && this.control.valid;
  }

  get message(): string {
    if (this.control) {
      var m = null;
      for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return FieldErrorDisplayComponent.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }

    return '';
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Este campo es requerido',
      'minlength': `Longitud minima ${validatorValue.requiredLength}`,
      'maxlength': `Longitud maxima ${validatorValue.requiredLength}`,
      'min': `Valor minimo permitido ${validatorValue.min}`,
      'max': `Valor maximo permitido ${validatorValue.max}`,
      'email': 'Correo invalido',
      'invalidPercentage': 'El porcentaje es incorrecto',
      'noMaterials': 'Por lo menos un material debe de ser seleccionado',
      'usernameExists': 'Nombre de usuario no disponible',
      'port': 'El puerto ya existe',
      'invalidQuantity': 'Las cantidades de dosificación escritas no concuerdan con el total de dosificación'
    };
    console.log(validatorName);
    return config[validatorName];
  }

}
