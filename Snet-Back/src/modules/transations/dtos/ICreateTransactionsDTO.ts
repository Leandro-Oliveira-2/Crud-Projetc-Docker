interface ICreateTransactionsDTO{
    userId: number;
    date?: Date;
    transationType?: string;
    description?: string;
    value?: number;
    status?: string;
}
export default ICreateTransactionsDTO
