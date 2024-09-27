import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("Should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "eduysanchez@gmail.com",
      MAILER_SECRET_KEY: "tvaogwflwjvxpjkv",
      PROD: false,
      MONGO_URL: "mongodb://eduysanchez-test:123456789@localhost:27017/",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "eduysanchez-test",
      MONGO_PASSWORD: "123456789",
    });
  });

  test("Should return error if env options are not defined", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
