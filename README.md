# Лаба по оптимизиции приложения на React.js

## Собрать и посмотреть размер бандла
* Ужаснуться

## Поставить анализатор размера бандла
```
npm i -D source-map-explorer
```

```
"scripts": {
+    "analyze": "source-map-explorer 'build/static/js/*.js'",
```

```
npm run build
npm run analyze
```

## Включить режим production
```
webpack -p
webpack --mode development
```

## Поставить Terser
```
npm i -D terser-webpack-plugin
```

```
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```
