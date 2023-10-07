import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import * as Z from 'zod';

import ITransationRepository from "../repositories/ITransationRepository";
import IResponse from '@modules/transations/responses/IListTransationResponse'
import Schema from "../infra/http/validators/FilterTransactionValidator";

interface IRequest {
    data: Z.infer<typeof Schema>,
  }

@injectable()
class FilterTransationService{
    @inject(Types.TransationRepository) private transationRepository!: ITransationRepository;
  
    public async execute({data}: IRequest): Promise<IResponse[] | undefined> {
        console.log(data);
        try{
            const transationsFound = await this.transationRepository.filterByname(data.name? data.name: '');
        
            return transationsFound.map(transations => {
                return {
                    id: transations.id,
                    date: transations.date,
                    transationType: transations.transationType,
                    description: transations.description,
                    value: transations.value,
                    status: transations.status,
                }
            }) || [];
        }catch(error){
            throw new Error("error ao filtrar transações");
        }
    }
}
export default FilterTransationService;


