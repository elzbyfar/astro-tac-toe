import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import Dotenv from "dotenv";

Dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
});
