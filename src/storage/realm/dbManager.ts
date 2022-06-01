import { RealmSchema } from './enum';
import realm from './realm';

/**
 * intializes realm
 * @param  {ArrayBuffer|ArrayBufferView|Int8Array} key
 * @returns Promise
 */
const initializeRealm = async (
  key: ArrayBuffer | ArrayBufferView | Int8Array
): Promise<boolean> => {
  return await realm.initializeDatabase(key);
};

/**
 * generic :: creates an object corresponding to provided schema
 * @param  {RealmSchema} schema
 * @param  {any} object
 */
const createObject = (schema: RealmSchema, object: any) => {
  return realm.create(schema, object);
};

/**
 * generic :: fetches an object corresponding to provided schema
 * @param  {RealmSchema} schema
 */
const getObject = async (schema: RealmSchema, instance: number = 0) => {
  const objects = realm.getObjects(schema);
  return objects[instance];
};

const updateKeeperApp = async (updateProps: any) => {
  try {
    const keeperApp = getObject(RealmSchema.KeeperApp);
    for (const [key, value] of Object.entries(updateProps)) {
      realm.write(() => {
        keeperApp[key] = value;
      });
    }
    return true;
  } catch (err) {
    console.log({ err });
    return false;
  }
};

export default {
  initializeRealm,
  createObject,
  getObject,
  updateKeeperApp,
};
