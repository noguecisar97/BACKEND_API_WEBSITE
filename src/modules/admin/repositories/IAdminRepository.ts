import Admin from '../infra/typeorm/entities/Admin';
import ICreateAdminDTO from '../dtos/ICreateAdminDTO';
import IUpdateAdminDTO from '../dtos/IUpdateAdminDTO';

export default interface IAdminRepository {
  create(data: ICreateAdminDTO): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | undefined>;
  findById(id: string): Promise<Admin | undefined>;
  findOne(id: string, email: string): Promise<Admin | undefined>;
  update(
    id: string,
    { nome, email, password }: IUpdateAdminDTO,
  ): Promise<Admin | undefined>;
  delete(id: string): Promise<void>;
  find(): Promise<Admin[] | undefined>;
  save(data: Admin): Promise<void>;
}
