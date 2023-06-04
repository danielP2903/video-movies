import { FormGroup } from "@angular/forms";
interface ErrorMessages {
  required:string,
  minlength:string
}
const errorMessages:any = {
  required: 'El campo es obligatorio.',
  minlength: 'El campo requiere al menos {{ requiredLength }} caracteres.',
  pattern: 'Ingrese solo valores numéricos.'

}

export const   getErrorMessage = (controlName: string, form:FormGroup): string => {
  const control = form.get(controlName);

  if (control && control.errors) {
    const errors = control.errors;
    const errorKey = Object.keys(errors)[0];
    const errorMessage = errorMessages[errorKey];
    if (errorKey === 'minlength') {
      const requiredLength = errors["minlength"].requiredLength;
      return errorMessages[errorKey].replace('{{ requiredLength }}', requiredLength);
    } else {
      return errorMessages[errorKey];
    }
    return errorMessage;
  }

  return '';
}
