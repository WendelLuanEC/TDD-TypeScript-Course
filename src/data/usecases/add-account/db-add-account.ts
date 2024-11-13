import { AccountModel } from "../../../domain/models/account";
import { AddAccount, AddAccountModel } from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encypter";

export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter

    constructor(encripter: Encrypter) {
        this.encrypter = encripter
    }
    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve(null))
    }

}