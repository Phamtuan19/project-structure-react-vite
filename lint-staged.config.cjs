const detectPackageManager = () => {
   if (process.env.npm_execpath?.includes('pnpm')) return 'pnpm';
   if (process.env.npm_execpath?.includes('yarn')) return 'yarn';
   return 'npm';
};

const pm = detectPackageManager();

module.exports = {
   // Format + Sort JSON cho các file thay đổi
   '*.{json,md}': [`${pm} run format:fix`],

   // Format SVG
   '*.svg': [`${pm} run format:svg`],

   // Lint + Typecheck cho JS/TS
   '*.{js,jsx,ts,tsx}': [`${pm} run lint:fix`, `${pm} run type:check`],
};
