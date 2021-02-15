export default interface IUpdateUserDTO {
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
}
