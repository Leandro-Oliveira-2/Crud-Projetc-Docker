interface ICreateUserDTO {
  name?: string;
  gender?: string;
  email?: string;
  phone?: string;
  adress?: string;
  passwordHash?: string;
  saldo?:number;
  fidelidade?: {
    dia?: number;
    data?: Date;
    quantityRewards?: number;
    rewardDates?: Date[];
  };
  enabled?: boolean;
}

export default ICreateUserDTO;




