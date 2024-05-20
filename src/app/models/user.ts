export interface IUser {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
  username?: string;
  displayName?: string;
}

export interface IAppUser {
  username: string;
  displayName: string;
  email: string;
  isActive: boolean;
  bio?: string;
}

export class AppUser implements IAppUser {
  username: string;
  displayName: string;
  email: string;
  isActive: boolean;
  bio?: string;

  constructor(init: AppUserFormValues) {
    Object.assign(this, init);
  }
}

export class AppUserFormValues {
  username: string = "";
  displayName: string = "";
  email: string = "";
  bio: string = "";

  constructor(user?: AppUserFormValues) {
    if (user) {
      this.username = user.username;
      this.displayName = user.displayName;
      this.email = user.email;
      this.bio = user.bio ?? "";
    }
  }
}
