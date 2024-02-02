/**
 * - pluralize(name, count): A utility function for appending an 's' to a string based on a count, 
 *   useful for handling pluralization in UI texts.
 */
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

/**
 * - idbPromise(storeName, method, object): A function that wraps IndexedDB operations in a 
 *   Promise, facilitating asynchronous interactions with the client-side database. It supports 
 *   'put', 'get', and 'delete' operations across different object stores ('products', 'categories', 
 *   'cart') within the IndexedDB. This function is crucial for enabling offline data management 
 *   and synchronization in the application.
 */
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}

// These utilities enhance the application's functionality by providing essential
// data management capabilities and improving user interface responsiveness.