module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '11',
        },
      },
    ],
  ],
}
