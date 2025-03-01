import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// config({
//   path: ".env" // 本地没有.env.production文件，所以在下面url给个默认值应用到本地
// }); 

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./lib/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
