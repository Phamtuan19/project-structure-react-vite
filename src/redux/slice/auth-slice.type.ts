export interface InitialState {
   user: {
      _id: string;
      code: string;
      account_name: string;
      full_name: string;
      email: string;
      phone: string;
      avatar_url: string;
      role_id: string;
      isAdmin: boolean;
      gender: string;
      birth_day: string;
      address: string;
      cccd_number: string;
      hire_date: string;
   } | null;
   isAuthentication: boolean;
   isInitialized: boolean;
   //    userPermission: UserPermission | null | '*';
   isLoading: boolean;
}
