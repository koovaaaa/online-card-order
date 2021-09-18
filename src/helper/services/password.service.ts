import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPasswordAndGenerateSalt(user: User): Promise<User> {
    user.salt = await bcrypt.genSalt();
    user.passwordHash = await bcrypt.hash(user['password'], user.salt);
    delete user['password'];
    return user;
  }
}
