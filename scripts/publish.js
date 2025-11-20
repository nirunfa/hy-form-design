#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const packageMiniJsonPath = path.join(rootDir, 'package.json');
const readmePath = path.join(rootDir, 'vite_readme.md');
const licensePath = path.join(rootDir, 'LICENSE');
const distDir = path.join(rootDir, 'lib');
const distPackageJsonPath = path.join(distDir, 'package.json');
const distReadmePath = path.join(distDir, 'README.md');
const distLicensePath = path.join(distDir, 'LICENSE');

// 检查 package-mini.json 是否存在
if (!fs.existsSync(packageMiniJsonPath)) {
  console.error('❌ package-mini.json 文件不存在！');
  process.exit(1);
}

try {
  // 检查 lib 是否存在
  if (!fs.existsSync(distDir)) {
    console.error('❌ 未找到 lib 目录，请先运行 npm run lib:mini');
    process.exit(1);
  }

  // 将 package-mini.json 拷贝到 lib 并重命名为 package.json
  fs.copyFileSync(packageMiniJsonPath, distPackageJsonPath);
  console.log('✅ 已将 package-mini.json 拷贝到 lib/ 中');

  // 将 README.md 拷贝到 lib 中
  fs.copyFileSync(readmePath, distReadmePath);
  console.log('✅ 已将 README.md 拷贝到 lib/ 中');

  // 将 LICENSE 拷贝到 lib 中
  fs.copyFileSync(licensePath, distLicensePath);
  console.log('✅ 已将 LICENSE 拷贝到 lib/ 中');

  // 执行 npm publish
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  
  if (isDryRun) {
    console.log('🔍 执行预览发布（dry-run）...');
    execSync('npm publish --dry-run', { stdio: 'inherit', cwd: distDir });
  } else {
    console.log('📦 开始发布 hy-form-design...');
    execSync('npm publish', { stdio: 'inherit', cwd: distDir });
    console.log('✅ 发布成功！');
  }
} catch (error) {
  console.error('❌ 发布失败：', error.message);
  process.exit(1);
}

