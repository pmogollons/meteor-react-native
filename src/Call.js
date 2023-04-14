import Data from './Data';

/**
 * Calls a method over DDP with given arguments
 * @param eventName {string} required, the method to call
 * @param args {...array} optional arguments
 */
export default function (eventName) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (args.length && typeof args[args.length - 1] === 'function') {
    const callback = args.pop();
    const id = Data.ddp.method(eventName, args);

    Data.calls.push({ id: id, callback });
  } else {
    const id = Data.ddp.method(eventName, args);

    return new Promise((resolve, reject) => {
      Data.calls.push({
        id: id,
        callback(error, response) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        },
      });
    });
  }
}
