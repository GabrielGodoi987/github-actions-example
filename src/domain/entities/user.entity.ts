import { v4 } from "uuid";
import { EmailValueObject } from "../value-objects/email.value-object";
import { PasswordValueObject } from "../value-objects/password.value-object";
import { PostEntity } from "./post.entity";

export class UserEntity {
  private id: string;
  private name: string;
  private email: EmailValueObject;
  private password: PasswordValueObject;
  private createdAt: Date;
  private updatedAt: Date;
  private posts: PostEntity[];

  constructor(
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = v4();
    this.name = name;
    this.email = new EmailValueObject(email);
    this.password = new PasswordValueObject(password);
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.posts = [];
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getEmail(): string {
    return this.email.getEmail();
  }

  setEmail(email: string): void {
    this.email = new EmailValueObject(email);
  }

  getPassword(): string {
    return this.password.getPassword();
  }

  setPassword(password: string): void {
    this.password = new PasswordValueObject(password);
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  getPosts(): PostEntity[] {
    return this.posts;
  }
}
