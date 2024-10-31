import { httpRequest, httpResponse, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { InvalidParamError, MissimParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { promises } from 'dns'


export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle(httpRequest: httpRequest): Promise<httpResponse> {
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
            const account = await this.addAccount.add({
                name,
                email,
                password
            })

            return ok(account)

        } catch (error) {
            console.error(error)
            return serverError()
        }

    }

}