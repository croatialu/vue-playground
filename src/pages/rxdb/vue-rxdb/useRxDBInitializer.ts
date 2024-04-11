import type { RxDatabase } from 'rxdb'
import { provideRxContext } from './context'

export function useRxDBInitializer<DB extends RxDatabase<any>>(executor: () => Promise<DB>) {
  const db = shallowRef<DB | null>(null)

  watchSyncEffect(async () => {
    db.value = await executor()

    return () => {
      db.value?.destroy()
    }
  })

  provideRxContext({ db: db as any })

  return db
}
