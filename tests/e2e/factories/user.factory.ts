import { eq } from "drizzle-orm";
import { db } from "../../../src/db";
import { usersSchema } from "../../../src/db/schema";
import { UserEntity } from "../../../src/domain/entities/user.entity";
import { HashService } from "../../../src/infra/services/hash.service";

export async function createUserFactory(users?: UserEntity[]) {
  const listOfUsers: UserEntity[] = [...(users || [])];

  if (!users) {
    listOfUsers.push(
      ...Array.from(
        { length: 5 },
        (_, i) =>
          new UserEntity(
            `User ${i + 1}`,
            `user${i + 1}@example.com`,
            `password${i + 1}`,
          ),
      ),
    );
  }

  try {
    await db.transaction(async (trx) => {
      await trx.insert(usersSchema).values(
        listOfUsers.map((user) => ({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: HashService.hash(user.getPassword()),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt(),
        })),
      );
    });
  } catch (error) {
    console.error("Error creating users in factory:", error);
    throw error;
  }

  return listOfUsers;
}

export async function deleteUsersFactory() {
  try {
    await db.delete(usersSchema).execute();
  } catch (error) {
    console.error("Error deleting users in factory:", error);
    throw error;
  }
}

export async function getUserByEmailFactory(email: string) {
  try {
    const [row] = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email));

    return row;
  } catch (error) {
    console.error("Error fetching user by email in factory:", error);
    throw error;
  }
}
