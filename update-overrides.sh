
#!/bin/bash
# This script updates package.json with security overrides

# Make sure package.json exists
if [ ! -f package.json ]; then
  echo "Error: package.json not found"
  exit 1
fi

# Create a backup
cp package.json package.json.bak

# Add or update overrides for security
node -e '
const fs = require("fs");
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
if (!packageJson.overrides) {
  packageJson.overrides = {};
}
packageJson.overrides["vite"] = "^6.2.6";
packageJson.overrides["esbuild"] = "^0.25.0";
packageJson.overrides["@babel/runtime"] = "7.26.10";
packageJson.overrides["@babel/helpers"] = "7.26.10";
fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
console.log("Updated package.json with security overrides");
'

echo "Package.json updated with security overrides. Please run:"
echo "rm -rf node_modules package-lock.json"
echo "npm install"
echo "git add package.json package-lock.json"
echo "git commit -m \"chore: upgrade deps to fix security alerts\""
echo "git push"
