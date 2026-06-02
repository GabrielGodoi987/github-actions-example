import { usersSchema } from "../../../db/schema";
import { UserEntity } from "../../../domain/entities/user.entity";

export class UserMapper {
  static toEntity(userSchema: typeof usersSchema.$inferSelect): UserEntity { 
    const userEntity = new UserEntity(
      userSchema.name,
      userSchema.email,
      userSchema.password,
      userSchema.createdAt,
      userSchema.updatedAt
    );

    userEntity.setId(userSchema.id);

    return userEntity;
  }

  static async toPersistence(userEntity: UserEntity): Promise<typeof usersSchema.$inferInsert> {
    return {
      id: userEntity.getId(),
      name: userEntity.getName(),
      email: userEntity.getEmail(),
      password: userEntity.getPassword(),
      createdAt: userEntity.getCreatedAt(),
      updatedAt: userEntity.getUpdatedAt(),
    };
  }
}