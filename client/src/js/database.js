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
  // awaits the database connection
  const jateDb = await openDB("jaet", 1);
  // access the object store and sets it to readwrite
  const tr = jateDb.transaction("jate", "readwrite");
  // retrives object store and assigns it to storage
  const storage = tr.objectStore("jate");
  // sets the request updates the data by id and pulls in content and updates the value
  const req = storage.put({ id: 1, value: content });
  // awaits request and assigns it to res
  const res = await req;
  return res;

  //updated contents need to be placed under the database we opened
};

// TODO: Add logic for a method that gets all the content from the database
// gets data
export const getDb = async () => {
  // awaits the database connection
  const jateDb = await openDB("jate", 1);
  // access the object store and sets it to readonly
  const tr = jateDb.transaction("jate", "readonly");
  // retrives object store and assigns it to storage
  const storage = tr.objectStore("jate");
  //gets specific id
  const req = storage.get(1);
  const res = await req;
  // res checks to see if valu is null, if not it renders. must be res.value because og how codemirror works?
  return res?.value;
};

initdb();
