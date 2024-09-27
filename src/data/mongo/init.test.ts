import mongoose from "mongoose";
import { MongoDB } from "./init";

describe("mongo/init.ts", () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  test("Should connect to mongo database", async () => {
    const connected = await MongoDB.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBe(true);
  });

  test("Should throw error when connection fails", async () => {
    try {
      await MongoDB.connect({
        dbName: "invalid-db",
        mongoUrl: "invalid-url",
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
