import { Compiler } from 'webpack';
const { ModifySourcePlugin, ReplaceOperation } = require('modify-source-webpack-plugin');

export class OneCXWebpackPlugin {
  apply(compiler: Compiler) {
    const modifyPlugin = new ModifySourcePlugin({
      rules: [
        {
          test: (module: any) => module.resource?.includes('primeng'),
          operations: [
            new ReplaceOperation(
              'all',
              'document\\.createElement\\(',
              'document.createElementFromPrimeNg({"this": this, "arguments": Array.from(arguments)},'
            ),
            new ReplaceOperation(
              'all',
              'Theme.setLoadedStyleName',
              '(function(_){})'
            )
          ]
        }
      ]
    });
    modifyPlugin.apply(compiler);
  }
}
