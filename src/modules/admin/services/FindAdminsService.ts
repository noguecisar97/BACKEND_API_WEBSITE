import { inject, injectable } from 'tsyringe';
import Admin from '@modules/admin/infra/typeorm/entities/Admin';
import IAdminRepository from '../repositories/IAdminRepository';

@injectable()
class FindAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {
    this.adminRepository = adminRepository;
  }

  public async execute(): Promise<Admin[] | undefined> {
    const admins = await this.adminRepository.find();

    return admins;
  }
}

export default FindAdminService;
