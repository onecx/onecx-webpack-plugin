import { Compiler } from "webpack";
const {
  ModifySourcePlugin,
  ReplaceOperation,
} = require("modify-source-webpack-plugin");

export class OneCXWebpackPlugin {
  apply(compiler: Compiler) {
    const modifyPlugin = new ModifySourcePlugin({
      rules: [
        {
          test: (module: any) => module.resource?.includes("primeng"),
          operations: [
            new ReplaceOperation(
              "all",
              "document\\.createElement\\(",
              'document.createElementFromPrimeNg({"this": this, "arguments": Array.from(arguments)},'
            ),
            new ReplaceOperation(
              "all",
              "Theme.setLoadedStyleName",
              "(function(_){})"
            ),
          ],
        },
        {
          test: (module: any) => {
            return (
              module.resource &&
              (module.resource.includes("@angular/material") ||
                module.resource.includes("@angular/cdk"))
            );
          },
          operations: [
            new ReplaceOperation(
              "all",
              "document\\.createElement\\(",
              'document.createElementFromMaterial({"this": this, "arguments": Array.from(arguments)},'
            ),
          ],
        },
      ],
    });
    modifyPlugin.apply(compiler);
  }
}
