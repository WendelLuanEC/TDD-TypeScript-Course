import { MongoHelper } from "../helpers/mongo-helper"

describe('Account Mongo Repository', () => {

    let client: MongoClient

    beforeAll(async () => {
        client = await MongoClient.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await client.close()
    })

    test('Should return an account on success', async () => {
        const sut = new AccountMongoRepository()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })
})
