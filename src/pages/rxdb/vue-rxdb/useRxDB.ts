import { useRxContext } from './context'

export function useRxDB() {
  const { db } = useRxContext()
  return db
}
