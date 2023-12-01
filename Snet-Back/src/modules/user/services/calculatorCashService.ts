import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import { subDays, isAfter } from 'date-fns';
import ITransationRepository from '@modules/transations/repositories/ITransationRepository';
import IUserRepository from "../repositories/IUserRepository";
import AppError from "@common/errors/AppError";

interface ITransaction {
  id: number;
  userId: number;
  recepterId: number | null;
  date: Date | undefined;
  transationType: string;
  description: string;
  value: number;
  status: string;
  recepter: any;
}

interface IRequest {
  id: number;
  quantidadeDias: number;
}

@injectable()
class CalculatorCashService {

  @inject(Types.TransationRepository) private transationRepository!: ITransationRepository;
  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({ id, quantidadeDias }: IRequest) {

    const user = await this.userRepository.find({ id });
    if (!user) {
      throw new AppError("Could not find user", 404);
    }

    const transations = await this.userRepository.find({ id }, ['transations', 'receivedTransfers', 'transations.recepter', 'receivedTransfers.user']);

    if (!transations) {
      throw new AppError("Could not find transations", 404);
    }

    // Verifica se transations é um array antes de filtrar
    if (!Array.isArray(transations.transations)) {
      throw new AppError("Invalid transations format", 500);
    }

    const today = new Date();
    const cutoffDate = subDays(today, quantidadeDias);

    const filterTransationsByDate = transations.transations
      .filter((transation) => transation.date !== undefined)
      .filter((transation) => isAfter(transation.date!, cutoffDate));


    // Obtém o saldo inicial
    let saldoAtual = user?.saldo || 0;
    let saques = filterTransationsByDate.filter((transation)=>{
      return transation.transationType == 'Saque' || transation.transationType == 'saque';
    })
    let depositos = filterTransationsByDate.filter((transation)=>{
      return transation.transationType == 'Deposito' || transation.transationType == 'deposito';
    })
    let Recompensas = filterTransationsByDate.filter((transation)=>{
      return transation.transationType == 'Fidelidade' || transation.transationType == 'fidelidade';
    })

    var transacoesRecebidas: ITransaction[] = [];
    var transacoesEnviadas: ITransaction[] = [];
    
    // Separar transações com e sem usuário associado
    filterTransationsByDate.forEach((transacao: any) => {
      if (transacao.recepter || transacao.user) {
        // Transação com usuário associado
        transacoesRecebidas.push(transacao);
      } else {
        // Transação sem usuário associado
        transacoesEnviadas.push(transacao);
      }
    });

    // Calcular saldo
    saques.forEach((saque)=>{
      saldoAtual += saque.value || 0;
    })

    depositos.forEach(deposito => {
      saldoAtual -= deposito.value || 0;
    });

    Recompensas.forEach(recompensa => {
      saldoAtual -= recompensa.value || 0;
    });

    transacoesRecebidas.forEach(transacao => {
      saldoAtual -= transacao.value || 0;
    });

    transacoesEnviadas.forEach((transacao)=>{
      saldoAtual += transacao.value? transacao.value : 0;
    });
    console.log(saques)
    console.log(depositos)
    console.log(Recompensas)
    console.log(transacoesRecebidas)
    console.log(transacoesEnviadas) 
    console.log(user.saldo)
    return saldoAtual;
  }
}

export default CalculatorCashService;
