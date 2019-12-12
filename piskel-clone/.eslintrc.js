module.exports = {
    env: {
        commonjs: true,
        browser: true,
        es6 : true,
        node : true
    },
    extends: [
        'airbnb-base',
      ],
    globals : {
        Atomics : "readonly",
        SharedArrayBuffer : "readonly"
    },
    parserOptions : {
        "ecmaVersion": 2018,
    },
    rules : {
        "linebreak-style" : 0,
        "camelcase" : [0, {"properties" : "always"}],
        "indent": ["error", 4],
        "padded-blocks" : ["error", { "blocks": "always" }],
        "radix" : 0,
        "consistent-return" : 0,
        "prefer-destructuring" : 0,
        "eqeqeq" : 0
    }
};