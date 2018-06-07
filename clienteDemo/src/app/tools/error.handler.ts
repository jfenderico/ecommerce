import { FormControl, FormGroup } from '@angular/forms';

export interface ValidationErrorItem {
    path: string;
    message: string;
}
export interface ValidationErrorMessage {
    error?: string;
    message?: ValidationErrorItem[];
}
export interface IErrorController {
    errorMessage: string;
    errors: Map<string, string>;
}
export interface IFormGroupErrorController extends IErrorController {
    form: FormGroup;
}

export function procesarValidacionesRest(controller: IErrorController, data: ValidationErrorMessage) {
    if (controller.errors.size > 0) {
        cleanRestValidations(controller);
    }
    if (data.message) {
        for (const error of data.message) {
            controller.errors.set(error.path, error.message);
        }
    } else {
        controller.errorMessage = data.error;
    }
}

export function procesarValidacionesRestFormGroup(controller: IFormGroupErrorController, data: ValidationErrorMessage) {
    procesarValidacionesRest(controller, data);

    controller.errors.forEach((value, key) => {
        if (controller.form.get(key)) {
            controller.form.get(key).setErrors({backend: {key: value}});
        }
    });
}

export function cleanRestValidations(controller: IErrorController) {
    controller.errorMessage = undefined;
    controller.errors.clear();
}