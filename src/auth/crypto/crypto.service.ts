import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CryptoService {
  constructor(private jwt: JwtService) {}
  async hashPassword(password: string) {
    const salt = await genSalt(10);

    return await hash(password, salt);
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    return await compare(plainPassword, hashedPassword);
  }

  async encryptJwt(payload) {
    return this.jwt.sign(payload);
  }
}
