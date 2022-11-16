<template>
  <span
    class="text-[#1666ee] hover:underline cursor-pointer"
    @click.stop="$emit('click', factSheet)">
    {{ factSheet.displayName }}
  </span>
</template>

<script lang="ts" setup>
import type { IFactSheet } from '@/types'
import '@leanix/reporting'

defineProps<{ factSheet: IFactSheet }>()
defineEmits<{ (e: 'click', factSheet: IFactSheet): void }>()
</script>
