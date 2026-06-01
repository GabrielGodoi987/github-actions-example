import { v4 } from 'uuid';
import { EmailValueObject } from '../value-objects/email.value-object';
import { PostEntity } from './post.entity';

export class UserEntity{
  private id: string;
  private name: string
  private email: EmailValueObject;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;
  private posts: PostEntity[];

  constructor(
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = v4();
    this.name = name;
    this.email = new EmailValueObject(email);
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
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
