import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  // 自动清理由 @testing-library/react 创建的 DOM
  cleanup()
})
