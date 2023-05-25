import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await initDB("jate", 1);
  const tx = db.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.add(content);
  await request;
  console.log('jate content added to database');
  };



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  const jateDB = await initDB("jate", 1);
  const tx = db.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const allContent = await request;
  console.log('all jate content:', allContent);
  return allContent;
  };

initdb();
