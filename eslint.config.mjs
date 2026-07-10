import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js 15 aur TypeScript ke default production configuration rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Agar build ke waqt warning ya types ki wajah se baar baar build fail ho rahi ho,
  // toh aap niche diye gaye rules se unhein turn-off ya warning par set kar sakte hain:
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // 'any' keyword use karne par error nahi dega
      "@typescript-eslint/no-unused-vars": "warn", // Unused variables par build fail nahi hogi, sirf warning dega
      "react/no-unescaped-entities": "off" // Text mein quotes (') use karne par crash nahi karega
    }
  }
];

export default eslintConfig;