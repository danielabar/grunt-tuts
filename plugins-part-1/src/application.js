var MyModule = (function() {

  var sayHi = function(name) {
    return "Hi, " + name + "!";
  };

  return {
    sayHi: sayHi
  };

})();