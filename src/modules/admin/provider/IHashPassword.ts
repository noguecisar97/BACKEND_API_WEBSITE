import { hash } from 'bcryptjs';

export default class IHashProvider {
  public async generate(password: string): Promise<string> {
    const passwordHash = await hash(password, 8);

    return passwordHash;
  }
}
