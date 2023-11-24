interface IUserLoginResponse {
  accessToken: string;
  accessTokenExpireIn: string;
  refreshToken: string;
  refreshTokenExpireIn: string,
  user: {
    id?: number;
    fullname?: string;
    email?: string;
    saldo?: number;
    gender?: string;
    adress?: string;
    phone?: string;
    fidelidade?: {
      data?: Date;
      pontos?: number;
    },
    saldoHistory?:{
      datas?: Date[];
      values?: number[];
    }
  };
}

export default IUserLoginResponse;
