const detectPackageManager = () => {
   if (process.env.npm_execpath?.includes('pnpm')) return 'pnpm';
   if (process.env.npm_execpath?.includes('yarn')) return 'yarn';
   return 'npm';
};

const pm = detectPackageManager();

module.exports = {
   // Lệnh cho tất cả các file
   '*': () => `${pm} run format:fix`,

   // Lệnh cho các file SVG
   '*.svg': () => `${pm} run format:svg`,

   // Lệnh cho các file JS, JSX, TS, TSX
   '*.{js,jsx,ts,tsx}': () => `${pm} run validate`,

   // Loại bỏ dist khỏi các file sẽ được lint
   '**/*': [`git diff --name-only --diff-filter=AM | grep -v '^dist/'`],
};
