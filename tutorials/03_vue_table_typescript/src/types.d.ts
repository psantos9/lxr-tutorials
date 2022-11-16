import type { Component } from 'vue'

interface IFactSheet {
  id: string
  type: string
  displayName: string
  completion: {
    percentage: string
  }
}

interface IColumn<T> {
  key: keyof IFactSheet
  label: string
  mapFn?: (row: T) => string
  component?: Component
  listeners?: Record<string, any>
}
