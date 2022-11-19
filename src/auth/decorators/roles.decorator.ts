import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/role/enums/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);
