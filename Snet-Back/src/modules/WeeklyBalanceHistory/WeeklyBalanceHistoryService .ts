import Types from "@common/container/types";
import { inject, injectable } from "inversify";
import IUserRepository from "../user/repositories/IUserRepository";

interface IRequest {}

@injectable()
class WeeklyBalanceHistoryService {
  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  public async execute({}: IRequest) {
    console.log('Executing WeeklyBalanceHistoryService...');

    const GetSaldoForWeek = async () => {
      try {
 

        // Obtenha todos os usuários
        const allUsers = await this.userRepository.list({});

        // Itere sobre os usuários e atualize o saldo
        for (const user of allUsers) {
          const currentDate = new Date();
          const currentBalance = user.saldo?.toFixed(2) || 0;

          // Adicione a data atual e o saldo atual ao histórico
          
          user.saldoHistory = user.saldoHistory || { datas: [], values: [] };
          user.saldoHistory.datas.push(currentDate);
          user.saldoHistory.values.push(currentBalance);
          const saldoHistory = user.saldoHistory;
          // Salve as alterações no banco de dados
          console.log(user.saldoHistory)
          await this.userRepository.update(user, saldoHistory);

          console.log(`Histórico atualizado para o usuário ${user.id}:`, user.saldoHistory);
        }

        console.log('Operação concluída após 4 segundos');
      } catch (error) {
        console.error('Erro ao executar a operação:', error);
      }
    };
    await GetSaldoForWeek();
    };

    // Chame a função assíncrona
}

export default WeeklyBalanceHistoryService;
