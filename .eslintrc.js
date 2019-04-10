module.exports = {
	"env": {
		"es6": true,
		"node": true,
		"jest": true
	},
	"extends": ["standard", "plugin:jest/recommended"],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"comma-dangle": ["error", {
			"arrays": "always",
			"objects": "always",
			"imports": "never",
			"exports": "never",
			"functions": "ignore"
		}],
		"semi": [
			"error",
			"always"
		],
		"plugins": ["jest"]
	}
};
