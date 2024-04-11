import { createDatabase } from './client-db/db'
import { useRxDBInitializer } from './vue-rxdb'

const Page = defineComponent({
  setup() {
    useRxDBInitializer(() => {
      return createDatabase()
    })

    return () => {
      return (
        <div>

          233
        </div>
      )
    }
  },
})

export default Page
