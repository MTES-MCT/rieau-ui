module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "react-app",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    },
    "settings": {
      "react": {
        "createClass": "createReactClass", 
        "pragma": "React",  
        "version": "detect",
      },
      "propWrapperFunctions": [
          "forbidExtraProps",
          {"property": "freeze", "object": "Object"},
          {"property": "myFavoriteWrapper"}
      ],
      "linkComponents": [
        "Hyperlink",
        {"name": "Link", "linkAttribute": "to"}
      ]
    }
};