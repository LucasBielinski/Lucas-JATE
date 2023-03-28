import { request } from "express";
import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // find the correct Database and read the data
  const jateDb = await openDB("jaet", 1);
  const tr = jateDb.transaction("jate", "readwrite");
  const storage = tr.objectStore("jate");
  const req = storage.put({ content: content });
  const res = await req;
  return res;

  //updated contents need to be placed under the database we opened
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tr = jateDb.transaction("jate", "readonly");
  const storage = tr.objectStore("jate");
  const req = storage.getAll();
  const res = await req;
  return res;
};

initdb();
