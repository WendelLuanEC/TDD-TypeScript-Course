import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from "./db-add-account-protocols";


export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter
    private readonly addAccountRepository: AddAccountRepository

    constructor(encripter: Encrypter, addAccountRepository: AddAccountRepository) {
        this.encrypter = encripter
        this.addAccountRepository = addAccountRepository
    }
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashed_password = await this.encrypter.encrypt(accountData.password)
        const account = await this.addAccountRepository.add(Object.assign(Object.assign({}, accountData, { password: hashed_password })))
        console.log(account)
        return account
    }

}