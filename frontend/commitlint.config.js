export default {
  extends: ['@commitlint/config-conventional'],

  // 可自定义规则
  rules: {
    // 例如，type 类型必须是以下之一
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'fix', // 修补 bug
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回滚
        'build', // 打包
        'wip', // 进行中
      ],
    ],
    // 其他规则...
  },
}
