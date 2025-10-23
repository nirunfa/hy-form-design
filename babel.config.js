module.exports = {
  presets: [
    "@vue/app",
    [
     // 兼容配置
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3
      }
    ]
  ],
  // 按需加载
  plugins: ["@babel/plugin-proposal-class-properties"]
};
