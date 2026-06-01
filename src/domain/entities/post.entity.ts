import { v4 } from 'uuid';

export class PostEntity{
  private id: string;
  private title: string;
  private content: string;
  private userId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    title: string,
    content: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.validateTitle(title);
    this.validateContent(content);
    
    this.id = v4();
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  private validateTitle(title: string) {
    if (title.length < 5) {
      throw new Error('Title must be at least 5 characters long');
    }
  }

  private validateContent(content: string) {
    if (content.length < 20) {
   
      throw new Error('Content must be at least 20 characters long');
    }
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.validateTitle(title);
    this.title = title;
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.validateContent(content);
    this.content = content;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
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
}