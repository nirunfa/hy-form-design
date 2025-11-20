#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const packageMiniJsonPath = path.join(rootDir, 'package-mini.json');
const packageJsonBackupPath = path.join(rootDir, 'package.json.backup');

// 检查 package-mini.json 是否存在
if (!fs.existsSync(packageMiniJsonPath)) {
  console.error('❌ package-mini.json 文件不存在！');
  process.exit(1);
}

// 备份原始 package.json
if (fs.existsSync(packageJsonPath)) {
  fs.copyFileSync(packageJsonPath, packageJsonBackupPath);
  console.log('✅ 已备份 package.json');
}

try {
  // 复制 package-mini.json 为 package.json
  fs.copyFileSync(packageMiniJsonPath, packageJsonPath);
  console.log('✅ 已使用 package-mini.json 替换 package.json');

  // 执行 npm publish
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  
  if (isDryRun) {
    console.log('🔍 执行预览发布（dry-run）...');
    execSync('npm publish --dry-run', { stdio: 'inherit', cwd: rootDir });
  } else {
    console.log('📦 开始发布 hy-form-design-mini...');
    execSync('npm publish', { stdio: 'inherit', cwd: rootDir });
    console.log('✅ 发布成功！');
  }
} catch (error) {
  console.error('❌ 发布失败：', error.message);
  process.exit(1);
} finally {
  // 恢复原始 package.json
  if (fs.existsSync(packageJsonBackupPath)) {
    fs.copyFileSync(packageJsonBackupPath, packageJsonPath);
    fs.unlinkSync(packageJsonBackupPath);
    console.log('✅ 已恢复原始 package.json');
  }
}

