<template>
  <table class="text-xs border-separate border-spacing-0">
    <thead>
      <tr class="sticky top-0">
        <th
          v-for="column in columns"
          :key="column.key"
          class="bg-gray-100 border-r first:border-l border-y font-normal px-1">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="factSheet in factSheets" :key="factSheet.id">
        <td
          v-for="column in columns"
          :key="column.key"
          class="border-b border-l last:border-r text-left px-1">
          <component
            v-if="column.component"
            :is="column.component"
            v-bind="{ factSheet }"
            v-on="column.listeners ?? {}" />
          <span v-else>
            {{ column?.mapFn?.(factSheet) ?? factSheet[column.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import '@leanix/reporting'
import { ref } from 'vue'
import DisplayNameCell from '@/components/DisplayNameCell.vue'
import type { IFactSheet, IColumn } from './types'

const factSheetType = 'Application'
const factSheets = ref<IFactSheet[]>([])
const columns: IColumn<IFactSheet>[] = [
  {
    key: 'displayName',
    label: 'Display Name',
    component: DisplayNameCell,
    listeners: {
      click: (factSheet: IFactSheet) => {
        lx.openSidePane({
          factSheet: {
            type: 'FactSheet',
            factSheetId: factSheet.id,
            factSheetType: factSheet.type,
            pointOfView: {
              id: '1',
              changeSet: {
                date: new Date().toISOString(),
                type: 'dateOnly'
              }
            },
            detailFields: [],
            relations: []
          }
        })
      }
    }
  },
  {
    key: 'completion',
    label: 'Completion',
    mapFn: (row: IFactSheet) => row.completion?.percentage + '%'
  }
]

const init = async () => {
  await lx.init()
  await lx.ready({
    facets: [
      {
        key: factSheetType,
        fixedFactSheetType: factSheetType,
        label: lx.translateFactSheetType(factSheetType, 'plural'),
        attributes: ['displayName', 'completion { percentage }'],
        callback: (dataset) => {
          factSheets.value = dataset
        }
      }
    ]
  })
}

// we call our report initialization method here...
init()
</script>
