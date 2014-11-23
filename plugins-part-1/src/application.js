var MyModule = (function() {

  var sayHi = function(name) {
    return "Hi, " + name + "!";
  };

  var sayBye = function(name) {
    return "Bye, " + name + "!";
  };

  return {
    sayHi: sayHi,
    sayBye: sayBye
  };

})();