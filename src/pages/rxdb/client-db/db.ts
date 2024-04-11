import type { KeyFunctionMap, RxDatabase } from 'rxdb'
import { addRxPlugin, createRxDatabase } from 'rxdb'
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump'
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { postSchema } from './collections/post'
import { userCollectionMethods, userDocMethods, userSchema } from './collections/user'
import type { DatabaseCollections } from './collections'

addRxPlugin(RxDBLeaderElectionPlugin)
addRxPlugin(RxDBDevModePlugin)
addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBJsonDumpPlugin)
addRxPlugin(RxDBCleanupPlugin)

export async function createDatabase() {
  const database = await createRxDatabase<DatabaseCollections>({
    name: 'example_rxdb',
    storage: getRxStorageMemory(),
    multiInstance: true,
  })

  // show leadership in title
  database.waitForLeadership().then(() => {
    document.title = `♛ ${document.title}`
  })

  await database.addCollections({
    users: {
      schema: userSchema,
      methods: userDocMethods as unknown as KeyFunctionMap,
      statics: userCollectionMethods as unknown as KeyFunctionMap,
    },
    posts: {
      schema: postSchema,
    },

  })

  return database
}

export type Database = RxDatabase<DatabaseCollections, any, any, unknown>
