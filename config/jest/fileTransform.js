"use strict";

module.exports = {
  process(src, filename) {
    const assetFilename = import("path").then(path => JSON.stringify(path.basename(filename)));

    if (filename.match(/\.svg$/)) {
      const pascalCaseFilename = import("camelcase").then(camelcase => {
        import("path").then(path => {
          camelcase(path.parse(filename).name, {
            pascalCase: true
          });
        });
      });
      const componentName = `Svg${pascalCaseFilename}`;
      return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`;
    }

    return `module.exports = ${assetFilename};`;
  }
};
