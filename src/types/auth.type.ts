import type { Role } from '@app/constants';

export interface UserAuthInfo {
   _id: string;
   email: string;
   name: string;
   avatar: string;
   phone: string;
   address: string;
   roles: Role;
   isLock: false;
   lastLogin: string;
   isVerified: true;
   isEmailVerified: true;
   loginAttempts: 0;
   createdAt: string;
   updatedAt: string;
}
