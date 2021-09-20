import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPasswordAndGenerateSalt(user: User, password: string) {
    user.salt = await bcrypt.genSalt();
    user.passwordHash = await bcrypt.hash(password, user.salt);
    return user;
  }
}
