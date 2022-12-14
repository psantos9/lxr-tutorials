import Alpine from 'alpinejs'
import '@leanix/reporting'
import 'tailwindcss/tailwind.css'

// state variables declared here
const getState = () => ({
  factSheetType: 'Application',
  factSheets: [],
  columns: [
    { key: 'displayName', label: 'Display Name' },
    { key: 'completion', label: 'Completion', mapFn: (row) => row.completion?.percentage + '%' }
  ]
})

// methods declared here
const getMethods = () => ({
  // method triggered upon context initalization
  // https://alpinejs.dev/directives/init#auto-evaluate-init-method
  async init () {
    await lx.init()
    await lx.ready({
      facets: [
        {
          key: this.factSheetType,
          fixedFactSheetType: this.factSheetType,
          label: lx.translateFactSheetType(this.factSheetType, 'plural'),
          attributes: ['displayName', 'completion { percentage }'],
          callback: dataset => { this.factSheets = dataset }
        }
      ]
    })
  },
  openSidePane (factSheet) {
    const { id: factSheetId, type: factSheetType } = factSheet
    // https://leanix.github.io/leanix-reporting/classes/lxr.LxCustomReportLib.html#openSidePane
    lx.openSidePane({
      factSheet: {
        type: 'FactSheet',
        factSheetId,
        factSheetType,
        pointOfView: {
          id: '1',
          changeSet: {
            date: new Date(),
            type: 'dateOnly'
          }
        },
        detailFields: [],
        relations: []
      }
    })
  }
})

// https://alpinejs.dev/essentials/state#re-usable-data
Alpine.data(
  'lxr', () => ({
    ...getState(),
    ...getMethods()
  })
)

Alpine.start()
