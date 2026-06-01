import { app } from "../../app";
import { db } from "../../db";

export async function bootStrapApplication() {
  console.log('Bootstrapping the application...');
  await db.$client.connect();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
} 