const { copyFileSync, existsSync, mkdirSync, writeFileSync } = require('fs');

// Ensure build directory exists
if (!existsSync('build')) {
  mkdirSync('build', { recursive: true });
}

try {
  // Read and parse package.json
  const pkg = require('./package.json');

  // Rewrite paths for publishing from build/
  const buildPkg = {
    ...pkg,
    main: './cjs/index.js',
    types: './src/index.d.ts',
    exports: {
      '.': {
        import: './esm/index.js',
        require: './cjs/index.js',
      },
      './icons': {
        import: './esm/icons/index.js',
        require: './cjs/icons/index.js',
      },
    },
    // Remove build scripts and devDependencies from published package
    scripts: undefined,
    devDependencies: undefined,
  };

  writeFileSync(
    'build/package.json',
    JSON.stringify(buildPkg, null, 2)
  );

  // Copy other required files
  copyFileSync('README.md', 'build/README.md');

  console.log('✅ build/package.json generated successfully');
} catch (err) {
  console.error('❌ Failed to generate build/package.json:', err);
  process.exit(1);
}