import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDB } from "../init";
import { LogModel } from "./log.model";

describe("mongo/models/log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDB.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test("Should return LogModel", async () => {
    const logData = {
      message: "Test message",
      origin: "log.model.test.ts",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        _id: expect.any(mongoose.Types.ObjectId),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.deleteOne({ _id: log._id });
  });

  test("Should return the Schema object", () => {
    const logSchema = LogModel.schema.obj;

    expect(logSchema).toEqual(
      expect.objectContaining({
        createdAt: expect.any(Object),
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
      })
    );
  });
});
