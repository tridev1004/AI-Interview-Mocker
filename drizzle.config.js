/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-interview-mocker_owner:qVaR6N2BHMsg@ep-misty-bread-a5icze2w.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  }
};