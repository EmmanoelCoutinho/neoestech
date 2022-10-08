export default interface IUser {
  id: number;
  uuid: string;
  login: string;
  nome: string;
  foto_perfil?: string;
  grupos: string[];
  token: string;
}
