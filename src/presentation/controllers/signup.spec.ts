import { SignUpController } from './signup'
import { MissimParamError } from '../errors/missing-param-error'

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissimParamError('name'))
    })
})

describe('SignUp Controller', () => {
    test('Should return 400 if no email is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissimParamError('email'))
    })
})

describe('SignUp Controller', () => {
    test('Should return 400 if no password is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@email.com',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissimParamError('password'))
    })
})

describe('SignUp Controller', () => {
    test('Should return 400 if no password confirmation is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                email: 'any_email@email.com',
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissimParamError('passwordConfirmation'))
    })
})