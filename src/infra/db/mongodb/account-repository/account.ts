import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'

export class AccountMongoRepository implements AccountMongoRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        return new Promise(resolve => resolve(null))
    }
}