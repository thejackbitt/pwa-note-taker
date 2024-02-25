import { openDB } from 'idb';

const jateDb = "jate"

const initdb = async () =>
  openDB(jateDb, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(jateDb)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(jateDb, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
   const floodgate = await openDB(jateDb, 1);

  const floodgateTransaction = floodgate.transaction(jateDb, 'readwrite');

  const floodgateStore = floodgateTransaction.objectStore(jateDb);

  const request = floodgateStore.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  const floodgate = await openDB(jateDb, 1);
  const floodgateTransaction = floodgate.transaction(jateDb, 'readonly');
  const floodgateStore = floodgateTransaction.objectStore(jateDb);

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
