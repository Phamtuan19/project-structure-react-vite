export interface RequestDataSignin {
   identifier: string;
   password: string;
}

export interface LoginResponse {
   accessToken: string;
   refreshToken: string;
   name: string;
}

export interface RequestDataRegister {
   email: string;
   name: string;
   password: string;
}

export interface RegisterResponse {
   _id: string;
   email: string;
   name: string;
   createdAt: string;
}
