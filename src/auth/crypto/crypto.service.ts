import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CryptoService {
  constructor(private jwt: JwtService) {}
  async hashPassword(password: string) {
    console.log(`STARTED HASH PASSWORD team method, ${new Date()}`);

    const salt = await bcrypt.genSalt(10);
    console.log(`ENDED HASH team method, ${new Date()}`);

    return await bcrypt.hash(password, salt);
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async encryptJwt(payload) {
    return this.jwt.sign(payload);
  }
}
