/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? _.first(array.reverse()) : _.first(array.reverse(), n).reverse();
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passed = [];
    _.each(collection, function(item){
      test(item) && passed.push(item);
    });
    return passed;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var obj = {};
    _.each(array, function(item) {
      obj[item] || (obj[item] = true);
    });
    return Object.keys(obj);
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(item){
      results.push(iterator(item));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    if (typeof functionOrKey === 'function') {
      return _.map(collection, function(item) {
        return functionOrKey.apply(item);
      });
    } else {
      return _.map(collection, function(item) {
        return item[functionOrKey].apply(item);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    (accumulator !== undefined) || (accumulator = collection[0]);
    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      return wasFound || item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    // TIP: Try re-using reduce() here.
    return !!_.reduce(collection, function(passed, item) {
      return !passed ? false : iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !_.every(collection, function(item) {
      return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 0;  i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = obj.hasOwnProperty(key) ? obj[key] : arguments[i][key];
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    return function(arg) {
      !func.hasOwnProperty(arg) && (func[arg] = func(arg));
      return func[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      var args = Array.prototype.slice.call(arguments,2);
      setTimeout(function(){
          func.apply(this,args);
      },wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
      var shuffled = array.slice();
      for (var i = array.length-1; i >= 0; i--) {
        var rand = Math.floor(Math.random() * i);
        var tmp = shuffled[i];
        shuffled[i] = shuffled[rand];
        shuffled[rand] = tmp;
      }
      return shuffled;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var obj = {};

    _.each(collection,function(item){
      if (typeof iterator === 'string') {
        if (obj[item[iterator]] === undefined){
          obj[item[iterator]] = [];
        }
        obj[item[iterator]].push(item);
      } else {
        if (obj[iterator(item)] === undefined){
          obj[iterator(item)] = [];
        }
        obj[iterator(item)].push(item);
      }
    });

    var results = [];
    _.each(Object.keys(obj).sort(),function(key){
        _.each(obj[key],function(item){
          results.push(item);
        });
    });
    return results;
  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    // args = _.sortBy(args, 'length').reverse();
    var max = 0;
    _.each(args, function(arr) {
      if (arr.length > max) {
        max = arr.length;
      }
    });
    var results = [];

    for (var i = 0; i < max; i++) {
      var group = [];

      _.each(args, function(item) {
        group.push(item[i]);
      });

      results.push(group);
    }

    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];

    _.each(nestedArray, function(arrayOrItem) {
      if (!Array.isArray(arrayOrItem)) {
        result.push(arrayOrItem);
      } else {
        result = _.flatten(arrayOrItem, result);
      }
    });

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var arrayCount = arguments.length;
    var intersected = _.flatten(_.map(arguments,function(array){
      return _.uniq(array);
    }));

    var occurances = {};

    var countOcurrances = function(array, element){
      if (occurances[element] === undefined) {
        var indices = [];
        var index = array.indexOf(element);
        while(index !== -1){
          indices.push(index);
          index = array.indexOf(element,index+1);
        }
        occurances[element] = indices.length;
      }
    };

    _.each(intersected, function (item) {
      countOcurrances(intersected, item);
    });

    var results = [];
    _.each(occurances, function(val, key) {
      if (val === arrayCount) {
        results.push(key);
      }
    });

    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 1);
    return _.filter(array, function(item) {
      return _.every(args, function(arr) {
        return (arr.indexOf(item) === -1);
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var first = true;
    var lastReturned;
    var lastCalled;

    return function() {
      var now = new Date().getTime();
      if (first ||  (now - lastCalled) >= wait) {
        first = false;
        lastCalled = now;
        lastReturned = func.apply(this, arguments);

      } else {
        // not allowed to call func
        setTimeout(function() {
          lastCalled = new Date().getTime();
          lastReturned = func.apply(this, arguments);
        }, wait);
      }

      return lastReturned;
    };
  };

}).call(this);
