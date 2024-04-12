import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { RxDocument, RxQuery } from 'rxdb'
import { useRxDB } from './useRxDB'

interface VueRxQueryOptions<QueryData, QueryResultDocument> {
  query: ComputedRef<RxQuery<QueryData, QueryResultDocument> | undefined>
}

type ExtraRxQueryResult<QueryData, QueryResultDocument> = QueryResultDocument extends any[] ? QueryData[] : QueryData | null

export function useRxQuery<QueryData, QueryResultDocument>({ query: rxQuery }: VueRxQueryOptions<QueryData, QueryResultDocument>) {
  const db = useRxDB()

  const queryKey = [
    'rxdb-query',
    computed(() => rxQuery.value?.collection.name),
    computed(() => rxQuery.value?.mangoQuery),
  ] as any[]

  const docToJSON = (docs: RxDocument | RxDocument[]) => {
    if (Array.isArray(docs))
      return docs.map(doc => doc.toJSON())

    return docs.toJSON()
  }

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      if (!db.value)
        throw new Error('DB not ready')

      const docs = await rxQuery.value?.exec() as RxDocument | RxDocument[]
      return docToJSON(docs) as ExtraRxQueryResult<QueryData, QueryResultDocument>
    },
    enabled: computed(() => !!db.value && !!rxQuery.value),
  })

  const queryClient = useQueryClient()

  watchEffect(() => {
    if (!rxQuery.value)
      return
    rxQuery.value.$.subscribe((data) => {
      const r = docToJSON(data as RxDocument | RxDocument[])
      queryClient.setQueryData(queryKey, r)
    })
  })

  return queryResult
}
