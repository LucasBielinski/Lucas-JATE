import { openDB } from "idb";
// initalize the database
const initdb = async () =>
  // set database name to "jate version 1"
  openDB("jate", 1, {
    upgrade(db) {
      // if database exists, return
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // if no database sets up schema
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// updates the data when called
export const putDb = async (content) => {
  // find the correct Database and read the data
  const jateDb = await openDB("jaet", 1);
  const tr = jateDb.transaction("jate", "readwrite");
  const storage = tr.objectStore("jate");
  const req = storage.put({ id: 1, value: content });
  const res = await req;
  return res;

  //updated contents need to be placed under the database we opened
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tr = jateDb.transaction("jate", "readonly");
  const storage = tr.objectStore("jate");
  const req = storage.get(1);
  const res = await req;
  return res?.value;
};

initdb();
