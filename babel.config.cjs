/* eslint-disable */

module.exports = api => {
  return {
    presets: [
      [
        '@quasar/babel-preset-app',
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {}
      ]
    ],
    plugins: [
      ["prismjs", {
          languages: ["javascript"],
          plugins: ["normalize-whitespace", "toolbar"],
          theme: "tommorrow",
          css: true
      }]
    ]
  }
}
