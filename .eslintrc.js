module.exports = exports = {
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
          "jsx": true
        },
        "sourceType": "module"
      },
    
      "settings": {
        "react": {
          "version": "16.0"
        }
      },
    
      "plugins": [
        "react"
      ],
    
      "extends": [
        "standard-jsx"
      ],
    
      "rules": {
        "jsx-quotes": ["warn", "prefer-double"],
        "react/jsx-no-bind": ["error", {
          "allowArrowFunctions": true,
          "allowBind": false,
          "ignoreRefs": true
        }],
        "react/no-did-update-set-state": "error",
        "react/no-unknown-property": "error",
        "react/no-unused-prop-types": "warn",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "error"
      }
    
};