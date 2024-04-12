import { createDatabase } from './client-db/db'
import { UserList } from './components/UserList'
import { useRxDBInitializer } from './vue-rxdb'

const Page = defineComponent({
  setup() {
    useRxDBInitializer(() => {
      return createDatabase()
    })

    const text = ref('')

    return () => {
      return (
        <div>
          <input type="text" />

          serList:
          <br />
          <UserList />

        </div>
      )
    }
  },
})

export default Page
