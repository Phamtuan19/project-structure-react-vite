const detectPackageManager = () => {
   if (process.env.npm_execpath?.includes('pnpm')) return 'pnpm';
   if (process.env.npm_execpath?.includes('yarn')) return 'yarn';
   return 'npm';
};

const pm = detectPackageManager();

module.exports = {
   // Format JSON / MD
   '*.{json,md}': [`${pm} run format:fix`],

   // Optimize SVG
   '*.svg': [`${pm} run format:svg`],

   // Lint source code ONLY
   'src/**/*.{js,jsx,ts,tsx}': [`${pm} run lint:fix`],
};
