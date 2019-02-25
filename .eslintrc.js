module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: 'standard',
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4], // 缩进空格
        semi: ['error', 'always'] // 关闭分号
    }
};
