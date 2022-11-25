import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoService } from './crypto/crypto.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: `hb5epw81xzs`,
        signOptions: {
          expiresIn: `15m`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService, CryptoService],
  providers: [AuthService, CryptoService, JwtStrategy],
})
export class AuthModule {}
