interface IUpdateUserDTO {
  name?: string;
  gender?: string;
  email?: string;
  phone?: string;
  adress?: string;
  saldo?: number;
  fidelidade?: {
    dia?: number;
    data?: Date ;
  };
}

export default IUpdateUserDTO;


