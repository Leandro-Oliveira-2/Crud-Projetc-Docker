import Types from "@common/container/types";
import { inject, injectable } from "inversify";

import ITransationRepository from '@modules/transations/repositories/ITransationRepository';
import IResponse from '@modules/user/responses/IListUserResponse'

@injectable()
class ListTransationService {

    @inject(Types.TransationRepository) private transationRepository!: ITransationRepository;
    
    public async execute(): Promise<IResponse[] | undefined> {
        const transations = await this.transationRepository.list({}, ['user', 'recepter']);
        
        return transations.map(transations => {
            return {
                id: transations.id,
                userId: transations.user?.name,
                recepterId: transations.recepter?.name,
                date: transations.date,
                transationType: transations.transationType,
                description: transations.description,
                value: transations.value,
                status: transations.status,
                user: transations.user,
                recepter: transations.recepter
            }
        }) || [];
    }catch(){
        throw new Error("error ao filtrar transações");
    }
}
export default ListTransationService