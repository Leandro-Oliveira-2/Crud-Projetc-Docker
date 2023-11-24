interface IUpdateUserDTO {
  name?: string;
  gender?: string;
  email?: string;
  phone?: string;
  adress?: string;
  saldo?: number;
  fidelidade?: {
    dia?: number;
    data?: string | Date;
    quantityRewards?: number;
    rewardDates?: string[] | Date[];
  };
  enabled?: boolean;
}

export default IUpdateUserDTO;


