export default interface ICreateUserDTO {
  id: string;
  nome: string;
  login: string;
  password: string;
  telefone: string;
  email: string;
  boleto: string;
  painel: string;
  renda: number;
  dataRenovacao: Date;
  dataInicio: Date;
  updatedAt: Date;
}
