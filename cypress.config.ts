import { defineConfig } from "cypress";
import preprocessor from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/{*.feature,**/*.feature}",
    scrollBehavior: "center",
    chromeWebSecurity: false,
    setupNodeEvents: async (on, config) => {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
  
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
  
      on("after:run", async () => {
        await preprocessor.afterRunHandler(config);
      })
  
      return config;
    }
  }
});
