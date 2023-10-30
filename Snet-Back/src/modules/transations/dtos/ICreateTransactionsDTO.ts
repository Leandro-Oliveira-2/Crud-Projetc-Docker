interface ICreateTransactionsDTO{
    userId: number;
    recepterId?: number;
    date?: Date;
    transationType?: string;
    description?: string;
    value?: number;
    status?: string;
}
export default ICreateTransactionsDTO
