export class EmailValueObject {
  private email: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}