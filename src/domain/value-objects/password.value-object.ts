export class PasswordValueObject{
  private password: string;

  constructor(password: string) {
    if (!this.validatePassword(password)) {
      throw new Error('Invalid password format');
    }
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}