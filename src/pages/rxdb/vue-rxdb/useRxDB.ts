import type { RxDatabase } from 'rxdb'
import type { ShallowRef } from 'vue'
import { useRxContext } from './context'

export function useRxDB<T extends RxDatabase<any>>() {
  const { db } = useRxContext()
  return db as unknown as ShallowRef<T | null>
}
