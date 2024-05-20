export interface IUser {
  userName: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
  userName?: string;
  displayName?: string;
}

export interface IAppUser {
  userName: string;
  displayName: string;
  email: string;
  isActive: boolean;
  bio?: string;
}

export class AppUser implements IAppUser {
  userName: string;
  displayName: string;
  email: string;
  isActive: boolean;
  bio: string;

  constructor(init: AppUserFormValues) {
    Object.assign(this, init);
  }
}

export class AppUserFormValues {
  userName: string = "";
  displayName: string = "";
  email: string = "";
  bio: string = "";

  constructor(user?: AppUserFormValues) {
    if (user) {
      this.userName = user.userName;
      this.displayName = user.displayName;
      this.email = user.email;
      this.bio = user.bio ?? "";
    }
  }
}
