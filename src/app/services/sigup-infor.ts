export class SignUpInfo {
  userName: string;
  email: string;
  role: string[];
  password: string;
  avatar: String;

  constructor(userName: string, email: string, password: string, avatar: string) {
      this.userName = userName;
      this.email = email;
      this.password = password;
      this.role = ['users'];
      this.avatar = avatar;
  }
}
