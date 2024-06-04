export interface IValidationError<T> {
    message: string,
    errors: T
}