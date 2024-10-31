import { httpRequest, httpResponse, Controller, EmailValidator } from '../protocols'
import { InvalidParamError, MissimParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { DefaultDeserializer } from 'v8'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    handle(httpRequest: httpRequest): httpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissimParamError(field))
                }
            }
            const { name, email, password, passwordConfirmation } = httpRequest.body
            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            this.addAccount.add({
                name,
                email,
                password
            })
        } catch (error) {
            return serverError()
        }

    }
}