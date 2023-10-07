interface IListUserResponse {
  id?: number;
  name?: string;
  gender?: string;
  email?: string;
  phone?: string;
  adress?: string;
  saldo?: number;
  transations?:{
    id?: number;
    userId?: number;
    date?: Date;
    transationType?: string;
    description?: string;
    value?: number;
    status?: string
  }[]
};

export default IListUserResponse;