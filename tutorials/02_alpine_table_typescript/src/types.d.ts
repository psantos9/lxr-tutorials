import { Alpine } from 'alpinejs'

export {}

declare global {
  interface Window {
    Alpine: Alpine
  }
  interface IFactSheet {
    id: string
    type: string
    displayName: string
    completion: {
      percentage: string
    }
  }
  interface IColumn<T> {
    key: string
    label: string
    mapFn?: (row: T) => string
  }
  interface IState {
    factSheetType: string
    factSheets: IFactSheet[]
    columns: IColumn<IFactSheet>[]
  }
  interface IMethods {
    init: () => void
    openSidePane: (this: IState, factSheet: IFactSheet) => void
  }
}
