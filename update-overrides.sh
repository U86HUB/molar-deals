
#!/bin/bash
# This script ensures the package.json has the proper security overrides

# Read the current package.json
PACKAGE_JSON=$(cat package.json)

# Check if overrides exists
if ! echo "$PACKAGE_JSON" | grep -q '"overrides"'; then
  # Add overrides section if it doesn't exist
  UPDATED_JSON=$(echo "$PACKAGE_JSON" | sed '/"dependencies"/i \  "overrides": {\n    "vite": "^6.2.6",\n    "esbuild": "^0.25.0",\n    "@babel/runtime": "7.26.10",\n    "@babel/helpers": "7.26.10"\n  },' | sed 's/,//')
else
  # Update existing overrides
  UPDATED_JSON=$(echo "$PACKAGE_JSON" | sed -E 's/"vite": "[^"]*"/"vite": "^6.2.6"/g')
  UPDATED_JSON=$(echo "$UPDATED_JSON" | sed -E 's/"esbuild": "[^"]*"/"esbuild": "^0.25.0"/g' 2>/dev/null || echo "$UPDATED_JSON")
  UPDATED_JSON=$(echo "$UPDATED_JSON" | sed -E 's/"@babel\/runtime": "[^"]*"/"@babel\/runtime": "7.26.10"/g' 2>/dev/null || echo "$UPDATED_JSON")
  UPDATED_JSON=$(echo "$UPDATED_JSON" | sed -E 's/"@babel\/helpers": "[^"]*"/"@babel\/helpers": "7.26.10"/g' 2>/dev/null || echo "$UPDATED_JSON")
  
  # Add missing overrides
  if ! echo "$UPDATED_JSON" | grep -q '"esbuild":'; then
    UPDATED_JSON=$(echo "$UPDATED_JSON" | sed -E '/"overrides"/,/\}/s/\}/,\n    "esbuild": "^0.25.0"\n  \}/1')
  fi
  if ! echo "$UPDATED_JSON" | grep -q '"@babel/runtime":'; then
    UPDATED_JSON=$(echo "$UPDATED_JSON" | sed -E '/"overrides"/,/\}/s/\}/,\n    "@babel\/runtime": "7.26.10"\n  \}/1')
  fi
  if ! echo "$UPDATED_JSON" | grep -q '"@babel/helpers":'; then
    UPDATED_JSON=$(echo "$UPDATED_JSON" | sed -E '/"overrides"/,/\}/s/\}/,\n    "@babel\/helpers": "7.26.10"\n  \}/1')
  fi
fi

# Write the updated JSON back to package.json
echo "$UPDATED_JSON" > package.json
echo "Updated package.json with security overrides for vite, esbuild, and babel runtime"

# Remind user to run npm install
echo "Remember to run 'npm install' to apply these changes"
