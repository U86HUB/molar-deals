
#!/bin/bash
# This script ensures the package.json has the proper security overrides

echo "Please run this script manually to update package.json overrides for security"
echo "It adds proper version constraints for vite, esbuild, babel/runtime and babel/helpers"
echo ""
echo "Usage: ./update-overrides.sh"
echo ""
echo "Expected overrides to apply:"
echo "  \"overrides\": {"
echo "    \"vite\": \"^6.2.6\","
echo "    \"esbuild\": \"^0.25.0\","
echo "    \"@babel/runtime\": \"7.26.10\","
echo "    \"@babel/helpers\": \"7.26.10\""
echo "  }"
