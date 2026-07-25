```
npm init -y
npm install --save-dev typescript
npx tsc --init

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "sourceMap": true
  }
}

npx tsc
```
that generates the dist js file to use.

Alternatively for dev, we use vite:
```
npm install --save-dev vite
update package.json:

{
  "name": "breakout-game",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "^...",
    "vite": "^..."
  }
}

npm run dev
```