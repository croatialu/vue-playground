import type { Database } from '../../client-db/db'
import { useRxDB } from '../../vue-rxdb'
import { useRxQuery } from '../../vue-rxdb/useRxQuery'

export const UserList = defineComponent({
  setup() {
    const db = useRxDB<Database>()

    const { data } = useRxQuery({
      query: computed(() => {
        return db.value?.collections.users.find({})
      }),
    })

    return () => {
      return (
        <div>
          {
            data.value?.map((user) => {
              return (
                <div key={user.nanoId}>
                  {user.name}
                </div>
              )
            })
          }
        </div>
      )
    }
  },
})
