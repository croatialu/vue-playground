import type { RxDatabase } from 'rxdb'
import type { ShallowRef } from 'vue'
import { inject, provide } from 'vue'

export interface RxContext {
  db: ShallowRef<RxDatabase<unknown> | null>
}

const CONTEXT_KEY = 'VUE_RXDB_CONTEXT'

export function provideRxContext(ctx: RxContext) {
  provide(CONTEXT_KEY, ctx)
  return ctx
}

export function useRxContext() {
  const value = inject<RxContext>(CONTEXT_KEY)

  if (!value)
    throw new Error('useRxContext() is called without provider.')

  return value
}
