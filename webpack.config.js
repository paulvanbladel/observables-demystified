module.exports = {
    entry: "./main.ts",
    output: { filename: "app.js" },
    module: {
    rules: [
      {test: /\.(js|ts)$/,
         exclude: /node_modules/,
         use: 'ts-loader'}
    ]
  }
}