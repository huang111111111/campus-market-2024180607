<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="handleInput"
    />
    <button
      v-if="modelValue"
      type="button"
      class="clear-btn"
      @click="$emit('update:modelValue', '')"
    >
      清空
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: '请输入关键词搜索',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.search-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 4px 0;
  font-size: 14px;
  font-family: inherit;
  color: #1f2937;
  background: transparent;
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-btn {
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  font-family: inherit;
  transition: all 0.15s;
  flex-shrink: 0;
}

.clear-btn:hover {
  background: #e5e7eb;
  color: #374151;
}
</style>
