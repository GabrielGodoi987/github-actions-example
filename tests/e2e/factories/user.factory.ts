import { eq } from "drizzle-orm";
import { db } from "../../../src/db";
import { userSchema } from "../../../src/db/schema";
import { UserEntity } from "../../../src/domain/entities/user.entity";

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
    db.transaction(async (trx) => {
      trx.insert(userSchema).values(
        listOfUsers.map((user) => ({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
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
    await db.delete(userSchema).execute();
  } catch (error) {
    console.error("Error deleting users in factory:", error);
    throw error;
  }
}

export async function getUserByEmailFactory(email: string) {
  try {
    const [row] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));

    return row;
  } catch (error) {
    console.error("Error fetching user by email in factory:", error);
    throw error;
  }
}
