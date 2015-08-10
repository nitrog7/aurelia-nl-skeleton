"format register";
System.register("npm:core-js@0.9.18/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = true;
    $.path = $.g;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.dom-create", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      document = $.g.document,
      isObject = $.isObject,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.shared", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      SHARED = '__core-js_shared__',
      store = $.g[SHARED] || ($.g[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.uid", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var sid = 0;
  function uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
  }
  uid.safe = require("npm:core-js@0.9.18/modules/$").g.Symbol || uid;
  module.exports = uid;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.redef", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      tpl = String({}.hasOwnProperty),
      SRC = require("npm:core-js@0.9.18/modules/$.uid").safe('src'),
      _toString = Function.toString;
  function $redef(O, key, val, safe) {
    if ($.isFunction(val)) {
      var base = O[key];
      $.hide(val, SRC, base ? String(base) : tpl.replace(/hasOwnProperty/, String(key)));
      if (!('name' in val))
        val.name = key;
    }
    if (O === $.g) {
      O[key] = val;
    } else {
      if (!safe)
        delete O[key];
      $.hide(O, key, val);
    }
  }
  $redef(Function.prototype, 'toString', function toString() {
    return $.has(this, SRC) ? this[SRC] : _toString.call(this);
  });
  $.core.inspectSource = function(it) {
    return _toString.call(it);
  };
  module.exports = $redef;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.invoke", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
      case 5:
        return un ? fn(args[0], args[1], args[2], args[3], args[4]) : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.assert", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
  function assert(condition, msg1, msg2) {
    if (!condition)
      throw TypeError(msg2 ? msg1 + msg2 : msg1);
  }
  assert.def = $.assertDefined;
  assert.fn = function(it) {
    if (!$.isFunction(it))
      throw TypeError(it + ' is not a function!');
    return it;
  };
  assert.obj = function(it) {
    if (!$.isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  assert.inst = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  module.exports = assert;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.array-includes", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
  module.exports = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
      var O = $.toObject($this),
          length = $.toLength(O.length),
          index = $.toIndex(fromIndex, length),
          value;
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          if (value != value)
            return true;
        }
      else
        for (; length > index; index++)
          if (IS_INCLUDES || index in O) {
            if (O[index] === el)
              return IS_INCLUDES || index;
          }
      return !IS_INCLUDES && -1;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.replacer", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  module.exports = function(regExp, replace, isStatic) {
    var replacer = replace === Object(replace) ? function(part) {
      return replace[part];
    } : replace;
    return function(it) {
      return String(isStatic ? it : this).replace(regExp, replacer);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.throws", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      exec();
      return false;
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.keyof", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
  module.exports = function(object, el) {
    var O = $.toObject(object),
        keys = $.getKeys(O),
        length = keys.length,
        index = 0,
        key;
    while (length > index)
      if (O[key = keys[index++]] === el)
        return key;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.enum-keys", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
  module.exports = function(it) {
    var keys = $.getKeys(it),
        getDesc = $.getDesc,
        getSymbols = $.getSymbols;
    if (getSymbols)
      $.each.call(getSymbols(it), function(key) {
        if (getDesc(it, key).enumerable)
          keys.push(key);
      });
    return keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.get-names", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      toString = {}.toString,
      getNames = $.getNames;
  var windowNames = typeof window == 'object' && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  function getWindowNames(it) {
    try {
      return getNames(it);
    } catch (e) {
      return windowNames.slice();
    }
  }
  module.exports.get = function getOwnPropertyNames(it) {
    if (windowNames && toString.call(it) == '[object Window]')
      return getWindowNames(it);
    return getNames($.toObject(it));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.assign", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.enum-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      enumKeys = require("npm:core-js@0.9.18/modules/$.enum-keys");
  module.exports = Object.assign || function assign(target, source) {
    var T = Object($.assertDefined(target)),
        l = arguments.length,
        i = 1;
    while (l > i) {
      var S = $.ES5Object(arguments[i++]),
          keys = enumKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        T[key = keys[j++]] = S[key];
    }
    return T;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.same", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.set-proto", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      assert = require("npm:core-js@0.9.18/modules/$.assert");
  function check(O, proto) {
    assert.obj(O);
    assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
  }
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(buggy, set) {
      try {
        set = require("npm:core-js@0.9.18/modules/$.ctx")(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
        set({}, []);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }() : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.to-string", ["npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var cof = require("npm:core-js@0.9.18/modules/$.cof"),
      tmp = {};
  tmp[require("npm:core-js@0.9.18/modules/$.wks")('toStringTag')] = 'z';
  if (require("npm:core-js@0.9.18/modules/$").FW && cof(tmp) != 'z') {
    require("npm:core-js@0.9.18/modules/$.redef")(Object.prototype, 'toString', function toString() {
      return '[object ' + cof.classof(this) + ']';
    }, true);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.get-names"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      isObject = $.isObject,
      toObject = $.toObject;
  $.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' + 'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(','), function(KEY, ID) {
    var fn = ($.core.Object || {})[KEY] || Object[KEY],
        forced = 0,
        method = {};
    method[KEY] = ID == 0 ? function freeze(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 1 ? function seal(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 2 ? function preventExtensions(it) {
      return isObject(it) ? fn(it) : it;
    } : ID == 3 ? function isFrozen(it) {
      return isObject(it) ? fn(it) : true;
    } : ID == 4 ? function isSealed(it) {
      return isObject(it) ? fn(it) : true;
    } : ID == 5 ? function isExtensible(it) {
      return isObject(it) ? fn(it) : false;
    } : ID == 6 ? function getOwnPropertyDescriptor(it, key) {
      return fn(toObject(it), key);
    } : ID == 7 ? function getPrototypeOf(it) {
      return fn(Object($.assertDefined(it)));
    } : ID == 8 ? function keys(it) {
      return fn(toObject(it));
    } : require("npm:core-js@0.9.18/modules/$.get-names").get;
    try {
      fn('z');
    } catch (e) {
      forced = 1;
    }
    $def($def.S + $def.F * forced, 'Object', method);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.function.name", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      NAME = 'name',
      setDesc = $.setDesc,
      FunctionProto = Function.prototype;
  NAME in FunctionProto || $.FW && $.DESC && setDesc(FunctionProto, NAME, {
    configurable: true,
    get: function() {
      var match = String(this).match(/^\s*function ([^ (]*)/),
          name = match ? match[1] : '';
      $.has(this, NAME) || setDesc(this, NAME, $.desc(5, name));
      return name;
    },
    set: function(value) {
      $.has(this, NAME) || setDesc(this, NAME, $.desc(0, value));
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.function.has-instance", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      HAS_INSTANCE = require("npm:core-js@0.9.18/modules/$.wks")('hasInstance'),
      FunctionProto = Function.prototype;
  if (!(HAS_INSTANCE in FunctionProto))
    $.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O) {
        if (!$.isFunction(this) || !$.isObject(O))
          return false;
        if (!$.isObject(this.prototype))
          return O instanceof this;
        while (O = $.getProto(O))
          if (this.prototype === O)
            return true;
        return false;
      }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.number.constructor", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      isObject = $.isObject,
      isFunction = $.isFunction,
      NUMBER = 'Number',
      $Number = $.g[NUMBER],
      Base = $Number,
      proto = $Number.prototype;
  function toPrimitive(it) {
    var fn,
        val;
    if (isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))
      return val;
    if (isFunction(fn = it.toString) && !isObject(val = fn.call(it)))
      return val;
    throw TypeError("Can't convert object to number");
  }
  function toNumber(it) {
    if (isObject(it))
      it = toPrimitive(it);
    if (typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48) {
      var binary = false;
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          binary = true;
        case 79:
        case 111:
          return parseInt(it.slice(2), binary ? 2 : 8);
      }
    }
    return +it;
  }
  if ($.FW && !($Number('0o1') && $Number('0b1'))) {
    $Number = function Number(it) {
      return this instanceof $Number ? new Base(toNumber(it)) : toNumber(it);
    };
    $.each.call($.DESC ? $.getNames(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), function(key) {
      if ($.has(Base, key) && !$.has($Number, key)) {
        $.setDesc($Number, key, $.getDesc(Base, key));
      }
    });
    $Number.prototype = proto;
    proto.constructor = $Number;
    require("npm:core-js@0.9.18/modules/$.redef")($.g, NUMBER, $Number);
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.number.statics", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      abs = Math.abs,
      floor = Math.floor,
      _isFinite = $.g.isFinite,
      MAX_SAFE_INTEGER = 0x1fffffffffffff;
  function isInteger(it) {
    return !$.isObject(it) && _isFinite(it) && floor(it) === it;
  }
  $def($def.S, 'Number', {
    EPSILON: Math.pow(2, -52),
    isFinite: function isFinite(it) {
      return typeof it == 'number' && _isFinite(it);
    },
    isInteger: isInteger,
    isNaN: function isNaN(number) {
      return number != number;
    },
    isSafeInteger: function isSafeInteger(number) {
      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
    },
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
    parseFloat: parseFloat,
    parseInt: parseInt
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.math", ["npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Infinity = 1 / 0,
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      E = Math.E,
      pow = Math.pow,
      abs = Math.abs,
      exp = Math.exp,
      log = Math.log,
      sqrt = Math.sqrt,
      ceil = Math.ceil,
      floor = Math.floor,
      EPSILON = pow(2, -52),
      EPSILON32 = pow(2, -23),
      MAX32 = pow(2, 127) * (2 - EPSILON32),
      MIN32 = pow(2, -126);
  function roundTiesToEven(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  }
  function sign(x) {
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }
  function asinh(x) {
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
  }
  function expm1(x) {
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }
  $def($def.S, 'Math', {
    acosh: function acosh(x) {
      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
    },
    asinh: asinh,
    atanh: function atanh(x) {
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    },
    cbrt: function cbrt(x) {
      return sign(x = +x) * pow(abs(x), 1 / 3);
    },
    clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - floor(log(x + 0.5) * Math.LOG2E) : 32;
    },
    cosh: function cosh(x) {
      return (exp(x = +x) + exp(-x)) / 2;
    },
    expm1: expm1,
    fround: function fround(x) {
      var $abs = abs(x),
          $sign = sign(x),
          a,
          result;
      if ($abs < MIN32)
        return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      if (result > MAX32 || result != result)
        return $sign * Infinity;
      return $sign * result;
    },
    hypot: function hypot(value1, value2) {
      var sum = 0,
          i = 0,
          len = arguments.length,
          larg = 0,
          arg,
          div;
      while (i < len) {
        arg = abs(arguments[i++]);
        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else
          sum += arg;
      }
      return larg === Infinity ? Infinity : larg * sqrt(sum);
    },
    imul: function imul(x, y) {
      var UInt16 = 0xffff,
          xn = +x,
          yn = +y,
          xl = UInt16 & xn,
          yl = UInt16 & yn;
      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
    },
    log1p: function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
    },
    log10: function log10(x) {
      return log(x) / Math.LN10;
    },
    log2: function log2(x) {
      return log(x) / Math.LN2;
    },
    sign: sign,
    sinh: function sinh(x) {
      return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    },
    tanh: function tanh(x) {
      var a = expm1(x = +x),
          b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    },
    trunc: function trunc(it) {
      return (it > 0 ? floor : ceil)(it);
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.from-code-point", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      toIndex = require("npm:core-js@0.9.18/modules/$").toIndex,
      fromCharCode = String.fromCharCode,
      $fromCodePoint = String.fromCodePoint;
  $def($def.S + $def.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {fromCodePoint: function fromCodePoint(x) {
      var res = [],
          len = arguments.length,
          i = 0,
          code;
      while (len > i) {
        code = +arguments[i++];
        if (toIndex(code, 0x10ffff) !== code)
          throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
      }
      return res.join('');
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.raw", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'String', {raw: function raw(callSite) {
      var tpl = $.toObject(callSite.raw),
          len = $.toLength(tpl.length),
          sln = arguments.length,
          res = [],
          i = 0;
      while (len > i) {
        res.push(String(tpl[i++]));
        if (i < sln)
          res.push(String(arguments[i]));
      }
      return res.join('');
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.string-at", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$");
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String($.assertDefined(that)),
          i = $.toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.iter", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.shared"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      classof = cof.classof,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      assertObject = assert.obj,
      SYMBOL_ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      Iterators = require("npm:core-js@0.9.18/modules/$.shared")('iterators'),
      IteratorPrototype = {};
  setIterator(IteratorPrototype, $.that);
  function setIterator(O, value) {
    $.hide(O, SYMBOL_ITERATOR, value);
    if (FF_ITERATOR in [])
      $.hide(O, FF_ITERATOR, value);
  }
  module.exports = {
    BUGGY: 'keys' in [] && !('next' in [].keys()),
    Iterators: Iterators,
    step: function(done, value) {
      return {
        value: value,
        done: !!done
      };
    },
    is: function(it) {
      var O = Object(it),
          Symbol = $.g.Symbol;
      return (Symbol && Symbol.iterator || FF_ITERATOR) in O || SYMBOL_ITERATOR in O || $.has(Iterators, classof(O));
    },
    get: function(it) {
      var Symbol = $.g.Symbol,
          getIter;
      if (it != undefined) {
        getIter = it[Symbol && Symbol.iterator || FF_ITERATOR] || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
      }
      assert($.isFunction(getIter), it, ' is not iterable!');
      return assertObject(getIter.call(it));
    },
    set: setIterator,
    create: function(Constructor, NAME, next, proto) {
      Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
      cof.set(Constructor, NAME + ' Iterator');
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.iter-define", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $redef = require("npm:core-js@0.9.18/modules/$.redef"),
      $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      SYMBOL_ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values',
      Iterators = $iter.Iterators;
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE) {
    $iter.create(Constructor, NAME, next);
    function createMethod(kind) {
      function $$(that) {
        return new Constructor(that, kind);
      }
      switch (kind) {
        case KEYS:
          return function keys() {
            return $$(this);
          };
        case VALUES:
          return function values() {
            return $$(this);
          };
      }
      return function entries() {
        return $$(this);
      };
    }
    var TAG = NAME + ' Iterator',
        proto = Base.prototype,
        _native = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        _default = _native || createMethod(DEFAULT),
        methods,
        key;
    if (_native) {
      var IteratorPrototype = $.getProto(_default.call(new Base));
      cof.set(IteratorPrototype, TAG, true);
      if ($.FW && $.has(proto, FF_ITERATOR))
        $iter.set(IteratorPrototype, $.that);
    }
    if ($.FW || FORCE)
      $iter.set(proto, _default);
    Iterators[NAME] = _default;
    Iterators[TAG] = $.that;
    if (DEFAULT) {
      methods = {
        keys: IS_SET ? _default : createMethod(KEYS),
        values: DEFAULT == VALUES ? _default : createMethod(VALUES),
        entries: DEFAULT != VALUES ? _default : createMethod('entries')
      };
      if (FORCE)
        for (key in methods) {
          if (!(key in proto))
            $redef(proto, key, methods[key]);
        }
      else
        $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.code-point-at", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $at = require("npm:core-js@0.9.18/modules/$.string-at")(false);
  $def($def.P, 'String', {codePointAt: function codePointAt(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.ends-with", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      toLength = $.toLength;
  $def($def.P + $def.F * !require("npm:core-js@0.9.18/modules/$.throws")(function() {
    'q'.endsWith(/./);
  }), 'String', {endsWith: function endsWith(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      var that = String($.assertDefined(this)),
          endPosition = arguments[1],
          len = toLength(that.length),
          end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
      searchString += '';
      return that.slice(end - searchString.length, end) === searchString;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.includes", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.P, 'String', {includes: function includes(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      return !!~String($.assertDefined(this)).indexOf(searchString, arguments[1]);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.string-repeat", ["npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$");
  module.exports = function repeat(count) {
    var str = String($.assertDefined(this)),
        res = '',
        n = $.toInteger(count);
    if (n < 0 || n == Infinity)
      throw RangeError("Count can't be negative");
    for (; n > 0; (n >>>= 1) && (str += str))
      if (n & 1)
        res += str;
    return res;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.starts-with", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.P + $def.F * !require("npm:core-js@0.9.18/modules/$.throws")(function() {
    'q'.startsWith(/./);
  }), 'String', {startsWith: function startsWith(searchString) {
      if (cof(searchString) == 'RegExp')
        throw TypeError();
      var that = String($.assertDefined(this)),
          index = $.toLength(Math.min(arguments[1], that.length));
      searchString += '';
      return that.slice(index, index + searchString.length) === searchString;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.iter-call", ["npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertObject = require("npm:core-js@0.9.18/modules/$.assert").obj;
  function close(iterator) {
    var ret = iterator['return'];
    if (ret !== undefined)
      assertObject(ret.call(iterator));
  }
  function call(iterator, fn, value, entries) {
    try {
      return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      close(iterator);
      throw e;
    }
  }
  call.close = close;
  module.exports = call;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.iter-detect", ["npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var SYMBOL_ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][SYMBOL_ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec) {
    if (!SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[SYMBOL_ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[SYMBOL_ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.of", ["npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Array', {of: function of() {
      var index = 0,
          length = arguments.length,
          result = new (typeof this == 'function' ? this : Array)(length);
      while (length > index)
        result[index] = arguments[index++];
      result.length = length;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.unscope", ["npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var UNSCOPABLES = require("npm:core-js@0.9.18/modules/$.wks")('unscopables');
  if (!(UNSCOPABLES in []))
    require("npm:core-js@0.9.18/modules/$").hide(Array.prototype, UNSCOPABLES, {});
  module.exports = function(key) {
    [][UNSCOPABLES][key] = true;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.species", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      SPECIES = require("npm:core-js@0.9.18/modules/$.wks")('species');
  module.exports = function(C) {
    if ($.DESC && !(SPECIES in C))
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: $.that
      });
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.copy-within", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      toIndex = $.toIndex;
  $def($def.P, 'Array', {copyWithin: function copyWithin(target, start) {
      var O = Object($.assertDefined(this)),
          len = $.toLength(O.length),
          to = toIndex(target, len),
          from = toIndex(start, len),
          end = arguments[2],
          fin = end === undefined ? len : toIndex(end, len),
          count = Math.min(fin - from, len - to),
          inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from = from + count - 1;
        to = to + count - 1;
      }
      while (count-- > 0) {
        if (from in O)
          O[to] = O[from];
        else
          delete O[to];
        to += inc;
        from += inc;
      }
      return O;
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")('copyWithin');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.fill", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      toIndex = $.toIndex;
  $def($def.P, 'Array', {fill: function fill(value) {
      var O = Object($.assertDefined(this)),
          length = $.toLength(O.length),
          index = toIndex(arguments[1], length),
          end = arguments[2],
          endPos = end === undefined ? length : toIndex(end, length);
      while (endPos > index)
        O[index++] = value;
      return O;
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")('fill');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.find", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'find',
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@0.9.18/modules/$.array-methods")(5);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {find: function find(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.find-index", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var KEY = 'findIndex',
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      forced = true,
      $find = require("npm:core-js@0.9.18/modules/$.array-methods")(6);
  if (KEY in [])
    Array(1)[KEY](function() {
      forced = false;
    });
  $def($def.P + $def.F * forced, 'Array', {findIndex: function findIndex(callbackfn) {
      return $find(this, callbackfn, arguments[1]);
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")(KEY);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.regexp", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.replacer", "npm:core-js@0.9.18/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $RegExp = $.g.RegExp,
      Base = $RegExp,
      proto = $RegExp.prototype,
      re = /a/g,
      CORRECT_NEW = new $RegExp(re) !== re,
      ALLOWS_RE_WITH_FLAGS = function() {
        try {
          return $RegExp(re, 'i') == '/a/i';
        } catch (e) {}
      }();
  if ($.FW && $.DESC) {
    if (!CORRECT_NEW || !ALLOWS_RE_WITH_FLAGS) {
      $RegExp = function RegExp(pattern, flags) {
        var patternIsRegExp = cof(pattern) == 'RegExp',
            flagsIsUndefined = flags === undefined;
        if (!(this instanceof $RegExp) && patternIsRegExp && flagsIsUndefined)
          return pattern;
        return CORRECT_NEW ? new Base(patternIsRegExp && !flagsIsUndefined ? pattern.source : pattern, flags) : new Base(patternIsRegExp ? pattern.source : pattern, patternIsRegExp && flagsIsUndefined ? pattern.flags : flags);
      };
      $.each.call($.getNames(Base), function(key) {
        key in $RegExp || $.setDesc($RegExp, key, {
          configurable: true,
          get: function() {
            return Base[key];
          },
          set: function(it) {
            Base[key] = it;
          }
        });
      });
      proto.constructor = $RegExp;
      $RegExp.prototype = proto;
      require("npm:core-js@0.9.18/modules/$.redef")($.g, 'RegExp', $RegExp);
    }
    if (/./g.flags != 'g')
      $.setDesc(proto, 'flags', {
        configurable: true,
        get: require("npm:core-js@0.9.18/modules/$.replacer")(/^.*\/(\w*)$/, '$1')
      });
  }
  require("npm:core-js@0.9.18/modules/$.species")($RegExp);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.for-of", ["npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-call"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      get = require("npm:core-js@0.9.18/modules/$.iter").get,
      call = require("npm:core-js@0.9.18/modules/$.iter-call");
  module.exports = function(iterable, entries, fn, that) {
    var iterator = get(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        step;
    while (!(step = iterator.next()).done) {
      if (call(iterator, f, step.value, entries) === false) {
        return call.close(iterator);
      }
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.mix", ["npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $redef = require("npm:core-js@0.9.18/modules/$.redef");
  module.exports = function(target, src) {
    for (var key in src)
      $redef(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.collection-strong", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      safe = require("npm:core-js@0.9.18/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      step = require("npm:core-js@0.9.18/modules/$.iter").step,
      $has = $.has,
      set = $.set,
      isObject = $.isObject,
      hide = $.hide,
      isExtensible = Object.isExtensible || isObject,
      ID = safe('id'),
      O1 = safe('O1'),
      LAST = safe('last'),
      FIRST = safe('first'),
      ITER = safe('iter'),
      SIZE = $.DESC ? safe('size') : 'size',
      id = 0;
  function fastKey(it, create) {
    if (!isObject(it))
      return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!$has(it, ID)) {
      if (!isExtensible(it))
        return 'F';
      if (!create)
        return 'E';
      hide(it, ID, ++id);
    }
    return 'O' + it[ID];
  }
  function getEntry(that, key) {
    var index = fastKey(key),
        entry;
    if (index !== 'F')
      return that[O1][index];
    for (entry = that[FIRST]; entry; entry = entry.n) {
      if (entry.k == key)
        return entry;
    }
  }
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        assert.inst(that, C, NAME);
        set(that, O1, $.create(null));
        set(that, SIZE, 0);
        set(that, LAST, undefined);
        set(that, FIRST, undefined);
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@0.9.18/modules/$.mix")(C.prototype, {
        clear: function clear() {
          for (var that = this,
              data = that[O1],
              entry = that[FIRST]; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p)
              entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that[FIRST] = that[LAST] = undefined;
          that[SIZE] = 0;
        },
        'delete': function(key) {
          var that = this,
              entry = getEntry(that, key);
          if (entry) {
            var next = entry.n,
                prev = entry.p;
            delete that[O1][entry.i];
            entry.r = true;
            if (prev)
              prev.n = next;
            if (next)
              next.p = prev;
            if (that[FIRST] == entry)
              that[FIRST] = next;
            if (that[LAST] == entry)
              that[LAST] = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        forEach: function forEach(callbackfn) {
          var f = ctx(callbackfn, arguments[1], 3),
              entry;
          while (entry = entry ? entry.n : this[FIRST]) {
            f(entry.v, entry.k, this);
            while (entry && entry.r)
              entry = entry.p;
          }
        },
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      if ($.DESC)
        $.setDesc(C.prototype, 'size', {get: function() {
            return assert.def(this[SIZE]);
          }});
      return C;
    },
    def: function(that, key, value) {
      var entry = getEntry(that, key),
          prev,
          index;
      if (entry) {
        entry.v = value;
      } else {
        that[LAST] = entry = {
          i: index = fastKey(key, true),
          k: key,
          v: value,
          p: prev = that[LAST],
          n: undefined,
          r: false
        };
        if (!that[FIRST])
          that[FIRST] = entry;
        if (prev)
          prev.n = entry;
        that[SIZE]++;
        if (index !== 'F')
          that[O1][index] = entry;
      }
      return that;
    },
    getEntry: getEntry,
    setIter: function(C, NAME, IS_MAP) {
      require("npm:core-js@0.9.18/modules/$.iter-define")(C, NAME, function(iterated, kind) {
        set(this, ITER, {
          o: iterated,
          k: kind
        });
      }, function() {
        var iter = this[ITER],
            kind = iter.k,
            entry = iter.l;
        while (entry && entry.r)
          entry = entry.p;
        if (!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])) {
          iter.o = undefined;
          return step(1);
        }
        if (kind == 'keys')
          return step(0, entry.k);
        if (kind == 'values')
          return step(0, entry.v);
        return step(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.collection", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.species", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-detect", "npm:core-js@0.9.18/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      BUGGY = require("npm:core-js@0.9.18/modules/$.iter").BUGGY,
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      species = require("npm:core-js@0.9.18/modules/$.species"),
      assertInstance = require("npm:core-js@0.9.18/modules/$.assert").inst;
  module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = $.g[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    function fixMethod(KEY) {
      var fn = proto[KEY];
      require("npm:core-js@0.9.18/modules/$.redef")(proto, KEY, KEY == 'delete' ? function(a) {
        return fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) {
        fn.call(this, a === 0 ? 0 : a);
        return this;
      } : function set(a, b) {
        fn.call(this, a === 0 ? 0 : a, b);
        return this;
      });
    }
    if (!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      require("npm:core-js@0.9.18/modules/$.mix")(C.prototype, methods);
    } else {
      var inst = new C,
          chain = inst[ADDER](IS_WEAK ? {} : -0, 1),
          buggyZero;
      if (!require("npm:core-js@0.9.18/modules/$.iter-detect")(function(iter) {
        new C(iter);
      })) {
        C = wrapper(function(target, iterable) {
          assertInstance(target, C, NAME);
          var that = new Base;
          if (iterable != undefined)
            forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      IS_WEAK || inst.forEach(function(val, key) {
        buggyZero = 1 / key === -Infinity;
      });
      if (buggyZero) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (buggyZero || chain !== inst)
        fixMethod(ADDER);
    }
    require("npm:core-js@0.9.18/modules/$.cof").set(C, NAME);
    O[NAME] = C;
    $def($def.G + $def.W + $def.F * (C != Base), O);
    species(C);
    species($.core[NAME]);
    if (!IS_WEAK)
      common.setIter(C, NAME, IS_MAP);
    return C;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.set", ["npm:core-js@0.9.18/modules/$.collection-strong", "npm:core-js@0.9.18/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.18/modules/$.collection-strong");
  require("npm:core-js@0.9.18/modules/$.collection")('Set', function(get) {
    return function Set() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return strong.def(this, value = value === 0 ? 0 : value, value);
    }}, strong);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.collection-weak", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      safe = require("npm:core-js@0.9.18/modules/$.uid").safe,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      $has = $.has,
      isObject = $.isObject,
      hide = $.hide,
      isExtensible = Object.isExtensible || isObject,
      id = 0,
      ID = safe('id'),
      WEAK = safe('weak'),
      LEAK = safe('leak'),
      method = require("npm:core-js@0.9.18/modules/$.array-methods"),
      find = method(5),
      findIndex = method(6);
  function findFrozen(store, key) {
    return find(store.array, function(it) {
      return it[0] === key;
    });
  }
  function leakStore(that) {
    return that[LEAK] || hide(that, LEAK, {
      array: [],
      get: function(key) {
        var entry = findFrozen(this, key);
        if (entry)
          return entry[1];
      },
      has: function(key) {
        return !!findFrozen(this, key);
      },
      set: function(key, value) {
        var entry = findFrozen(this, key);
        if (entry)
          entry[1] = value;
        else
          this.array.push([key, value]);
      },
      'delete': function(key) {
        var index = findIndex(this.array, function(it) {
          return it[0] === key;
        });
        if (~index)
          this.array.splice(index, 1);
        return !!~index;
      }
    })[LEAK];
  }
  module.exports = {
    getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function(that, iterable) {
        $.set(assert.inst(that, C, NAME), ID, id++);
        if (iterable != undefined)
          forOf(iterable, IS_MAP, that[ADDER], that);
      });
      require("npm:core-js@0.9.18/modules/$.mix")(C.prototype, {
        'delete': function(key) {
          if (!isObject(key))
            return false;
          if (!isExtensible(key))
            return leakStore(this)['delete'](key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]) && delete key[WEAK][this[ID]];
        },
        has: function has(key) {
          if (!isObject(key))
            return false;
          if (!isExtensible(key))
            return leakStore(this).has(key);
          return $has(key, WEAK) && $has(key[WEAK], this[ID]);
        }
      });
      return C;
    },
    def: function(that, key, value) {
      if (!isExtensible(assert.obj(key))) {
        leakStore(that).set(key, value);
      } else {
        $has(key, WEAK) || hide(key, WEAK, {});
        key[WEAK][that[ID]] = value;
      }
      return that;
    },
    leakStore: leakStore,
    WEAK: WEAK,
    ID: ID
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.weak-set", ["npm:core-js@0.9.18/modules/$.collection-weak", "npm:core-js@0.9.18/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var weak = require("npm:core-js@0.9.18/modules/$.collection-weak");
  require("npm:core-js@0.9.18/modules/$.collection")('WeakSet', function(get) {
    return function WeakSet() {
      return get(this, arguments[0]);
    };
  }, {add: function add(value) {
      return weak.def(this, value, true);
    }}, weak, false, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.own-keys", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      assertObject = require("npm:core-js@0.9.18/modules/$.assert").obj;
  module.exports = function ownKeys(it) {
    assertObject(it);
    var keys = $.getNames(it),
        getSymbols = $.getSymbols;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.array.includes", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.array-includes", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $includes = require("npm:core-js@0.9.18/modules/$.array-includes")(true);
  $def($def.P, 'Array', {includes: function includes(el) {
      return $includes(this, el, arguments[1]);
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")('includes');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.string.at", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-at"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $at = require("npm:core-js@0.9.18/modules/$.string-at")(true);
  $def($def.P, 'String', {at: function at(pos) {
      return $at(this, pos);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.string-pad", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      repeat = require("npm:core-js@0.9.18/modules/$.string-repeat");
  module.exports = function(that, minLength, fillChar, left) {
    var S = String($.assertDefined(that));
    if (minLength === undefined)
      return S;
    var intMinLength = $.toInteger(minLength);
    var fillLen = intMinLength - S.length;
    if (fillLen < 0 || fillLen === Infinity) {
      throw new RangeError('Cannot satisfy string length ' + minLength + ' for string: ' + S);
    }
    var sFillStr = fillChar === undefined ? ' ' : String(fillChar);
    var sFillVal = repeat.call(sFillStr, Math.ceil(fillLen / sFillStr.length));
    if (sFillVal.length > fillLen)
      sFillVal = left ? sFillVal.slice(sFillVal.length - fillLen) : sFillVal.slice(0, fillLen);
    return left ? sFillVal.concat(S) : S.concat(sFillVal);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.string.rpad", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $pad = require("npm:core-js@0.9.18/modules/$.string-pad");
  $def($def.P, 'String', {rpad: function rpad(n) {
      return $pad(this, n, arguments[1], false);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.regexp.escape", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'RegExp', {escape: require("npm:core-js@0.9.18/modules/$.replacer")(/[\\^$*+?.()|[\]{}]/g, '\\$&', true)});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      ownKeys = require("npm:core-js@0.9.18/modules/$.own-keys");
  $def($def.S, 'Object', {getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = $.toObject(object),
          result = {};
      $.each.call(ownKeys(O), function(key) {
        $.setDesc(result, key, $.desc(0, $.getDesc(O, key)));
      });
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.object.to-array", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  function createObjectToArray(isEntries) {
    return function(object) {
      var O = $.toObject(object),
          keys = $.getKeys(O),
          length = keys.length,
          i = 0,
          result = Array(length),
          key;
      if (isEntries)
        while (length > i)
          result[i] = [key = keys[i++], O[key]];
      else
        while (length > i)
          result[i] = O[keys[i++]];
      return result;
    };
  }
  $def($def.S, 'Object', {
    values: createObjectToArray(false),
    entries: createObjectToArray(true)
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.collection-to-json", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of");
  module.exports = function(NAME) {
    $def($def.P, NAME, {toJSON: function toJSON() {
        var arr = [];
        forOf(this, false, arr.push, arr);
        return arr;
      }});
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.set.to-json", ["npm:core-js@0.9.18/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/$.collection-to-json")('Set');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/js.array.statics", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $Array = $.core.Array || Array,
      statics = {};
  function setStatics(keys, length) {
    $.each.call(keys.split(','), function(key) {
      if (length == undefined && key in $Array)
        statics[key] = $Array[key];
      else if (key in [])
        statics[key] = require("npm:core-js@0.9.18/modules/$.ctx")(Function.call, [][key], length);
    });
  }
  setStatics('pop,reverse,shift,keys,values,entries', 1);
  setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' + 'reduce,reduceRight,copyWithin,fill,turn');
  $def($def.S, 'Array', statics);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.partial", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      assertFunction = require("npm:core-js@0.9.18/modules/$.assert").fn;
  module.exports = function() {
    var fn = assertFunction(this),
        length = arguments.length,
        pargs = Array(length),
        i = 0,
        _ = $.path._,
        holder = false;
    while (length > i)
      if ((pargs[i] = arguments[i++]) === _)
        holder = true;
    return function() {
      var that = this,
          _length = arguments.length,
          j = 0,
          k = 0,
          args;
      if (!holder && !_length)
        return invoke(fn, pargs, that);
      args = pargs.slice();
      if (holder)
        for (; length > j; j++)
          if (args[j] === _)
            args[j] = arguments[k++];
      while (_length > k)
        args.push(arguments[k++]);
      return invoke(fn, args, that);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/web.immediate", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.task"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $task = require("npm:core-js@0.9.18/modules/$.task");
  $def($def.G + $def.B, {
    setImmediate: $task.set,
    clearImmediate: $task.clear
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/web.dom.iterable", ["npm:core-js@0.9.18/modules/es6.array.iterator", "npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/es6.array.iterator");
  var $ = require("npm:core-js@0.9.18/modules/$"),
      Iterators = require("npm:core-js@0.9.18/modules/$.iter").Iterators,
      ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      ArrayValues = Iterators.Array,
      NL = $.g.NodeList,
      HTC = $.g.HTMLCollection,
      NLProto = NL && NL.prototype,
      HTCProto = HTC && HTC.prototype;
  if ($.FW) {
    if (NL && !(ITERATOR in NLProto))
      $.hide(NLProto, ITERATOR, ArrayValues);
    if (HTC && !(ITERATOR in HTCProto))
      $.hide(HTCProto, ITERATOR, ArrayValues);
  }
  Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.dict", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign", "npm:core-js@0.9.18/modules/$.keyof", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      assign = require("npm:core-js@0.9.18/modules/$.assign"),
      keyOf = require("npm:core-js@0.9.18/modules/$.keyof"),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      step = $iter.step,
      getKeys = $.getKeys,
      toObject = $.toObject,
      has = $.has;
  function Dict(iterable) {
    var dict = $.create(null);
    if (iterable != undefined) {
      if ($iter.is(iterable)) {
        forOf(iterable, true, function(key, value) {
          dict[key] = value;
        });
      } else
        assign(dict, iterable);
    }
    return dict;
  }
  Dict.prototype = null;
  function DictIterator(iterated, kind) {
    $.set(this, ITER, {
      o: toObject(iterated),
      a: getKeys(iterated),
      i: 0,
      k: kind
    });
  }
  $iter.create(DictIterator, 'Dict', function() {
    var iter = this[ITER],
        O = iter.o,
        keys = iter.a,
        kind = iter.k,
        key;
    do {
      if (iter.i >= keys.length) {
        iter.o = undefined;
        return step(1);
      }
    } while (!has(O, key = keys[iter.i++]));
    if (kind == 'keys')
      return step(0, key);
    if (kind == 'values')
      return step(0, O[key]);
    return step(0, [key, O[key]]);
  });
  function createDictIter(kind) {
    return function(it) {
      return new DictIterator(it, kind);
    };
  }
  function generic(A, B) {
    return typeof A == 'function' ? A : B;
  }
  function createDictMethod(TYPE) {
    var IS_MAP = TYPE == 1,
        IS_EVERY = TYPE == 4;
    return function(object, callbackfn, that) {
      var f = ctx(callbackfn, that, 3),
          O = toObject(object),
          result = IS_MAP || TYPE == 7 || TYPE == 2 ? new (generic(this, Dict)) : undefined,
          key,
          val,
          res;
      for (key in O)
        if (has(O, key)) {
          val = O[key];
          res = f(val, key, object);
          if (TYPE) {
            if (IS_MAP)
              result[key] = res;
            else if (res)
              switch (TYPE) {
                case 2:
                  result[key] = val;
                  break;
                case 3:
                  return true;
                case 5:
                  return val;
                case 6:
                  return key;
                case 7:
                  result[res[0]] = res[1];
              }
            else if (IS_EVERY)
              return false;
          }
        }
      return TYPE == 3 || IS_EVERY ? IS_EVERY : result;
    };
  }
  function createDictReduce(IS_TURN) {
    return function(object, mapfn, init) {
      assert.fn(mapfn);
      var O = toObject(object),
          keys = getKeys(O),
          length = keys.length,
          i = 0,
          memo,
          key,
          result;
      if (IS_TURN) {
        memo = init == undefined ? new (generic(this, Dict)) : Object(init);
      } else if (arguments.length < 3) {
        assert(length, 'Reduce of empty object with no initial value');
        memo = O[keys[i++]];
      } else
        memo = Object(init);
      while (length > i)
        if (has(O, key = keys[i++])) {
          result = mapfn(memo, O[key], key, object);
          if (IS_TURN) {
            if (result === false)
              break;
          } else
            memo = result;
        }
      return memo;
    };
  }
  var findKey = createDictMethod(6);
  $def($def.G + $def.F, {Dict: Dict});
  $def($def.S, 'Dict', {
    keys: createDictIter('keys'),
    values: createDictIter('values'),
    entries: createDictIter('entries'),
    forEach: createDictMethod(0),
    map: createDictMethod(1),
    filter: createDictMethod(2),
    some: createDictMethod(3),
    every: createDictMethod(4),
    find: createDictMethod(5),
    findKey: findKey,
    mapPairs: createDictMethod(7),
    reduce: createDictReduce(false),
    turn: createDictReduce(true),
    keyOf: keyOf,
    includes: function(object, el) {
      return (el == el ? keyOf(object, el) : findKey(object, function(it) {
        return it != it;
      })) !== undefined;
    },
    has: has,
    get: function(object, key) {
      if (has(object, key))
        return object[key];
    },
    set: $.def,
    isDict: function(it) {
      return $.isObject(it) && $.getProto(it) === Dict.prototype;
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.iter-helpers", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.iter"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var core = require("npm:core-js@0.9.18/modules/$").core,
      $iter = require("npm:core-js@0.9.18/modules/$.iter");
  core.isIterable = $iter.is;
  core.getIterator = $iter.get;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.$for", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.iter-call", "npm:core-js@0.9.18/modules/$.mix"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      safe = require("npm:core-js@0.9.18/modules/$.uid").safe,
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
      ENTRIES = safe('entries'),
      FN = safe('fn'),
      ITER = safe('iter'),
      call = require("npm:core-js@0.9.18/modules/$.iter-call"),
      getIterator = $iter.get,
      setIterator = $iter.set,
      createIterator = $iter.create;
  function $for(iterable, entries) {
    if (!(this instanceof $for))
      return new $for(iterable, entries);
    this[ITER] = getIterator(iterable);
    this[ENTRIES] = !!entries;
  }
  createIterator($for, 'Wrapper', function() {
    return this[ITER].next();
  });
  var $forProto = $for.prototype;
  setIterator($forProto, function() {
    return this[ITER];
  });
  function createChainIterator(next) {
    function Iterator(iter, fn, that) {
      this[ITER] = getIterator(iter);
      this[ENTRIES] = iter[ENTRIES];
      this[FN] = ctx(fn, that, iter[ENTRIES] ? 2 : 1);
    }
    createIterator(Iterator, 'Chain', next, $forProto);
    setIterator(Iterator.prototype, $.that);
    return Iterator;
  }
  var MapIter = createChainIterator(function() {
    var step = this[ITER].next();
    return step.done ? step : $iter.step(0, call(this[ITER], this[FN], step.value, this[ENTRIES]));
  });
  var FilterIter = createChainIterator(function() {
    for (; ; ) {
      var step = this[ITER].next();
      if (step.done || call(this[ITER], this[FN], step.value, this[ENTRIES]))
        return step;
    }
  });
  require("npm:core-js@0.9.18/modules/$.mix")($forProto, {
    of: function(fn, that) {
      forOf(this, this[ENTRIES], fn, that);
    },
    array: function(fn, that) {
      var result = [];
      forOf(fn != undefined ? this.map(fn, that) : this, false, result.push, result);
      return result;
    },
    filter: function(fn, that) {
      return new FilterIter(this, fn, that);
    },
    map: function(fn, that) {
      return new MapIter(this, fn, that);
    }
  });
  $for.isIterable = $iter.is;
  $for.getIterator = getIterator;
  $def($def.G + $def.F, {$for: $for});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.delay", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      partial = require("npm:core-js@0.9.18/modules/$.partial");
  $def($def.G + $def.F, {delay: function(time) {
      return new ($.core.Promise || $.g.Promise)(function(resolve) {
        setTimeout(partial.call(resolve, true), time);
      });
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.function.part", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def");
  $.core._ = $.path._ = $.path._ || {};
  $def($def.P + $def.F, 'Function', {part: require("npm:core-js@0.9.18/modules/$.partial")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.object", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.own-keys", "npm:core-js@0.9.18/modules/$.cof"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      ownKeys = require("npm:core-js@0.9.18/modules/$.own-keys");
  function define(target, mixin) {
    var keys = ownKeys($.toObject(mixin)),
        length = keys.length,
        i = 0,
        key;
    while (length > i)
      $.setDesc(target, key = keys[i++], $.getDesc(mixin, key));
    return target;
  }
  $def($def.S + $def.F, 'Object', {
    isObject: $.isObject,
    classof: require("npm:core-js@0.9.18/modules/$.cof").classof,
    define: define,
    make: function(proto, mixin) {
      return define($.create(proto), mixin);
    }
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.array.turn", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.unscope"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      assertFunction = require("npm:core-js@0.9.18/modules/$.assert").fn;
  $def($def.P + $def.F, 'Array', {turn: function(fn, target) {
      assertFunction(fn);
      var memo = target == undefined ? [] : Object(target),
          O = $.ES5Object(this),
          length = $.toLength(O.length),
          index = 0;
      while (length > index)
        if (fn(memo, O[index], index++, this) === false)
          break;
      return memo;
    }});
  require("npm:core-js@0.9.18/modules/$.unscope")('turn');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.number.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter');
  require("npm:core-js@0.9.18/modules/$.iter-define")(Number, 'Number', function(iterated) {
    $.set(this, ITER, {
      l: $.toLength(iterated),
      i: 0
    });
  }, function() {
    var iter = this[ITER],
        i = iter.i++,
        done = i >= iter.l;
    return {
      done: done,
      value: done ? undefined : i
    };
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.number.math", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      methods = {};
  methods.random = function(lim) {
    var a = +this,
        b = lim == undefined ? 0 : +lim,
        m = Math.min(a, b);
    return Math.random() * (Math.max(a, b) - m) + m;
  };
  if ($.FW)
    $.each.call(('round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,' + 'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc').split(','), function(key) {
      var fn = Math[key];
      if (fn)
        methods[key] = function() {
          var args = [+this],
              i = 0;
          while (arguments.length > i)
            args.push(arguments[i++]);
          return invoke(fn, args);
        };
    });
  $def($def.P + $def.F, 'Number', methods);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.string.escape-html", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.replacer"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      replacer = require("npm:core-js@0.9.18/modules/$.replacer");
  var escapeHTMLDict = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  },
      unescapeHTMLDict = {},
      key;
  for (key in escapeHTMLDict)
    unescapeHTMLDict[escapeHTMLDict[key]] = key;
  $def($def.P + $def.F, 'String', {
    escapeHTML: replacer(/[&<>"']/g, escapeHTMLDict),
    unescapeHTML: replacer(/&(?:amp|lt|gt|quot|apos);/g, unescapeHTMLDict)
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.date", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      core = $.core,
      formatRegExp = /\b\w\w?\b/g,
      flexioRegExp = /:(.*)\|(.*)$/,
      locales = {},
      current = 'en',
      SECONDS = 'Seconds',
      MINUTES = 'Minutes',
      HOURS = 'Hours',
      DATE = 'Date',
      MONTH = 'Month',
      YEAR = 'FullYear';
  function lz(num) {
    return num > 9 ? num : '0' + num;
  }
  function createFormat(prefix) {
    return function(template, locale) {
      var that = this,
          dict = locales[$.has(locales, locale) ? locale : current];
      function get(unit) {
        return that[prefix + unit]();
      }
      return String(template).replace(formatRegExp, function(part) {
        switch (part) {
          case 's':
            return get(SECONDS);
          case 'ss':
            return lz(get(SECONDS));
          case 'm':
            return get(MINUTES);
          case 'mm':
            return lz(get(MINUTES));
          case 'h':
            return get(HOURS);
          case 'hh':
            return lz(get(HOURS));
          case 'D':
            return get(DATE);
          case 'DD':
            return lz(get(DATE));
          case 'W':
            return dict[0][get('Day')];
          case 'N':
            return get(MONTH) + 1;
          case 'NN':
            return lz(get(MONTH) + 1);
          case 'M':
            return dict[2][get(MONTH)];
          case 'MM':
            return dict[1][get(MONTH)];
          case 'Y':
            return get(YEAR);
          case 'YY':
            return lz(get(YEAR) % 100);
        }
        return part;
      });
    };
  }
  function addLocale(lang, locale) {
    function split(index) {
      var result = [];
      $.each.call(locale.months.split(','), function(it) {
        result.push(it.replace(flexioRegExp, '$' + index));
      });
      return result;
    }
    locales[lang] = [locale.weekdays.split(','), split(1), split(2)];
    return core;
  }
  $def($def.P + $def.F, DATE, {
    format: createFormat('get'),
    formatUTC: createFormat('getUTC')
  });
  addLocale(current, {
    weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    months: 'January,February,March,April,May,June,July,August,September,October,November,December'
  });
  addLocale('ru', {
    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' + 'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
  });
  core.locale = function(locale) {
    return $.has(locales, locale) ? current = locale : current;
  };
  core.addLocale = addLocale;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.global", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.G + $def.F, {global: require("npm:core-js@0.9.18/modules/$").g});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/core.log", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      log = {},
      enabled = true;
  $.each.call(('assert,clear,count,debug,dir,dirxml,error,exception,' + 'group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,' + 'markTimeline,profile,profileEnd,table,time,timeEnd,timeline,' + 'timelineEnd,timeStamp,trace,warn').split(','), function(key) {
    log[key] = function() {
      if (enabled && $.g.console && $.isFunction(console[key])) {
        return Function.apply.call(console[key], console, arguments);
      }
    };
  });
  $def($def.G + $def.F, {log: require("npm:core-js@0.9.18/modules/$.assign")(log.log, log, {
      enable: function() {
        enabled = true;
      },
      disable: function() {
        enabled = false;
      }
    })});
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/history@0.6.1/aurelia-history", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var History = (function() {
      function History() {
        _classCallCheck(this, History);
      }
      History.prototype.activate = function activate(options) {
        throw new Error('History must implement activate().');
      };
      History.prototype.deactivate = function deactivate() {
        throw new Error('History must implement deactivate().');
      };
      History.prototype.navigate = function navigate(fragment, options) {
        throw new Error('History must implement navigate().');
      };
      History.prototype.navigateBack = function navigateBack() {
        throw new Error('History must implement navigateBack().');
      };
      return History;
    })();
    exports.History = History;
  }).call(__exports, __exports);
});
})();
System.register("npm:core-js@0.9.18/modules/$", ["npm:core-js@0.9.18/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.18/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.wks", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.shared", "npm:core-js@0.9.18/modules/$.uid"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var global = require("npm:core-js@0.9.18/modules/$").g,
      store = require("npm:core-js@0.9.18/modules/$.shared")('wks');
  module.exports = function(name) {
    return store[name] || (store[name] = global.Symbol && global.Symbol[name] || require("npm:core-js@0.9.18/modules/$.uid").safe('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.def", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      global = $.g,
      core = $.core,
      isFunction = $.isFunction,
      $redef = require("npm:core-js@0.9.18/modules/$.redef");
  function ctx(fn, that) {
    return function() {
      return fn.apply(that, arguments);
    };
  }
  global.core = core;
  $def.F = 1;
  $def.G = 2;
  $def.S = 4;
  $def.P = 8;
  $def.B = 16;
  $def.W = 32;
  function $def(type, name, source) {
    var key,
        own,
        out,
        exp,
        isGlobal = type & $def.G,
        isProto = type & $def.P,
        target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {}).prototype,
        exports = isGlobal ? core : core[name] || (core[name] = {});
    if (isGlobal)
      source = name;
    for (key in source) {
      own = !(type & $def.F) && target && key in target;
      out = (own ? target : source)[key];
      if (type & $def.B && own)
        exp = ctx(out, global);
      else
        exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
      if (target && !own)
        $redef(target, key, out);
      if (exports[key] != out)
        $.hide(exports, key, exp);
      if (isProto)
        (exports.prototype || (exports.prototype = {}))[key] = out;
    }
  }
  module.exports = $def;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.ctx", ["npm:core-js@0.9.18/modules/$.assert"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assertFunction = require("npm:core-js@0.9.18/modules/$.assert").fn;
  module.exports = function(fn, that, length) {
    assertFunction(fn);
    if (~length && that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.symbol", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.shared", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.redef", "npm:core-js@0.9.18/modules/$.keyof", "npm:core-js@0.9.18/modules/$.enum-keys", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.get-names", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      setTag = require("npm:core-js@0.9.18/modules/$.cof").set,
      uid = require("npm:core-js@0.9.18/modules/$.uid"),
      shared = require("npm:core-js@0.9.18/modules/$.shared"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $redef = require("npm:core-js@0.9.18/modules/$.redef"),
      keyOf = require("npm:core-js@0.9.18/modules/$.keyof"),
      enumKeys = require("npm:core-js@0.9.18/modules/$.enum-keys"),
      assertObject = require("npm:core-js@0.9.18/modules/$.assert").obj,
      ObjectProto = Object.prototype,
      DESC = $.DESC,
      has = $.has,
      $create = $.create,
      getDesc = $.getDesc,
      setDesc = $.setDesc,
      desc = $.desc,
      $names = require("npm:core-js@0.9.18/modules/$.get-names"),
      getNames = $names.get,
      toObject = $.toObject,
      $Symbol = $.g.Symbol,
      setter = false,
      TAG = uid('tag'),
      HIDDEN = uid('hidden'),
      _propertyIsEnumerable = {}.propertyIsEnumerable,
      SymbolRegistry = shared('symbol-registry'),
      AllSymbols = shared('symbols'),
      useNative = $.isFunction($Symbol);
  var setSymbolDesc = DESC ? function() {
    try {
      return $create(setDesc({}, HIDDEN, {get: function() {
          return setDesc(this, HIDDEN, {value: false})[HIDDEN];
        }}))[HIDDEN] || setDesc;
    } catch (e) {
      return function(it, key, D) {
        var protoDesc = getDesc(ObjectProto, key);
        if (protoDesc)
          delete ObjectProto[key];
        setDesc(it, key, D);
        if (protoDesc && it !== ObjectProto)
          setDesc(ObjectProto, key, protoDesc);
      };
    }
  }() : setDesc;
  function wrap(tag) {
    var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
    DESC && setter && setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: function(value) {
        if (has(this, HIDDEN) && has(this[HIDDEN], tag))
          this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, desc(1, value));
      }
    });
    return sym;
  }
  function defineProperty(it, key, D) {
    if (D && has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!has(it, HIDDEN))
          setDesc(it, HIDDEN, desc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (has(it, HIDDEN) && it[HIDDEN][key])
          it[HIDDEN][key] = false;
        D = $create(D, {enumerable: desc(0, false)});
      }
      return setSymbolDesc(it, key, D);
    }
    return setDesc(it, key, D);
  }
  function defineProperties(it, P) {
    assertObject(it);
    var keys = enumKeys(P = toObject(P)),
        i = 0,
        l = keys.length,
        key;
    while (l > i)
      defineProperty(it, key = keys[i++], P[key]);
    return it;
  }
  function create(it, P) {
    return P === undefined ? $create(it) : defineProperties($create(it), P);
  }
  function propertyIsEnumerable(key) {
    var E = _propertyIsEnumerable.call(this, key);
    return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  }
  function getOwnPropertyDescriptor(it, key) {
    var D = getDesc(it = toObject(it), key);
    if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))
      D.enumerable = true;
    return D;
  }
  function getOwnPropertyNames(it) {
    var names = getNames(toObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (!has(AllSymbols, key = names[i++]) && key != HIDDEN)
        result.push(key);
    return result;
  }
  function getOwnPropertySymbols(it) {
    var names = getNames(toObject(it)),
        result = [],
        i = 0,
        key;
    while (names.length > i)
      if (has(AllSymbols, key = names[i++]))
        result.push(AllSymbols[key]);
    return result;
  }
  if (!useNative) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol)
        throw TypeError('Symbol is not a constructor');
      return wrap(uid(arguments[0]));
    };
    $redef($Symbol.prototype, 'toString', function() {
      return this[TAG];
    });
    $.create = create;
    $.setDesc = defineProperty;
    $.getDesc = getOwnPropertyDescriptor;
    $.setDescs = defineProperties;
    $.getNames = $names.get = getOwnPropertyNames;
    $.getSymbols = getOwnPropertySymbols;
    if ($.DESC && $.FW)
      $redef(ObjectProto, 'propertyIsEnumerable', propertyIsEnumerable, true);
  }
  var symbolStatics = {
    'for': function(key) {
      return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    keyFor: function keyFor(key) {
      return keyOf(SymbolRegistry, key);
    },
    useSetter: function() {
      setter = true;
    },
    useSimple: function() {
      setter = false;
    }
  };
  $.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function(it) {
    var sym = require("npm:core-js@0.9.18/modules/$.wks")(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  });
  setter = true;
  $def($def.G + $def.W, {Symbol: $Symbol});
  $def($def.S, 'Symbol', symbolStatics);
  $def($def.S + $def.F * !useNative, 'Object', {
    create: create,
    defineProperty: defineProperty,
    defineProperties: defineProperties,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor,
    getOwnPropertyNames: getOwnPropertyNames,
    getOwnPropertySymbols: getOwnPropertySymbols
  });
  setTag($Symbol, 'Symbol');
  setTag(Math, 'Math', true);
  setTag($.g.JSON, 'JSON', true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.assign", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Object', {assign: require("npm:core-js@0.9.18/modules/$.assign")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.is", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.same"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Object', {is: require("npm:core-js@0.9.18/modules/$.same")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.object.set-prototype-of", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.set-proto"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.S, 'Object', {setPrototypeOf: require("npm:core-js@0.9.18/modules/$.set-proto").set});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.string-at", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var set = require("npm:core-js@0.9.18/modules/$").set,
      $at = require("npm:core-js@0.9.18/modules/$.string-at")(true),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      step = $iter.step;
  require("npm:core-js@0.9.18/modules/$.iter-define")(String, 'String', function(iterated) {
    set(this, ITER, {
      o: String(iterated),
      i: 0
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        index = iter.i,
        point;
    if (index >= O.length)
      return step(1);
    point = $at(O, index);
    iter.i += point.length;
    return step(0, point);
  });
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.string.repeat", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-repeat"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $def = require("npm:core-js@0.9.18/modules/$.def");
  $def($def.P, 'String', {repeat: require("npm:core-js@0.9.18/modules/$.string-repeat")});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.from", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-call", "npm:core-js@0.9.18/modules/$.iter-detect"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      call = require("npm:core-js@0.9.18/modules/$.iter-call");
  $def($def.S + $def.F * !require("npm:core-js@0.9.18/modules/$.iter-detect")(function(iter) {
    Array.from(iter);
  }), 'Array', {from: function from(arrayLike) {
      var O = Object($.assertDefined(arrayLike)),
          mapfn = arguments[1],
          mapping = mapfn !== undefined,
          f = mapping ? ctx(mapfn, arguments[2], 2) : undefined,
          index = 0,
          length,
          result,
          step,
          iterator;
      if ($iter.is(O)) {
        iterator = $iter.get(O);
        result = new (typeof this == 'function' ? this : Array);
        for (; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
        }
      } else {
        result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
        for (; length > index; index++) {
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.iterator", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.unscope", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.iter-define"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      setUnscope = require("npm:core-js@0.9.18/modules/$.unscope"),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      step = $iter.step,
      Iterators = $iter.Iterators;
  require("npm:core-js@0.9.18/modules/$.iter-define")(Array, 'Array', function(iterated, kind) {
    $.set(this, ITER, {
      o: $.toObject(iterated),
      i: 0,
      k: kind
    });
  }, function() {
    var iter = this[ITER],
        O = iter.o,
        kind = iter.k,
        index = iter.i++;
    if (!O || index >= O.length) {
      iter.o = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  setUnscope('keys');
  setUnscope('values');
  setUnscope('entries');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.array.species", ["npm:core-js@0.9.18/modules/$.species"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/$.species")(Array);
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.map", ["npm:core-js@0.9.18/modules/$.collection-strong", "npm:core-js@0.9.18/modules/$.collection"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var strong = require("npm:core-js@0.9.18/modules/$.collection-strong");
  require("npm:core-js@0.9.18/modules/$.collection")('Map', function(get) {
    return function Map() {
      return get(this, arguments[0]);
    };
  }, {
    get: function get(key) {
      var entry = strong.getEntry(this, key);
      return entry && entry.v;
    },
    set: function set(key, value) {
      return strong.def(this, key === 0 ? 0 : key, value);
    }
  }, strong, true);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.weak-map", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.collection-weak", "npm:core-js@0.9.18/modules/$.collection", "npm:core-js@0.9.18/modules/$.redef"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $ = require("npm:core-js@0.9.18/modules/$"),
      weak = require("npm:core-js@0.9.18/modules/$.collection-weak"),
      leakStore = weak.leakStore,
      ID = weak.ID,
      WEAK = weak.WEAK,
      has = $.has,
      isObject = $.isObject,
      isExtensible = Object.isExtensible || isObject,
      tmp = {};
  var $WeakMap = require("npm:core-js@0.9.18/modules/$.collection")('WeakMap', function(get) {
    return function WeakMap() {
      return get(this, arguments[0]);
    };
  }, {
    get: function get(key) {
      if (isObject(key)) {
        if (!isExtensible(key))
          return leakStore(this).get(key);
        if (has(key, WEAK))
          return key[WEAK][this[ID]];
      }
    },
    set: function set(key, value) {
      return weak.def(this, key, value);
    }
  }, weak, true, true);
  if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
    $.each.call(['delete', 'has', 'get', 'set'], function(key) {
      var proto = $WeakMap.prototype,
          method = proto[key];
      require("npm:core-js@0.9.18/modules/$.redef")(proto, key, function(a, b) {
        if (isObject(a) && !isExtensible(a)) {
          var result = leakStore(this)[key](a, b);
          return key == 'set' ? this : result;
        }
        return method.call(this, a, b);
      });
    });
  }
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.reflect", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.set-proto", "npm:core-js@0.9.18/modules/$.iter", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.own-keys"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      setProto = require("npm:core-js@0.9.18/modules/$.set-proto"),
      $iter = require("npm:core-js@0.9.18/modules/$.iter"),
      ITERATOR = require("npm:core-js@0.9.18/modules/$.wks")('iterator'),
      ITER = require("npm:core-js@0.9.18/modules/$.uid").safe('iter'),
      step = $iter.step,
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      isObject = $.isObject,
      getProto = $.getProto,
      $Reflect = $.g.Reflect,
      _apply = Function.apply,
      assertObject = assert.obj,
      _isExtensible = Object.isExtensible || isObject,
      _preventExtensions = Object.preventExtensions,
      buggyEnumerate = !($Reflect && $Reflect.enumerate && ITERATOR in $Reflect.enumerate({}));
  function Enumerate(iterated) {
    $.set(this, ITER, {
      o: iterated,
      k: undefined,
      i: 0
    });
  }
  $iter.create(Enumerate, 'Object', function() {
    var iter = this[ITER],
        keys = iter.k,
        key;
    if (keys == undefined) {
      iter.k = keys = [];
      for (key in iter.o)
        keys.push(key);
    }
    do {
      if (iter.i >= keys.length)
        return step(1);
    } while (!((key = keys[iter.i++]) in iter.o));
    return step(0, key);
  });
  var reflect = {
    apply: function apply(target, thisArgument, argumentsList) {
      return _apply.call(target, thisArgument, argumentsList);
    },
    construct: function construct(target, argumentsList) {
      var proto = assert.fn(arguments.length < 3 ? target : arguments[2]).prototype,
          instance = $.create(isObject(proto) ? proto : Object.prototype),
          result = _apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    },
    defineProperty: function defineProperty(target, propertyKey, attributes) {
      assertObject(target);
      try {
        $.setDesc(target, propertyKey, attributes);
        return true;
      } catch (e) {
        return false;
      }
    },
    deleteProperty: function deleteProperty(target, propertyKey) {
      var desc = $.getDesc(assertObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
    get: function get(target, propertyKey) {
      var receiver = arguments.length < 3 ? target : arguments[2],
          desc = $.getDesc(assertObject(target), propertyKey),
          proto;
      if (desc)
        return $.has(desc, 'value') ? desc.value : desc.get === undefined ? undefined : desc.get.call(receiver);
      return isObject(proto = getProto(target)) ? get(proto, propertyKey, receiver) : undefined;
    },
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return $.getDesc(assertObject(target), propertyKey);
    },
    getPrototypeOf: function getPrototypeOf(target) {
      return getProto(assertObject(target));
    },
    has: function has(target, propertyKey) {
      return propertyKey in target;
    },
    isExtensible: function isExtensible(target) {
      return _isExtensible(assertObject(target));
    },
    ownKeys: require("npm:core-js@0.9.18/modules/$.own-keys"),
    preventExtensions: function preventExtensions(target) {
      assertObject(target);
      try {
        if (_preventExtensions)
          _preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    },
    set: function set(target, propertyKey, V) {
      var receiver = arguments.length < 4 ? target : arguments[3],
          ownDesc = $.getDesc(assertObject(target), propertyKey),
          existingDescriptor,
          proto;
      if (!ownDesc) {
        if (isObject(proto = getProto(target))) {
          return set(proto, propertyKey, V, receiver);
        }
        ownDesc = $.desc(0);
      }
      if ($.has(ownDesc, 'value')) {
        if (ownDesc.writable === false || !isObject(receiver))
          return false;
        existingDescriptor = $.getDesc(receiver, propertyKey) || $.desc(0);
        existingDescriptor.value = V;
        $.setDesc(receiver, propertyKey, existingDescriptor);
        return true;
      }
      return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
    }
  };
  if (setProto)
    reflect.setPrototypeOf = function setPrototypeOf(target, proto) {
      setProto.check(target, proto);
      try {
        setProto.set(target, proto);
        return true;
      } catch (e) {
        return false;
      }
    };
  $def($def.G, {Reflect: {}});
  $def($def.S + $def.F * buggyEnumerate, 'Reflect', {enumerate: function enumerate(target) {
      return new Enumerate(assertObject(target));
    }});
  $def($def.S, 'Reflect', reflect);
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.string.lpad", ["npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.string-pad"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var $def = require("npm:core-js@0.9.18/modules/$.def"),
      $pad = require("npm:core-js@0.9.18/modules/$.string-pad");
  $def($def.P, 'String', {lpad: function lpad(n) {
      return $pad(this, n, arguments[1], true);
    }});
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es7.map.to-json", ["npm:core-js@0.9.18/modules/$.collection-to-json"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/$.collection-to-json")('Map');
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/web.timers", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.partial"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      partial = require("npm:core-js@0.9.18/modules/$.partial"),
      navigator = $.g.navigator,
      MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent);
  function wrap(set) {
    return MSIE ? function(fn, time) {
      return set(invoke(partial, [].slice.call(arguments, 2), $.isFunction(fn) ? fn : Function(fn)), time);
    } : set;
  }
  $def($def.G + $def.B + $def.F * MSIE, {
    setTimeout: wrap($.g.setTimeout),
    setInterval: wrap($.g.setInterval)
  });
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/history@0.6.1", ["github:aurelia/history@0.6.1/aurelia-history"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/history@0.6.1/aurelia-history'));
});
})();
System.register("npm:core-js@0.9.18/modules/$.cof", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.wks"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      TAG = require("npm:core-js@0.9.18/modules/$.wks")('toStringTag'),
      toString = {}.toString;
  function cof(it) {
    return toString.call(it).slice(8, -1);
  }
  cof.classof = function(it) {
    var O,
        T;
    return it == undefined ? it === undefined ? 'Undefined' : 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
  };
  cof.set = function(it, tag, stat) {
    if (it && !$.has(it = stat ? it : it.prototype, TAG))
      $.hide(it, TAG, tag);
  };
  module.exports = cof;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.array-methods", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      ctx = require("npm:core-js@0.9.18/modules/$.ctx");
  module.exports = function(TYPE) {
    var IS_MAP = TYPE == 1,
        IS_FILTER = TYPE == 2,
        IS_SOME = TYPE == 3,
        IS_EVERY = TYPE == 4,
        IS_FIND_INDEX = TYPE == 6,
        NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function($this, callbackfn, that) {
      var O = Object($.assertDefined($this)),
          self = $.ES5Object(O),
          f = ctx(callbackfn, that, 3),
          length = $.toLength(self.length),
          index = 0,
          result = IS_MAP ? Array(length) : IS_FILTER ? [] : undefined,
          val,
          res;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP)
              result[index] = res;
            else if (res)
              switch (TYPE) {
                case 3:
                  return true;
                case 5:
                  return val;
                case 6:
                  return index;
                case 2:
                  result.push(val);
              }
            else if (IS_EVERY)
              return false;
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es5", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.dom-create", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.array-methods", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.array-includes", "npm:core-js@0.9.18/modules/$.replacer", "npm:core-js@0.9.18/modules/$.throws"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.18/modules/$"),
      cel = require("npm:core-js@0.9.18/modules/$.dom-create"),
      cof = require("npm:core-js@0.9.18/modules/$.cof"),
      $def = require("npm:core-js@0.9.18/modules/$.def"),
      invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
      arrayMethod = require("npm:core-js@0.9.18/modules/$.array-methods"),
      IE_PROTO = require("npm:core-js@0.9.18/modules/$.uid").safe('__proto__'),
      assert = require("npm:core-js@0.9.18/modules/$.assert"),
      assertObject = assert.obj,
      ObjectProto = Object.prototype,
      html = $.html,
      A = [],
      _slice = A.slice,
      _join = A.join,
      classof = cof.classof,
      has = $.has,
      defineProperty = $.setDesc,
      getOwnDescriptor = $.getDesc,
      defineProperties = $.setDescs,
      isFunction = $.isFunction,
      isObject = $.isObject,
      toObject = $.toObject,
      toLength = $.toLength,
      toIndex = $.toIndex,
      IE8_DOM_DEFINE = false,
      $indexOf = require("npm:core-js@0.9.18/modules/$.array-includes")(false),
      $forEach = arrayMethod(0),
      $map = arrayMethod(1),
      $filter = arrayMethod(2),
      $some = arrayMethod(3),
      $every = arrayMethod(4);
  if (!$.DESC) {
    try {
      IE8_DOM_DEFINE = defineProperty(cel('div'), 'x', {get: function() {
          return 8;
        }}).x == 8;
    } catch (e) {}
    $.setDesc = function(O, P, Attributes) {
      if (IE8_DOM_DEFINE)
        try {
          return defineProperty(O, P, Attributes);
        } catch (e) {}
      if ('get' in Attributes || 'set' in Attributes)
        throw TypeError('Accessors not supported!');
      if ('value' in Attributes)
        assertObject(O)[P] = Attributes.value;
      return O;
    };
    $.getDesc = function(O, P) {
      if (IE8_DOM_DEFINE)
        try {
          return getOwnDescriptor(O, P);
        } catch (e) {}
      if (has(O, P))
        return $.desc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
    };
    $.setDescs = defineProperties = function(O, Properties) {
      assertObject(O);
      var keys = $.getKeys(Properties),
          length = keys.length,
          i = 0,
          P;
      while (length > i)
        $.setDesc(O, P = keys[i++], Properties[P]);
      return O;
    };
  }
  $def($def.S + $def.F * !$.DESC, 'Object', {
    getOwnPropertyDescriptor: $.getDesc,
    defineProperty: $.setDesc,
    defineProperties: defineProperties
  });
  var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' + 'toLocaleString,toString,valueOf').split(','),
      keys2 = keys1.concat('length', 'prototype'),
      keysLen1 = keys1.length;
  var createDict = function() {
    var iframe = cel('iframe'),
        i = keysLen1,
        gt = '>',
        iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = 'javascript:';
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--)
      delete createDict.prototype[keys1[i]];
    return createDict();
  };
  function createGetKeys(names, length) {
    return function(object) {
      var O = toObject(object),
          i = 0,
          result = [],
          key;
      for (key in O)
        if (key != IE_PROTO)
          has(O, key) && result.push(key);
      while (length > i)
        if (has(O, key = names[i++])) {
          ~$indexOf(result, key) || result.push(key);
        }
      return result;
    };
  }
  function Empty() {}
  $def($def.S, 'Object', {
    getPrototypeOf: $.getProto = $.getProto || function(O) {
      O = Object(assert.def(O));
      if (has(O, IE_PROTO))
        return O[IE_PROTO];
      if (isFunction(O.constructor) && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    },
    getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
    create: $.create = $.create || function(O, Properties) {
      var result;
      if (O !== null) {
        Empty.prototype = assertObject(O);
        result = new Empty();
        Empty.prototype = null;
        result[IE_PROTO] = O;
      } else
        result = createDict();
      return Properties === undefined ? result : defineProperties(result, Properties);
    },
    keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false),
    seal: function seal(it) {
      return it;
    },
    freeze: function freeze(it) {
      return it;
    },
    preventExtensions: function preventExtensions(it) {
      return it;
    },
    isSealed: function isSealed(it) {
      return !isObject(it);
    },
    isFrozen: function isFrozen(it) {
      return !isObject(it);
    },
    isExtensible: function isExtensible(it) {
      return isObject(it);
    }
  });
  $def($def.P, 'Function', {bind: function(that) {
      var fn = assert.fn(this),
          partArgs = _slice.call(arguments, 1);
      function bound() {
        var args = partArgs.concat(_slice.call(arguments)),
            constr = this instanceof bound,
            ctx = constr ? $.create(fn.prototype) : that,
            result = invoke(fn, args, ctx);
        return constr ? ctx : result;
      }
      if (fn.prototype)
        bound.prototype = fn.prototype;
      return bound;
    }});
  if (!(0 in Object('z') && 'z'[0] == 'z')) {
    $.ES5Object = function(it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
  }
  var buggySlice = true;
  try {
    if (html)
      _slice.call(html);
    buggySlice = false;
  } catch (e) {}
  $def($def.P + $def.F * buggySlice, 'Array', {slice: function slice(begin, end) {
      var len = toLength(this.length),
          klass = cof(this);
      end = end === undefined ? len : end;
      if (klass == 'Array')
        return _slice.call(this, begin, end);
      var start = toIndex(begin, len),
          upTo = toIndex(end, len),
          size = toLength(upTo - start),
          cloned = Array(size),
          i = 0;
      for (; i < size; i++)
        cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
      return cloned;
    }});
  $def($def.P + $def.F * ($.ES5Object != Object), 'Array', {join: function join() {
      return _join.apply($.ES5Object(this), arguments);
    }});
  $def($def.S, 'Array', {isArray: function(arg) {
      return cof(arg) == 'Array';
    }});
  function createArrayReduce(isRight) {
    return function(callbackfn, memo) {
      assert.fn(callbackfn);
      var O = toObject(this),
          length = toLength(O.length),
          index = isRight ? length - 1 : 0,
          i = isRight ? -1 : 1;
      if (arguments.length < 2)
        for (; ; ) {
          if (index in O) {
            memo = O[index];
            index += i;
            break;
          }
          index += i;
          assert(isRight ? index >= 0 : length > index, 'Reduce of empty array with no initial value');
        }
      for (; isRight ? index >= 0 : length > index; index += i)
        if (index in O) {
          memo = callbackfn(memo, O[index], index, this);
        }
      return memo;
    };
  }
  $def($def.P, 'Array', {
    forEach: $.each = $.each || function forEach(callbackfn) {
      return $forEach(this, callbackfn, arguments[1]);
    },
    map: function map(callbackfn) {
      return $map(this, callbackfn, arguments[1]);
    },
    filter: function filter(callbackfn) {
      return $filter(this, callbackfn, arguments[1]);
    },
    some: function some(callbackfn) {
      return $some(this, callbackfn, arguments[1]);
    },
    every: function every(callbackfn) {
      return $every(this, callbackfn, arguments[1]);
    },
    reduce: createArrayReduce(false),
    reduceRight: createArrayReduce(true),
    indexOf: function indexOf(el) {
      return $indexOf(this, el, arguments[1]);
    },
    lastIndexOf: function(el, fromIndex) {
      var O = toObject(this),
          length = toLength(O.length),
          index = length - 1;
      if (arguments.length > 1)
        index = Math.min(index, $.toInteger(fromIndex));
      if (index < 0)
        index = toLength(length + index);
      for (; index >= 0; index--)
        if (index in O)
          if (O[index] === el)
            return index;
      return -1;
    }
  });
  $def($def.P, 'String', {trim: require("npm:core-js@0.9.18/modules/$.replacer")(/^\s*([\s\S]*\S)?\s*$/, '$1')});
  $def($def.S, 'Date', {now: function() {
      return +new Date;
    }});
  function lz(num) {
    return num > 9 ? num : '0' + num;
  }
  var date = new Date(-5e13 - 1),
      brokenDate = !(date.toISOString && date.toISOString() == '0385-07-25T07:06:39.999Z' && require("npm:core-js@0.9.18/modules/$.throws")(function() {
        new Date(NaN).toISOString();
      }));
  $def($def.P + $def.F * brokenDate, 'Date', {toISOString: function() {
      if (!isFinite(this))
        throw RangeError('Invalid time value');
      var d = this,
          y = d.getUTCFullYear(),
          m = d.getUTCMilliseconds(),
          s = y < 0 ? '-' : y > 9999 ? '+' : '';
      return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
    }});
  if (classof(function() {
    return arguments;
  }()) == 'Object')
    cof.classof = function(it) {
      var tag = classof(it);
      return tag == 'Object' && isFunction(it.callee) ? 'Arguments' : tag;
    };
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/$.task", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.invoke", "npm:core-js@0.9.18/modules/$.dom-create", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.18/modules/$"),
        ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
        cof = require("npm:core-js@0.9.18/modules/$.cof"),
        invoke = require("npm:core-js@0.9.18/modules/$.invoke"),
        cel = require("npm:core-js@0.9.18/modules/$.dom-create"),
        global = $.g,
        isFunction = $.isFunction,
        html = $.html,
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    function run() {
      var id = +this;
      if ($.has(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    }
    function listner(event) {
      run.call(event.data);
    }
    if (!isFunction(setTask) || !isFunction(clearTask)) {
      setTask = function(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(isFunction(fn) ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function(id) {
        delete queue[id];
      };
      if (cof(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (global.addEventListener && isFunction(global.postMessage) && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id, '*');
        };
        global.addEventListener('message', listner, false);
      } else if (isFunction(MessageChannel)) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/modules/es6.promise", ["npm:core-js@0.9.18/modules/$", "npm:core-js@0.9.18/modules/$.ctx", "npm:core-js@0.9.18/modules/$.cof", "npm:core-js@0.9.18/modules/$.def", "npm:core-js@0.9.18/modules/$.assert", "npm:core-js@0.9.18/modules/$.for-of", "npm:core-js@0.9.18/modules/$.set-proto", "npm:core-js@0.9.18/modules/$.same", "npm:core-js@0.9.18/modules/$.species", "npm:core-js@0.9.18/modules/$.wks", "npm:core-js@0.9.18/modules/$.uid", "npm:core-js@0.9.18/modules/$.task", "npm:core-js@0.9.18/modules/$.mix", "npm:core-js@0.9.18/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = require("npm:core-js@0.9.18/modules/$"),
        ctx = require("npm:core-js@0.9.18/modules/$.ctx"),
        cof = require("npm:core-js@0.9.18/modules/$.cof"),
        $def = require("npm:core-js@0.9.18/modules/$.def"),
        assert = require("npm:core-js@0.9.18/modules/$.assert"),
        forOf = require("npm:core-js@0.9.18/modules/$.for-of"),
        setProto = require("npm:core-js@0.9.18/modules/$.set-proto").set,
        same = require("npm:core-js@0.9.18/modules/$.same"),
        species = require("npm:core-js@0.9.18/modules/$.species"),
        SPECIES = require("npm:core-js@0.9.18/modules/$.wks")('species'),
        RECORD = require("npm:core-js@0.9.18/modules/$.uid").safe('record'),
        PROMISE = 'Promise',
        global = $.g,
        process = global.process,
        isNode = cof(process) == 'process',
        asap = process && process.nextTick || require("npm:core-js@0.9.18/modules/$.task").set,
        P = global[PROMISE],
        isFunction = $.isFunction,
        isObject = $.isObject,
        assertFunction = assert.fn,
        assertObject = assert.obj,
        Wrapper;
    function testResolve(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    }
    var useNative = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = isFunction(P) && isFunction(P.resolve) && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $.DESC) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    function isPromise(it) {
      return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
    }
    function sameConstructor(a, b) {
      if (!$.FW && a === P && b === Wrapper)
        return true;
      return same(a, b);
    }
    function getConstructor(C) {
      var S = assertObject(C)[SPECIES];
      return S != undefined ? S : C;
    }
    function isThenable(it) {
      var then;
      if (isObject(it))
        then = it.then;
      return isFunction(then) ? then : false;
    }
    function notify(record) {
      var chain = record.c;
      if (chain.length)
        asap.call(global, function() {
          var value = record.v,
              ok = record.s == 1,
              i = 0;
          function run(react) {
            var cb = ok ? react.ok : react.fail,
                ret,
                then;
            try {
              if (cb) {
                if (!ok)
                  record.h = true;
                ret = cb === true ? value : cb(value);
                if (ret === react.P) {
                  react.rej(TypeError('Promise-chain cycle'));
                } else if (then = isThenable(ret)) {
                  then.call(ret, react.res, react.rej);
                } else
                  react.res(ret);
              } else
                react.rej(value);
            } catch (err) {
              react.rej(err);
            }
          }
          while (chain.length > i)
            run(chain[i++]);
          chain.length = 0;
        });
    }
    function isUnhandled(promise) {
      var record = promise[RECORD],
          chain = record.a || record.c,
          i = 0,
          react;
      if (record.h)
        return false;
      while (chain.length > i) {
        react = chain[i++];
        if (react.fail || !isUnhandled(react.P))
          return false;
      }
      return true;
    }
    function $reject(value) {
      var record = this,
          promise;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      setTimeout(function() {
        asap.call(global, function() {
          if (isUnhandled(promise = record.p)) {
            if (isNode) {
              process.emit('unhandledRejection', value, promise);
            } else if (global.console && console.error) {
              console.error('Unhandled promise rejection', value);
            }
          }
          record.a = undefined;
        });
      }, 1);
      notify(record);
    }
    function $resolve(value) {
      var record = this,
          then;
      if (record.d)
        return ;
      record.d = true;
      record = record.r || record;
      try {
        if (then = isThenable(value)) {
          asap.call(global, function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    }
    if (!useNative) {
      P = function Promise(executor) {
        assertFunction(executor);
        var record = {
          p: assert.inst(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false
        };
        $.hide(this, RECORD, record);
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      require("npm:core-js@0.9.18/modules/$.mix")(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var S = assertObject(assertObject(this).constructor)[SPECIES];
          var react = {
            ok: isFunction(onFulfilled) ? onFulfilled : true,
            fail: isFunction(onRejected) ? onRejected : false
          };
          var promise = react.P = new (S != undefined ? S : P)(function(res, rej) {
            react.res = assertFunction(res);
            react.rej = assertFunction(rej);
          });
          var record = this[RECORD];
          record.c.push(react);
          if (record.a)
            record.a.push(react);
          if (record.s)
            notify(record);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $def($def.G + $def.W + $def.F * !useNative, {Promise: P});
    cof.set(P, PROMISE);
    species(P);
    species(Wrapper = $.core[PROMISE]);
    $def($def.S + $def.F * !useNative, PROMISE, {reject: function reject(r) {
        return new (getConstructor(this))(function(res, rej) {
          rej(r);
        });
      }});
    $def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        return isPromise(x) && sameConstructor(x.constructor, this) ? x : new this(function(res) {
          res(x);
        });
      }});
    $def($def.S + $def.F * !(useNative && require("npm:core-js@0.9.18/modules/$.iter-detect")(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            values = [];
        return new C(function(res, rej) {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              C.resolve(promise).then(function(value) {
                results[index] = value;
                --remaining || res(results);
              }, rej);
            });
          else
            res(results);
        });
      },
      race: function race(iterable) {
        var C = getConstructor(this);
        return new C(function(res, rej) {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(res, rej);
          });
        });
      }
    });
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/shim", ["npm:core-js@0.9.18/modules/es5", "npm:core-js@0.9.18/modules/es6.symbol", "npm:core-js@0.9.18/modules/es6.object.assign", "npm:core-js@0.9.18/modules/es6.object.is", "npm:core-js@0.9.18/modules/es6.object.set-prototype-of", "npm:core-js@0.9.18/modules/es6.object.to-string", "npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives", "npm:core-js@0.9.18/modules/es6.function.name", "npm:core-js@0.9.18/modules/es6.function.has-instance", "npm:core-js@0.9.18/modules/es6.number.constructor", "npm:core-js@0.9.18/modules/es6.number.statics", "npm:core-js@0.9.18/modules/es6.math", "npm:core-js@0.9.18/modules/es6.string.from-code-point", "npm:core-js@0.9.18/modules/es6.string.raw", "npm:core-js@0.9.18/modules/es6.string.iterator", "npm:core-js@0.9.18/modules/es6.string.code-point-at", "npm:core-js@0.9.18/modules/es6.string.ends-with", "npm:core-js@0.9.18/modules/es6.string.includes", "npm:core-js@0.9.18/modules/es6.string.repeat", "npm:core-js@0.9.18/modules/es6.string.starts-with", "npm:core-js@0.9.18/modules/es6.array.from", "npm:core-js@0.9.18/modules/es6.array.of", "npm:core-js@0.9.18/modules/es6.array.iterator", "npm:core-js@0.9.18/modules/es6.array.species", "npm:core-js@0.9.18/modules/es6.array.copy-within", "npm:core-js@0.9.18/modules/es6.array.fill", "npm:core-js@0.9.18/modules/es6.array.find", "npm:core-js@0.9.18/modules/es6.array.find-index", "npm:core-js@0.9.18/modules/es6.regexp", "npm:core-js@0.9.18/modules/es6.promise", "npm:core-js@0.9.18/modules/es6.map", "npm:core-js@0.9.18/modules/es6.set", "npm:core-js@0.9.18/modules/es6.weak-map", "npm:core-js@0.9.18/modules/es6.weak-set", "npm:core-js@0.9.18/modules/es6.reflect", "npm:core-js@0.9.18/modules/es7.array.includes", "npm:core-js@0.9.18/modules/es7.string.at", "npm:core-js@0.9.18/modules/es7.string.lpad", "npm:core-js@0.9.18/modules/es7.string.rpad", "npm:core-js@0.9.18/modules/es7.regexp.escape", "npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors", "npm:core-js@0.9.18/modules/es7.object.to-array", "npm:core-js@0.9.18/modules/es7.map.to-json", "npm:core-js@0.9.18/modules/es7.set.to-json", "npm:core-js@0.9.18/modules/js.array.statics", "npm:core-js@0.9.18/modules/web.timers", "npm:core-js@0.9.18/modules/web.immediate", "npm:core-js@0.9.18/modules/web.dom.iterable", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/modules/es5");
  require("npm:core-js@0.9.18/modules/es6.symbol");
  require("npm:core-js@0.9.18/modules/es6.object.assign");
  require("npm:core-js@0.9.18/modules/es6.object.is");
  require("npm:core-js@0.9.18/modules/es6.object.set-prototype-of");
  require("npm:core-js@0.9.18/modules/es6.object.to-string");
  require("npm:core-js@0.9.18/modules/es6.object.statics-accept-primitives");
  require("npm:core-js@0.9.18/modules/es6.function.name");
  require("npm:core-js@0.9.18/modules/es6.function.has-instance");
  require("npm:core-js@0.9.18/modules/es6.number.constructor");
  require("npm:core-js@0.9.18/modules/es6.number.statics");
  require("npm:core-js@0.9.18/modules/es6.math");
  require("npm:core-js@0.9.18/modules/es6.string.from-code-point");
  require("npm:core-js@0.9.18/modules/es6.string.raw");
  require("npm:core-js@0.9.18/modules/es6.string.iterator");
  require("npm:core-js@0.9.18/modules/es6.string.code-point-at");
  require("npm:core-js@0.9.18/modules/es6.string.ends-with");
  require("npm:core-js@0.9.18/modules/es6.string.includes");
  require("npm:core-js@0.9.18/modules/es6.string.repeat");
  require("npm:core-js@0.9.18/modules/es6.string.starts-with");
  require("npm:core-js@0.9.18/modules/es6.array.from");
  require("npm:core-js@0.9.18/modules/es6.array.of");
  require("npm:core-js@0.9.18/modules/es6.array.iterator");
  require("npm:core-js@0.9.18/modules/es6.array.species");
  require("npm:core-js@0.9.18/modules/es6.array.copy-within");
  require("npm:core-js@0.9.18/modules/es6.array.fill");
  require("npm:core-js@0.9.18/modules/es6.array.find");
  require("npm:core-js@0.9.18/modules/es6.array.find-index");
  require("npm:core-js@0.9.18/modules/es6.regexp");
  require("npm:core-js@0.9.18/modules/es6.promise");
  require("npm:core-js@0.9.18/modules/es6.map");
  require("npm:core-js@0.9.18/modules/es6.set");
  require("npm:core-js@0.9.18/modules/es6.weak-map");
  require("npm:core-js@0.9.18/modules/es6.weak-set");
  require("npm:core-js@0.9.18/modules/es6.reflect");
  require("npm:core-js@0.9.18/modules/es7.array.includes");
  require("npm:core-js@0.9.18/modules/es7.string.at");
  require("npm:core-js@0.9.18/modules/es7.string.lpad");
  require("npm:core-js@0.9.18/modules/es7.string.rpad");
  require("npm:core-js@0.9.18/modules/es7.regexp.escape");
  require("npm:core-js@0.9.18/modules/es7.object.get-own-property-descriptors");
  require("npm:core-js@0.9.18/modules/es7.object.to-array");
  require("npm:core-js@0.9.18/modules/es7.map.to-json");
  require("npm:core-js@0.9.18/modules/es7.set.to-json");
  require("npm:core-js@0.9.18/modules/js.array.statics");
  require("npm:core-js@0.9.18/modules/web.timers");
  require("npm:core-js@0.9.18/modules/web.immediate");
  require("npm:core-js@0.9.18/modules/web.dom.iterable");
  module.exports = require("npm:core-js@0.9.18/modules/$").core;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18/index", ["npm:core-js@0.9.18/shim", "npm:core-js@0.9.18/modules/core.dict", "npm:core-js@0.9.18/modules/core.iter-helpers", "npm:core-js@0.9.18/modules/core.$for", "npm:core-js@0.9.18/modules/core.delay", "npm:core-js@0.9.18/modules/core.function.part", "npm:core-js@0.9.18/modules/core.object", "npm:core-js@0.9.18/modules/core.array.turn", "npm:core-js@0.9.18/modules/core.number.iterator", "npm:core-js@0.9.18/modules/core.number.math", "npm:core-js@0.9.18/modules/core.string.escape-html", "npm:core-js@0.9.18/modules/core.date", "npm:core-js@0.9.18/modules/core.global", "npm:core-js@0.9.18/modules/core.log", "npm:core-js@0.9.18/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  require("npm:core-js@0.9.18/shim");
  require("npm:core-js@0.9.18/modules/core.dict");
  require("npm:core-js@0.9.18/modules/core.iter-helpers");
  require("npm:core-js@0.9.18/modules/core.$for");
  require("npm:core-js@0.9.18/modules/core.delay");
  require("npm:core-js@0.9.18/modules/core.function.part");
  require("npm:core-js@0.9.18/modules/core.object");
  require("npm:core-js@0.9.18/modules/core.array.turn");
  require("npm:core-js@0.9.18/modules/core.number.iterator");
  require("npm:core-js@0.9.18/modules/core.number.math");
  require("npm:core-js@0.9.18/modules/core.string.escape-html");
  require("npm:core-js@0.9.18/modules/core.date");
  require("npm:core-js@0.9.18/modules/core.global");
  require("npm:core-js@0.9.18/modules/core.log");
  module.exports = require("npm:core-js@0.9.18/modules/$").core;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.18", ["npm:core-js@0.9.18/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:core-js@0.9.18/index");
  global.define = __define;
  return module.exports;
});

(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/history-browser@0.6.2/aurelia-history-browser", ["npm:core-js@0.9.18", "github:aurelia/history@0.6.1"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaHistory) {
    'use strict';
    exports.__esModule = true;
    exports.configure = configure;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    var _core = _interopRequireDefault(_coreJs);
    var routeStripper = /^#?\/*|\s+$/g;
    var rootStripper = /^\/+|\/+$/g;
    var isExplorer = /msie [\w.]+/;
    var trailingSlash = /\/$/;
    var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
    function updateHash(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        location.hash = '#' + fragment;
      }
    }
    var BrowserHistory = (function(_History) {
      function BrowserHistory() {
        _classCallCheck(this, BrowserHistory);
        _History.call(this);
        this.interval = 50;
        this.active = false;
        this.previousFragment = '';
        this._checkUrlCallback = this.checkUrl.bind(this);
        if (typeof window !== 'undefined') {
          this.location = window.location;
          this.history = window.history;
        }
      }
      _inherits(BrowserHistory, _History);
      BrowserHistory.prototype.getHash = function getHash(window) {
        var match = (window || this).location.href.match(/#(.*)$/);
        return match ? match[1] : '';
      };
      BrowserHistory.prototype.getFragment = function getFragment(fragment, forcePushState) {
        var root;
        if (!fragment) {
          if (this._hasPushState || !this._wantsHashChange || forcePushState) {
            fragment = this.location.pathname + this.location.search;
            root = this.root.replace(trailingSlash, '');
            if (!fragment.indexOf(root)) {
              fragment = fragment.substr(root.length);
            }
          } else {
            fragment = this.getHash();
          }
        }
        return '/' + fragment.replace(routeStripper, '');
      };
      BrowserHistory.prototype.activate = function activate(options) {
        if (this.active) {
          throw new Error('History has already been activated.');
        }
        this.active = true;
        this.options = Object.assign({}, {root: '/'}, this.options, options);
        this.root = this.options.root;
        this._wantsHashChange = this.options.hashChange !== false;
        this._wantsPushState = !!this.options.pushState;
        this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        var fragment = this.getFragment();
        this.root = ('/' + this.root + '/').replace(rootStripper, '/');
        if (this._hasPushState) {
          window.onpopstate = this._checkUrlCallback;
        } else if (this._wantsHashChange && 'onhashchange' in window) {
          window.addEventListener('hashchange', this._checkUrlCallback);
        } else if (this._wantsHashChange) {
          this._checkUrlTimer = setTimeout(this._checkUrlCallback, this.interval);
        }
        this.fragment = fragment;
        var loc = this.location;
        var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;
        if (this._wantsHashChange && this._wantsPushState) {
          if (!this._hasPushState && !atRoot) {
            this.fragment = this.getFragment(null, true);
            this.location.replace(this.root + this.location.search + '#' + this.fragment);
            return true;
          } else if (this._hasPushState && atRoot && loc.hash) {
            this.fragment = this.getHash().replace(routeStripper, '');
            this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
          }
        }
        if (!this.options.silent) {
          return this.loadUrl();
        }
      };
      BrowserHistory.prototype.deactivate = function deactivate() {
        window.onpopstate = null;
        window.removeEventListener('hashchange', this._checkUrlCallback);
        clearTimeout(this._checkUrlTimer);
        this.active = false;
      };
      BrowserHistory.prototype.checkUrl = function checkUrl() {
        var current = this.getFragment();
        if (this._checkUrlTimer) {
          clearTimeout(this._checkUrlTimer);
          this._checkUrlTimer = setTimeout(this._checkUrlCallback, this.interval);
        }
        if (current === this.fragment && this.iframe) {
          current = this.getFragment(this.getHash(this.iframe));
        }
        if (current === this.fragment) {
          return false;
        }
        if (this.iframe) {
          this.navigate(current, false);
        }
        this.loadUrl();
      };
      BrowserHistory.prototype.loadUrl = function loadUrl(fragmentOverride) {
        var fragment = this.fragment = this.getFragment(fragmentOverride);
        return this.options.routeHandler ? this.options.routeHandler(fragment) : false;
      };
      BrowserHistory.prototype.navigate = function navigate(fragment, options) {
        if (fragment && absoluteUrl.test(fragment)) {
          window.location.href = fragment;
          return true;
        }
        if (!this.active) {
          return false;
        }
        if (options === undefined) {
          options = {trigger: true};
        } else if (typeof options === 'boolean') {
          options = {trigger: options};
        }
        fragment = this.getFragment(fragment || '');
        if (this.fragment === fragment) {
          return ;
        }
        this.fragment = fragment;
        var url = this.root + fragment;
        if (fragment === '' && url !== '/') {
          url = url.slice(0, -1);
        }
        if (this._hasPushState) {
          url = url.replace('//', '/');
          this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
        } else if (this._wantsHashChange) {
          updateHash(this.location, fragment, options.replace);
          if (this.iframe && fragment !== this.getFragment(this.getHash(this.iframe))) {
            if (!options.replace) {
              this.iframe.document.open().close();
            }
            updateHash(this.iframe.location, fragment, options.replace);
          }
        } else {
          return this.location.assign(url);
        }
        if (options.trigger) {
          return this.loadUrl(fragment);
        } else {
          this.previousFragment = fragment;
        }
      };
      BrowserHistory.prototype.navigateBack = function navigateBack() {
        this.history.back();
      };
      return BrowserHistory;
    })(_aureliaHistory.History);
    exports.BrowserHistory = BrowserHistory;
    function configure(aurelia) {
      aurelia.withSingleton(_aureliaHistory.History, BrowserHistory);
    }
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/history@0.6.1'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/history-browser@0.6.2", ["github:aurelia/history-browser@0.6.2/aurelia-history-browser"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/history-browser@0.6.2/aurelia-history-browser'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/path@0.8.1/aurelia-path", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    exports.relativeToFile = relativeToFile;
    exports.join = join;
    exports.buildQueryString = buildQueryString;
    function trimDots(ary) {
      var i,
          part;
      for (i = 0; i < ary.length; ++i) {
        part = ary[i];
        if (part === '.') {
          ary.splice(i, 1);
          i -= 1;
        } else if (part === '..') {
          if (i === 0 || i == 1 && ary[2] === '..' || ary[i - 1] === '..') {
            continue;
          } else if (i > 0) {
            ary.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
    }
    function relativeToFile(name, file) {
      var lastIndex,
          normalizedBaseParts,
          fileParts = file && file.split('/'),
          nameParts = name.trim().split('/');
      if (nameParts[0].charAt(0) === '.' && fileParts) {
        normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
        nameParts = normalizedBaseParts.concat(nameParts);
      }
      trimDots(nameParts);
      return nameParts.join('/');
    }
    function join(path1, path2) {
      var url1,
          url2,
          url3,
          i,
          ii,
          urlPrefix,
          trailingSlash;
      if (!path1) {
        return path2;
      }
      if (!path2) {
        return path1;
      }
      urlPrefix = path1.indexOf('//') === 0 ? '//' : path1.indexOf('/') === 0 ? '/' : '';
      trailingSlash = path2.slice(-1) == '/' ? '/' : '';
      url1 = path1.split('/');
      url2 = path2.split('/');
      url3 = [];
      for (i = 0, ii = url1.length; i < ii; ++i) {
        if (url1[i] == '..') {
          url3.pop();
        } else if (url1[i] == '.' || url1[i] == '') {
          continue;
        } else {
          url3.push(url1[i]);
        }
      }
      for (i = 0, ii = url2.length; i < ii; ++i) {
        if (url2[i] == '..') {
          url3.pop();
        } else if (url2[i] == '.' || url2[i] == '') {
          continue;
        } else {
          url3.push(url2[i]);
        }
      }
      return urlPrefix + url3.join('/').replace(/\:\//g, '://') + trailingSlash;
    }
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name, i) {
      class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    function type(obj) {
      if (obj == null) {
        return obj + '';
      }
      return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
    }
    function buildQueryString(a, traditional) {
      var s = [],
          add = function add(key, value) {
            value = typeof value === 'function' ? value() : value == null ? '' : value;
            s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
          };
      for (var prefix in a) {
        _buildQueryString(prefix, a[prefix], traditional, add);
      }
      return s.join('&').replace(r20, '+');
    }
    function _buildQueryString(prefix, obj, traditional, add) {
      if (Array.isArray(obj)) {
        obj.forEach(function(v, i) {
          if (traditional || rbracket.test(prefix)) {
            add(prefix, v);
          } else {
            _buildQueryString(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
          }
        });
      } else if (!traditional && type(obj) === 'object') {
        for (var _name in obj) {
          _buildQueryString(prefix + '[' + _name + ']', obj[_name], traditional, add);
        }
      } else {
        add(prefix, obj);
      }
    }
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/path@0.8.1", ["github:aurelia/path@0.8.1/aurelia-path"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/path@0.8.1/aurelia-path'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/loader@0.8.3/aurelia-loader", ["npm:core-js@0.9.18", "github:aurelia/path@0.8.1", "github:aurelia/metadata@0.7.2"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPath, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var TemplateDependency = function TemplateDependency(src, name) {
      _classCallCheck(this, TemplateDependency);
      this.src = src;
      this.name = name;
    };
    exports.TemplateDependency = TemplateDependency;
    var TemplateRegistryEntry = (function() {
      function TemplateRegistryEntry(id) {
        _classCallCheck(this, TemplateRegistryEntry);
        this.id = id;
        this.template = null;
        this.dependencies = null;
        this.resources = null;
        this.factory = null;
      }
      TemplateRegistryEntry.prototype.setTemplate = function setTemplate(template) {
        var id = this.id,
            useResources,
            i,
            ii,
            current,
            src;
        this.template = template;
        useResources = template.content.querySelectorAll('require');
        this.dependencies = new Array(useResources.length);
        if (useResources.length === 0) {
          return ;
        }
        for (i = 0, ii = useResources.length; i < ii; ++i) {
          current = useResources[i];
          src = current.getAttribute('from');
          if (!src) {
            throw new Error('<require> element in ' + this.id + ' has no "from" attribute.');
          }
          this.dependencies[i] = new TemplateDependency(_aureliaPath.relativeToFile(src, id), current.getAttribute('as'));
          if (current.parentNode) {
            current.parentNode.removeChild(current);
          }
        }
      };
      TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
        if (typeof src === 'string') {
          this.dependencies.push(new TemplateDependency(_aureliaPath.relativeToFile(src, this.id), name));
        } else if (typeof src === 'function') {
          var origin = _aureliaMetadata.Origin.get(src);
          this.dependencies.push(new TemplateDependency(origin.moduleId, name));
        }
      };
      TemplateRegistryEntry.prototype.setResources = function setResources(resources) {
        this.resources = resources;
      };
      TemplateRegistryEntry.prototype.setFactory = function setFactory(factory) {
        this.factory = factory;
      };
      _createClass(TemplateRegistryEntry, [{
        key: 'templateIsLoaded',
        get: function get() {
          return this.template !== null;
        }
      }, {
        key: 'isReady',
        get: function get() {
          return this.factory !== null;
        }
      }]);
      return TemplateRegistryEntry;
    })();
    exports.TemplateRegistryEntry = TemplateRegistryEntry;
    var hasTemplateElement = ('content' in document.createElement('template'));
    function importElements(frag, link, callback) {
      if (frag) {
        document.head.appendChild(frag);
      }
      if (window.Polymer && Polymer.whenReady) {
        Polymer.whenReady(callback);
      } else {
        link.addEventListener('load', callback);
      }
    }
    var Loader = (function() {
      function Loader() {
        _classCallCheck(this, Loader);
        this.templateRegistry = {};
        this.needsBundleCheck = true;
      }
      Loader.prototype.loadModule = function loadModule(id) {
        throw new Error('Loaders must implement loadModule(id).');
      };
      Loader.prototype.loadAllModules = function loadAllModules(ids) {
        throw new Error('Loader must implement loadAllModules(ids).');
      };
      Loader.prototype.loadTemplate = function loadTemplate(url) {
        throw new Error('Loader must implement loadTemplate(url).');
      };
      Loader.prototype.loadText = function loadText(url) {
        throw new Error('Loader must implement loadText(url).');
      };
      Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(id) {
        var entry = this.templateRegistry[id];
        if (entry === undefined) {
          this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
        }
        return entry;
      };
      Loader.prototype.importDocument = function importDocument(url) {
        return new Promise(function(resolve, reject) {
          var frag = document.createDocumentFragment();
          var link = document.createElement('link');
          link.rel = 'import';
          link.href = url;
          frag.appendChild(link);
          importElements(frag, link, function() {
            return resolve(link['import']);
          });
        });
      };
      Loader.prototype.importBundle = function importBundle(link) {
        return new Promise(function(resolve, reject) {
          if (link['import']) {
            if (!hasTemplateElement) {
              HTMLTemplateElement.bootstrap(link['import']);
            }
            resolve(link['import']);
          } else {
            importElements(null, link, function() {
              if (!hasTemplateElement) {
                HTMLTemplateElement.bootstrap(link['import']);
              }
              resolve(link['import']);
            });
          }
        });
      };
      Loader.prototype.importTemplate = function importTemplate(url) {
        var _this = this;
        return this.importDocument(url).then(function(doc) {
          return _this.findTemplate(doc, url);
        });
      };
      Loader.prototype.findTemplate = function findTemplate(doc, url) {
        if (!hasTemplateElement) {
          HTMLTemplateElement.bootstrap(doc);
        }
        var template = doc.getElementsByTagName('template')[0];
        if (!template) {
          throw new Error('There was no template element found in \'' + url + '\'.');
        }
        return template;
      };
      Loader.prototype._tryGetTemplateFromBundle = function _tryGetTemplateFromBundle(name, entry) {
        var found = this.bundle.getElementById(name);
        if (found) {
          entry.setTemplate(found);
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      };
      Loader.prototype.findBundledTemplate = function findBundledTemplate(name, entry) {
        var _this2 = this;
        if (this.bundle) {
          return this._tryGetTemplateFromBundle(name, entry);
        } else if (this.onBundleReady) {
          return this.onBundleReady.then(function() {
            return _this2._tryGetTemplateFromBundle(name, entry);
          });
        } else if (this.needsBundleCheck) {
          var bundleLink = document.querySelector('link[aurelia-view-bundle]');
          this.needsBundleCheck = false;
          if (bundleLink) {
            this.onBundleReady = this.importBundle(bundleLink).then(function(doc) {
              _this2.bundle = doc;
              _this2.onBundleReady = null;
            });
            return this.onBundleReady.then(function() {
              return _this2._tryGetTemplateFromBundle(name, entry);
            });
          }
        }
        return Promise.resolve(false);
      };
      return Loader;
    })();
    exports.Loader = Loader;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/path@0.8.1'), __require('github:aurelia/metadata@0.7.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/loader@0.8.3", ["github:aurelia/loader@0.8.3/aurelia-loader"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/loader@0.8.3/aurelia-loader'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/metadata@0.7.2/aurelia-metadata", ["npm:core-js@0.9.18"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var theGlobal = (function() {
      if (typeof self !== 'undefined') {
        return self;
      }
      if (typeof global !== 'undefined') {
        return global;
      }
      return new Function('return this')();
    })();
    var emptyMetadata = Object.freeze({});
    var metadataContainerKey = '__metadata__';
    if (typeof theGlobal.System === 'undefined') {
      theGlobal.System = {isFake: true};
    }
    if (typeof theGlobal.System.forEachModule === 'undefined') {
      theGlobal.System.forEachModule = function() {};
    }
    if (typeof theGlobal.Reflect === 'undefined') {
      theGlobal.Reflect = {};
    }
    if (typeof theGlobal.Reflect.getOwnMetadata === 'undefined') {
      Reflect.getOwnMetadata = function(metadataKey, target, targetKey) {
        return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
      };
    }
    if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
      Reflect.defineMetadata = function(metadataKey, metadataValue, target, targetKey) {
        var metadataContainer = target[metadataContainerKey] || (target[metadataContainerKey] = {});
        var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
        targetContainer[metadataKey] = metadataValue;
      };
    }
    if (typeof theGlobal.Reflect.metadata === 'undefined') {
      Reflect.metadata = function(metadataKey, metadataValue) {
        return function(target, targetKey) {
          Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
        };
      };
    }
    function ensureDecorators(target) {
      var applicator;
      if (typeof target.decorators === 'function') {
        applicator = target.decorators();
      } else {
        applicator = target.decorators;
      }
      if (typeof applicator._decorate === 'function') {
        delete target.decorators;
        applicator._decorate(target);
      } else {
        throw new Error('The return value of your decorator\'s method was not valid.');
      }
    }
    var Metadata = {
      global: theGlobal,
      resource: 'aurelia:resource',
      paramTypes: 'design:paramtypes',
      properties: 'design:properties',
      get: function get(metadataKey, target, targetKey) {
        if (!target) {
          return undefined;
        }
        var result = Metadata.getOwn(metadataKey, target, targetKey);
        return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
      },
      getOwn: function getOwn(metadataKey, target, targetKey) {
        if (!target) {
          return undefined;
        }
        if (target.hasOwnProperty('decorators')) {
          ensureDecorators(target);
        }
        return Reflect.getOwnMetadata(metadataKey, target, targetKey);
      },
      define: function define(metadataKey, metadataValue, target, targetKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
      },
      getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
        var result = Metadata.getOwn(metadataKey, target, targetKey);
        if (result === undefined) {
          result = new Type();
          Reflect.defineMetadata(metadataKey, result, target, targetKey);
        }
        return result;
      }
    };
    exports.Metadata = Metadata;
    var originStorage = new Map(),
        unknownOrigin = Object.freeze({
          moduleId: undefined,
          moduleMember: undefined
        });
    var Origin = (function() {
      function Origin(moduleId, moduleMember) {
        _classCallCheck(this, Origin);
        this.moduleId = moduleId;
        this.moduleMember = moduleMember;
      }
      Origin.get = function get(fn) {
        var origin = originStorage.get(fn);
        if (origin === undefined) {
          System.forEachModule(function(key, value) {
            for (var name in value) {
              var exp = value[name];
              if (exp === fn) {
                originStorage.set(fn, origin = new Origin(key, name));
                return true;
              }
            }
            if (value === fn) {
              originStorage.set(fn, origin = new Origin(key, 'default'));
              return true;
            }
          });
        }
        return origin || unknownOrigin;
      };
      Origin.set = function set(fn, origin) {
        originStorage.set(fn, origin);
      };
      return Origin;
    })();
    exports.Origin = Origin;
    var DecoratorApplicator = (function() {
      function DecoratorApplicator() {
        _classCallCheck(this, DecoratorApplicator);
        this._first = null;
        this._second = null;
        this._third = null;
        this._rest = null;
      }
      DecoratorApplicator.prototype.decorator = function decorator(_decorator) {
        if (this._first === null) {
          this._first = _decorator;
          return this;
        }
        if (this._second === null) {
          this._second = _decorator;
          return this;
        }
        if (this._third === null) {
          this._third = _decorator;
          return this;
        }
        if (this._rest === null) {
          this._rest = [];
        }
        this._rest.push(_decorator);
        return this;
      };
      DecoratorApplicator.prototype._decorate = function _decorate(target) {
        var i,
            ii,
            rest;
        if (this._first !== null) {
          this._first(target);
        }
        if (this._second !== null) {
          this._second(target);
        }
        if (this._third !== null) {
          this._third(target);
        }
        rest = this._rest;
        if (rest !== null) {
          for (i = 0, ii = rest.length; i < ii; ++i) {
            rest[i](target);
          }
        }
      };
      return DecoratorApplicator;
    })();
    exports.DecoratorApplicator = DecoratorApplicator;
    var Decorators = {configure: {
        parameterizedDecorator: function parameterizedDecorator(name, decorator) {
          Decorators[name] = function() {
            var applicator = new DecoratorApplicator();
            return applicator[name].apply(applicator, arguments);
          };
          DecoratorApplicator.prototype[name] = function() {
            var result = decorator.apply(null, arguments);
            return this.decorator(result);
          };
        },
        simpleDecorator: function simpleDecorator(name, decorator) {
          Decorators[name] = function() {
            return new DecoratorApplicator().decorator(decorator);
          };
          DecoratorApplicator.prototype[name] = function() {
            return this.decorator(decorator);
          };
        }
      }};
    exports.Decorators = Decorators;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/metadata@0.7.2", ["github:aurelia/metadata@0.7.2/aurelia-metadata"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/metadata@0.7.2/aurelia-metadata'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/loader-default@0.9.3/aurelia-loader-default", ["github:aurelia/metadata@0.7.2", "github:aurelia/loader@0.8.3"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaMetadata, _aureliaLoader) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    var polyfilled = false;
    var url = null;
    if (!window.System || !window.System['import']) {
      var sys = window.System = window.System || {};
      sys.polyfilled = polyfilled = true;
      sys.isFake = false;
      sys.map = {};
      sys['import'] = function(moduleId) {
        return new Promise(function(resolve, reject) {
          require([moduleId], resolve, reject);
        });
      };
      sys.normalize = function(url) {
        return Promise.resolve(url);
      };
      if (window.requirejs && requirejs.s && requirejs.s.contexts && requirejs.s.contexts._ && requirejs.s.contexts._.defined) {
        var defined = requirejs.s.contexts._.defined;
        sys.forEachModule = function(callback) {
          for (var key in defined) {
            if (callback(key, defined[key]))
              return ;
          }
        };
      } else {
        sys.forEachModule = function(callback) {};
      }
    } else {
      var modules = System._loader.modules,
          hasURL = false;
      try {
        hasURL = typeof URLPolyfill != 'undefined' || new URL('test:///').protocol == 'test:';
      } catch (e) {}
      url = hasURL ? URL : URLPolyfill;
      System.isFake = false;
      System.forEachModule = function(callback) {
        for (var key in modules) {
          if (callback(key, modules[key].module))
            return ;
        }
      };
    }
    function ensureOriginOnExports(executed, name) {
      var target = executed,
          key,
          exportedValue;
      if (target.__useDefault) {
        target = target['default'];
      }
      _aureliaMetadata.Origin.set(target, new _aureliaMetadata.Origin(name, 'default'));
      for (key in target) {
        exportedValue = target[key];
        if (typeof exportedValue === 'function') {
          _aureliaMetadata.Origin.set(exportedValue, new _aureliaMetadata.Origin(name, key));
        }
      }
      return executed;
    }
    function getCanonicalName(loader, normalized) {
      var pluginIndex = normalized.indexOf('!');
      var plugin;
      if (pluginIndex != -1) {
        plugin = normalized.substr(pluginIndex + 1);
        normalized = normalized.substr(0, pluginIndex);
      }
      if (loader.defaultJSExtensions && normalized.split('/').pop().split('.').pop() == 'js') {
        var isDefaultExtensionPackage = false;
        for (var p in loader.packages) {
          if (normalized.substr(0, p.length) == p && (normalized.length == p.length || normalized[p.length] == '/')) {
            if ('defaultExtension' in loader.packages[p])
              isDefaultExtensionPackage = true;
          }
        }
        if (!isDefaultExtensionPackage)
          normalized = normalized.substr(0, normalized.length - 3);
      }
      var pathMatch,
          pathMatchLength = 0;
      var curMatchLength;
      for (var p in loader.paths) {
        var curPath = new url(loader.paths[p], loader.baseURL).href;
        var wIndex = curPath.indexOf('*');
        if (wIndex === -1) {
          if (normalized === curPath) {
            curMatchLength = curPath.split('/').length;
            if (curMatchLength > pathMatchLength) {
              pathMatch = p;
              pathMatchLength = curMatchLength;
            }
          }
        } else {
          if (normalized.substr(0, wIndex) === curPath.substr(0, wIndex) && normalized.substr(normalized.length - curPath.length + wIndex + 1) === curPath.substr(wIndex + 1)) {
            curMatchLength = curPath.split('/').length;
            if (curMatchLength > pathMatchLength) {
              pathMatch = p.replace('*', normalized.substr(wIndex, normalized.length - curPath.length + 1));
              pathMatchLength = curMatchLength;
            }
          }
        }
      }
      if (!pathMatch) {
        if (normalized.substr(0, loader.baseURL.length) == loader.baseURL)
          pathMatch = normalized.substr(loader.baseURL.length);
        else
          pathMatch = normalized;
      }
      if (plugin)
        pathMatch += '!' + getCanonicalName(loader, plugin);
      return pathMatch;
    }
    var DefaultLoader = (function(_Loader) {
      function DefaultLoader() {
        _classCallCheck(this, DefaultLoader);
        _Loader.call(this);
        this.moduleRegistry = {};
        var that = this;
        if (polyfilled) {
          define('view', [], {'load': function load(name, req, onload, config) {
              var entry = that.getOrCreateTemplateRegistryEntry(name),
                  address;
              if (entry.templateIsLoaded) {
                onload(entry);
                return ;
              }
              that.findBundledTemplate(name, entry).then(function(found) {
                if (found) {
                  onload(entry);
                } else {
                  address = req.toUrl(name);
                  that.importTemplate(address).then(function(template) {
                    entry.setTemplate(template);
                    onload(entry);
                  });
                }
              });
            }});
        } else {
          System.set('view', System.newModule({
            'fetch': function fetch(load, _fetch) {
              var name = getCanonicalName(this, load.name);
              var id = name.substring(0, name.indexOf('!'));
              var entry = load.metadata.templateRegistryEntry = that.getOrCreateTemplateRegistryEntry(id);
              if (entry.templateIsLoaded) {
                return '';
              }
              return that.findBundledTemplate(name, entry).then(function(found) {
                if (found) {
                  return '';
                }
                return that.importTemplate(load.address).then(function(template) {
                  entry.setTemplate(template);
                  return '';
                });
              });
            },
            'instantiate': function instantiate(load) {
              return load.metadata.templateRegistryEntry;
            }
          }));
        }
      }
      _inherits(DefaultLoader, _Loader);
      DefaultLoader.prototype.loadModule = function loadModule(id) {
        var _this = this;
        return System.normalize(id).then(function(newId) {
          var existing = _this.moduleRegistry[newId];
          if (existing) {
            return existing;
          }
          return System['import'](newId).then(function(m) {
            _this.moduleRegistry[newId] = m;
            return ensureOriginOnExports(m, newId);
          });
        });
      };
      DefaultLoader.prototype.loadAllModules = function loadAllModules(ids) {
        var loads = [];
        for (var i = 0,
            ii = ids.length; i < ii; ++i) {
          loads.push(this.loadModule(ids[i]));
        }
        return Promise.all(loads);
      };
      DefaultLoader.prototype.loadTemplate = function loadTemplate(url) {
        return polyfilled ? System['import']('view!' + url) : System['import'](url + '!view');
      };
      DefaultLoader.prototype.loadText = function loadText(url) {
        return polyfilled ? System['import']('text!' + url) : System['import'](url + '!text');
      };
      return DefaultLoader;
    })(_aureliaLoader.Loader);
    exports.DefaultLoader = DefaultLoader;
    window.AureliaLoader = DefaultLoader;
  }).call(__exports, __exports, __require('github:aurelia/metadata@0.7.2'), __require('github:aurelia/loader@0.8.3'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/loader-default@0.9.3", ["github:aurelia/loader-default@0.9.3/aurelia-loader-default"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/loader-default@0.9.3/aurelia-loader-default'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/logging@0.6.2/aurelia-logging", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    exports.AggregateError = AggregateError;
    exports.getLogger = getLogger;
    exports.addAppender = addAppender;
    exports.setLevel = setLevel;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function AggregateError(msg, inner, skipIfAlreadyAggregate) {
      if (inner) {
        if (inner.innerError && skipIfAlreadyAggregate) {
          return inner;
        }
        if (inner.stack) {
          msg += '\n------------------------------------------------\ninner error: ' + inner.stack;
        }
      }
      var err = new Error(msg);
      if (inner) {
        err.innerError = inner;
      }
      return err;
    }
    var logLevel = {
      none: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4
    };
    exports.logLevel = logLevel;
    var loggers = {},
        currentLevel = logLevel.none,
        appenders = [],
        slice = Array.prototype.slice,
        loggerConstructionKey = {};
    function log(logger, level, args) {
      var i = appenders.length,
          current;
      args = slice.call(args);
      args.unshift(logger);
      while (i--) {
        current = appenders[i];
        current[level].apply(current, args);
      }
    }
    function debug() {
      if (currentLevel < 4) {
        return ;
      }
      log(this, 'debug', arguments);
    }
    function info() {
      if (currentLevel < 3) {
        return ;
      }
      log(this, 'info', arguments);
    }
    function warn() {
      if (currentLevel < 2) {
        return ;
      }
      log(this, 'warn', arguments);
    }
    function error() {
      if (currentLevel < 1) {
        return ;
      }
      log(this, 'error', arguments);
    }
    function connectLogger(logger) {
      logger.debug = debug;
      logger.info = info;
      logger.warn = warn;
      logger.error = error;
    }
    function createLogger(id) {
      var logger = new Logger(id, loggerConstructionKey);
      if (appenders.length) {
        connectLogger(logger);
      }
      return logger;
    }
    function getLogger(id) {
      return loggers[id] || (loggers[id] = createLogger(id));
    }
    function addAppender(appender) {
      appenders.push(appender);
      if (appenders.length === 1) {
        for (var key in loggers) {
          connectLogger(loggers[key]);
        }
      }
    }
    function setLevel(level) {
      currentLevel = level;
    }
    var Logger = (function() {
      function Logger(id, key) {
        _classCallCheck(this, Logger);
        if (key !== loggerConstructionKey) {
          throw new Error('You cannot instantiate "Logger". Use the "getLogger" API instead.');
        }
        this.id = id;
      }
      Logger.prototype.debug = function debug(message) {};
      Logger.prototype.info = function info(message) {};
      Logger.prototype.warn = function warn(message) {};
      Logger.prototype.error = function error(message) {};
      return Logger;
    })();
    exports.Logger = Logger;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/route-recognizer@0.6.1/aurelia-route-recognizer", ["npm:core-js@0.9.18"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
    var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
    var StaticSegment = (function() {
      function StaticSegment(string) {
        _classCallCheck(this, StaticSegment);
        this.string = string;
      }
      StaticSegment.prototype.eachChar = function eachChar(callback) {
        for (var _iterator = this.string,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
          var _ref;
          if (_isArray) {
            if (_i >= _iterator.length)
              break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done)
              break;
            _ref = _i.value;
          }
          var ch = _ref;
          callback({validChars: ch});
        }
      };
      StaticSegment.prototype.regex = function regex() {
        return this.string.replace(escapeRegex, '\\$1');
      };
      StaticSegment.prototype.generate = function generate(params, consumed) {
        return this.string;
      };
      return StaticSegment;
    })();
    exports.StaticSegment = StaticSegment;
    var DynamicSegment = (function() {
      function DynamicSegment(name) {
        _classCallCheck(this, DynamicSegment);
        this.name = name;
      }
      DynamicSegment.prototype.eachChar = function eachChar(callback) {
        callback({
          invalidChars: '/',
          repeat: true
        });
      };
      DynamicSegment.prototype.regex = function regex() {
        return '([^/]+)';
      };
      DynamicSegment.prototype.generate = function generate(params, consumed) {
        consumed[this.name] = true;
        return params[this.name];
      };
      return DynamicSegment;
    })();
    exports.DynamicSegment = DynamicSegment;
    var StarSegment = (function() {
      function StarSegment(name) {
        _classCallCheck(this, StarSegment);
        this.name = name;
      }
      StarSegment.prototype.eachChar = function eachChar(callback) {
        callback({
          invalidChars: '',
          repeat: true
        });
      };
      StarSegment.prototype.regex = function regex() {
        return '(.+)';
      };
      StarSegment.prototype.generate = function generate(params, consumed) {
        consumed[this.name] = true;
        return params[this.name];
      };
      return StarSegment;
    })();
    exports.StarSegment = StarSegment;
    var EpsilonSegment = (function() {
      function EpsilonSegment() {
        _classCallCheck(this, EpsilonSegment);
      }
      EpsilonSegment.prototype.eachChar = function eachChar(callback) {};
      EpsilonSegment.prototype.regex = function regex() {
        return '';
      };
      EpsilonSegment.prototype.generate = function generate(params, consumed) {
        return '';
      };
      return EpsilonSegment;
    })();
    exports.EpsilonSegment = EpsilonSegment;
    var State = (function() {
      function State(charSpec) {
        _classCallCheck(this, State);
        this.charSpec = charSpec;
        this.nextStates = [];
      }
      State.prototype.get = function get(charSpec) {
        for (var _iterator2 = this.nextStates,
            _isArray2 = Array.isArray(_iterator2),
            _i2 = 0,
            _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
          var _ref2;
          if (_isArray2) {
            if (_i2 >= _iterator2.length)
              break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done)
              break;
            _ref2 = _i2.value;
          }
          var child = _ref2;
          var isEqual = child.charSpec.validChars === charSpec.validChars && child.charSpec.invalidChars === charSpec.invalidChars;
          if (isEqual) {
            return child;
          }
        }
      };
      State.prototype.put = function put(charSpec) {
        var state = this.get(charSpec);
        if (state) {
          return state;
        }
        state = new State(charSpec);
        this.nextStates.push(state);
        if (charSpec.repeat) {
          state.nextStates.push(state);
        }
        return state;
      };
      State.prototype.match = function match(ch) {
        var nextStates = this.nextStates,
            results = [],
            child,
            charSpec,
            chars;
        for (var i = 0,
            l = nextStates.length; i < l; i++) {
          child = nextStates[i];
          charSpec = child.charSpec;
          if (typeof(chars = charSpec.validChars) !== 'undefined') {
            if (chars.indexOf(ch) !== -1) {
              results.push(child);
            }
          } else if (typeof(chars = charSpec.invalidChars) !== 'undefined') {
            if (chars.indexOf(ch) === -1) {
              results.push(child);
            }
          }
        }
        return results;
      };
      return State;
    })();
    exports.State = State;
    ;
    var RouteRecognizer = (function() {
      function RouteRecognizer() {
        _classCallCheck(this, RouteRecognizer);
        this.rootState = new State();
        this.names = {};
      }
      RouteRecognizer.prototype.add = function add(route) {
        if (Array.isArray(route)) {
          for (var _iterator3 = route,
              _isArray3 = Array.isArray(_iterator3),
              _i3 = 0,
              _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
            var _ref3;
            if (_isArray3) {
              if (_i3 >= _iterator3.length)
                break;
              _ref3 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done)
                break;
              _ref3 = _i3.value;
            }
            var r = _ref3;
            this.add(r);
          }
          return ;
        }
        var currentState = this.rootState,
            regex = '^',
            types = {
              statics: 0,
              dynamics: 0,
              stars: 0
            },
            names = [],
            routeName = route.handler.name,
            isEmpty = true;
        var segments = parse(route.path, names, types);
        for (var _iterator4 = segments,
            _isArray4 = Array.isArray(_iterator4),
            _i4 = 0,
            _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator](); ; ) {
          var _ref4;
          if (_isArray4) {
            if (_i4 >= _iterator4.length)
              break;
            _ref4 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done)
              break;
            _ref4 = _i4.value;
          }
          var segment = _ref4;
          if (segment instanceof EpsilonSegment) {
            continue;
          }
          isEmpty = false;
          currentState = currentState.put({validChars: '/'});
          regex += '/';
          currentState = addSegment(currentState, segment);
          regex += segment.regex();
        }
        if (isEmpty) {
          currentState = currentState.put({validChars: '/'});
          regex += '/';
        }
        var handlers = [{
          handler: route.handler,
          names: names
        }];
        if (routeName) {
          this.names[routeName] = {
            segments: segments,
            handlers: handlers
          };
        }
        currentState.handlers = handlers;
        currentState.regex = new RegExp(regex + '$');
        currentState.types = types;
        return currentState;
      };
      RouteRecognizer.prototype.handlersFor = function handlersFor(name) {
        var route = this.names[name],
            result = [];
        if (!route) {
          throw new Error('There is no route named ' + name);
        }
        for (var i = 0,
            l = route.handlers.length; i < l; i++) {
          result.push(route.handlers[i]);
        }
        return result;
      };
      RouteRecognizer.prototype.hasRoute = function hasRoute(name) {
        return !!this.names[name];
      };
      RouteRecognizer.prototype.generate = function generate(name, params) {
        params = Object.assign({}, params);
        var route = this.names[name],
            consumed = {},
            output = '';
        if (!route) {
          throw new Error('There is no route named ' + name);
        }
        var segments = route.segments;
        for (var i = 0,
            l = segments.length; i < l; i++) {
          var segment = segments[i];
          if (segment instanceof EpsilonSegment) {
            continue;
          }
          output += '/';
          var segmentValue = segment.generate(params, consumed);
          if (segmentValue === null || segmentValue === undefined) {
            throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + name + '\'.');
          }
          output += segmentValue;
        }
        if (output.charAt(0) !== '/') {
          output = '/' + output;
        }
        for (var param in consumed) {
          delete params[param];
        }
        output += this.generateQueryString(params);
        return output;
      };
      RouteRecognizer.prototype.generateQueryString = function generateQueryString(params) {
        var pairs = [],
            keys = [],
            encode = encodeURIComponent,
            encodeKey = function encodeKey(k) {
              return encode(k).replace('%24', '$');
            };
        for (var key in params) {
          if (params.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
        keys.sort();
        for (var i = 0,
            len = keys.length; i < len; i++) {
          key = keys[i];
          var value = params[key];
          if (value === null || value === undefined) {
            continue;
          }
          if (Array.isArray(value)) {
            var arrayKey = encodeKey(key) + '[]';
            for (var j = 0,
                l = value.length; j < l; j++) {
              pairs.push(arrayKey + '=' + encode(value[j]));
            }
          } else {
            pairs.push(encodeKey(key) + '=' + encode(value));
          }
        }
        if (pairs.length === 0) {
          return '';
        }
        return '?' + pairs.join('&');
      };
      RouteRecognizer.prototype.parseQueryString = function parseQueryString(queryString) {
        var queryParams = {};
        if (!queryString || typeof queryString !== 'string') {
          return queryParams;
        }
        if (queryString.charAt(0) === '?') {
          queryString = queryString.substr(1);
        }
        var pairs = queryString.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('='),
              key = decodeURIComponent(pair[0]),
              keyLength = key.length,
              isArray = false,
              value;
          if (!key) {
            continue;
          } else if (pair.length === 1) {
            value = true;
          } else {
            if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
              isArray = true;
              key = key.slice(0, keyLength - 2);
              if (!queryParams[key]) {
                queryParams[key] = [];
              }
            }
            value = pair[1] ? decodeURIComponent(pair[1]) : '';
          }
          if (isArray) {
            queryParams[key].push(value);
          } else {
            queryParams[key] = value;
          }
        }
        return queryParams;
      };
      RouteRecognizer.prototype.recognize = function recognize(path) {
        var states = [this.rootState],
            pathLen,
            i,
            l,
            queryStart,
            queryParams = {},
            isSlashDropped = false;
        queryStart = path.indexOf('?');
        if (queryStart !== -1) {
          var queryString = path.substr(queryStart + 1, path.length);
          path = path.substr(0, queryStart);
          queryParams = this.parseQueryString(queryString);
        }
        path = decodeURI(path);
        if (path.charAt(0) !== '/') {
          path = '/' + path;
        }
        pathLen = path.length;
        if (pathLen > 1 && path.charAt(pathLen - 1) === '/') {
          path = path.substr(0, pathLen - 1);
          isSlashDropped = true;
        }
        for (i = 0, l = path.length; i < l; i++) {
          states = recognizeChar(states, path.charAt(i));
          if (!states.length) {
            break;
          }
        }
        var solutions = [];
        for (i = 0, l = states.length; i < l; i++) {
          if (states[i].handlers) {
            solutions.push(states[i]);
          }
        }
        states = sortSolutions(solutions);
        var state = solutions[0];
        if (state && state.handlers) {
          if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
            path = path + '/';
          }
          return findHandler(state, path, queryParams);
        }
      };
      return RouteRecognizer;
    })();
    exports.RouteRecognizer = RouteRecognizer;
    var RecognizeResults = function RecognizeResults(queryParams) {
      _classCallCheck(this, RecognizeResults);
      this.splice = Array.prototype.splice;
      this.slice = Array.prototype.slice;
      this.push = Array.prototype.push;
      this.length = 0;
      this.queryParams = queryParams || {};
    };
    function parse(route, names, types) {
      if (route.charAt(0) === '/') {
        route = route.substr(1);
      }
      var results = [];
      for (var _iterator5 = route.split('/'),
          _isArray5 = Array.isArray(_iterator5),
          _i5 = 0,
          _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator](); ; ) {
        var _ref5;
        if (_isArray5) {
          if (_i5 >= _iterator5.length)
            break;
          _ref5 = _iterator5[_i5++];
        } else {
          _i5 = _iterator5.next();
          if (_i5.done)
            break;
          _ref5 = _i5.value;
        }
        var segment = _ref5;
        var match = undefined;
        if (match = segment.match(/^:([^\/]+)$/)) {
          results.push(new DynamicSegment(match[1]));
          names.push(match[1]);
          types.dynamics++;
        } else if (match = segment.match(/^\*([^\/]+)$/)) {
          results.push(new StarSegment(match[1]));
          names.push(match[1]);
          types.stars++;
        } else if (segment === '') {
          results.push(new EpsilonSegment());
        } else {
          results.push(new StaticSegment(segment));
          types.statics++;
        }
      }
      return results;
    }
    function sortSolutions(states) {
      return states.sort(function(a, b) {
        if (a.types.stars !== b.types.stars) {
          return a.types.stars - b.types.stars;
        }
        if (a.types.stars) {
          if (a.types.statics !== b.types.statics) {
            return b.types.statics - a.types.statics;
          }
          if (a.types.dynamics !== b.types.dynamics) {
            return b.types.dynamics - a.types.dynamics;
          }
        }
        if (a.types.dynamics !== b.types.dynamics) {
          return a.types.dynamics - b.types.dynamics;
        }
        if (a.types.statics !== b.types.statics) {
          return b.types.statics - a.types.statics;
        }
        return 0;
      });
    }
    function recognizeChar(states, ch) {
      var nextStates = [];
      for (var i = 0,
          l = states.length; i < l; i++) {
        var state = states[i];
        nextStates = nextStates.concat(state.match(ch));
      }
      return nextStates;
    }
    function findHandler(state, path, queryParams) {
      var handlers = state.handlers,
          regex = state.regex;
      var captures = path.match(regex),
          currentCapture = 1;
      var result = new RecognizeResults(queryParams);
      for (var i = 0,
          l = handlers.length; i < l; i++) {
        var handler = handlers[i],
            names = handler.names,
            params = {};
        for (var j = 0,
            m = names.length; j < m; j++) {
          params[names[j]] = captures[currentCapture++];
        }
        result.push({
          handler: handler.handler,
          params: params,
          isDynamic: !!names.length
        });
      }
      return result;
    }
    function addSegment(currentState, segment) {
      segment.eachChar(function(ch) {
        currentState = currentState.put(ch);
      });
      return currentState;
    }
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/event-aggregator@0.6.2/aurelia-event-aggregator", ["github:aurelia/logging@0.6.2"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    exports.includeEventsIn = includeEventsIn;
    exports.configure = configure;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var logger = _aureliaLogging.getLogger('event-aggregator');
    var Handler = (function() {
      function Handler(messageType, callback) {
        _classCallCheck(this, Handler);
        this.messageType = messageType;
        this.callback = callback;
      }
      Handler.prototype.handle = function handle(message) {
        var _this = this;
        if (message instanceof this.messageType) {
          executeHandler(function() {
            return _this.callback.call(null, message);
          });
        }
      };
      return Handler;
    })();
    function executeHandler(handler) {
      try {
        handler();
      } catch (e) {
        logger.error(e);
      }
    }
    var EventAggregator = (function() {
      function EventAggregator() {
        _classCallCheck(this, EventAggregator);
        this.eventLookup = {};
        this.messageHandlers = [];
      }
      EventAggregator.prototype.publish = function publish(event, data) {
        var subscribers,
            i;
        if (typeof event === 'string') {
          subscribers = this.eventLookup[event];
          if (subscribers) {
            subscribers = subscribers.slice();
            i = subscribers.length;
            while (i--) {
              executeHandler(function() {
                return subscribers[i](data, event);
              });
            }
          }
        } else {
          subscribers = this.messageHandlers.slice();
          i = subscribers.length;
          while (i--) {
            subscribers[i].handle(event);
          }
        }
      };
      EventAggregator.prototype.subscribe = function subscribe(event, callback) {
        var subscribers,
            handler;
        if (typeof event === 'string') {
          subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
          subscribers.push(callback);
          return function() {
            var idx = subscribers.indexOf(callback);
            if (idx != -1) {
              subscribers.splice(idx, 1);
            }
          };
        } else {
          handler = new Handler(event, callback);
          subscribers = this.messageHandlers;
          subscribers.push(handler);
          return function() {
            var idx = subscribers.indexOf(handler);
            if (idx != -1) {
              subscribers.splice(idx, 1);
            }
          };
        }
      };
      EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
        var sub = this.subscribe(event, function(data, event) {
          sub();
          return callback(data, event);
        });
        return sub;
      };
      return EventAggregator;
    })();
    exports.EventAggregator = EventAggregator;
    function includeEventsIn(obj) {
      var ea = new EventAggregator();
      obj.subscribeOnce = function(event, callback) {
        return ea.subscribeOnce(event, callback);
      };
      obj.subscribe = function(event, callback) {
        return ea.subscribe(event, callback);
      };
      obj.publish = function(event, data) {
        ea.publish(event, data);
      };
      return ea;
    }
    function configure(aurelia) {
      aurelia.withInstance(EventAggregator, includeEventsIn(aurelia));
    }
  }).call(__exports, __exports, __require('github:aurelia/logging@0.6.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/task-queue@0.6.1/aurelia-task-queue", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var BrowserMutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var hasSetImmediate = typeof setImmediate === 'function';
    function makeRequestFlushFromMutationObserver(flush) {
      var toggle = 1;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode('');
      observer.observe(node, {characterData: true});
      return function requestFlush() {
        toggle = -toggle;
        node.data = toggle;
      };
    }
    function makeRequestFlushFromTimer(flush) {
      return function requestFlush() {
        var timeoutHandle = setTimeout(handleFlushTimer, 0);
        var intervalHandle = setInterval(handleFlushTimer, 50);
        function handleFlushTimer() {
          clearTimeout(timeoutHandle);
          clearInterval(intervalHandle);
          flush();
        }
      };
    }
    var TaskQueue = (function() {
      function TaskQueue() {
        var _this = this;
        _classCallCheck(this, TaskQueue);
        this.microTaskQueue = [];
        this.microTaskQueueCapacity = 1024;
        this.taskQueue = [];
        if (typeof BrowserMutationObserver === 'function') {
          this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function() {
            return _this.flushMicroTaskQueue();
          });
        } else {
          this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function() {
            return _this.flushMicroTaskQueue();
          });
        }
        this.requestFlushTaskQueue = makeRequestFlushFromTimer(function() {
          return _this.flushTaskQueue();
        });
      }
      TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
        if (this.microTaskQueue.length < 1) {
          this.requestFlushMicroTaskQueue();
        }
        this.microTaskQueue.push(task);
      };
      TaskQueue.prototype.queueTask = function queueTask(task) {
        if (this.taskQueue.length < 1) {
          this.requestFlushTaskQueue();
        }
        this.taskQueue.push(task);
      };
      TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
        var queue = this.taskQueue,
            index = 0,
            task;
        this.taskQueue = [];
        while (index < queue.length) {
          task = queue[index];
          try {
            task.call();
          } catch (error) {
            this.onError(error, task);
          }
          index++;
        }
      };
      TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
        var queue = this.microTaskQueue,
            capacity = this.microTaskQueueCapacity,
            index = 0,
            task;
        while (index < queue.length) {
          task = queue[index];
          try {
            task.call();
          } catch (error) {
            this.onError(error, task);
          }
          index++;
          if (index > capacity) {
            for (var scan = 0; scan < index; scan++) {
              queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
          }
        }
        queue.length = 0;
      };
      TaskQueue.prototype.onError = function onError(error, task) {
        if ('onError' in task) {
          task.onError(error);
        } else if (hasSetImmediate) {
          setImmediate(function() {
            throw error;
          });
        } else {
          setTimeout(function() {
            throw error;
          }, 0);
        }
      };
      return TaskQueue;
    })();
    exports.TaskQueue = TaskQueue;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-router@0.14.1/router-view", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/templating@0.13.16", "github:aurelia/router@0.10.4", "github:aurelia/metadata@0.7.2"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaRouter, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var RouterView = (function() {
      function RouterView(element, container, viewSlot, router) {
        _classCallCheck(this, _RouterView);
        this.element = element;
        this.container = container;
        this.viewSlot = viewSlot;
        this.router = router;
        this.router.registerViewPort(this, this.element.getAttribute('name'));
      }
      var _RouterView = RouterView;
      _RouterView.prototype.bind = function bind(executionContext) {
        this.container.viewModel = executionContext;
      };
      _RouterView.prototype.process = function process(viewPortInstruction, waitToSwap) {
        var _this = this;
        var component = viewPortInstruction.component,
            viewStrategy = component.view,
            childContainer = component.childContainer,
            viewModel = component.executionContext,
            viewModelResource = component.viewModelResource,
            metadata = viewModelResource.metadata;
        if (!viewStrategy && 'getViewStrategy' in viewModel) {
          viewStrategy = viewModel.getViewStrategy();
        }
        if (viewStrategy) {
          viewStrategy = _aureliaTemplating.ViewStrategy.normalize(viewStrategy);
          viewStrategy.makeRelativeTo(_aureliaMetadata.Origin.get(component.router.container.viewModel.constructor).moduleId);
        }
        return metadata.load(childContainer, viewModelResource.value, viewStrategy, true).then(function(viewFactory) {
          viewPortInstruction.behavior = metadata.create(childContainer, {
            executionContext: viewModel,
            viewFactory: viewFactory,
            suppressBind: true,
            host: _this.element
          });
          if (waitToSwap) {
            return ;
          }
          _this.swap(viewPortInstruction);
        });
      };
      _RouterView.prototype.swap = function swap(viewPortInstruction) {
        viewPortInstruction.behavior.view.bind(viewPortInstruction.behavior.executionContext);
        this.viewSlot.swap(viewPortInstruction.behavior.view);
        if (this.view) {
          this.view.unbind();
        }
        this.view = viewPortInstruction.behavior.view;
      };
      RouterView = _aureliaDependencyInjection.inject(Element, _aureliaDependencyInjection.Container, _aureliaTemplating.ViewSlot, _aureliaRouter.Router)(RouterView) || RouterView;
      RouterView = _aureliaTemplating.noView(RouterView) || RouterView;
      RouterView = _aureliaTemplating.customElement('router-view')(RouterView) || RouterView;
      return RouterView;
    })();
    exports.RouterView = RouterView;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/router@0.10.4'), __require('github:aurelia/metadata@0.7.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-router@0.14.1/route-href", ["github:aurelia/templating@0.13.16", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/router@0.10.4"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaRouter) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var RouteHref = (function() {
      function RouteHref(router, element) {
        _classCallCheck(this, _RouteHref);
        this.router = router;
        this.element = element;
      }
      var _RouteHref = RouteHref;
      _RouteHref.prototype.bind = function bind() {
        this.processChange();
      };
      _RouteHref.prototype.attributeChanged = function attributeChanged(value, previous) {
        if (previous) {
          this.element.removeAttribute(previous);
        }
        this.processChange();
      };
      _RouteHref.prototype.processChange = function processChange() {
        var href = this.router.generate(this.route, this.params);
        this.element.setAttribute(this.attribute, href);
      };
      RouteHref = _aureliaDependencyInjection.inject(_aureliaRouter.Router, Element)(RouteHref) || RouteHref;
      RouteHref = _aureliaTemplating.bindable({
        name: 'attribute',
        defaultValue: 'href'
      })(RouteHref) || RouteHref;
      RouteHref = _aureliaTemplating.bindable({
        name: 'params',
        changeHandler: 'processChange'
      })(RouteHref) || RouteHref;
      RouteHref = _aureliaTemplating.bindable({
        name: 'route',
        changeHandler: 'processChange'
      })(RouteHref) || RouteHref;
      RouteHref = _aureliaTemplating.customAttribute('route-href')(RouteHref) || RouteHref;
      return RouteHref;
    })();
    exports.RouteHref = RouteHref;
  }).call(__exports, __exports, __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/router@0.10.4'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/logging@0.6.2", ["github:aurelia/logging@0.6.2/aurelia-logging"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/logging@0.6.2/aurelia-logging'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/route-recognizer@0.6.1", ["github:aurelia/route-recognizer@0.6.1/aurelia-route-recognizer"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/route-recognizer@0.6.1/aurelia-route-recognizer'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/event-aggregator@0.6.2", ["github:aurelia/event-aggregator@0.6.2/aurelia-event-aggregator"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/event-aggregator@0.6.2/aurelia-event-aggregator'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/task-queue@0.6.1", ["github:aurelia/task-queue@0.6.1/aurelia-task-queue"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/task-queue@0.6.1/aurelia-task-queue'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/dependency-injection@0.9.1/aurelia-dependency-injection", ["npm:core-js@0.9.18", "github:aurelia/metadata@0.7.2", "github:aurelia/logging@0.6.2"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaMetadata, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    exports.autoinject = autoinject;
    exports.inject = inject;
    exports.registration = registration;
    exports.transient = transient;
    exports.singleton = singleton;
    exports.instanceActivator = instanceActivator;
    exports.factory = factory;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var TransientRegistration = (function() {
      function TransientRegistration(key) {
        _classCallCheck(this, TransientRegistration);
        this.key = key;
      }
      TransientRegistration.prototype.register = function register(container, key, fn) {
        container.registerTransient(this.key || key, fn);
      };
      return TransientRegistration;
    })();
    exports.TransientRegistration = TransientRegistration;
    var SingletonRegistration = (function() {
      function SingletonRegistration(keyOrRegisterInChild) {
        var registerInChild = arguments[1] === undefined ? false : arguments[1];
        _classCallCheck(this, SingletonRegistration);
        if (typeof keyOrRegisterInChild === 'boolean') {
          this.registerInChild = keyOrRegisterInChild;
        } else {
          this.key = keyOrRegisterInChild;
          this.registerInChild = registerInChild;
        }
      }
      SingletonRegistration.prototype.register = function register(container, key, fn) {
        var destination = this.registerInChild ? container : container.root;
        destination.registerSingleton(this.key || key, fn);
      };
      return SingletonRegistration;
    })();
    exports.SingletonRegistration = SingletonRegistration;
    var Resolver = (function() {
      function Resolver() {
        _classCallCheck(this, Resolver);
      }
      Resolver.prototype.get = function get(container) {
        throw new Error('A custom Resolver must implement get(container) and return the resolved instance(s).');
      };
      return Resolver;
    })();
    exports.Resolver = Resolver;
    var Lazy = (function(_Resolver) {
      function Lazy(key) {
        _classCallCheck(this, Lazy);
        _Resolver.call(this);
        this.key = key;
      }
      _inherits(Lazy, _Resolver);
      Lazy.prototype.get = function get(container) {
        var _this = this;
        return function() {
          return container.get(_this.key);
        };
      };
      Lazy.of = function of(key) {
        return new Lazy(key);
      };
      return Lazy;
    })(Resolver);
    exports.Lazy = Lazy;
    var All = (function(_Resolver2) {
      function All(key) {
        _classCallCheck(this, All);
        _Resolver2.call(this);
        this.key = key;
      }
      _inherits(All, _Resolver2);
      All.prototype.get = function get(container) {
        return container.getAll(this.key);
      };
      All.of = function of(key) {
        return new All(key);
      };
      return All;
    })(Resolver);
    exports.All = All;
    var Optional = (function(_Resolver3) {
      function Optional(key) {
        var checkParent = arguments[1] === undefined ? false : arguments[1];
        _classCallCheck(this, Optional);
        _Resolver3.call(this);
        this.key = key;
        this.checkParent = checkParent;
      }
      _inherits(Optional, _Resolver3);
      Optional.prototype.get = function get(container) {
        if (container.hasHandler(this.key, this.checkParent)) {
          return container.get(this.key);
        }
        return null;
      };
      Optional.of = function of(key) {
        var checkParent = arguments[1] === undefined ? false : arguments[1];
        return new Optional(key, checkParent);
      };
      return Optional;
    })(Resolver);
    exports.Optional = Optional;
    var Parent = (function(_Resolver4) {
      function Parent(key) {
        _classCallCheck(this, Parent);
        _Resolver4.call(this);
        this.key = key;
      }
      _inherits(Parent, _Resolver4);
      Parent.prototype.get = function get(container) {
        return container.parent ? container.parent.get(this.key) : null;
      };
      Parent.of = function of(key) {
        return new Parent(key);
      };
      return Parent;
    })(Resolver);
    exports.Parent = Parent;
    var ClassActivator = (function() {
      function ClassActivator() {
        _classCallCheck(this, ClassActivator);
      }
      ClassActivator.prototype.invoke = function invoke(fn, args) {
        return Reflect.construct(fn, args);
      };
      _createClass(ClassActivator, null, [{
        key: 'instance',
        value: new ClassActivator(),
        enumerable: true
      }]);
      return ClassActivator;
    })();
    exports.ClassActivator = ClassActivator;
    var FactoryActivator = (function() {
      function FactoryActivator() {
        _classCallCheck(this, FactoryActivator);
      }
      FactoryActivator.prototype.invoke = function invoke(fn, args) {
        return fn.apply(undefined, args);
      };
      _createClass(FactoryActivator, null, [{
        key: 'instance',
        value: new FactoryActivator(),
        enumerable: true
      }]);
      return FactoryActivator;
    })();
    exports.FactoryActivator = FactoryActivator;
    var badKeyError = 'key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?';
    _aureliaMetadata.Metadata.registration = 'aurelia:registration';
    _aureliaMetadata.Metadata.instanceActivator = 'aurelia:instance-activator';
    function test() {}
    if (!test.name) {
      Object.defineProperty(Function.prototype, 'name', {get: function get() {
          var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
          Object.defineProperty(this, 'name', {value: name});
          return name;
        }});
    }
    var emptyParameters = Object.freeze([]);
    exports.emptyParameters = emptyParameters;
    var Container = (function() {
      function Container(constructionInfo) {
        _classCallCheck(this, Container);
        this.constructionInfo = constructionInfo || new Map();
        this.entries = new Map();
        this.root = this;
      }
      Container.prototype.makeGlobal = function makeGlobal() {
        Container.instance = this;
        return this;
      };
      Container.prototype.registerInstance = function registerInstance(key, instance) {
        this.registerHandler(key, function(x) {
          return instance;
        });
      };
      Container.prototype.registerTransient = function registerTransient(key, fn) {
        fn = fn || key;
        this.registerHandler(key, function(x) {
          return x.invoke(fn);
        });
      };
      Container.prototype.registerSingleton = function registerSingleton(key, fn) {
        var singleton = null;
        fn = fn || key;
        this.registerHandler(key, function(x) {
          return singleton || (singleton = x.invoke(fn));
        });
      };
      Container.prototype.autoRegister = function autoRegister(fn, key) {
        var registration;
        if (fn === null || fn === undefined) {
          throw new Error(badKeyError);
        }
        if (typeof fn === 'function') {
          registration = _aureliaMetadata.Metadata.get(_aureliaMetadata.Metadata.registration, fn);
          if (registration !== undefined) {
            registration.register(this, key || fn, fn);
          } else {
            this.registerSingleton(key || fn, fn);
          }
        } else {
          this.registerInstance(fn, fn);
        }
      };
      Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
        var i = fns.length;
        while (i--) {
          this.autoRegister(fns[i]);
        }
      };
      Container.prototype.registerHandler = function registerHandler(key, handler) {
        this._getOrCreateEntry(key).push(handler);
      };
      Container.prototype.unregister = function unregister(key) {
        this.entries['delete'](key);
      };
      Container.prototype.get = function get(key) {
        var entry;
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        if (key === Container) {
          return this;
        }
        if (key instanceof Resolver) {
          return key.get(this);
        }
        entry = this.entries.get(key);
        if (entry !== undefined) {
          return entry[0](this);
        }
        if (this.parent) {
          return this.parent.get(key);
        }
        this.autoRegister(key);
        entry = this.entries.get(key);
        return entry[0](this);
      };
      Container.prototype.getAll = function getAll(key) {
        var _this2 = this;
        var entry;
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        entry = this.entries.get(key);
        if (entry !== undefined) {
          return entry.map(function(x) {
            return x(_this2);
          });
        }
        if (this.parent) {
          return this.parent.getAll(key);
        }
        return [];
      };
      Container.prototype.hasHandler = function hasHandler(key) {
        var checkParent = arguments[1] === undefined ? false : arguments[1];
        if (key === null || key === undefined) {
          throw new Error(badKeyError);
        }
        return this.entries.has(key) || checkParent && this.parent && this.parent.hasHandler(key, checkParent);
      };
      Container.prototype.createChild = function createChild() {
        var childContainer = new Container(this.constructionInfo);
        childContainer.parent = this;
        childContainer.root = this.root;
        return childContainer;
      };
      Container.prototype.invoke = function invoke(fn, deps) {
        try {
          var info = this._getOrCreateConstructionInfo(fn),
              keys = info.keys,
              args = new Array(keys.length),
              i,
              ii;
          for (i = 0, ii = keys.length; i < ii; ++i) {
            args[i] = this.get(keys[i]);
          }
          if (deps !== undefined) {
            args = args.concat(deps);
          }
          return info.activator.invoke(fn, args);
        } catch (e) {
          var activatingText = info.activator instanceof ClassActivator ? 'instantiating' : 'invoking';
          var message = 'Error ' + activatingText + ' ' + fn.name + '.';
          if (i < ii) {
            message += ' The argument at index ' + i + ' (key:' + keys[i] + ') could not be satisfied.';
          }
          message += ' Check the inner error for details.';
          throw _aureliaLogging.AggregateError(message, e, true);
        }
      };
      Container.prototype._getOrCreateEntry = function _getOrCreateEntry(key) {
        var entry;
        if (key === null || key === undefined) {
          throw new Error('key cannot be null or undefined.  (Are you trying to inject something that doesn\'t exist with DI?)');
        }
        entry = this.entries.get(key);
        if (entry === undefined) {
          entry = [];
          this.entries.set(key, entry);
        }
        return entry;
      };
      Container.prototype._getOrCreateConstructionInfo = function _getOrCreateConstructionInfo(fn) {
        var info = this.constructionInfo.get(fn);
        if (info === undefined) {
          info = this._createConstructionInfo(fn);
          this.constructionInfo.set(fn, info);
        }
        return info;
      };
      Container.prototype._createConstructionInfo = function _createConstructionInfo(fn) {
        var info = {activator: _aureliaMetadata.Metadata.getOwn(_aureliaMetadata.Metadata.instanceActivator, fn) || ClassActivator.instance};
        if (fn.inject !== undefined) {
          if (typeof fn.inject === 'function') {
            info.keys = fn.inject();
          } else {
            info.keys = fn.inject;
          }
          return info;
        }
        info.keys = _aureliaMetadata.Metadata.getOwn(_aureliaMetadata.Metadata.paramTypes, fn) || emptyParameters;
        return info;
      };
      return Container;
    })();
    exports.Container = Container;
    function autoinject(target) {
      var deco = function deco(target) {
        target.inject = _aureliaMetadata.Metadata.getOwn(_aureliaMetadata.Metadata.paramTypes, target) || emptyParameters;
      };
      return target ? deco(target) : deco;
    }
    function inject() {
      for (var _len = arguments.length,
          rest = Array(_len),
          _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      return function(target) {
        target.inject = rest;
      };
    }
    function registration(value) {
      return function(target) {
        _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.registration, value, target);
      };
    }
    function transient(key) {
      return registration(new TransientRegistration(key));
    }
    function singleton(keyOrRegisterInChild) {
      var registerInChild = arguments[1] === undefined ? false : arguments[1];
      return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }
    function instanceActivator(value) {
      return function(target) {
        _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.instanceActivator, value, target);
      };
    }
    function factory() {
      return instanceActivator(FactoryActivator.instance);
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('autoinject', autoinject);
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('inject', inject);
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('registration', registration);
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('transient', transient);
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('singleton', singleton);
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('factory', factory);
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/metadata@0.7.2'), __require('github:aurelia/logging@0.6.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/binding@0.8.5/aurelia-binding", ["npm:core-js@0.9.18", "github:aurelia/task-queue@0.6.1", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/metadata@0.7.2"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaTaskQueue, _aureliaDependencyInjection, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    exports.calcSplices = calcSplices;
    exports.projectArraySplices = projectArraySplices;
    exports.getChangeRecords = getChangeRecords;
    exports.getArrayObserver = _getArrayObserver;
    exports.getMapObserver = _getMapObserver;
    exports.hasDeclaredDependencies = hasDeclaredDependencies;
    exports.declarePropertyDependencies = declarePropertyDependencies;
    exports.isStandardSvgAttribute = isStandardSvgAttribute;
    exports.valueConverter = valueConverter;
    exports.computedFrom = computedFrom;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var AccessKeyedObserver = (function() {
      function AccessKeyedObserver(objectInfo, keyInfo, observerLocator, evaluate) {
        var _this = this;
        _classCallCheck(this, AccessKeyedObserver);
        this.objectInfo = objectInfo;
        this.keyInfo = keyInfo;
        this.evaluate = evaluate;
        this.observerLocator = observerLocator;
        if (keyInfo.observer) {
          this.disposeKey = keyInfo.observer.subscribe(function(newValue) {
            return _this.objectOrKeyChanged(undefined, newValue);
          });
        }
        if (objectInfo.observer) {
          this.disposeObject = objectInfo.observer.subscribe(function(newValue) {
            return _this.objectOrKeyChanged(newValue);
          });
        }
        this.updatePropertySubscription(objectInfo.value, keyInfo.value);
      }
      AccessKeyedObserver.prototype.updatePropertySubscription = function updatePropertySubscription(object, key) {
        var _this2 = this;
        var callback;
        if (this.disposeProperty) {
          this.disposeProperty();
          this.disposeProperty = null;
        }
        if (object instanceof Object) {
          this.disposeProperty = this.observerLocator.getObserver(object, key).subscribe(function() {
            return _this2.notify();
          });
        }
      };
      AccessKeyedObserver.prototype.objectOrKeyChanged = function objectOrKeyChanged(object, key) {
        var oo,
            ko;
        object = object || ((oo = this.objectInfo.observer) && oo.getValue ? oo.getValue() : this.objectInfo.value);
        key = key || ((ko = this.keyInfo.observer) && ko.getValue ? ko.getValue() : this.keyInfo.value);
        this.updatePropertySubscription(object, key);
        this.notify();
      };
      AccessKeyedObserver.prototype.subscribe = function subscribe(callback) {
        var that = this;
        that.callback = callback;
        return function() {
          that.callback = null;
        };
      };
      AccessKeyedObserver.prototype.notify = function notify() {
        var callback = this.callback;
        if (callback) {
          callback(this.evaluate());
        }
      };
      AccessKeyedObserver.prototype.dispose = function dispose() {
        this.objectInfo = null;
        this.keyInfo = null;
        this.evaluate = null;
        this.observerLocator = null;
        if (this.disposeObject) {
          this.disposeObject();
        }
        if (this.disposeKey) {
          this.disposeKey();
        }
        if (this.disposeProperty) {
          this.disposeProperty();
        }
      };
      return AccessKeyedObserver;
    })();
    exports.AccessKeyedObserver = AccessKeyedObserver;
    function isIndex(s) {
      return +s === s >>> 0;
    }
    function toNumber(s) {
      return +s;
    }
    function newSplice(index, removed, addedCount) {
      return {
        index: index,
        removed: removed,
        addedCount: addedCount
      };
    }
    var EDIT_LEAVE = 0;
    var EDIT_UPDATE = 1;
    var EDIT_ADD = 2;
    var EDIT_DELETE = 3;
    function ArraySplice() {}
    ArraySplice.prototype = {
      calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
        var rowCount = oldEnd - oldStart + 1;
        var columnCount = currentEnd - currentStart + 1;
        var distances = new Array(rowCount);
        var i,
            j,
            north,
            west;
        for (i = 0; i < rowCount; ++i) {
          distances[i] = new Array(columnCount);
          distances[i][0] = i;
        }
        for (j = 0; j < columnCount; ++j) {
          distances[0][j] = j;
        }
        for (i = 1; i < rowCount; ++i) {
          for (j = 1; j < columnCount; ++j) {
            if (this.equals(current[currentStart + j - 1], old[oldStart + i - 1]))
              distances[i][j] = distances[i - 1][j - 1];
            else {
              north = distances[i - 1][j] + 1;
              west = distances[i][j - 1] + 1;
              distances[i][j] = north < west ? north : west;
            }
          }
        }
        return distances;
      },
      spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
        var i = distances.length - 1;
        var j = distances[0].length - 1;
        var current = distances[i][j];
        var edits = [];
        while (i > 0 || j > 0) {
          if (i == 0) {
            edits.push(EDIT_ADD);
            j--;
            continue;
          }
          if (j == 0) {
            edits.push(EDIT_DELETE);
            i--;
            continue;
          }
          var northWest = distances[i - 1][j - 1];
          var west = distances[i - 1][j];
          var north = distances[i][j - 1];
          var min;
          if (west < north)
            min = west < northWest ? west : northWest;
          else
            min = north < northWest ? north : northWest;
          if (min == northWest) {
            if (northWest == current) {
              edits.push(EDIT_LEAVE);
            } else {
              edits.push(EDIT_UPDATE);
              current = northWest;
            }
            i--;
            j--;
          } else if (min == west) {
            edits.push(EDIT_DELETE);
            i--;
            current = west;
          } else {
            edits.push(EDIT_ADD);
            j--;
            current = north;
          }
        }
        edits.reverse();
        return edits;
      },
      calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
        var prefixCount = 0;
        var suffixCount = 0;
        var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
        if (currentStart == 0 && oldStart == 0)
          prefixCount = this.sharedPrefix(current, old, minLength);
        if (currentEnd == current.length && oldEnd == old.length)
          suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
        currentStart += prefixCount;
        oldStart += prefixCount;
        currentEnd -= suffixCount;
        oldEnd -= suffixCount;
        if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
          return [];
        if (currentStart == currentEnd) {
          var splice = newSplice(currentStart, [], 0);
          while (oldStart < oldEnd)
            splice.removed.push(old[oldStart++]);
          return [splice];
        } else if (oldStart == oldEnd)
          return [newSplice(currentStart, [], currentEnd - currentStart)];
        var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
        var splice = undefined;
        var splices = [];
        var index = currentStart;
        var oldIndex = oldStart;
        for (var i = 0; i < ops.length; ++i) {
          switch (ops[i]) {
            case EDIT_LEAVE:
              if (splice) {
                splices.push(splice);
                splice = undefined;
              }
              index++;
              oldIndex++;
              break;
            case EDIT_UPDATE:
              if (!splice)
                splice = newSplice(index, [], 0);
              splice.addedCount++;
              index++;
              splice.removed.push(old[oldIndex]);
              oldIndex++;
              break;
            case EDIT_ADD:
              if (!splice)
                splice = newSplice(index, [], 0);
              splice.addedCount++;
              index++;
              break;
            case EDIT_DELETE:
              if (!splice)
                splice = newSplice(index, [], 0);
              splice.removed.push(old[oldIndex]);
              oldIndex++;
              break;
          }
        }
        if (splice) {
          splices.push(splice);
        }
        return splices;
      },
      sharedPrefix: function sharedPrefix(current, old, searchLength) {
        for (var i = 0; i < searchLength; ++i)
          if (!this.equals(current[i], old[i]))
            return i;
        return searchLength;
      },
      sharedSuffix: function sharedSuffix(current, old, searchLength) {
        var index1 = current.length;
        var index2 = old.length;
        var count = 0;
        while (count < searchLength && this.equals(current[--index1], old[--index2]))
          count++;
        return count;
      },
      calculateSplices: function calculateSplices(current, previous) {
        return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
      },
      equals: function equals(currentValue, previousValue) {
        return currentValue === previousValue;
      }
    };
    var arraySplice = new ArraySplice();
    function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
      return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
    }
    function intersect(start1, end1, start2, end2) {
      if (end1 < start2 || end2 < start1)
        return -1;
      if (end1 == start2 || end2 == start1)
        return 0;
      if (start1 < start2) {
        if (end1 < end2)
          return end1 - start2;
        else
          return end2 - start2;
      } else {
        if (end2 < end1)
          return end2 - start1;
        else
          return end1 - start1;
      }
    }
    function mergeSplice(splices, index, removed, addedCount) {
      var splice = newSplice(index, removed, addedCount);
      var inserted = false;
      var insertionOffset = 0;
      for (var i = 0; i < splices.length; i++) {
        var current = splices[i];
        current.index += insertionOffset;
        if (inserted)
          continue;
        var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);
        if (intersectCount >= 0) {
          splices.splice(i, 1);
          i--;
          insertionOffset -= current.addedCount - current.removed.length;
          splice.addedCount += current.addedCount - intersectCount;
          var deleteCount = splice.removed.length + current.removed.length - intersectCount;
          if (!splice.addedCount && !deleteCount) {
            inserted = true;
          } else {
            var removed = current.removed;
            if (splice.index < current.index) {
              var prepend = splice.removed.slice(0, current.index - splice.index);
              Array.prototype.push.apply(prepend, removed);
              removed = prepend;
            }
            if (splice.index + splice.removed.length > current.index + current.addedCount) {
              var append = splice.removed.slice(current.index + current.addedCount - splice.index);
              Array.prototype.push.apply(removed, append);
            }
            splice.removed = removed;
            if (current.index < splice.index) {
              splice.index = current.index;
            }
          }
        } else if (splice.index < current.index) {
          inserted = true;
          splices.splice(i, 0, splice);
          i++;
          var offset = splice.addedCount - splice.removed.length;
          current.index += offset;
          insertionOffset += offset;
        }
      }
      if (!inserted)
        splices.push(splice);
    }
    function createInitialSplices(array, changeRecords) {
      var splices = [];
      for (var i = 0; i < changeRecords.length; i++) {
        var record = changeRecords[i];
        switch (record.type) {
          case 'splice':
            mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
            break;
          case 'add':
          case 'update':
          case 'delete':
            if (!isIndex(record.name))
              continue;
            var index = toNumber(record.name);
            if (index < 0)
              continue;
            mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
            break;
          default:
            console.error('Unexpected record type: ' + JSON.stringify(record));
            break;
        }
      }
      return splices;
    }
    function projectArraySplices(array, changeRecords) {
      var splices = [];
      createInitialSplices(array, changeRecords).forEach(function(splice) {
        if (splice.addedCount == 1 && splice.removed.length == 1) {
          if (splice.removed[0] !== array[splice.index])
            splices.push(splice);
          return ;
        }
        ;
        splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
      });
      return splices;
    }
    var hasObjectObserve = (function detectObjectObserve() {
      if (typeof Object.observe !== 'function') {
        return false;
      }
      var records = [];
      function callback(recs) {
        records = recs;
      }
      var test = {};
      Object.observe(test, callback);
      test.id = 1;
      test.id = 2;
      delete test.id;
      Object.deliverChangeRecords(callback);
      if (records.length !== 3)
        return false;
      if (records[0].type != 'add' || records[1].type != 'update' || records[2].type != 'delete') {
        return false;
      }
      Object.unobserve(test, callback);
      return true;
    })();
    exports.hasObjectObserve = hasObjectObserve;
    var hasArrayObserve = (function detectArrayObserve() {
      if (typeof Array.observe !== 'function') {
        return false;
      }
      var records = [];
      function callback(recs) {
        records = recs;
      }
      var arr = [];
      Array.observe(arr, callback);
      arr.push(1, 2);
      arr.length = 0;
      Object.deliverChangeRecords(callback);
      if (records.length !== 2)
        return false;
      if (records[0].type != 'splice' || records[1].type != 'splice') {
        return false;
      }
      Array.unobserve(arr, callback);
      return true;
    })();
    exports.hasArrayObserve = hasArrayObserve;
    function newRecord(type, object, key, oldValue) {
      return {
        type: type,
        object: object,
        key: key,
        oldValue: oldValue
      };
    }
    function getChangeRecords(map) {
      var entries = [];
      for (var _iterator = map.keys(),
          _isArray = Array.isArray(_iterator),
          _i = 0,
          _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
        var _ref;
        if (_isArray) {
          if (_i >= _iterator.length)
            break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done)
            break;
          _ref = _i.value;
        }
        var key = _ref;
        entries.push(newRecord('added', map, key));
      }
      return entries;
    }
    var ModifyCollectionObserver = (function() {
      function ModifyCollectionObserver(taskQueue, collection) {
        _classCallCheck(this, ModifyCollectionObserver);
        this.taskQueue = taskQueue;
        this.queued = false;
        this.callbacks = [];
        this.changeRecords = [];
        this.oldCollection = null;
        this.collection = collection;
        this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
      }
      ModifyCollectionObserver.prototype.subscribe = function subscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.push(callback);
        return function() {
          callbacks.splice(callbacks.indexOf(callback), 1);
        };
      };
      ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
        if (this.callbacks.length === 0 && !this.lengthObserver) {
          return ;
        }
        this.changeRecords.push(changeRecord);
        if (!this.queued) {
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
      };
      ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
        if (!this.callbacks.length) {
          return ;
        }
        this.oldCollection = oldCollection;
        if (!this.queued) {
          this.queued = true;
          this.taskQueue.queueMicroTask(this);
        }
      };
      ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
        return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
      };
      ModifyCollectionObserver.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            changeRecords = this.changeRecords,
            oldCollection = this.oldCollection,
            records;
        this.queued = false;
        this.changeRecords = [];
        this.oldCollection = null;
        if (i) {
          if (oldCollection) {
            if (this.collection instanceof Map) {
              records = getChangeRecords(oldCollection);
            } else {
              records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
            }
          } else {
            if (this.collection instanceof Map) {
              records = changeRecords;
            } else {
              records = projectArraySplices(this.collection, changeRecords);
            }
          }
          while (i--) {
            callbacks[i](records);
          }
        }
        if (this.lengthObserver) {
          this.lengthObserver.call(this.collection[this.lengthPropertyName]);
        }
      };
      return ModifyCollectionObserver;
    })();
    exports.ModifyCollectionObserver = ModifyCollectionObserver;
    var CollectionLengthObserver = (function() {
      function CollectionLengthObserver(collection) {
        _classCallCheck(this, CollectionLengthObserver);
        this.collection = collection;
        this.callbacks = [];
        this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
        this.currentValue = collection[this.lengthPropertyName];
      }
      CollectionLengthObserver.prototype.getValue = function getValue() {
        return this.collection[this.lengthPropertyName];
      };
      CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
        this.collection[this.lengthPropertyName] = newValue;
      };
      CollectionLengthObserver.prototype.subscribe = function subscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.push(callback);
        return function() {
          callbacks.splice(callbacks.indexOf(callback), 1);
        };
      };
      CollectionLengthObserver.prototype.call = function call(newValue) {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.currentValue;
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
        this.currentValue = newValue;
      };
      return CollectionLengthObserver;
    })();
    exports.CollectionLengthObserver = CollectionLengthObserver;
    var arrayProto = Array.prototype;
    function _getArrayObserver(taskQueue, array) {
      if (hasArrayObserve) {
        return new ArrayObserveObserver(array);
      } else {
        return ModifyArrayObserver.create(taskQueue, array);
      }
    }
    var ModifyArrayObserver = (function(_ModifyCollectionObserver) {
      function ModifyArrayObserver(taskQueue, array) {
        _classCallCheck(this, ModifyArrayObserver);
        _ModifyCollectionObserver.call(this, taskQueue, array);
      }
      _inherits(ModifyArrayObserver, _ModifyCollectionObserver);
      ModifyArrayObserver.create = function create(taskQueue, array) {
        var observer = new ModifyArrayObserver(taskQueue, array);
        array['pop'] = function() {
          var methodCallResult = arrayProto['pop'].apply(array, arguments);
          observer.addChangeRecord({
            type: 'delete',
            object: array,
            name: array.length,
            oldValue: methodCallResult
          });
          return methodCallResult;
        };
        array['push'] = function() {
          var methodCallResult = arrayProto['push'].apply(array, arguments);
          observer.addChangeRecord({
            type: 'splice',
            object: array,
            index: array.length - arguments.length,
            removed: [],
            addedCount: arguments.length
          });
          return methodCallResult;
        };
        array['reverse'] = function() {
          var oldArray = array.slice();
          var methodCallResult = arrayProto['reverse'].apply(array, arguments);
          observer.reset(oldArray);
          return methodCallResult;
        };
        array['shift'] = function() {
          var methodCallResult = arrayProto['shift'].apply(array, arguments);
          observer.addChangeRecord({
            type: 'delete',
            object: array,
            name: 0,
            oldValue: methodCallResult
          });
          return methodCallResult;
        };
        array['sort'] = function() {
          var oldArray = array.slice();
          var methodCallResult = arrayProto['sort'].apply(array, arguments);
          observer.reset(oldArray);
          return methodCallResult;
        };
        array['splice'] = function() {
          var methodCallResult = arrayProto['splice'].apply(array, arguments);
          observer.addChangeRecord({
            type: 'splice',
            object: array,
            index: arguments[0],
            removed: methodCallResult,
            addedCount: arguments.length > 2 ? arguments.length - 2 : 0
          });
          return methodCallResult;
        };
        array['unshift'] = function() {
          var methodCallResult = arrayProto['unshift'].apply(array, arguments);
          observer.addChangeRecord({
            type: 'splice',
            object: array,
            index: 0,
            removed: [],
            addedCount: arguments.length
          });
          return methodCallResult;
        };
        return observer;
      };
      return ModifyArrayObserver;
    })(ModifyCollectionObserver);
    var ArrayObserveObserver = (function() {
      function ArrayObserveObserver(array) {
        _classCallCheck(this, ArrayObserveObserver);
        this.array = array;
        this.callbacks = [];
      }
      ArrayObserveObserver.prototype.subscribe = function subscribe(callback) {
        var _this3 = this;
        var callbacks = this.callbacks;
        if (callbacks.length === 0) {
          this.handler = this.handleChanges.bind(this);
          Array.observe(this.array, this.handler);
        }
        callbacks.push(callback);
        return function() {
          callbacks.splice(callbacks.indexOf(callback), 1);
          if (callbacks.length === 0) {
            Array.unobserve(_this3.array, _this3.handler);
          }
        };
      };
      ArrayObserveObserver.prototype.getLengthObserver = function getLengthObserver() {
        return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.array));
      };
      ArrayObserveObserver.prototype.handleChanges = function handleChanges(changeRecords) {
        var callbacks = this.callbacks,
            i = callbacks.length,
            splices;
        if (i) {
          splices = projectArraySplices(this.array, changeRecords);
          while (i--) {
            callbacks[i](splices);
          }
        }
        if (this.lengthObserver) {
          this.lengthObserver.call(this.array.length);
        }
      };
      return ArrayObserveObserver;
    })();
    var PathObserver = (function() {
      function PathObserver(leftObserver, getRightObserver, value) {
        var _this4 = this;
        _classCallCheck(this, PathObserver);
        this.leftObserver = leftObserver;
        this.disposeLeft = leftObserver.subscribe(function(newValue) {
          var newRightValue = _this4.updateRight(getRightObserver(newValue));
          _this4.notify(newRightValue);
        });
        this.updateRight(getRightObserver(value));
      }
      PathObserver.prototype.updateRight = function updateRight(observer) {
        var _this5 = this;
        this.rightObserver = observer;
        if (this.disposeRight) {
          this.disposeRight();
        }
        if (!observer) {
          return null;
        }
        this.disposeRight = observer.subscribe(function(newValue) {
          return _this5.notify(newValue);
        });
        return observer.getValue();
      };
      PathObserver.prototype.subscribe = function subscribe(callback) {
        var that = this;
        that.callback = callback;
        return function() {
          that.callback = null;
        };
      };
      PathObserver.prototype.notify = function notify(newValue) {
        var callback = this.callback;
        if (callback) {
          callback(newValue);
        }
      };
      PathObserver.prototype.dispose = function dispose() {
        if (this.disposeLeft) {
          this.disposeLeft();
        }
        if (this.disposeRight) {
          this.disposeRight();
        }
      };
      return PathObserver;
    })();
    exports.PathObserver = PathObserver;
    var CompositeObserver = (function() {
      function CompositeObserver(observers, evaluate) {
        var _this6 = this;
        _classCallCheck(this, CompositeObserver);
        this.subscriptions = new Array(observers.length);
        this.evaluate = evaluate;
        for (var i = 0,
            ii = observers.length; i < ii; i++) {
          this.subscriptions[i] = observers[i].subscribe(function(newValue) {
            _this6.notify(_this6.evaluate());
          });
        }
      }
      CompositeObserver.prototype.subscribe = function subscribe(callback) {
        var that = this;
        that.callback = callback;
        return function() {
          that.callback = null;
        };
      };
      CompositeObserver.prototype.notify = function notify(newValue) {
        var callback = this.callback;
        if (callback) {
          callback(newValue);
        }
      };
      CompositeObserver.prototype.dispose = function dispose() {
        var subscriptions = this.subscriptions;
        var i = subscriptions.length;
        while (i--) {
          subscriptions[i]();
        }
      };
      return CompositeObserver;
    })();
    exports.CompositeObserver = CompositeObserver;
    var Expression = (function() {
      function Expression() {
        _classCallCheck(this, Expression);
        this.isChain = false;
        this.isAssignable = false;
      }
      Expression.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        throw new Error('Cannot evaluate ' + this);
      };
      Expression.prototype.assign = function assign(scope, value, valueConverters) {
        throw new Error('Cannot assign to ' + this);
      };
      Expression.prototype.toString = function toString() {
        return Unparser.unparse(this);
      };
      return Expression;
    })();
    exports.Expression = Expression;
    var Chain = (function(_Expression) {
      function Chain(expressions) {
        _classCallCheck(this, Chain);
        _Expression.call(this);
        this.expressions = expressions;
        this.isChain = true;
      }
      _inherits(Chain, _Expression);
      Chain.prototype.evaluate = function evaluate(scope, valueConverters) {
        var result,
            expressions = this.expressions,
            length = expressions.length,
            i,
            last;
        for (i = 0; i < length; ++i) {
          last = expressions[i].evaluate(scope, valueConverters);
          if (last !== null) {
            result = last;
          }
        }
        return result;
      };
      Chain.prototype.accept = function accept(visitor) {
        visitor.visitChain(this);
      };
      return Chain;
    })(Expression);
    exports.Chain = Chain;
    var ValueConverter = (function(_Expression2) {
      function ValueConverter(expression, name, args, allArgs) {
        _classCallCheck(this, ValueConverter);
        _Expression2.call(this);
        this.expression = expression;
        this.name = name;
        this.args = args;
        this.allArgs = allArgs;
      }
      _inherits(ValueConverter, _Expression2);
      ValueConverter.prototype.evaluate = function evaluate(scope, valueConverters) {
        var converter = valueConverters(this.name);
        if (!converter) {
          throw new Error('No ValueConverter named "' + this.name + '" was found!');
        }
        if ('toView' in converter) {
          return converter.toView.apply(converter, evalList(scope, this.allArgs, valueConverters));
        }
        return this.allArgs[0].evaluate(scope, valueConverters);
      };
      ValueConverter.prototype.assign = function assign(scope, value, valueConverters) {
        var converter = valueConverters(this.name);
        if (!converter) {
          throw new Error('No ValueConverter named "' + this.name + '" was found!');
        }
        if ('fromView' in converter) {
          value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, valueConverters)));
        }
        return this.allArgs[0].assign(scope, value, valueConverters);
      };
      ValueConverter.prototype.accept = function accept(visitor) {
        visitor.visitValueConverter(this);
      };
      ValueConverter.prototype.connect = function connect(binding, scope) {
        var _this7 = this;
        var observer,
            childObservers = [],
            i,
            ii,
            exp,
            expInfo;
        for (i = 0, ii = this.allArgs.length; i < ii; ++i) {
          exp = this.allArgs[i];
          expInfo = exp.connect(binding, scope);
          if (expInfo.observer) {
            childObservers.push(expInfo.observer);
          }
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this7.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: this.evaluate(scope, binding.valueConverterLookupFunction),
          observer: observer
        };
      };
      return ValueConverter;
    })(Expression);
    exports.ValueConverter = ValueConverter;
    var Assign = (function(_Expression3) {
      function Assign(target, value) {
        _classCallCheck(this, Assign);
        _Expression3.call(this);
        this.target = target;
        this.value = value;
      }
      _inherits(Assign, _Expression3);
      Assign.prototype.evaluate = function evaluate(scope, valueConverters) {
        return this.target.assign(scope, this.value.evaluate(scope, valueConverters));
      };
      Assign.prototype.accept = function accept(vistor) {
        vistor.visitAssign(this);
      };
      Assign.prototype.connect = function connect(binding, scope) {
        return {value: this.evaluate(scope, binding.valueConverterLookupFunction)};
      };
      return Assign;
    })(Expression);
    exports.Assign = Assign;
    var Conditional = (function(_Expression4) {
      function Conditional(condition, yes, no) {
        _classCallCheck(this, Conditional);
        _Expression4.call(this);
        this.condition = condition;
        this.yes = yes;
        this.no = no;
      }
      _inherits(Conditional, _Expression4);
      Conditional.prototype.evaluate = function evaluate(scope, valueConverters) {
        return !!this.condition.evaluate(scope) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
      };
      Conditional.prototype.accept = function accept(visitor) {
        visitor.visitConditional(this);
      };
      Conditional.prototype.connect = function connect(binding, scope) {
        var _this8 = this;
        var conditionInfo = this.condition.connect(binding, scope),
            yesInfo = this.yes.connect(binding, scope),
            noInfo = this.no.connect(binding, scope),
            childObservers = [],
            observer;
        if (conditionInfo.observer) {
          childObservers.push(conditionInfo.observer);
        }
        if (yesInfo.observer) {
          childObservers.push(yesInfo.observer);
        }
        if (noInfo.observer) {
          childObservers.push(noInfo.observer);
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this8.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: !!conditionInfo.value ? yesInfo.value : noInfo.value,
          observer: observer
        };
      };
      return Conditional;
    })(Expression);
    exports.Conditional = Conditional;
    var AccessScope = (function(_Expression5) {
      function AccessScope(name) {
        _classCallCheck(this, AccessScope);
        _Expression5.call(this);
        this.name = name;
        this.isAssignable = true;
      }
      _inherits(AccessScope, _Expression5);
      AccessScope.prototype.evaluate = function evaluate(scope, valueConverters) {
        return scope[this.name];
      };
      AccessScope.prototype.assign = function assign(scope, value) {
        return scope[this.name] = value;
      };
      AccessScope.prototype.accept = function accept(visitor) {
        visitor.visitAccessScope(this);
      };
      AccessScope.prototype.connect = function connect(binding, scope) {
        var observer = binding.getObserver(scope, this.name);
        return {
          value: observer.getValue(),
          observer: observer
        };
      };
      return AccessScope;
    })(Expression);
    exports.AccessScope = AccessScope;
    var AccessMember = (function(_Expression6) {
      function AccessMember(object, name) {
        _classCallCheck(this, AccessMember);
        _Expression6.call(this);
        this.object = object;
        this.name = name;
        this.isAssignable = true;
      }
      _inherits(AccessMember, _Expression6);
      AccessMember.prototype.evaluate = function evaluate(scope, valueConverters) {
        var instance = this.object.evaluate(scope, valueConverters);
        return instance === null || instance === undefined ? instance : instance[this.name];
      };
      AccessMember.prototype.assign = function assign(scope, value) {
        var instance = this.object.evaluate(scope);
        if (instance === null || instance === undefined) {
          instance = {};
          this.object.assign(scope, instance);
        }
        return instance[this.name] = value;
      };
      AccessMember.prototype.accept = function accept(visitor) {
        visitor.visitAccessMember(this);
      };
      AccessMember.prototype.connect = function connect(binding, scope) {
        var _this9 = this;
        var info = this.object.connect(binding, scope),
            objectInstance = info.value,
            objectObserver = info.observer,
            observer;
        if (objectObserver) {
          observer = new PathObserver(objectObserver, function(value) {
            if (value == null || value == undefined) {
              return value;
            }
            return binding.getObserver(value, _this9.name);
          }, objectInstance);
        } else {
          observer = binding.getObserver(objectInstance, this.name);
        }
        return {
          value: objectInstance == null ? null : objectInstance[this.name],
          observer: observer
        };
      };
      return AccessMember;
    })(Expression);
    exports.AccessMember = AccessMember;
    var AccessKeyed = (function(_Expression7) {
      function AccessKeyed(object, key) {
        _classCallCheck(this, AccessKeyed);
        _Expression7.call(this);
        this.object = object;
        this.key = key;
        this.isAssignable = true;
      }
      _inherits(AccessKeyed, _Expression7);
      AccessKeyed.prototype.evaluate = function evaluate(scope, valueConverters) {
        var instance = this.object.evaluate(scope, valueConverters);
        var lookup = this.key.evaluate(scope, valueConverters);
        return getKeyed(instance, lookup);
      };
      AccessKeyed.prototype.assign = function assign(scope, value) {
        var instance = this.object.evaluate(scope);
        var lookup = this.key.evaluate(scope);
        return setKeyed(instance, lookup, value);
      };
      AccessKeyed.prototype.accept = function accept(visitor) {
        visitor.visitAccessKeyed(this);
      };
      AccessKeyed.prototype.connect = function connect(binding, scope) {
        var _this10 = this;
        var objectInfo = this.object.connect(binding, scope),
            keyInfo = this.key.connect(binding, scope),
            observer = new AccessKeyedObserver(objectInfo, keyInfo, binding.observerLocator, function() {
              return _this10.evaluate(scope, binding.valueConverterLookupFunction);
            });
        return {
          value: this.evaluate(scope, binding.valueConverterLookupFunction),
          observer: observer
        };
      };
      return AccessKeyed;
    })(Expression);
    exports.AccessKeyed = AccessKeyed;
    var CallScope = (function(_Expression8) {
      function CallScope(name, args) {
        _classCallCheck(this, CallScope);
        _Expression8.call(this);
        this.name = name;
        this.args = args;
      }
      _inherits(CallScope, _Expression8);
      CallScope.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        args = args || evalList(scope, this.args, valueConverters);
        return ensureFunctionFromMap(scope, this.name).apply(scope, args);
      };
      CallScope.prototype.accept = function accept(visitor) {
        visitor.visitCallScope(this);
      };
      CallScope.prototype.connect = function connect(binding, scope) {
        var _this11 = this;
        var observer,
            childObservers = [],
            i,
            ii,
            exp,
            expInfo;
        for (i = 0, ii = this.args.length; i < ii; ++i) {
          exp = this.args[i];
          expInfo = exp.connect(binding, scope);
          if (expInfo.observer) {
            childObservers.push(expInfo.observer);
          }
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this11.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: this.evaluate(scope, binding.valueConverterLookupFunction),
          observer: observer
        };
      };
      return CallScope;
    })(Expression);
    exports.CallScope = CallScope;
    var CallMember = (function(_Expression9) {
      function CallMember(object, name, args) {
        _classCallCheck(this, CallMember);
        _Expression9.call(this);
        this.object = object;
        this.name = name;
        this.args = args;
      }
      _inherits(CallMember, _Expression9);
      CallMember.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        var instance = this.object.evaluate(scope, valueConverters);
        args = args || evalList(scope, this.args, valueConverters);
        return ensureFunctionFromMap(instance, this.name).apply(instance, args);
      };
      CallMember.prototype.accept = function accept(visitor) {
        visitor.visitCallMember(this);
      };
      CallMember.prototype.connect = function connect(binding, scope) {
        var _this12 = this;
        var observer,
            objectInfo = this.object.connect(binding, scope),
            childObservers = [],
            i,
            ii,
            exp,
            expInfo;
        if (objectInfo.observer) {
          childObservers.push(objectInfo.observer);
        }
        for (i = 0, ii = this.args.length; i < ii; ++i) {
          exp = this.args[i];
          expInfo = exp.connect(binding, scope);
          if (expInfo.observer) {
            childObservers.push(expInfo.observer);
          }
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this12.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: this.evaluate(scope, binding.valueConverterLookupFunction),
          observer: observer
        };
      };
      return CallMember;
    })(Expression);
    exports.CallMember = CallMember;
    var CallFunction = (function(_Expression10) {
      function CallFunction(func, args) {
        _classCallCheck(this, CallFunction);
        _Expression10.call(this);
        this.func = func;
        this.args = args;
      }
      _inherits(CallFunction, _Expression10);
      CallFunction.prototype.evaluate = function evaluate(scope, valueConverters, args) {
        var func = this.func.evaluate(scope, valueConverters);
        if (typeof func !== 'function') {
          throw new Error(this.func + ' is not a function');
        } else {
          return func.apply(null, args || evalList(scope, this.args, valueConverters));
        }
      };
      CallFunction.prototype.accept = function accept(visitor) {
        visitor.visitCallFunction(this);
      };
      CallFunction.prototype.connect = function connect(binding, scope) {
        var _this13 = this;
        var observer,
            funcInfo = this.func.connect(binding, scope),
            childObservers = [],
            i,
            ii,
            exp,
            expInfo;
        if (funcInfo.observer) {
          childObservers.push(funcInfo.observer);
        }
        for (i = 0, ii = this.args.length; i < ii; ++i) {
          exp = this.args[i];
          expInfo = exp.connect(binding, scope);
          if (expInfo.observer) {
            childObservers.push(expInfo.observer);
          }
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this13.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: this.evaluate(scope, binding.valueConverterLookupFunction),
          observer: observer
        };
      };
      return CallFunction;
    })(Expression);
    exports.CallFunction = CallFunction;
    var Binary = (function(_Expression11) {
      function Binary(operation, left, right) {
        _classCallCheck(this, Binary);
        _Expression11.call(this);
        this.operation = operation;
        this.left = left;
        this.right = right;
      }
      _inherits(Binary, _Expression11);
      Binary.prototype.evaluate = function evaluate(scope, valueConverters) {
        var left = this.left.evaluate(scope);
        switch (this.operation) {
          case '&&':
            return left && this.right.evaluate(scope);
          case '||':
            return left || this.right.evaluate(scope);
        }
        var right = this.right.evaluate(scope);
        switch (this.operation) {
          case '==':
            return left == right;
          case '===':
            return left === right;
          case '!=':
            return left != right;
          case '!==':
            return left !== right;
        }
        if (left === null || right === null) {
          switch (this.operation) {
            case '+':
              if (left != null)
                return left;
              if (right != null)
                return right;
              return 0;
            case '-':
              if (left != null)
                return left;
              if (right != null)
                return 0 - right;
              return 0;
          }
          return null;
        }
        switch (this.operation) {
          case '+':
            return autoConvertAdd(left, right);
          case '-':
            return left - right;
          case '*':
            return left * right;
          case '/':
            return left / right;
          case '%':
            return left % right;
          case '<':
            return left < right;
          case '>':
            return left > right;
          case '<=':
            return left <= right;
          case '>=':
            return left >= right;
          case '^':
            return left ^ right;
          case '&':
            return left & right;
        }
        throw new Error('Internal error [' + this.operation + '] not handled');
      };
      Binary.prototype.accept = function accept(visitor) {
        visitor.visitBinary(this);
      };
      Binary.prototype.connect = function connect(binding, scope) {
        var _this14 = this;
        var leftInfo = this.left.connect(binding, scope),
            rightInfo = this.right.connect(binding, scope),
            childObservers = [],
            observer;
        if (leftInfo.observer) {
          childObservers.push(leftInfo.observer);
        }
        if (rightInfo.observer) {
          childObservers.push(rightInfo.observer);
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this14.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: this.evaluate(scope, binding.valueConverterLookupFunction),
          observer: observer
        };
      };
      return Binary;
    })(Expression);
    exports.Binary = Binary;
    var PrefixNot = (function(_Expression12) {
      function PrefixNot(operation, expression) {
        _classCallCheck(this, PrefixNot);
        _Expression12.call(this);
        this.operation = operation;
        this.expression = expression;
      }
      _inherits(PrefixNot, _Expression12);
      PrefixNot.prototype.evaluate = function evaluate(scope, valueConverters) {
        return !this.expression.evaluate(scope);
      };
      PrefixNot.prototype.accept = function accept(visitor) {
        visitor.visitPrefix(this);
      };
      PrefixNot.prototype.connect = function connect(binding, scope) {
        var _this15 = this;
        var info = this.expression.connect(binding, scope),
            observer;
        if (info.observer) {
          observer = new CompositeObserver([info.observer], function() {
            return _this15.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: !info.value,
          observer: observer
        };
      };
      return PrefixNot;
    })(Expression);
    exports.PrefixNot = PrefixNot;
    var LiteralPrimitive = (function(_Expression13) {
      function LiteralPrimitive(value) {
        _classCallCheck(this, LiteralPrimitive);
        _Expression13.call(this);
        this.value = value;
      }
      _inherits(LiteralPrimitive, _Expression13);
      LiteralPrimitive.prototype.evaluate = function evaluate(scope, valueConverters) {
        return this.value;
      };
      LiteralPrimitive.prototype.accept = function accept(visitor) {
        visitor.visitLiteralPrimitive(this);
      };
      LiteralPrimitive.prototype.connect = function connect(binding, scope) {
        return {value: this.value};
      };
      return LiteralPrimitive;
    })(Expression);
    exports.LiteralPrimitive = LiteralPrimitive;
    var LiteralString = (function(_Expression14) {
      function LiteralString(value) {
        _classCallCheck(this, LiteralString);
        _Expression14.call(this);
        this.value = value;
      }
      _inherits(LiteralString, _Expression14);
      LiteralString.prototype.evaluate = function evaluate(scope, valueConverters) {
        return this.value;
      };
      LiteralString.prototype.accept = function accept(visitor) {
        visitor.visitLiteralString(this);
      };
      LiteralString.prototype.connect = function connect(binding, scope) {
        return {value: this.value};
      };
      return LiteralString;
    })(Expression);
    exports.LiteralString = LiteralString;
    var LiteralArray = (function(_Expression15) {
      function LiteralArray(elements) {
        _classCallCheck(this, LiteralArray);
        _Expression15.call(this);
        this.elements = elements;
      }
      _inherits(LiteralArray, _Expression15);
      LiteralArray.prototype.evaluate = function evaluate(scope, valueConverters) {
        var elements = this.elements,
            length = elements.length,
            result = [],
            i;
        for (i = 0; i < length; ++i) {
          result[i] = elements[i].evaluate(scope, valueConverters);
        }
        return result;
      };
      LiteralArray.prototype.accept = function accept(visitor) {
        visitor.visitLiteralArray(this);
      };
      LiteralArray.prototype.connect = function connect(binding, scope) {
        var _this16 = this;
        var observer,
            childObservers = [],
            results = [],
            i,
            ii,
            exp,
            expInfo;
        for (i = 0, ii = this.elements.length; i < ii; ++i) {
          exp = this.elements[i];
          expInfo = exp.connect(binding, scope);
          if (expInfo.observer) {
            childObservers.push(expInfo.observer);
          }
          results[i] = expInfo.value;
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this16.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: results,
          observer: observer
        };
      };
      return LiteralArray;
    })(Expression);
    exports.LiteralArray = LiteralArray;
    var LiteralObject = (function(_Expression16) {
      function LiteralObject(keys, values) {
        _classCallCheck(this, LiteralObject);
        _Expression16.call(this);
        this.keys = keys;
        this.values = values;
      }
      _inherits(LiteralObject, _Expression16);
      LiteralObject.prototype.evaluate = function evaluate(scope, valueConverters) {
        var instance = {},
            keys = this.keys,
            values = this.values,
            length = keys.length,
            i;
        for (i = 0; i < length; ++i) {
          instance[keys[i]] = values[i].evaluate(scope, valueConverters);
        }
        return instance;
      };
      LiteralObject.prototype.accept = function accept(visitor) {
        visitor.visitLiteralObject(this);
      };
      LiteralObject.prototype.connect = function connect(binding, scope) {
        var _this17 = this;
        var observer,
            childObservers = [],
            instance = {},
            keys = this.keys,
            values = this.values,
            length = keys.length,
            i,
            valueInfo;
        for (i = 0; i < length; ++i) {
          valueInfo = values[i].connect(binding, scope);
          if (valueInfo.observer) {
            childObservers.push(valueInfo.observer);
          }
          instance[keys[i]] = valueInfo.value;
        }
        if (childObservers.length) {
          observer = new CompositeObserver(childObservers, function() {
            return _this17.evaluate(scope, binding.valueConverterLookupFunction);
          });
        }
        return {
          value: instance,
          observer: observer
        };
      };
      return LiteralObject;
    })(Expression);
    exports.LiteralObject = LiteralObject;
    var Unparser = (function() {
      function Unparser(buffer) {
        _classCallCheck(this, Unparser);
        this.buffer = buffer;
      }
      Unparser.unparse = function unparse(expression) {
        var buffer = [],
            visitor = new Unparser(buffer);
        expression.accept(visitor);
        return buffer.join('');
      };
      Unparser.prototype.write = function write(text) {
        this.buffer.push(text);
      };
      Unparser.prototype.writeArgs = function writeArgs(args) {
        var i,
            length;
        this.write('(');
        for (i = 0, length = args.length; i < length; ++i) {
          if (i !== 0) {
            this.write(',');
          }
          args[i].accept(this);
        }
        this.write(')');
      };
      Unparser.prototype.visitChain = function visitChain(chain) {
        var expressions = chain.expressions,
            length = expressions.length,
            i;
        for (i = 0; i < length; ++i) {
          if (i !== 0) {
            this.write(';');
          }
          expressions[i].accept(this);
        }
      };
      Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
        var args = converter.args,
            length = args.length,
            i;
        this.write('(');
        converter.expression.accept(this);
        this.write('|' + converter.name);
        for (i = 0; i < length; ++i) {
          this.write(' :');
          args[i].accept(this);
        }
        this.write(')');
      };
      Unparser.prototype.visitAssign = function visitAssign(assign) {
        assign.target.accept(this);
        this.write('=');
        assign.value.accept(this);
      };
      Unparser.prototype.visitConditional = function visitConditional(conditional) {
        conditional.condition.accept(this);
        this.write('?');
        conditional.yes.accept(this);
        this.write(':');
        conditional.no.accept(this);
      };
      Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
        this.write(access.name);
      };
      Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
        access.object.accept(this);
        this.write('.' + access.name);
      };
      Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
        access.object.accept(this);
        this.write('[');
        access.key.accept(this);
        this.write(']');
      };
      Unparser.prototype.visitCallScope = function visitCallScope(call) {
        this.write(call.name);
        this.writeArgs(call.args);
      };
      Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
        call.func.accept(this);
        this.writeArgs(call.args);
      };
      Unparser.prototype.visitCallMember = function visitCallMember(call) {
        call.object.accept(this);
        this.write('.' + call.name);
        this.writeArgs(call.args);
      };
      Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
        this.write('(' + prefix.operation);
        prefix.expression.accept(this);
        this.write(')');
      };
      Unparser.prototype.visitBinary = function visitBinary(binary) {
        this.write('(');
        binary.left.accept(this);
        this.write(binary.operation);
        binary.right.accept(this);
        this.write(')');
      };
      Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
        this.write('' + literal.value);
      };
      Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
        var elements = literal.elements,
            length = elements.length,
            i;
        this.write('[');
        for (i = 0; i < length; ++i) {
          if (i !== 0) {
            this.write(',');
          }
          elements[i].accept(this);
        }
        this.write(']');
      };
      Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
        var keys = literal.keys,
            values = literal.values,
            length = keys.length,
            i;
        this.write('{');
        for (i = 0; i < length; ++i) {
          if (i !== 0) {
            this.write(',');
          }
          this.write('\'' + keys[i] + '\':');
          values[i].accept(this);
        }
        this.write('}');
      };
      Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
        var escaped = literal.value.replace(/'/g, '\'');
        this.write('\'' + escaped + '\'');
      };
      return Unparser;
    })();
    exports.Unparser = Unparser;
    var evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
    function evalList(scope, list, valueConverters) {
      var length = list.length,
          cacheLength,
          i;
      for (cacheLength = evalListCache.length; cacheLength <= length; ++cacheLength) {
        evalListCache.push([]);
      }
      var result = evalListCache[length];
      for (i = 0; i < length; ++i) {
        result[i] = list[i].evaluate(scope, valueConverters);
      }
      return result;
    }
    function autoConvertAdd(a, b) {
      if (a != null && b != null) {
        if (typeof a == 'string' && typeof b != 'string') {
          return a + b.toString();
        }
        if (typeof a != 'string' && typeof b == 'string') {
          return a.toString() + b;
        }
        return a + b;
      }
      if (a != null) {
        return a;
      }
      if (b != null) {
        return b;
      }
      return 0;
    }
    function ensureFunctionFromMap(obj, name) {
      var func = obj[name];
      if (typeof func === 'function') {
        return func;
      }
      if (func === null) {
        throw new Error('Undefined function ' + name);
      } else {
        throw new Error(name + ' is not a function');
      }
    }
    function getKeyed(obj, key) {
      if (Array.isArray(obj)) {
        return obj[parseInt(key)];
      } else if (obj) {
        return obj[key];
      } else if (obj === null) {
        throw new Error('Accessing null object');
      } else {
        return obj[key];
      }
    }
    function setKeyed(obj, key, value) {
      if (Array.isArray(obj)) {
        var index = parseInt(key);
        if (obj.length <= index) {
          obj.length = index + 1;
        }
        obj[index] = value;
      } else {
        obj[key] = value;
      }
      return value;
    }
    var bindingMode = {
      oneTime: 0,
      oneWay: 1,
      twoWay: 2
    };
    exports.bindingMode = bindingMode;
    var Token = (function() {
      function Token(index, text) {
        _classCallCheck(this, Token);
        this.index = index;
        this.text = text;
      }
      Token.prototype.withOp = function withOp(op) {
        this.opKey = op;
        return this;
      };
      Token.prototype.withGetterSetter = function withGetterSetter(key) {
        this.key = key;
        return this;
      };
      Token.prototype.withValue = function withValue(value) {
        this.value = value;
        return this;
      };
      Token.prototype.toString = function toString() {
        return 'Token(' + this.text + ')';
      };
      return Token;
    })();
    exports.Token = Token;
    var Lexer = (function() {
      function Lexer() {
        _classCallCheck(this, Lexer);
      }
      Lexer.prototype.lex = function lex(text) {
        var scanner = new Scanner(text);
        var tokens = [];
        var token = scanner.scanToken();
        while (token) {
          tokens.push(token);
          token = scanner.scanToken();
        }
        return tokens;
      };
      return Lexer;
    })();
    exports.Lexer = Lexer;
    var Scanner = (function() {
      function Scanner(input) {
        _classCallCheck(this, Scanner);
        this.input = input;
        this.length = input.length;
        this.peek = 0;
        this.index = -1;
        this.advance();
      }
      Scanner.prototype.scanToken = function scanToken() {
        while (this.peek <= $SPACE) {
          if (++this.index >= this.length) {
            this.peek = $EOF;
            return null;
          } else {
            this.peek = this.input.charCodeAt(this.index);
          }
        }
        if (isIdentifierStart(this.peek)) {
          return this.scanIdentifier();
        }
        if (isDigit(this.peek)) {
          return this.scanNumber(this.index);
        }
        var start = this.index;
        switch (this.peek) {
          case $PERIOD:
            this.advance();
            return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
          case $LPAREN:
          case $RPAREN:
          case $LBRACE:
          case $RBRACE:
          case $LBRACKET:
          case $RBRACKET:
          case $COMMA:
          case $COLON:
          case $SEMICOLON:
            return this.scanCharacter(start, String.fromCharCode(this.peek));
          case $SQ:
          case $DQ:
            return this.scanString();
          case $PLUS:
          case $MINUS:
          case $STAR:
          case $SLASH:
          case $PERCENT:
          case $CARET:
          case $QUESTION:
            return this.scanOperator(start, String.fromCharCode(this.peek));
          case $LT:
          case $GT:
          case $BANG:
          case $EQ:
            return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
          case $AMPERSAND:
            return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
          case $BAR:
            return this.scanComplexOperator(start, $BAR, '|', '|');
          case $NBSP:
            while (isWhitespace(this.peek)) {
              this.advance();
            }
            return this.scanToken();
        }
        var character = String.fromCharCode(this.peek);
        this.error('Unexpected character [' + character + ']');
        return null;
      };
      Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
        assert(this.peek === text.charCodeAt(0));
        this.advance();
        return new Token(start, text);
      };
      Scanner.prototype.scanOperator = function scanOperator(start, text) {
        assert(this.peek === text.charCodeAt(0));
        assert(OPERATORS.indexOf(text) !== -1);
        this.advance();
        return new Token(start, text).withOp(text);
      };
      Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
        assert(this.peek === one.charCodeAt(0));
        this.advance();
        var text = one;
        if (this.peek === code) {
          this.advance();
          text += two;
        }
        if (this.peek === code) {
          this.advance();
          text += two;
        }
        assert(OPERATORS.indexOf(text) != -1);
        return new Token(start, text).withOp(text);
      };
      Scanner.prototype.scanIdentifier = function scanIdentifier() {
        assert(isIdentifierStart(this.peek));
        var start = this.index;
        this.advance();
        while (isIdentifierPart(this.peek)) {
          this.advance();
        }
        var text = this.input.substring(start, this.index);
        var result = new Token(start, text);
        if (OPERATORS.indexOf(text) !== -1) {
          result.withOp(text);
        } else {
          result.withGetterSetter(text);
        }
        return result;
      };
      Scanner.prototype.scanNumber = function scanNumber(start) {
        assert(isDigit(this.peek));
        var simple = this.index === start;
        this.advance();
        while (true) {
          if (isDigit(this.peek)) {} else if (this.peek === $PERIOD) {
            simple = false;
          } else if (isExponentStart(this.peek)) {
            this.advance();
            if (isExponentSign(this.peek)) {
              this.advance();
            }
            if (!isDigit(this.peek)) {
              this.error('Invalid exponent', -1);
            }
            simple = false;
          } else {
            break;
          }
          this.advance();
        }
        var text = this.input.substring(start, this.index);
        var value = simple ? parseInt(text) : parseFloat(text);
        return new Token(start, text).withValue(value);
      };
      Scanner.prototype.scanString = function scanString() {
        assert(this.peek === $SQ || this.peek === $DQ);
        var start = this.index;
        var quote = this.peek;
        this.advance();
        var buffer;
        var marker = this.index;
        while (this.peek !== quote) {
          if (this.peek === $BACKSLASH) {
            if (buffer === null) {
              buffer = [];
            }
            buffer.push(this.input.substring(marker, this.index));
            this.advance();
            var unescaped;
            if (this.peek === $u) {
              var hex = this.input.substring(this.index + 1, this.index + 5);
              if (!/[A-Z0-9]{4}/.test(hex)) {
                this.error('Invalid unicode escape [\\u' + hex + ']');
              }
              unescaped = parseInt(hex, 16);
              for (var i = 0; i < 5; ++i) {
                this.advance();
              }
            } else {
              unescaped = decodeURIComponent(this.peek);
              this.advance();
            }
            buffer.push(String.fromCharCode(unescaped));
            marker = this.index;
          } else if (this.peek === $EOF) {
            this.error('Unterminated quote');
          } else {
            this.advance();
          }
        }
        var last = this.input.substring(marker, this.index);
        this.advance();
        var text = this.input.substring(start, this.index);
        var unescaped = last;
        if (buffer != null) {
          buffer.push(last);
          unescaped = buffer.join('');
        }
        return new Token(start, text).withValue(unescaped);
      };
      Scanner.prototype.advance = function advance() {
        if (++this.index >= this.length) {
          this.peek = $EOF;
        } else {
          this.peek = this.input.charCodeAt(this.index);
        }
      };
      Scanner.prototype.error = function error(message) {
        var offset = arguments[1] === undefined ? 0 : arguments[1];
        var position = this.index + offset;
        throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
      };
      return Scanner;
    })();
    exports.Scanner = Scanner;
    var OPERATORS = ['undefined', 'null', 'true', 'false', '+', '-', '*', '/', '%', '^', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?'];
    var $EOF = 0;
    var $TAB = 9;
    var $LF = 10;
    var $VTAB = 11;
    var $FF = 12;
    var $CR = 13;
    var $SPACE = 32;
    var $BANG = 33;
    var $DQ = 34;
    var $$ = 36;
    var $PERCENT = 37;
    var $AMPERSAND = 38;
    var $SQ = 39;
    var $LPAREN = 40;
    var $RPAREN = 41;
    var $STAR = 42;
    var $PLUS = 43;
    var $COMMA = 44;
    var $MINUS = 45;
    var $PERIOD = 46;
    var $SLASH = 47;
    var $COLON = 58;
    var $SEMICOLON = 59;
    var $LT = 60;
    var $EQ = 61;
    var $GT = 62;
    var $QUESTION = 63;
    var $0 = 48;
    var $9 = 57;
    var $A = 65;
    var $E = 69;
    var $Z = 90;
    var $LBRACKET = 91;
    var $BACKSLASH = 92;
    var $RBRACKET = 93;
    var $CARET = 94;
    var $_ = 95;
    var $a = 97;
    var $e = 101;
    var $f = 102;
    var $n = 110;
    var $r = 114;
    var $t = 116;
    var $u = 117;
    var $v = 118;
    var $z = 122;
    var $LBRACE = 123;
    var $BAR = 124;
    var $RBRACE = 125;
    var $NBSP = 160;
    function isWhitespace(code) {
      return code >= $TAB && code <= $SPACE || code === $NBSP;
    }
    function isIdentifierStart(code) {
      return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
    }
    function isIdentifierPart(code) {
      return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
    }
    function isDigit(code) {
      return $0 <= code && code <= $9;
    }
    function isExponentStart(code) {
      return code === $e || code === $E;
    }
    function isExponentSign(code) {
      return code === $MINUS || code === $PLUS;
    }
    function unescape(code) {
      switch (code) {
        case $n:
          return $LF;
        case $f:
          return $FF;
        case $r:
          return $CR;
        case $t:
          return $TAB;
        case $v:
          return $VTAB;
        default:
          return code;
      }
    }
    function assert(condition, message) {
      if (!condition) {
        throw message || 'Assertion failed';
      }
    }
    var EOF = new Token(-1, null);
    var Parser = (function() {
      function Parser() {
        _classCallCheck(this, Parser);
        this.cache = {};
        this.lexer = new Lexer();
      }
      Parser.prototype.parse = function parse(input) {
        input = input || '';
        return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
      };
      return Parser;
    })();
    exports.Parser = Parser;
    var ParserImplementation = (function() {
      function ParserImplementation(lexer, input) {
        _classCallCheck(this, ParserImplementation);
        this.index = 0;
        this.input = input;
        this.tokens = lexer.lex(input);
      }
      ParserImplementation.prototype.parseChain = function parseChain() {
        var isChain = false,
            expressions = [];
        while (this.optional(';')) {
          isChain = true;
        }
        while (this.index < this.tokens.length) {
          if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
            this.error('Unconsumed token ' + this.peek.text);
          }
          var expr = this.parseValueConverter();
          expressions.push(expr);
          while (this.optional(';')) {
            isChain = true;
          }
          if (isChain && expr instanceof ValueConverter) {
            this.error('cannot have a value converter in a chain');
          }
        }
        return expressions.length === 1 ? expressions[0] : new Chain(expressions);
      };
      ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
        var result = this.parseExpression();
        while (this.optional('|')) {
          var name = this.peek.text,
              args = [];
          this.advance();
          while (this.optional(':')) {
            args.push(this.parseExpression());
          }
          result = new ValueConverter(result, name, args, [result].concat(args));
        }
        return result;
      };
      ParserImplementation.prototype.parseExpression = function parseExpression() {
        var start = this.peek.index,
            result = this.parseConditional();
        while (this.peek.text === '=') {
          if (!result.isAssignable) {
            var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
            var expression = this.input.substring(start, end);
            this.error('Expression ' + expression + ' is not assignable');
          }
          this.expect('=');
          result = new Assign(result, this.parseConditional());
        }
        return result;
      };
      ParserImplementation.prototype.parseConditional = function parseConditional() {
        var start = this.peek.index,
            result = this.parseLogicalOr();
        if (this.optional('?')) {
          var yes = this.parseExpression();
          if (!this.optional(':')) {
            var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
            var expression = this.input.substring(start, end);
            this.error('Conditional expression ' + expression + ' requires all 3 expressions');
          }
          var no = this.parseExpression();
          result = new Conditional(result, yes, no);
        }
        return result;
      };
      ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
        var result = this.parseLogicalAnd();
        while (this.optional('||')) {
          result = new Binary('||', result, this.parseLogicalAnd());
        }
        return result;
      };
      ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
        var result = this.parseEquality();
        while (this.optional('&&')) {
          result = new Binary('&&', result, this.parseEquality());
        }
        return result;
      };
      ParserImplementation.prototype.parseEquality = function parseEquality() {
        var result = this.parseRelational();
        while (true) {
          if (this.optional('==')) {
            result = new Binary('==', result, this.parseRelational());
          } else if (this.optional('!=')) {
            result = new Binary('!=', result, this.parseRelational());
          } else if (this.optional('===')) {
            result = new Binary('===', result, this.parseRelational());
          } else if (this.optional('!==')) {
            result = new Binary('!==', result, this.parseRelational());
          } else {
            return result;
          }
        }
      };
      ParserImplementation.prototype.parseRelational = function parseRelational() {
        var result = this.parseAdditive();
        while (true) {
          if (this.optional('<')) {
            result = new Binary('<', result, this.parseAdditive());
          } else if (this.optional('>')) {
            result = new Binary('>', result, this.parseAdditive());
          } else if (this.optional('<=')) {
            result = new Binary('<=', result, this.parseAdditive());
          } else if (this.optional('>=')) {
            result = new Binary('>=', result, this.parseAdditive());
          } else {
            return result;
          }
        }
      };
      ParserImplementation.prototype.parseAdditive = function parseAdditive() {
        var result = this.parseMultiplicative();
        while (true) {
          if (this.optional('+')) {
            result = new Binary('+', result, this.parseMultiplicative());
          } else if (this.optional('-')) {
            result = new Binary('-', result, this.parseMultiplicative());
          } else {
            return result;
          }
        }
      };
      ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
        var result = this.parsePrefix();
        while (true) {
          if (this.optional('*')) {
            result = new Binary('*', result, this.parsePrefix());
          } else if (this.optional('%')) {
            result = new Binary('%', result, this.parsePrefix());
          } else if (this.optional('/')) {
            result = new Binary('/', result, this.parsePrefix());
          } else {
            return result;
          }
        }
      };
      ParserImplementation.prototype.parsePrefix = function parsePrefix() {
        if (this.optional('+')) {
          return this.parsePrefix();
        } else if (this.optional('-')) {
          return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
        } else if (this.optional('!')) {
          return new PrefixNot('!', this.parsePrefix());
        } else {
          return this.parseAccessOrCallMember();
        }
      };
      ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
        var result = this.parsePrimary();
        while (true) {
          if (this.optional('.')) {
            var name = this.peek.text;
            this.advance();
            if (this.optional('(')) {
              var args = this.parseExpressionList(')');
              this.expect(')');
              result = new CallMember(result, name, args);
            } else {
              result = new AccessMember(result, name);
            }
          } else if (this.optional('[')) {
            var key = this.parseExpression();
            this.expect(']');
            result = new AccessKeyed(result, key);
          } else if (this.optional('(')) {
            var args = this.parseExpressionList(')');
            this.expect(')');
            result = new CallFunction(result, args);
          } else {
            return result;
          }
        }
      };
      ParserImplementation.prototype.parsePrimary = function parsePrimary() {
        if (this.optional('(')) {
          var result = this.parseExpression();
          this.expect(')');
          return result;
        } else if (this.optional('null') || this.optional('undefined')) {
          return new LiteralPrimitive(null);
        } else if (this.optional('true')) {
          return new LiteralPrimitive(true);
        } else if (this.optional('false')) {
          return new LiteralPrimitive(false);
        } else if (this.optional('[')) {
          var elements = this.parseExpressionList(']');
          this.expect(']');
          return new LiteralArray(elements);
        } else if (this.peek.text == '{') {
          return this.parseObject();
        } else if (this.peek.key != null) {
          return this.parseAccessOrCallScope();
        } else if (this.peek.value != null) {
          var value = this.peek.value;
          this.advance();
          return isNaN(value) ? new LiteralString(value) : new LiteralPrimitive(value);
        } else if (this.index >= this.tokens.length) {
          throw new Error('Unexpected end of expression: ' + this.input);
        } else {
          this.error('Unexpected token ' + this.peek.text);
        }
      };
      ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
        var name = this.peek.key;
        this.advance();
        if (!this.optional('(')) {
          return new AccessScope(name);
        }
        var args = this.parseExpressionList(')');
        this.expect(')');
        return new CallScope(name, args);
      };
      ParserImplementation.prototype.parseObject = function parseObject() {
        var keys = [],
            values = [];
        this.expect('{');
        if (this.peek.text !== '}') {
          do {
            var value = this.peek.value;
            keys.push(typeof value === 'string' ? value : this.peek.text);
            this.advance();
            this.expect(':');
            values.push(this.parseExpression());
          } while (this.optional(','));
        }
        this.expect('}');
        return new LiteralObject(keys, values);
      };
      ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
        var result = [];
        if (this.peek.text != terminator) {
          do {
            result.push(this.parseExpression());
          } while (this.optional(','));
        }
        return result;
      };
      ParserImplementation.prototype.optional = function optional(text) {
        if (this.peek.text === text) {
          this.advance();
          return true;
        }
        return false;
      };
      ParserImplementation.prototype.expect = function expect(text) {
        if (this.peek.text === text) {
          this.advance();
        } else {
          this.error('Missing expected ' + text);
        }
      };
      ParserImplementation.prototype.advance = function advance() {
        this.index++;
      };
      ParserImplementation.prototype.error = function error(message) {
        var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';
        throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
      };
      _createClass(ParserImplementation, [{
        key: 'peek',
        get: function get() {
          return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
        }
      }]);
      return ParserImplementation;
    })();
    exports.ParserImplementation = ParserImplementation;
    var mapProto = Map.prototype;
    function _getMapObserver(taskQueue, map) {
      return ModifyMapObserver.create(taskQueue, map);
    }
    var ModifyMapObserver = (function(_ModifyCollectionObserver2) {
      function ModifyMapObserver(taskQueue, map) {
        _classCallCheck(this, ModifyMapObserver);
        _ModifyCollectionObserver2.call(this, taskQueue, map);
      }
      _inherits(ModifyMapObserver, _ModifyCollectionObserver2);
      ModifyMapObserver.create = function create(taskQueue, map) {
        var observer = new ModifyMapObserver(taskQueue, map);
        map['set'] = function() {
          var oldValue = map.get(arguments[0]);
          var type = oldValue ? 'update' : 'add';
          var methodCallResult = mapProto['set'].apply(map, arguments);
          observer.addChangeRecord({
            type: type,
            object: map,
            key: arguments[0],
            oldValue: oldValue
          });
          return methodCallResult;
        };
        map['delete'] = function() {
          var oldValue = map.get(arguments[0]);
          var methodCallResult = mapProto['delete'].apply(map, arguments);
          observer.addChangeRecord({
            type: 'delete',
            object: map,
            key: arguments[0],
            oldValue: oldValue
          });
          return methodCallResult;
        };
        map['clear'] = function() {
          var methodCallResult = mapProto['clear'].apply(map, arguments);
          observer.addChangeRecord({
            type: 'clear',
            object: map
          });
          return methodCallResult;
        };
        return observer;
      };
      return ModifyMapObserver;
    })(ModifyCollectionObserver);
    function findOriginalEventTarget(event) {
      return event.originalTarget || event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target || event.srcElement;
    }
    function handleDelegatedEvent(event) {
      event = event || window.event;
      var target = findOriginalEventTarget(event),
          callback;
      while (target && !callback) {
        if (target.delegatedCallbacks) {
          callback = target.delegatedCallbacks[event.type];
        }
        if (!callback) {
          target = target.parentNode;
        }
      }
      if (callback) {
        callback(event);
      }
    }
    var DelegateHandlerEntry = (function() {
      function DelegateHandlerEntry(eventName) {
        _classCallCheck(this, DelegateHandlerEntry);
        this.eventName = eventName;
        this.count = 0;
      }
      DelegateHandlerEntry.prototype.increment = function increment() {
        this.count++;
        if (this.count === 1) {
          document.addEventListener(this.eventName, handleDelegatedEvent, false);
        }
      };
      DelegateHandlerEntry.prototype.decrement = function decrement() {
        this.count--;
        if (this.count === 0) {
          document.removeEventListener(this.eventName, handleDelegatedEvent);
        }
      };
      return DelegateHandlerEntry;
    })();
    var DefaultEventStrategy = (function() {
      function DefaultEventStrategy() {
        _classCallCheck(this, DefaultEventStrategy);
      }
      DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, delegate) {
        if (delegate) {
          var _ret = (function() {
            var delegatedHandlers = document.delegatedHandlers || (document.delegatedHandlers = {}),
                handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent)),
                delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});
            handlerEntry.increment();
            delegatedCallbacks[targetEvent] = callback;
            return {v: function() {
                handlerEntry.decrement();
                delegatedCallbacks[targetEvent] = null;
              }};
          })();
          if (typeof _ret === 'object')
            return _ret.v;
        } else {
          target.addEventListener(targetEvent, callback, false);
          return function() {
            target.removeEventListener(targetEvent, callback);
          };
        }
      };
      return DefaultEventStrategy;
    })();
    var EventManager = (function() {
      function EventManager() {
        _classCallCheck(this, EventManager);
        this.elementHandlerLookup = {};
        this.eventStrategyLookup = {};
        this.registerElementConfig({
          tagName: 'input',
          properties: {
            value: ['change', 'input'],
            checked: ['change', 'input'],
            files: ['change', 'input']
          }
        });
        this.registerElementConfig({
          tagName: 'textarea',
          properties: {value: ['change', 'input']}
        });
        this.registerElementConfig({
          tagName: 'select',
          properties: {value: ['change']}
        });
        this.registerElementConfig({
          tagName: 'content editable',
          properties: {value: ['change', 'input', 'blur', 'keyup', 'paste']}
        });
        this.registerElementConfig({
          tagName: 'scrollable element',
          properties: {
            scrollTop: ['scroll'],
            scrollLeft: ['scroll']
          }
        });
        this.defaultEventStrategy = new DefaultEventStrategy();
      }
      EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
        var tagName = config.tagName.toLowerCase(),
            properties = config.properties,
            propertyName;
        this.elementHandlerLookup[tagName] = {};
        for (propertyName in properties) {
          if (properties.hasOwnProperty(propertyName)) {
            this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
          }
        }
      };
      EventManager.prototype.registerElementPropertyConfig = function registerElementPropertyConfig(tagName, propertyName, events) {
        this.elementHandlerLookup[tagName][propertyName] = {subscribe: function subscribe(target, callback) {
            events.forEach(function(changeEvent) {
              target.addEventListener(changeEvent, callback, false);
            });
            return function() {
              events.forEach(function(changeEvent) {
                target.removeEventListener(changeEvent, callback);
              });
            };
          }};
      };
      EventManager.prototype.registerElementHandler = function registerElementHandler(tagName, handler) {
        this.elementHandlerLookup[tagName.toLowerCase()] = handler;
      };
      EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
        this.eventStrategyLookup[eventName] = strategy;
      };
      EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
        var tagName,
            lookup = this.elementHandlerLookup;
        if (target.tagName) {
          tagName = target.tagName.toLowerCase();
          if (lookup[tagName] && lookup[tagName][propertyName]) {
            return lookup[tagName][propertyName];
          }
          if (propertyName === 'textContent' || propertyName === 'innerHTML') {
            return lookup['content editable']['value'];
          }
          if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
            return lookup['scrollable element'][propertyName];
          }
        }
        return null;
      };
      EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callback, delegate) {
        return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callback, delegate);
      };
      return EventManager;
    })();
    exports.EventManager = EventManager;
    var DirtyChecker = (function() {
      function DirtyChecker() {
        _classCallCheck(this, DirtyChecker);
        this.tracked = [];
        this.checkDelay = 120;
      }
      DirtyChecker.prototype.addProperty = function addProperty(property) {
        var tracked = this.tracked;
        tracked.push(property);
        if (tracked.length === 1) {
          this.scheduleDirtyCheck();
        }
      };
      DirtyChecker.prototype.removeProperty = function removeProperty(property) {
        var tracked = this.tracked;
        tracked.splice(tracked.indexOf(property), 1);
      };
      DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
        var _this18 = this;
        setTimeout(function() {
          return _this18.check();
        }, this.checkDelay);
      };
      DirtyChecker.prototype.check = function check() {
        var tracked = this.tracked,
            i = tracked.length;
        while (i--) {
          var current = tracked[i];
          if (current.isDirty()) {
            current.call();
          }
        }
        if (tracked.length) {
          this.scheduleDirtyCheck();
        }
      };
      return DirtyChecker;
    })();
    exports.DirtyChecker = DirtyChecker;
    var DirtyCheckProperty = (function() {
      function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
        _classCallCheck(this, DirtyCheckProperty);
        this.dirtyChecker = dirtyChecker;
        this.obj = obj;
        this.propertyName = propertyName;
        this.callbacks = [];
        this.isSVG = obj instanceof SVGElement;
      }
      DirtyCheckProperty.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
        if (this.isSVG) {
          this.obj.setAttributeNS(null, this.propertyName, newValue);
        } else {
          this.obj[this.propertyName] = newValue;
        }
      };
      DirtyCheckProperty.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.oldValue,
            newValue = this.getValue();
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
        this.oldValue = newValue;
      };
      DirtyCheckProperty.prototype.isDirty = function isDirty() {
        return this.oldValue !== this.getValue();
      };
      DirtyCheckProperty.prototype.beginTracking = function beginTracking() {
        this.tracking = true;
        this.oldValue = this.newValue = this.getValue();
        this.dirtyChecker.addProperty(this);
      };
      DirtyCheckProperty.prototype.endTracking = function endTracking() {
        this.tracking = false;
        this.dirtyChecker.removeProperty(this);
      };
      DirtyCheckProperty.prototype.subscribe = function subscribe(callback) {
        var callbacks = this.callbacks,
            that = this;
        callbacks.push(callback);
        if (!this.tracking) {
          this.beginTracking();
        }
        return function() {
          callbacks.splice(callbacks.indexOf(callback), 1);
          if (callbacks.length === 0) {
            that.endTracking();
          }
        };
      };
      return DirtyCheckProperty;
    })();
    exports.DirtyCheckProperty = DirtyCheckProperty;
    var SetterObserver = (function() {
      function SetterObserver(taskQueue, obj, propertyName) {
        _classCallCheck(this, SetterObserver);
        this.taskQueue = taskQueue;
        this.obj = obj;
        this.propertyName = propertyName;
        this.callbacks = [];
        this.queued = false;
        this.observing = false;
      }
      SetterObserver.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      SetterObserver.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };
      SetterObserver.prototype.getterValue = function getterValue() {
        return this.currentValue;
      };
      SetterObserver.prototype.setterValue = function setterValue(newValue) {
        var oldValue = this.currentValue;
        if (oldValue !== newValue) {
          if (!this.queued) {
            this.oldValue = oldValue;
            this.queued = true;
            this.taskQueue.queueMicroTask(this);
          }
          this.currentValue = newValue;
        }
      };
      SetterObserver.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.oldValue,
            newValue = this.currentValue;
        this.queued = false;
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
      };
      SetterObserver.prototype.subscribe = function subscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.push(callback);
        if (!this.observing) {
          this.convertProperty();
        }
        return function() {
          callbacks.splice(callbacks.indexOf(callback), 1);
        };
      };
      SetterObserver.prototype.convertProperty = function convertProperty() {
        this.observing = true;
        this.currentValue = this.obj[this.propertyName];
        this.setValue = this.setterValue;
        this.getValue = this.getterValue;
        try {
          Object.defineProperty(this.obj, this.propertyName, {
            configurable: true,
            enumerable: true,
            get: this.getValue.bind(this),
            set: this.setValue.bind(this)
          });
        } catch (_) {}
      };
      return SetterObserver;
    })();
    exports.SetterObserver = SetterObserver;
    var OoPropertyObserver = (function() {
      function OoPropertyObserver(obj, propertyName, subscribe) {
        _classCallCheck(this, OoPropertyObserver);
        this.obj = obj;
        this.propertyName = propertyName;
        this.subscribe = subscribe;
      }
      OoPropertyObserver.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      OoPropertyObserver.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };
      return OoPropertyObserver;
    })();
    exports.OoPropertyObserver = OoPropertyObserver;
    var OoObjectObserver = (function() {
      function OoObjectObserver(obj, observerLocator) {
        _classCallCheck(this, OoObjectObserver);
        this.obj = obj;
        this.observerLocator = observerLocator;
        this.observers = {};
        this.callbacks = {};
        this.callbackCount = 0;
      }
      OoObjectObserver.prototype.subscribe = function subscribe(propertyName, callback) {
        if (this.callbacks[propertyName]) {
          this.callbacks[propertyName].push(callback);
        } else {
          this.callbacks[propertyName] = [callback];
          this.callbacks[propertyName].oldValue = this.obj[propertyName];
        }
        if (this.callbackCount === 0) {
          this.handler = this.handleChanges.bind(this);
          try {
            Object.observe(this.obj, this.handler, ['update', 'add']);
          } catch (_) {}
        }
        this.callbackCount++;
        return this.unsubscribe.bind(this, propertyName, callback);
      };
      OoObjectObserver.prototype.unsubscribe = function unsubscribe(propertyName, callback) {
        var callbacks = this.callbacks[propertyName],
            index = callbacks.indexOf(callback);
        if (index === -1) {
          return ;
        }
        callbacks.splice(index, 1);
        if (callbacks.count = 0) {
          callbacks.oldValue = null;
          this.callbacks[propertyName] = null;
        }
        this.callbackCount--;
        if (this.callbackCount === 0) {
          try {
            Object.unobserve(this.obj, this.handler);
          } catch (_) {}
        }
      };
      OoObjectObserver.prototype.getObserver = function getObserver(propertyName, descriptor) {
        var propertyObserver = this.observers[propertyName];
        if (!propertyObserver) {
          if (descriptor) {
            propertyObserver = this.observers[propertyName] = new OoPropertyObserver(this.obj, propertyName, this.subscribe.bind(this, propertyName));
          } else {
            propertyObserver = this.observers[propertyName] = new UndefinedPropertyObserver(this, this.obj, propertyName);
          }
        }
        return propertyObserver;
      };
      OoObjectObserver.prototype.handleChanges = function handleChanges(changes) {
        var properties = {},
            i,
            ii,
            change,
            propertyName,
            oldValue,
            newValue,
            callbacks;
        for (i = 0, ii = changes.length; i < ii; i++) {
          change = changes[i];
          properties[change.name] = change;
        }
        for (name in properties) {
          callbacks = this.callbacks[name];
          if (!callbacks) {
            continue;
          }
          change = properties[name];
          newValue = change.object[name];
          oldValue = change.oldValue;
          for (i = 0, ii = callbacks.length; i < ii; i++) {
            callbacks[i](newValue, oldValue);
          }
        }
      };
      return OoObjectObserver;
    })();
    exports.OoObjectObserver = OoObjectObserver;
    var UndefinedPropertyObserver = (function() {
      function UndefinedPropertyObserver(owner, obj, propertyName) {
        _classCallCheck(this, UndefinedPropertyObserver);
        this.owner = owner;
        this.obj = obj;
        this.propertyName = propertyName;
        this.callbackMap = new Map();
      }
      UndefinedPropertyObserver.prototype.getValue = function getValue() {
        if (this.actual) {
          return this.actual.getValue();
        }
        return this.obj[this.propertyName];
      };
      UndefinedPropertyObserver.prototype.setValue = function setValue(newValue) {
        if (this.actual) {
          this.actual.setValue(newValue);
          return ;
        }
        this.obj[this.propertyName] = newValue;
        this.trigger(newValue, undefined);
      };
      UndefinedPropertyObserver.prototype.trigger = function trigger(newValue, oldValue) {
        var callback;
        if (this.subscription) {
          this.subscription();
        }
        this.getObserver();
        for (var _iterator2 = this.callbackMap.keys(),
            _isArray2 = Array.isArray(_iterator2),
            _i2 = 0,
            _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ; ) {
          if (_isArray2) {
            if (_i2 >= _iterator2.length)
              break;
            callback = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done)
              break;
            callback = _i2.value;
          }
          callback(newValue, oldValue);
        }
      };
      UndefinedPropertyObserver.prototype.getObserver = function getObserver() {
        var callback,
            observerLocator;
        if (!Object.getOwnPropertyDescriptor(this.obj, this.propertyName)) {
          return ;
        }
        observerLocator = this.owner.observerLocator;
        delete this.owner.observers[this.propertyName];
        delete observerLocator.getOrCreateObserversLookup(this.obj, observerLocator)[this.propertyName];
        this.actual = observerLocator.getObserver(this.obj, this.propertyName);
        for (var _iterator3 = this.callbackMap.keys(),
            _isArray3 = Array.isArray(_iterator3),
            _i3 = 0,
            _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ; ) {
          if (_isArray3) {
            if (_i3 >= _iterator3.length)
              break;
            callback = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done)
              break;
            callback = _i3.value;
          }
          this.callbackMap.set(callback, this.actual.subscribe(callback));
        }
      };
      UndefinedPropertyObserver.prototype.subscribe = function subscribe(callback) {
        var _this19 = this;
        if (!this.actual) {
          this.getObserver();
        }
        if (this.actual) {
          return this.actual.subscribe(callback);
        }
        if (!this.subscription) {
          this.subscription = this.owner.subscribe(this.propertyName, this.trigger.bind(this));
        }
        this.callbackMap.set(callback, null);
        return function() {
          var actualDispose = _this19.callbackMap.get(callback);
          if (actualDispose)
            actualDispose();
          _this19.callbackMap['delete'](callback);
        };
      };
      return UndefinedPropertyObserver;
    })();
    exports.UndefinedPropertyObserver = UndefinedPropertyObserver;
    var XLinkAttributeObserver = (function() {
      function XLinkAttributeObserver(element, propertyName, attributeName) {
        _classCallCheck(this, XLinkAttributeObserver);
        this.element = element;
        this.propertyName = propertyName;
        this.attributeName = attributeName;
      }
      XLinkAttributeObserver.prototype.getValue = function getValue() {
        return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
      };
      XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
        return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
      };
      XLinkAttributeObserver.prototype.subscribe = function subscribe(callback) {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };
      return XLinkAttributeObserver;
    })();
    exports.XLinkAttributeObserver = XLinkAttributeObserver;
    var DataAttributeObserver = (function() {
      function DataAttributeObserver(element, propertyName) {
        _classCallCheck(this, DataAttributeObserver);
        this.element = element;
        this.propertyName = propertyName;
      }
      DataAttributeObserver.prototype.getValue = function getValue() {
        return this.element.getAttribute(this.propertyName);
      };
      DataAttributeObserver.prototype.setValue = function setValue(newValue) {
        return this.element.setAttribute(this.propertyName, newValue);
      };
      DataAttributeObserver.prototype.subscribe = function subscribe(callback) {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };
      return DataAttributeObserver;
    })();
    exports.DataAttributeObserver = DataAttributeObserver;
    var StyleObserver = (function() {
      function StyleObserver(element, propertyName) {
        _classCallCheck(this, StyleObserver);
        this.element = element;
        this.propertyName = propertyName;
      }
      StyleObserver.prototype.getValue = function getValue() {
        return this.element.style.cssText;
      };
      StyleObserver.prototype.setValue = function setValue(newValue) {
        if (newValue instanceof Object) {
          newValue = this.flattenCss(newValue);
        }
        this.element.style.cssText = newValue;
      };
      StyleObserver.prototype.subscribe = function subscribe(callback) {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
      };
      StyleObserver.prototype.flattenCss = function flattenCss(object) {
        var s = '';
        for (var propertyName in object) {
          if (object.hasOwnProperty(propertyName)) {
            s += propertyName + ': ' + object[propertyName] + '; ';
          }
        }
        return s;
      };
      return StyleObserver;
    })();
    exports.StyleObserver = StyleObserver;
    var ValueAttributeObserver = (function() {
      function ValueAttributeObserver(element, propertyName, handler) {
        _classCallCheck(this, ValueAttributeObserver);
        this.element = element;
        this.propertyName = propertyName;
        this.handler = handler;
        this.callbacks = [];
      }
      ValueAttributeObserver.prototype.getValue = function getValue() {
        return this.element[this.propertyName];
      };
      ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
        this.element[this.propertyName] = newValue;
        this.call();
      };
      ValueAttributeObserver.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.oldValue,
            newValue = this.getValue();
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
        this.oldValue = newValue;
      };
      ValueAttributeObserver.prototype.subscribe = function subscribe(callback) {
        var that = this;
        if (!this.disposeHandler) {
          this.oldValue = this.getValue();
          this.disposeHandler = this.handler.subscribe(this.element, this.call.bind(this));
        }
        this.callbacks.push(callback);
        return this.unsubscribe.bind(this, callback);
      };
      ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.splice(callbacks.indexOf(callback), 1);
        if (callbacks.length === 0) {
          this.disposeHandler();
          this.disposeHandler = null;
        }
      };
      return ValueAttributeObserver;
    })();
    exports.ValueAttributeObserver = ValueAttributeObserver;
    var SelectValueObserver = (function() {
      function SelectValueObserver(element, handler, observerLocator) {
        _classCallCheck(this, SelectValueObserver);
        this.element = element;
        this.handler = handler;
        this.observerLocator = observerLocator;
      }
      SelectValueObserver.prototype.getValue = function getValue() {
        return this.value;
      };
      SelectValueObserver.prototype.setValue = function setValue(newValue) {
        var _this20 = this;
        if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
          throw new Error('Only null or Array instances can be bound to a multi-select.');
        }
        if (this.value === newValue) {
          return ;
        }
        if (this.arraySubscription) {
          this.arraySubscription();
          this.arraySubscription = null;
        }
        if (Array.isArray(newValue)) {
          this.arraySubscription = this.observerLocator.getArrayObserver(newValue).subscribe(this.synchronizeOptions.bind(this));
        }
        this.value = newValue;
        this.synchronizeOptions();
        if (this.element.options.length > 0 && !this.initialSync) {
          this.initialSync = true;
          this.observerLocator.taskQueue.queueMicroTask({call: function call() {
              return _this20.synchronizeOptions();
            }});
        }
      };
      SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
        var value = this.value,
            i,
            options,
            option,
            optionValue,
            clear,
            isArray;
        if (value === null || value === undefined) {
          clear = true;
        } else if (Array.isArray(value)) {
          isArray = true;
        }
        options = this.element.options;
        i = options.length;
        while (i--) {
          option = options.item(i);
          if (clear) {
            option.selected = false;
            continue;
          }
          optionValue = option.hasOwnProperty('model') ? option.model : option.value;
          if (isArray) {
            option.selected = value.indexOf(optionValue) !== -1;
            continue;
          }
          option.selected = value === optionValue;
        }
      };
      SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
        var options = this.element.options,
            option,
            i,
            ii,
            count = 0,
            value = [];
        for (i = 0, ii = options.length; i < ii; i++) {
          option = options.item(i);
          if (!option.selected) {
            continue;
          }
          value[count] = option.hasOwnProperty('model') ? option.model : option.value;
          count++;
        }
        if (!this.element.multiple) {
          if (count === 0) {
            value = null;
          } else {
            value = value[0];
          }
        }
        this.oldValue = this.value;
        this.value = value;
        this.call();
      };
      SelectValueObserver.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.oldValue,
            newValue = this.value;
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
      };
      SelectValueObserver.prototype.subscribe = function subscribe(callback) {
        if (!this.callbacks) {
          this.callbacks = [];
          this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
        }
        this.callbacks.push(callback);
        return this.unsubscribe.bind(this, callback);
      };
      SelectValueObserver.prototype.unsubscribe = function unsubscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.splice(callbacks.indexOf(callback), 1);
        if (callbacks.length === 0) {
          this.disposeHandler();
          this.disposeHandler = null;
          this.callbacks = null;
        }
      };
      SelectValueObserver.prototype.bind = function bind() {
        var _this21 = this;
        this.domObserver = new MutationObserver(function() {
          _this21.synchronizeOptions();
          _this21.synchronizeValue();
        });
        this.domObserver.observe(this.element, {
          childList: true,
          subtree: true
        });
      };
      SelectValueObserver.prototype.unbind = function unbind() {
        this.domObserver.disconnect();
        this.domObserver = null;
        if (this.arraySubscription) {
          this.arraySubscription();
          this.arraySubscription = null;
        }
      };
      return SelectValueObserver;
    })();
    exports.SelectValueObserver = SelectValueObserver;
    var CheckedObserver = (function() {
      function CheckedObserver(element, handler, observerLocator) {
        _classCallCheck(this, CheckedObserver);
        this.element = element;
        this.handler = handler;
        this.observerLocator = observerLocator;
      }
      CheckedObserver.prototype.getValue = function getValue() {
        return this.value;
      };
      CheckedObserver.prototype.setValue = function setValue(newValue) {
        var _this22 = this;
        if (this.value === newValue) {
          return ;
        }
        if (this.arraySubscription) {
          this.arraySubscription();
          this.arraySubscription = null;
        }
        if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
          this.arraySubscription = this.observerLocator.getArrayObserver(newValue).subscribe(this.synchronizeElement.bind(this));
        }
        this.value = newValue;
        this.synchronizeElement();
        if (!this.element.hasOwnProperty('model') && !this.initialSync) {
          this.initialSync = true;
          this.observerLocator.taskQueue.queueMicroTask({call: function call() {
              return _this22.synchronizeElement();
            }});
        }
      };
      CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
        var value = this.value,
            element = this.element,
            elementValue = element.hasOwnProperty('model') ? element.model : element.value,
            isRadio = element.type === 'radio';
        element.checked = isRadio && value === elementValue || !isRadio && value === true || !isRadio && Array.isArray(value) && value.indexOf(elementValue) !== -1;
      };
      CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
        var value = this.value,
            element = this.element,
            elementValue = element.hasOwnProperty('model') ? element.model : element.value,
            index;
        if (element.type === 'checkbox') {
          if (Array.isArray(value)) {
            index = value.indexOf(elementValue);
            if (element.checked && index === -1) {
              value.push(elementValue);
            } else if (!element.checked && index !== -1) {
              value.splice(index, 1);
            }
            return ;
          } else {
            value = element.checked;
          }
        } else if (element.checked) {
          value = elementValue;
        } else {
          return ;
        }
        this.oldValue = this.value;
        this.value = value;
        this.call();
      };
      CheckedObserver.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.oldValue,
            newValue = this.value;
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
      };
      CheckedObserver.prototype.subscribe = function subscribe(callback) {
        if (!this.callbacks) {
          this.callbacks = [];
          this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
        }
        this.callbacks.push(callback);
        return this.unsubscribe.bind(this, callback);
      };
      CheckedObserver.prototype.unsubscribe = function unsubscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.splice(callbacks.indexOf(callback), 1);
        if (callbacks.length === 0) {
          this.disposeHandler();
          this.disposeHandler = null;
          this.callbacks = null;
        }
      };
      CheckedObserver.prototype.unbind = function unbind() {
        if (this.arraySubscription) {
          this.arraySubscription();
          this.arraySubscription = null;
        }
      };
      return CheckedObserver;
    })();
    exports.CheckedObserver = CheckedObserver;
    var ClassObserver = (function() {
      function ClassObserver(element) {
        _classCallCheck(this, ClassObserver);
        this.element = element;
        this.doNotCache = true;
        this.value = '';
        this.version = 0;
      }
      ClassObserver.prototype.getValue = function getValue() {
        return this.value;
      };
      ClassObserver.prototype.setValue = function setValue(newValue) {
        var nameIndex = this.nameIndex || {},
            version = this.version,
            names,
            name,
            i;
        if (newValue !== null && newValue !== undefined && newValue.length) {
          names = newValue.split(' ');
          i = names.length;
          while (i--) {
            name = names[i];
            if (name === '') {
              continue;
            }
            nameIndex[name] = version;
            this.element.classList.add(name);
          }
        }
        this.value = newValue;
        this.nameIndex = nameIndex;
        this.version += 1;
        if (version === 0) {
          return ;
        }
        version -= 1;
        for (name in nameIndex) {
          if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
            continue;
          }
          this.element.classList.remove(name);
        }
      };
      ClassObserver.prototype.subscribe = function subscribe(callback) {
        throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
      };
      return ClassObserver;
    })();
    exports.ClassObserver = ClassObserver;
    var ComputedPropertyObserver = (function() {
      function ComputedPropertyObserver(obj, propertyName, descriptor, observerLocator) {
        _classCallCheck(this, ComputedPropertyObserver);
        this.obj = obj;
        this.propertyName = propertyName;
        this.descriptor = descriptor;
        this.observerLocator = observerLocator;
        this.callbacks = [];
      }
      ComputedPropertyObserver.prototype.getValue = function getValue() {
        return this.obj[this.propertyName];
      };
      ComputedPropertyObserver.prototype.setValue = function setValue(newValue) {
        this.obj[this.propertyName] = newValue;
      };
      ComputedPropertyObserver.prototype.trigger = function trigger(newValue, oldValue) {
        var callbacks = this.callbacks,
            i = callbacks.length;
        while (i--) {
          callbacks[i](newValue, oldValue);
        }
      };
      ComputedPropertyObserver.prototype.evaluate = function evaluate() {
        var newValue = this.getValue();
        if (this.oldValue === newValue)
          return ;
        this.trigger(newValue, this.oldValue);
        this.oldValue = newValue;
      };
      ComputedPropertyObserver.prototype.subscribe = function subscribe(callback) {
        var _this23 = this;
        var dependencies,
            i,
            ii;
        this.callbacks.push(callback);
        if (this.oldValue === undefined) {
          this.oldValue = this.getValue();
          this.subscriptions = [];
          dependencies = this.descriptor.get.dependencies;
          for (i = 0, ii = dependencies.length; i < ii; i++) {
            this.subscriptions.push(this.observerLocator.getObserver(this.obj, dependencies[i]).subscribe(function() {
              return _this23.evaluate();
            }));
          }
        }
        return function() {
          _this23.callbacks.splice(_this23.callbacks.indexOf(callback), 1);
          if (_this23.callbacks.length > 0)
            return ;
          while (_this23.subscriptions.length) {
            _this23.subscriptions.pop()();
          }
          _this23.oldValue = undefined;
        };
      };
      return ComputedPropertyObserver;
    })();
    exports.ComputedPropertyObserver = ComputedPropertyObserver;
    function hasDeclaredDependencies(descriptor) {
      return descriptor && descriptor.get && descriptor.get.dependencies && descriptor.get.dependencies.length > 0;
    }
    function declarePropertyDependencies(ctor, propertyName, dependencies) {
      var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
      descriptor.get.dependencies = dependencies;
    }
    var elements = {
      a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
      altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
      animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
      ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
      feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
      feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
      feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
      feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
      feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
      feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
      feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
      feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
      feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
      'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
      'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
      'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
      'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
      'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
      glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
      image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
      linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
      marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
      mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
      'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
      mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
      style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
      svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
      'switch': ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
      symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
      text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
      title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
      tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
      view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
      vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
    };
    exports.elements = elements;
    var presentationElements = {
      'a': true,
      'altGlyph': true,
      'animate': true,
      'animateColor': true,
      'circle': true,
      'clipPath': true,
      'defs': true,
      'ellipse': true,
      'feBlend': true,
      'feColorMatrix': true,
      'feComponentTransfer': true,
      'feComposite': true,
      'feConvolveMatrix': true,
      'feDiffuseLighting': true,
      'feDisplacementMap': true,
      'feFlood': true,
      'feGaussianBlur': true,
      'feImage': true,
      'feMerge': true,
      'feMorphology': true,
      'feOffset': true,
      'feSpecularLighting': true,
      'feTile': true,
      'feTurbulence': true,
      'filter': true,
      'font': true,
      'foreignObject': true,
      'g': true,
      'glyph': true,
      'glyphRef': true,
      'image': true,
      'line': true,
      'linearGradient': true,
      'marker': true,
      'mask': true,
      'missing-glyph': true,
      'path': true,
      'pattern': true,
      'polygon': true,
      'polyline': true,
      'radialGradient': true,
      'rect': true,
      'stop': true,
      'svg': true,
      'switch': true,
      'symbol': true,
      'text': true,
      'textPath': true,
      'tref': true,
      'tspan': true,
      'use': true
    };
    exports.presentationElements = presentationElements;
    var presentationAttributes = {
      'alignment-baseline': true,
      'baseline-shift': true,
      'clip-path': true,
      'clip-rule': true,
      'clip': true,
      'color-interpolation-filters': true,
      'color-interpolation': true,
      'color-profile': true,
      'color-rendering': true,
      'color': true,
      'cursor': true,
      'direction': true,
      'display': true,
      'dominant-baseline': true,
      'enable-background': true,
      'fill-opacity': true,
      'fill-rule': true,
      'fill': true,
      'filter': true,
      'flood-color': true,
      'flood-opacity': true,
      'font-family': true,
      'font-size-adjust': true,
      'font-size': true,
      'font-stretch': true,
      'font-style': true,
      'font-variant': true,
      'font-weight': true,
      'glyph-orientation-horizontal': true,
      'glyph-orientation-vertical': true,
      'image-rendering': true,
      'kerning': true,
      'letter-spacing': true,
      'lighting-color': true,
      'marker-end': true,
      'marker-mid': true,
      'marker-start': true,
      'mask': true,
      'opacity': true,
      'overflow': true,
      'pointer-events': true,
      'shape-rendering': true,
      'stop-color': true,
      'stop-opacity': true,
      'stroke-dasharray': true,
      'stroke-dashoffset': true,
      'stroke-linecap': true,
      'stroke-linejoin': true,
      'stroke-miterlimit': true,
      'stroke-opacity': true,
      'stroke-width': true,
      'stroke': true,
      'text-anchor': true,
      'text-decoration': true,
      'text-rendering': true,
      'unicode-bidi': true,
      'visibility': true,
      'word-spacing': true,
      'writing-mode': true
    };
    exports.presentationAttributes = presentationAttributes;
    function isStandardSvgAttribute(nodeName, attributeName) {
      return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
    }
    function createElement(html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.firstChild;
    }
    if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph') {
      elements.altglyph = elements.altGlyph;
      delete elements.altGlyph;
      elements.altglyphdef = elements.altGlyphDef;
      delete elements.altGlyphDef;
      elements.altglyphitem = elements.altGlyphItem;
      delete elements.altGlyphItem;
      elements.glyphref = elements.glyphRef;
      delete elements.glyphRef;
    }
    if (typeof Object.getPropertyDescriptor !== 'function') {
      Object.getPropertyDescriptor = function(subject, name) {
        var pd = Object.getOwnPropertyDescriptor(subject, name);
        var proto = Object.getPrototypeOf(subject);
        while (typeof pd === 'undefined' && proto !== null) {
          pd = Object.getOwnPropertyDescriptor(proto, name);
          proto = Object.getPrototypeOf(proto);
        }
        return pd;
      };
    }
    function createObserverLookup(obj, observerLocator) {
      var value = new OoObjectObserver(obj, observerLocator);
      try {
        Object.defineProperty(obj, '__observer__', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: value
        });
      } catch (_) {}
      return value;
    }
    var ObserverLocator = (function() {
      function ObserverLocator(taskQueue, eventManager, dirtyChecker, observationAdapters) {
        _classCallCheck(this, ObserverLocator);
        this.taskQueue = taskQueue;
        this.eventManager = eventManager;
        this.dirtyChecker = dirtyChecker;
        this.observationAdapters = observationAdapters;
      }
      ObserverLocator.inject = function inject() {
        return [_aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, _aureliaDependencyInjection.All.of(ObjectObservationAdapter)];
      };
      ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
        var observersLookup = obj.__observers__,
            observer;
        if (observersLookup && propertyName in observersLookup) {
          return observersLookup[propertyName];
        }
        observer = this.createPropertyObserver(obj, propertyName);
        if (!observer.doNotCache) {
          if (observersLookup === undefined) {
            observersLookup = this.getOrCreateObserversLookup(obj);
          }
          observersLookup[propertyName] = observer;
        }
        return observer;
      };
      ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
        return obj.__observers__ || this.createObserversLookup(obj);
      };
      ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
        var value = {};
        try {
          Object.defineProperty(obj, '__observers__', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
          });
        } catch (_) {}
        return value;
      };
      ObserverLocator.prototype.getObservationAdapter = function getObservationAdapter(obj, propertyName, descriptor) {
        var i,
            ii,
            observationAdapter;
        for (i = 0, ii = this.observationAdapters.length; i < ii; i++) {
          observationAdapter = this.observationAdapters[i];
          if (observationAdapter.handlesProperty(obj, propertyName, descriptor))
            return observationAdapter;
        }
        return null;
      };
      ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
        var observerLookup,
            descriptor,
            handler,
            observationAdapter,
            xlinkResult;
        if (obj instanceof Element) {
          if (propertyName === 'class') {
            return new ClassObserver(obj);
          }
          if (propertyName === 'style' || propertyName === 'css') {
            return new StyleObserver(obj, propertyName);
          }
          handler = this.eventManager.getElementHandler(obj, propertyName);
          if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
            return new SelectValueObserver(obj, handler, this);
          }
          if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
            return new CheckedObserver(obj, handler, this);
          }
          if (handler) {
            return new ValueAttributeObserver(obj, propertyName, handler);
          }
          xlinkResult = /^xlink:(.+)$/.exec(propertyName);
          if (xlinkResult) {
            return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
          }
          if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof SVGElement && isStandardSvgAttribute(obj.nodeName, propertyName)) {
            return new DataAttributeObserver(obj, propertyName);
          }
        }
        descriptor = Object.getPropertyDescriptor(obj, propertyName);
        if (hasDeclaredDependencies(descriptor)) {
          return new ComputedPropertyObserver(obj, propertyName, descriptor, this);
        }
        var existingGetterOrSetter = undefined;
        if (descriptor && (existingGetterOrSetter = descriptor.get || descriptor.set)) {
          if (existingGetterOrSetter.getObserver) {
            return existingGetterOrSetter.getObserver(obj);
          }
          observationAdapter = this.getObservationAdapter(obj, propertyName, descriptor);
          if (observationAdapter)
            return observationAdapter.getObserver(obj, propertyName, descriptor);
          return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }
        if (hasObjectObserve) {
          observerLookup = obj.__observer__ || createObserverLookup(obj, this);
          return observerLookup.getObserver(propertyName, descriptor);
        }
        if (obj instanceof Array) {
          if (propertyName === 'length') {
            return this.getArrayObserver(obj).getLengthObserver();
          } else {
            return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
          }
        } else if (obj instanceof Map) {
          if (propertyName === 'size') {
            return this.getMapObserver(obj).getLengthObserver();
          } else {
            return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
          }
        }
        return new SetterObserver(this.taskQueue, obj, propertyName);
      };
      ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
        if ('__array_observer__' in array) {
          return array.__array_observer__;
        }
        return array.__array_observer__ = _getArrayObserver(this.taskQueue, array);
      };
      ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
        if ('__map_observer__' in map) {
          return map.__map_observer__;
        }
        return map.__map_observer__ = _getMapObserver(this.taskQueue, map);
      };
      return ObserverLocator;
    })();
    exports.ObserverLocator = ObserverLocator;
    var ObjectObservationAdapter = (function() {
      function ObjectObservationAdapter() {
        _classCallCheck(this, ObjectObservationAdapter);
      }
      ObjectObservationAdapter.prototype.handlesProperty = function handlesProperty(object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement handlesProperty(object, propertyName).');
      };
      ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement createObserver(object, propertyName).');
      };
      return ObjectObservationAdapter;
    })();
    exports.ObjectObservationAdapter = ObjectObservationAdapter;
    var BindingExpression = (function() {
      function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, valueConverterLookupFunction, attribute) {
        _classCallCheck(this, BindingExpression);
        this.observerLocator = observerLocator;
        this.targetProperty = targetProperty;
        this.sourceExpression = sourceExpression;
        this.mode = mode;
        this.valueConverterLookupFunction = valueConverterLookupFunction;
        this.attribute = attribute;
        this.discrete = false;
      }
      BindingExpression.prototype.createBinding = function createBinding(target) {
        return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.valueConverterLookupFunction);
      };
      BindingExpression.create = function create(targetProperty, sourceExpression) {
        var mode = arguments[2] === undefined ? bindingMode.oneWay : arguments[2];
        var parser = _aureliaDependencyInjection.Container.instance.get(Parser),
            observerLocator = _aureliaDependencyInjection.Container.instance.get(ObserverLocator);
        return new BindingExpression(observerLocator, targetProperty, parser.parse(sourceExpression), mode);
      };
      return BindingExpression;
    })();
    exports.BindingExpression = BindingExpression;
    var Binding = (function() {
      function Binding(observerLocator, sourceExpression, target, targetProperty, mode, valueConverterLookupFunction) {
        _classCallCheck(this, Binding);
        this.observerLocator = observerLocator;
        this.sourceExpression = sourceExpression;
        this.targetProperty = observerLocator.getObserver(target, targetProperty);
        this.mode = mode;
        this.valueConverterLookupFunction = valueConverterLookupFunction;
      }
      Binding.prototype.getObserver = function getObserver(obj, propertyName) {
        return this.observerLocator.getObserver(obj, propertyName);
      };
      Binding.prototype.bind = function bind(source) {
        var _this24 = this;
        var targetProperty = this.targetProperty,
            info;
        if ('bind' in targetProperty) {
          targetProperty.bind();
        }
        if (this.mode == bindingMode.oneWay || this.mode == bindingMode.twoWay) {
          if (this._disposeObserver) {
            if (this.source === source) {
              return ;
            }
            this.unbind();
          }
          info = this.sourceExpression.connect(this, source);
          if (info.observer) {
            this._disposeObserver = info.observer.subscribe(function(newValue) {
              var existing = targetProperty.getValue();
              if (newValue !== existing) {
                targetProperty.setValue(newValue);
              }
            });
          }
          if (info.value !== undefined) {
            targetProperty.setValue(info.value);
          }
          if (this.mode == bindingMode.twoWay) {
            this._disposeListener = targetProperty.subscribe(function(newValue) {
              _this24.sourceExpression.assign(source, newValue, _this24.valueConverterLookupFunction);
            });
          }
          this.source = source;
        } else {
          var value = this.sourceExpression.evaluate(source, this.valueConverterLookupFunction);
          if (value !== undefined) {
            targetProperty.setValue(value);
          }
        }
      };
      Binding.prototype.unbind = function unbind() {
        if ('unbind' in this.targetProperty) {
          this.targetProperty.unbind();
        }
        if (this._disposeObserver) {
          this._disposeObserver();
          this._disposeObserver = null;
        }
        if (this._disposeListener) {
          this._disposeListener();
          this._disposeListener = null;
        }
      };
      return Binding;
    })();
    var CallExpression = (function() {
      function CallExpression(observerLocator, targetProperty, sourceExpression, valueConverterLookupFunction) {
        _classCallCheck(this, CallExpression);
        this.observerLocator = observerLocator;
        this.targetProperty = targetProperty;
        this.sourceExpression = sourceExpression;
        this.valueConverterLookupFunction = valueConverterLookupFunction;
      }
      CallExpression.prototype.createBinding = function createBinding(target) {
        return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.valueConverterLookupFunction);
      };
      return CallExpression;
    })();
    exports.CallExpression = CallExpression;
    var Call = (function() {
      function Call(observerLocator, sourceExpression, target, targetProperty, valueConverterLookupFunction) {
        _classCallCheck(this, Call);
        this.sourceExpression = sourceExpression;
        this.target = target;
        this.targetProperty = observerLocator.getObserver(target, targetProperty);
        this.valueConverterLookupFunction = valueConverterLookupFunction;
      }
      Call.prototype.bind = function bind(source) {
        var _this25 = this;
        if (this.source) {
          if (this.source === source) {
            return ;
          }
          this.unbind();
        }
        this.source = source;
        this.targetProperty.setValue(function($event) {
          var result,
              temp = source.$event;
          source.$event = $event;
          result = _this25.sourceExpression.evaluate(source, _this25.valueConverterLookupFunction);
          source.$event = temp;
          return result;
        });
      };
      Call.prototype.unbind = function unbind() {
        if (this.source) {
          this.targetProperty.setValue(null);
          this.source = null;
        }
      };
      return Call;
    })();
    if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
      (function(view) {
        'use strict';
        if (!('Element' in view))
          return ;
        var classListProp = 'classList',
            protoProp = 'prototype',
            elemCtrProto = view.Element[protoProp],
            objCtr = Object,
            strTrim = String[protoProp].trim || function() {
              return this.replace(/^\s+|\s+$/g, '');
            },
            arrIndexOf = Array[protoProp].indexOf || function(item) {
              var i = 0,
                  len = this.length;
              for (; i < len; i++) {
                if (i in this && this[i] === item) {
                  return i;
                }
              }
              return -1;
            },
            DOMEx = function DOMEx(type, message) {
              this.name = type;
              this.code = DOMException[type];
              this.message = message;
            },
            checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
              if (token === '') {
                throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
              }
              if (/\s/.test(token)) {
                throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
              }
              return arrIndexOf.call(classList, token);
            },
            ClassList = function ClassList(elem) {
              var trimmedClasses = strTrim.call(elem.getAttribute('class') || ''),
                  classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                  i = 0,
                  len = classes.length;
              for (; i < len; i++) {
                this.push(classes[i]);
              }
              this._updateClassName = function() {
                elem.setAttribute('class', this.toString());
              };
            },
            classListProto = ClassList[protoProp] = [],
            classListGetter = function classListGetter() {
              return new ClassList(this);
            };
        DOMEx[protoProp] = Error[protoProp];
        classListProto.item = function(i) {
          return this[i] || null;
        };
        classListProto.contains = function(token) {
          token += '';
          return checkTokenAndGetIndex(this, token) !== -1;
        };
        classListProto.add = function() {
          var tokens = arguments,
              i = 0,
              l = tokens.length,
              token,
              updated = false;
          do {
            token = tokens[i] + '';
            if (checkTokenAndGetIndex(this, token) === -1) {
              this.push(token);
              updated = true;
            }
          } while (++i < l);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.remove = function() {
          var tokens = arguments,
              i = 0,
              l = tokens.length,
              token,
              updated = false,
              index;
          do {
            token = tokens[i] + '';
            index = checkTokenAndGetIndex(this, token);
            while (index !== -1) {
              this.splice(index, 1);
              updated = true;
              index = checkTokenAndGetIndex(this, token);
            }
          } while (++i < l);
          if (updated) {
            this._updateClassName();
          }
        };
        classListProto.toggle = function(token, force) {
          token += '';
          var result = this.contains(token),
              method = result ? force !== true && 'remove' : force !== false && 'add';
          if (method) {
            this[method](token);
          }
          if (force === true || force === false) {
            return force;
          } else {
            return !result;
          }
        };
        classListProto.toString = function() {
          return this.join(' ');
        };
        if (objCtr.defineProperty) {
          var classListPropDesc = {
            get: classListGetter,
            enumerable: true,
            configurable: true
          };
          try {
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          } catch (ex) {
            if (ex.number === -0x7FF5EC54) {
              classListPropDesc.enumerable = false;
              objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
            }
          }
        } else if (objCtr[protoProp].__defineGetter__) {
          elemCtrProto.__defineGetter__(classListProp, classListGetter);
        }
      })(self);
    } else {
      (function() {
        'use strict';
        var testElement = document.createElement('_');
        testElement.classList.add('c1', 'c2');
        if (!testElement.classList.contains('c2')) {
          var createMethod = function createMethod(method) {
            var original = DOMTokenList.prototype[method];
            DOMTokenList.prototype[method] = function(token) {
              var i,
                  len = arguments.length;
              for (i = 0; i < len; i++) {
                token = arguments[i];
                original.call(this, token);
              }
            };
          };
          createMethod('add');
          createMethod('remove');
        }
        testElement.classList.toggle('c3', false);
        if (testElement.classList.contains('c3')) {
          var _toggle = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
              return force;
            } else {
              return _toggle.call(this, token);
            }
          };
        }
        testElement = null;
      })();
    }
    function camelCase(name) {
      return name.charAt(0).toLowerCase() + name.slice(1);
    }
    var ValueConverterResource = (function() {
      function ValueConverterResource(name) {
        _classCallCheck(this, ValueConverterResource);
        this.name = name;
      }
      ValueConverterResource.convention = function convention(name) {
        if (name.endsWith('ValueConverter')) {
          return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
        }
      };
      ValueConverterResource.prototype.analyze = function analyze(container, target) {
        this.instance = container.get(target);
      };
      ValueConverterResource.prototype.register = function register(registry, name) {
        registry.registerValueConverter(name || this.name, this.instance);
      };
      ValueConverterResource.prototype.load = function load(container, target) {
        return Promise.resolve(this);
      };
      return ValueConverterResource;
    })();
    exports.ValueConverterResource = ValueConverterResource;
    function valueConverter(nameOrTarget) {
      if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function(target) {
          _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, new ValueConverterResource(nameOrTarget), target);
        };
      }
      _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, new ValueConverterResource(), nameOrTarget);
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('valueConverter', valueConverter);
    function computedFrom() {
      for (var _len = arguments.length,
          rest = Array(_len),
          _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }
      return function(target, key, descriptor) {
        descriptor.get.dependencies = rest;
        return descriptor;
      };
    }
    var ListenerExpression = (function() {
      function ListenerExpression(eventManager, targetEvent, sourceExpression, delegate, preventDefault) {
        _classCallCheck(this, ListenerExpression);
        this.eventManager = eventManager;
        this.targetEvent = targetEvent;
        this.sourceExpression = sourceExpression;
        this.delegate = delegate;
        this.discrete = true;
        this.preventDefault = preventDefault;
      }
      ListenerExpression.prototype.createBinding = function createBinding(target) {
        return new Listener(this.eventManager, this.targetEvent, this.delegate, this.sourceExpression, target, this.preventDefault);
      };
      return ListenerExpression;
    })();
    exports.ListenerExpression = ListenerExpression;
    var Listener = (function() {
      function Listener(eventManager, targetEvent, delegate, sourceExpression, target, preventDefault) {
        _classCallCheck(this, Listener);
        this.eventManager = eventManager;
        this.targetEvent = targetEvent;
        this.delegate = delegate;
        this.sourceExpression = sourceExpression;
        this.target = target;
        this.preventDefault = preventDefault;
      }
      Listener.prototype.bind = function bind(source) {
        var _this26 = this;
        if (this._disposeListener) {
          if (this.source === source) {
            return ;
          }
          this.unbind();
        }
        this.source = source;
        this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function(event) {
          var prevEvent = source.$event;
          source.$event = event;
          var result = _this26.sourceExpression.evaluate(source);
          source.$event = prevEvent;
          if (result !== true && _this26.preventDefault) {
            event.preventDefault();
          }
          return result;
        }, this.delegate);
      };
      Listener.prototype.unbind = function unbind() {
        if (this._disposeListener) {
          this._disposeListener();
          this._disposeListener = null;
        }
      };
      return Listener;
    })();
    var NameExpression = (function() {
      function NameExpression(name, mode) {
        _classCallCheck(this, NameExpression);
        this.property = name;
        this.discrete = true;
        this.mode = mode;
      }
      NameExpression.prototype.createBinding = function createBinding(target) {
        return new NameBinder(this.property, target, this.mode);
      };
      return NameExpression;
    })();
    exports.NameExpression = NameExpression;
    var NameBinder = (function() {
      function NameBinder(property, target, mode) {
        _classCallCheck(this, NameBinder);
        this.property = property;
        switch (mode) {
          case 'element':
            this.target = target;
            break;
          case 'view-model':
            this.target = target.primaryBehavior.executionContext;
            break;
          default:
            this.target = target[mode];
            if (this.target === undefined) {
              throw new Error('Attempted to reference "' + mode + '", but it was not found on the target element.');
            } else {
              this.target = this.target.executionContext || this.target;
            }
            break;
        }
      }
      NameBinder.prototype.bind = function bind(source) {
        if (this.source) {
          if (this.source === source) {
            return ;
          }
          this.unbind();
        }
        this.source = source;
        source[this.property] = this.target;
      };
      NameBinder.prototype.unbind = function unbind() {
        if (this.source) {
          this.source[this.property] = null;
          this.source = null;
        }
      };
      return NameBinder;
    })();
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/task-queue@0.6.1'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/metadata@0.7.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/dependency-injection@0.9.1", ["github:aurelia/dependency-injection@0.9.1/aurelia-dependency-injection"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/dependency-injection@0.9.1/aurelia-dependency-injection'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/binding@0.8.5", ["github:aurelia/binding@0.8.5/aurelia-binding"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/binding@0.8.5/aurelia-binding'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating@0.13.16/aurelia-templating", ["npm:core-js@0.9.18", "github:aurelia/metadata@0.7.2", "github:aurelia/path@0.8.1", "github:aurelia/loader@0.8.3", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/binding@0.8.5", "github:aurelia/task-queue@0.6.1", "github:aurelia/logging@0.6.2"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaMetadata, _aureliaPath, _aureliaLoader, _aureliaDependencyInjection, _aureliaBinding, _aureliaTaskQueue, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    exports.createTemplateFromMarkup = createTemplateFromMarkup;
    exports.replaceNode = replaceNode;
    exports.removeNode = removeNode;
    exports.hyphenate = hyphenate;
    exports.nextElementSibling = nextElementSibling;
    exports.behavior = behavior;
    exports.customElement = customElement;
    exports.customAttribute = customAttribute;
    exports.templateController = templateController;
    exports.bindable = bindable;
    exports.dynamicOptions = dynamicOptions;
    exports.sync = sync;
    exports.useShadowDOM = useShadowDOM;
    exports.skipContentProcessing = skipContentProcessing;
    exports.processContent = processContent;
    exports.containerless = containerless;
    exports.viewStrategy = viewStrategy;
    exports.useView = useView;
    exports.inlineView = inlineView;
    exports.noView = noView;
    exports.elementConfig = elementConfig;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var needsTemplateFixup = !('content' in document.createElement('template'));
    var shadowPoly = window.ShadowDOMPolyfill || null;
    var DOMBoundary = 'aurelia-dom-boundary';
    exports.DOMBoundary = DOMBoundary;
    function createTemplateFromMarkup(markup) {
      var temp = document.createElement('template');
      temp.innerHTML = markup;
      if (needsTemplateFixup) {
        temp.content = document.createDocumentFragment();
        while (temp.firstChild) {
          temp.content.appendChild(temp.firstChild);
        }
      }
      return temp;
    }
    function replaceNode(newNode, node, parentNode) {
      if (node.parentNode) {
        node.parentNode.replaceChild(newNode, node);
      } else if (shadowPoly) {
        shadowPoly.unwrap(parentNode).replaceChild(shadowPoly.unwrap(newNode), shadowPoly.unwrap(node));
      } else {
        parentNode.replaceChild(newNode, node);
      }
    }
    function removeNode(node, parentNode) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      } else if (shadowPoly) {
        shadowPoly.unwrap(parentNode).removeChild(shadowPoly.unwrap(node));
      } else {
        parentNode.removeChild(node);
      }
    }
    var animationEvent = {
      enterBegin: 'animation:enter:begin',
      enterActive: 'animation:enter:active',
      enterDone: 'animation:enter:done',
      enterTimeout: 'animation:enter:timeout',
      leaveBegin: 'animation:leave:begin',
      leaveActive: 'animation:leave:active',
      leaveDone: 'animation:leave:done',
      leaveTimeout: 'animation:leave:timeout',
      staggerNext: 'animation:stagger:next',
      removeClassBegin: 'animation:remove-class:begin',
      removeClassActive: 'animation:remove-class:active',
      removeClassDone: 'animation:remove-class:done',
      removeClassTimeout: 'animation:remove-class:timeout',
      addClassBegin: 'animation:add-class:begin',
      addClassActive: 'animation:add-class:active',
      addClassDone: 'animation:add-class:done',
      addClassTimeout: 'animation:add-class:timeout',
      animateBegin: 'animation:animate:begin',
      animateActive: 'animation:animate:active',
      animateDone: 'animation:animate:done',
      animateTimeout: 'animation:animate:timeout',
      sequenceBegin: 'animation:sequence:begin',
      sequenceDone: 'animation:sequence:done'
    };
    exports.animationEvent = animationEvent;
    var Animator = (function() {
      function Animator() {
        _classCallCheck(this, Animator);
      }
      Animator.configureDefault = function configureDefault(container, animatorInstance) {
        container.registerInstance(Animator, Animator.instance = animatorInstance || new Animator());
      };
      Animator.prototype.move = function move() {
        return Promise.resolve(false);
      };
      Animator.prototype.enter = function enter(element) {
        return Promise.resolve(false);
      };
      Animator.prototype.leave = function leave(element) {
        return Promise.resolve(false);
      };
      Animator.prototype.removeClass = function removeClass(element, className) {
        return Promise.resolve(false);
      };
      Animator.prototype.addClass = function addClass(element, className) {
        return Promise.resolve(false);
      };
      Animator.prototype.animate = function animate(element, className, options) {
        return Promise.resolve(false);
      };
      Animator.prototype.runSequence = function runSequence(sequence) {};
      Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};
      Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};
      return Animator;
    })();
    exports.Animator = Animator;
    var capitalMatcher = /([A-Z])/g;
    function addHyphenAndLower(char) {
      return '-' + char.toLowerCase();
    }
    function hyphenate(name) {
      return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
    }
    function nextElementSibling(element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      do {
        element = element.nextSibling;
      } while (element && element.nodeType !== 1);
      return element;
    }
    var ViewStrategy = (function() {
      function ViewStrategy() {
        _classCallCheck(this, ViewStrategy);
      }
      ViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(baseUrl) {};
      ViewStrategy.normalize = function normalize(value) {
        if (typeof value === 'string') {
          value = new UseViewStrategy(value);
        }
        if (value && !(value instanceof ViewStrategy)) {
          throw new Error('The view must be a string or an instance of ViewStrategy.');
        }
        return value;
      };
      ViewStrategy.getDefault = function getDefault(target) {
        var strategy,
            annotation;
        if (typeof target !== 'function') {
          target = target.constructor;
        }
        annotation = _aureliaMetadata.Origin.get(target);
        strategy = _aureliaMetadata.Metadata.get(ViewStrategy.metadataKey, target);
        if (!strategy) {
          if (!annotation) {
            throw new Error('Cannot determinte default view strategy for object.', target);
          }
          strategy = new ConventionalViewStrategy(annotation.moduleId);
        } else if (annotation) {
          strategy.moduleId = annotation.moduleId;
        }
        return strategy;
      };
      _createClass(ViewStrategy, null, [{
        key: 'metadataKey',
        value: 'aurelia:view-strategy',
        enumerable: true
      }]);
      return ViewStrategy;
    })();
    exports.ViewStrategy = ViewStrategy;
    var UseViewStrategy = (function(_ViewStrategy) {
      function UseViewStrategy(path) {
        _classCallCheck(this, UseViewStrategy);
        _ViewStrategy.call(this);
        this.path = path;
      }
      _inherits(UseViewStrategy, _ViewStrategy);
      UseViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options, loadContext) {
        if (!this.absolutePath && this.moduleId) {
          this.absolutePath = _aureliaPath.relativeToFile(this.path, this.moduleId);
        }
        return viewEngine.loadViewFactory(this.absolutePath || this.path, options, this.moduleId, loadContext);
      };
      UseViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
        this.absolutePath = _aureliaPath.relativeToFile(this.path, file);
      };
      return UseViewStrategy;
    })(ViewStrategy);
    exports.UseViewStrategy = UseViewStrategy;
    var ConventionalViewStrategy = (function(_ViewStrategy2) {
      function ConventionalViewStrategy(moduleId) {
        _classCallCheck(this, ConventionalViewStrategy);
        _ViewStrategy2.call(this);
        this.moduleId = moduleId;
        this.viewUrl = ConventionalViewStrategy.convertModuleIdToViewUrl(moduleId);
      }
      _inherits(ConventionalViewStrategy, _ViewStrategy2);
      ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options, loadContext) {
        return viewEngine.loadViewFactory(this.viewUrl, options, this.moduleId, loadContext);
      };
      ConventionalViewStrategy.convertModuleIdToViewUrl = function convertModuleIdToViewUrl(moduleId) {
        var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
        return id + '.html';
      };
      return ConventionalViewStrategy;
    })(ViewStrategy);
    exports.ConventionalViewStrategy = ConventionalViewStrategy;
    var NoViewStrategy = (function(_ViewStrategy3) {
      function NoViewStrategy() {
        _classCallCheck(this, NoViewStrategy);
        _ViewStrategy3.apply(this, arguments);
      }
      _inherits(NoViewStrategy, _ViewStrategy3);
      NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options, loadContext) {
        return Promise.resolve(null);
      };
      return NoViewStrategy;
    })(ViewStrategy);
    exports.NoViewStrategy = NoViewStrategy;
    var TemplateRegistryViewStrategy = (function(_ViewStrategy4) {
      function TemplateRegistryViewStrategy(moduleId, entry) {
        _classCallCheck(this, TemplateRegistryViewStrategy);
        _ViewStrategy4.call(this);
        this.moduleId = moduleId;
        this.entry = entry;
      }
      _inherits(TemplateRegistryViewStrategy, _ViewStrategy4);
      TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options, loadContext) {
        var entry = this.entry;
        if (entry.isReady) {
          return Promise.resolve(entry.factory);
        }
        return viewEngine.loadViewFactory(entry, options, this.moduleId, loadContext);
      };
      return TemplateRegistryViewStrategy;
    })(ViewStrategy);
    exports.TemplateRegistryViewStrategy = TemplateRegistryViewStrategy;
    var InlineViewStrategy = (function(_ViewStrategy5) {
      function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
        _classCallCheck(this, InlineViewStrategy);
        _ViewStrategy5.call(this);
        this.markup = markup;
        this.dependencies = dependencies || null;
        this.dependencyBaseUrl = dependencyBaseUrl || '';
      }
      _inherits(InlineViewStrategy, _ViewStrategy5);
      InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, options, loadContext) {
        var entry = this.entry,
            dependencies = this.dependencies;
        if (entry && entry.isReady) {
          return Promise.resolve(entry.factory);
        }
        this.entry = entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
        entry.setTemplate(createTemplateFromMarkup(this.markup));
        if (dependencies !== null) {
          for (var i = 0,
              ii = dependencies.length; i < ii; ++i) {
            var current = dependencies[i];
            if (typeof current === 'string' || typeof current === 'function') {
              entry.addDependency(current);
            } else {
              entry.addDependency(current.from, current.as);
            }
          }
        }
        return viewEngine.loadViewFactory(entry, options, this.moduleId, loadContext);
      };
      return InlineViewStrategy;
    })(ViewStrategy);
    exports.InlineViewStrategy = InlineViewStrategy;
    var BindingLanguage = (function() {
      function BindingLanguage() {
        _classCallCheck(this, BindingLanguage);
      }
      BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, attrName, attrValue) {
        throw new Error('A BindingLanguage must implement inspectAttribute(...)');
      };
      BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
        throw new Error('A BindingLanguage must implement createAttributeInstruction(...)');
      };
      BindingLanguage.prototype.parseText = function parseText(resources, value) {
        throw new Error('A BindingLanguage must implement parseText(...)');
      };
      return BindingLanguage;
    })();
    exports.BindingLanguage = BindingLanguage;
    function register(lookup, name, resource, type) {
      if (!name) {
        return ;
      }
      var existing = lookup[name];
      if (existing) {
        if (existing != resource) {
          throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
        }
        return ;
      }
      lookup[name] = resource;
    }
    var ResourceRegistry = (function() {
      function ResourceRegistry() {
        _classCallCheck(this, ResourceRegistry);
        this.attributes = {};
        this.elements = {};
        this.valueConverters = {};
        this.attributeMap = {};
        this.baseResourceUrl = '';
      }
      ResourceRegistry.prototype.registerElement = function registerElement(tagName, behavior) {
        register(this.elements, tagName, behavior, 'an Element');
      };
      ResourceRegistry.prototype.getElement = function getElement(tagName) {
        return this.elements[tagName];
      };
      ResourceRegistry.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
        this.attributeMap[attribute] = knownAttribute;
        register(this.attributes, attribute, behavior, 'an Attribute');
      };
      ResourceRegistry.prototype.getAttribute = function getAttribute(attribute) {
        return this.attributes[attribute];
      };
      ResourceRegistry.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
        register(this.valueConverters, name, valueConverter, 'a ValueConverter');
      };
      ResourceRegistry.prototype.getValueConverter = function getValueConverter(name) {
        return this.valueConverters[name];
      };
      return ResourceRegistry;
    })();
    exports.ResourceRegistry = ResourceRegistry;
    var ViewResources = (function(_ResourceRegistry) {
      function ViewResources(parent, viewUrl) {
        _classCallCheck(this, ViewResources);
        _ResourceRegistry.call(this);
        this.parent = parent;
        this.viewUrl = viewUrl;
        this.valueConverterLookupFunction = this.getValueConverter.bind(this);
      }
      _inherits(ViewResources, _ResourceRegistry);
      ViewResources.prototype.relativeToView = function relativeToView(path) {
        return _aureliaPath.relativeToFile(path, this.viewUrl);
      };
      ViewResources.prototype.getElement = function getElement(tagName) {
        return this.elements[tagName] || this.parent.getElement(tagName);
      };
      ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
        return this.attributeMap[attribute] || this.parent.attributeMap[attribute];
      };
      ViewResources.prototype.getAttribute = function getAttribute(attribute) {
        return this.attributes[attribute] || this.parent.getAttribute(attribute);
      };
      ViewResources.prototype.getValueConverter = function getValueConverter(name) {
        return this.valueConverters[name] || this.parent.getValueConverter(name);
      };
      return ViewResources;
    })(ResourceRegistry);
    exports.ViewResources = ViewResources;
    var View = (function() {
      function View(container, fragment, behaviors, bindings, children, systemControlled, contentSelectors) {
        _classCallCheck(this, View);
        this.container = container;
        this.fragment = fragment;
        this.behaviors = behaviors;
        this.bindings = bindings;
        this.children = children;
        this.systemControlled = systemControlled;
        this.contentSelectors = contentSelectors;
        this.firstChild = fragment.firstChild;
        this.lastChild = fragment.lastChild;
        this.isBound = false;
        this.isAttached = false;
      }
      View.prototype.created = function created(executionContext) {
        var i,
            ii,
            behaviors = this.behaviors;
        for (i = 0, ii = behaviors.length; i < ii; ++i) {
          behaviors[i].created(executionContext);
        }
      };
      View.prototype.bind = function bind(executionContext, systemUpdate) {
        var context,
            behaviors,
            bindings,
            children,
            i,
            ii;
        if (systemUpdate && !this.systemControlled) {
          context = this.executionContext || executionContext;
        } else {
          context = executionContext || this.executionContext;
        }
        if (this.isBound) {
          if (this.executionContext === context) {
            return ;
          }
          this.unbind();
        }
        this.isBound = true;
        this.executionContext = context;
        if (this.owner) {
          this.owner.bind(context);
        }
        bindings = this.bindings;
        for (i = 0, ii = bindings.length; i < ii; ++i) {
          bindings[i].bind(context);
        }
        behaviors = this.behaviors;
        for (i = 0, ii = behaviors.length; i < ii; ++i) {
          behaviors[i].bind(context);
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(context, true);
        }
      };
      View.prototype.addBinding = function addBinding(binding) {
        this.bindings.push(binding);
        if (this.isBound) {
          binding.bind(this.executionContext);
        }
      };
      View.prototype.unbind = function unbind() {
        var behaviors,
            bindings,
            children,
            i,
            ii;
        if (this.isBound) {
          this.isBound = false;
          if (this.owner) {
            this.owner.unbind();
          }
          bindings = this.bindings;
          for (i = 0, ii = bindings.length; i < ii; ++i) {
            bindings[i].unbind();
          }
          behaviors = this.behaviors;
          for (i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].unbind();
          }
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].unbind();
          }
        }
      };
      View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
        var parent = refNode.parentNode;
        parent.insertBefore(this.fragment, refNode);
      };
      View.prototype.appendNodesTo = function appendNodesTo(parent) {
        parent.appendChild(this.fragment);
      };
      View.prototype.removeNodes = function removeNodes() {
        var start = this.firstChild,
            end = this.lastChild,
            fragment = this.fragment,
            next;
        var current = start,
            loop = true,
            nodes = [];
        while (loop) {
          if (current === end) {
            loop = false;
          }
          next = current.nextSibling;
          this.fragment.appendChild(current);
          current = next;
        }
      };
      View.prototype.attached = function attached() {
        var behaviors,
            children,
            i,
            ii;
        if (this.isAttached) {
          return ;
        }
        this.isAttached = true;
        if (this.owner) {
          this.owner.attached();
        }
        behaviors = this.behaviors;
        for (i = 0, ii = behaviors.length; i < ii; ++i) {
          behaviors[i].attached();
        }
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].attached();
        }
      };
      View.prototype.detached = function detached() {
        var behaviors,
            children,
            i,
            ii;
        if (this.isAttached) {
          this.isAttached = false;
          if (this.owner) {
            this.owner.detached();
          }
          behaviors = this.behaviors;
          for (i = 0, ii = behaviors.length; i < ii; ++i) {
            behaviors[i].detached();
          }
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };
      return View;
    })();
    exports.View = View;
    if (Element && !Element.prototype.matches) {
      var proto = Element.prototype;
      proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
    }
    var placeholder = [];
    function findInsertionPoint(groups, index) {
      var insertionPoint;
      while (!insertionPoint && index >= 0) {
        insertionPoint = groups[index][0];
        index--;
      }
      return insertionPoint;
    }
    var ContentSelector = (function() {
      function ContentSelector(anchor, selector) {
        _classCallCheck(this, ContentSelector);
        this.anchor = anchor;
        this.selector = selector;
        this.all = !this.selector;
        this.groups = [];
      }
      ContentSelector.applySelectors = function applySelectors(view, contentSelectors, callback) {
        var currentChild = view.fragment.firstChild,
            contentMap = new Map(),
            nextSibling,
            i,
            ii,
            contentSelector;
        while (currentChild) {
          nextSibling = currentChild.nextSibling;
          if (currentChild.viewSlot) {
            var viewSlotSelectors = contentSelectors.map(function(x) {
              return x.copyForViewSlot();
            });
            currentChild.viewSlot.installContentSelectors(viewSlotSelectors);
          } else {
            for (i = 0, ii = contentSelectors.length; i < ii; i++) {
              contentSelector = contentSelectors[i];
              if (contentSelector.matches(currentChild)) {
                var elements = contentMap.get(contentSelector);
                if (!elements) {
                  elements = [];
                  contentMap.set(contentSelector, elements);
                }
                elements.push(currentChild);
                break;
              }
            }
          }
          currentChild = nextSibling;
        }
        for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
          contentSelector = contentSelectors[i];
          callback(contentSelector, contentMap.get(contentSelector) || placeholder);
        }
      };
      ContentSelector.prototype.copyForViewSlot = function copyForViewSlot() {
        return new ContentSelector(this.anchor, this.selector);
      };
      ContentSelector.prototype.matches = function matches(node) {
        return this.all || node.nodeType === 1 && node.matches(this.selector);
      };
      ContentSelector.prototype.add = function add(group) {
        var anchor = this.anchor,
            parent = anchor.parentNode,
            i,
            ii;
        for (i = 0, ii = group.length; i < ii; ++i) {
          parent.insertBefore(group[i], anchor);
        }
        this.groups.push(group);
      };
      ContentSelector.prototype.insert = function insert(index, group) {
        if (group.length) {
          var anchor = findInsertionPoint(this.groups, index) || this.anchor,
              parent = anchor.parentNode,
              i,
              ii;
          for (i = 0, ii = group.length; i < ii; ++i) {
            parent.insertBefore(group[i], anchor);
          }
        }
        this.groups.splice(index, 0, group);
      };
      ContentSelector.prototype.removeAt = function removeAt(index, fragment) {
        var group = this.groups[index],
            i,
            ii;
        for (i = 0, ii = group.length; i < ii; ++i) {
          fragment.appendChild(group[i]);
        }
        this.groups.splice(index, 1);
      };
      return ContentSelector;
    })();
    exports.ContentSelector = ContentSelector;
    function getAnimatableElement(view) {
      var firstChild = view.firstChild;
      if (firstChild !== null && firstChild !== undefined && firstChild.nodeType === 8) {
        var element = nextElementSibling(firstChild);
        if (element !== null && element !== undefined && element.nodeType === 1 && element.classList.contains('au-animate')) {
          return element;
        }
      }
      return null;
    }
    var ViewSlot = (function() {
      function ViewSlot(anchor, anchorIsContainer, executionContext) {
        var animator = arguments[3] === undefined ? Animator.instance : arguments[3];
        _classCallCheck(this, ViewSlot);
        this.anchor = anchor;
        this.viewAddMethod = anchorIsContainer ? 'appendNodesTo' : 'insertNodesBefore';
        this.executionContext = executionContext;
        this.animator = animator;
        this.children = [];
        this.isBound = false;
        this.isAttached = false;
        anchor.viewSlot = this;
      }
      ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
        var parent = this.anchor;
        this.children.push({
          fragment: parent,
          firstChild: parent.firstChild,
          lastChild: parent.lastChild,
          removeNodes: function removeNodes() {
            var last;
            while (last = parent.lastChild) {
              parent.removeChild(last);
            }
          },
          created: function created() {},
          bind: function bind() {},
          unbind: function unbind() {},
          attached: function attached() {},
          detached: function detached() {}
        });
      };
      ViewSlot.prototype.bind = function bind(executionContext) {
        var i,
            ii,
            children;
        if (this.isBound) {
          if (this.executionContext === executionContext) {
            return ;
          }
          this.unbind();
        }
        this.isBound = true;
        this.executionContext = executionContext = executionContext || this.executionContext;
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(executionContext, true);
        }
      };
      ViewSlot.prototype.unbind = function unbind() {
        var i,
            ii,
            children = this.children;
        this.isBound = false;
        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].unbind();
        }
      };
      ViewSlot.prototype.add = function add(view) {
        view[this.viewAddMethod](this.anchor);
        this.children.push(view);
        if (this.isAttached) {
          view.attached();
          var animatableElement = getAnimatableElement(view);
          if (animatableElement !== null) {
            return this.animator.enter(animatableElement);
          }
        }
      };
      ViewSlot.prototype.insert = function insert(index, view) {
        var children = this.children,
            length = children.length;
        if (index === 0 && length === 0 || index >= length) {
          return this.add(view);
        } else {
          view.insertNodesBefore(children[index].firstChild);
          children.splice(index, 0, view);
          if (this.isAttached) {
            view.attached();
            var animatableElement = getAnimatableElement(view);
            if (animatableElement !== null) {
              return this.animator.enter(animatableElement);
            }
          }
        }
      };
      ViewSlot.prototype.remove = function remove(view) {
        return this.removeAt(this.children.indexOf(view));
      };
      ViewSlot.prototype.removeAt = function removeAt(index) {
        var _this = this;
        var view = this.children[index];
        var removeAction = function removeAction() {
          view.removeNodes();
          _this.children.splice(index, 1);
          if (_this.isAttached) {
            view.detached();
          }
          return view;
        };
        var animatableElement = getAnimatableElement(view);
        if (animatableElement !== null) {
          return this.animator.leave(animatableElement).then(function() {
            return removeAction();
          });
        }
        return removeAction();
      };
      ViewSlot.prototype.removeAll = function removeAll() {
        var _this2 = this;
        var children = this.children,
            ii = children.length,
            i;
        var rmPromises = [];
        children.forEach(function(child) {
          var animatableElement = getAnimatableElement(child);
          if (animatableElement !== null) {
            rmPromises.push(_this2.animator.leave(animatableElement).then(function() {
              return child.removeNodes();
            }));
          } else {
            child.removeNodes();
          }
        });
        var removeAction = function removeAction() {
          if (_this2.isAttached) {
            for (i = 0; i < ii; ++i) {
              children[i].detached();
            }
          }
          _this2.children = [];
        };
        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function() {
            return removeAction();
          });
        } else {
          removeAction();
        }
      };
      ViewSlot.prototype.swap = function swap(view) {
        var _this3 = this;
        var removeResponse = this.removeAll();
        if (removeResponse !== undefined) {
          return removeResponse.then(function() {
            return _this3.add(view);
          });
        } else {
          return this.add(view);
        }
      };
      ViewSlot.prototype.attached = function attached() {
        var i,
            ii,
            children,
            child;
        if (this.isAttached) {
          return ;
        }
        this.isAttached = true;
        children = this.children;
        for (i = 0, ii = children.length; i < ii; ++i) {
          child = children[i];
          child.attached();
          var element = child.firstChild ? nextElementSibling(child.firstChild) : null;
          if (child.firstChild && child.firstChild.nodeType === 8 && element && element.nodeType === 1 && element.classList.contains('au-animate')) {
            this.animator.enter(element);
          }
        }
      };
      ViewSlot.prototype.detached = function detached() {
        var i,
            ii,
            children;
        if (this.isAttached) {
          this.isAttached = false;
          children = this.children;
          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };
      ViewSlot.prototype.installContentSelectors = function installContentSelectors(contentSelectors) {
        this.contentSelectors = contentSelectors;
        this.add = this.contentSelectorAdd;
        this.insert = this.contentSelectorInsert;
        this.remove = this.contentSelectorRemove;
        this.removeAt = this.contentSelectorRemoveAt;
        this.removeAll = this.contentSelectorRemoveAll;
      };
      ViewSlot.prototype.contentSelectorAdd = function contentSelectorAdd(view) {
        ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
          return contentSelector.add(group);
        });
        this.children.push(view);
        if (this.isAttached) {
          view.attached();
        }
      };
      ViewSlot.prototype.contentSelectorInsert = function contentSelectorInsert(index, view) {
        if (index === 0 && !this.children.length || index >= this.children.length) {
          this.add(view);
        } else {
          ContentSelector.applySelectors(view, this.contentSelectors, function(contentSelector, group) {
            return contentSelector.insert(index, group);
          });
          this.children.splice(index, 0, view);
          if (this.isAttached) {
            view.attached();
          }
        }
      };
      ViewSlot.prototype.contentSelectorRemove = function contentSelectorRemove(view) {
        var index = this.children.indexOf(view),
            contentSelectors = this.contentSelectors,
            i,
            ii;
        for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
          contentSelectors[i].removeAt(index, view.fragment);
        }
        this.children.splice(index, 1);
        if (this.isAttached) {
          view.detached();
        }
      };
      ViewSlot.prototype.contentSelectorRemoveAt = function contentSelectorRemoveAt(index) {
        var view = this.children[index],
            contentSelectors = this.contentSelectors,
            i,
            ii;
        for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
          contentSelectors[i].removeAt(index, view.fragment);
        }
        this.children.splice(index, 1);
        if (this.isAttached) {
          view.detached();
        }
        return view;
      };
      ViewSlot.prototype.contentSelectorRemoveAll = function contentSelectorRemoveAll() {
        var children = this.children,
            contentSelectors = this.contentSelectors,
            ii = children.length,
            jj = contentSelectors.length,
            i,
            j,
            view;
        for (i = 0; i < ii; ++i) {
          view = children[i];
          for (j = 0; j < jj; ++j) {
            contentSelectors[j].removeAt(0, view.fragment);
          }
        }
        if (this.isAttached) {
          for (i = 0; i < ii; ++i) {
            children[i].detached();
          }
        }
        this.children = [];
      };
      return ViewSlot;
    })();
    exports.ViewSlot = ViewSlot;
    function elementContainerGet(key) {
      if (key === Element) {
        return this.element;
      }
      if (key === BoundViewFactory) {
        if (this.boundViewFactory) {
          return this.boundViewFactory;
        }
        var factory = this.instruction.viewFactory,
            partReplacements = this.partReplacements;
        if (partReplacements) {
          factory = partReplacements[factory.part] || factory;
        }
        return this.boundViewFactory = new BoundViewFactory(this, factory, this.executionContext, partReplacements);
      }
      if (key === ViewSlot) {
        if (this.viewSlot === undefined) {
          this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer, this.executionContext);
          this.children.push(this.viewSlot);
        }
        return this.viewSlot;
      }
      if (key === ViewResources) {
        return this.viewResources;
      }
      return this.superGet(key);
    }
    function createElementContainer(parent, element, instruction, executionContext, children, partReplacements, resources) {
      var container = parent.createChild(),
          providers,
          i;
      container.element = element;
      container.instruction = instruction;
      container.executionContext = executionContext;
      container.children = children;
      container.viewResources = resources;
      container.partReplacements = partReplacements;
      providers = instruction.providers;
      i = providers.length;
      while (i--) {
        container.registerSingleton(providers[i]);
      }
      container.superGet = container.get;
      container.get = elementContainerGet;
      return container;
    }
    function makeElementIntoAnchor(element, isCustomElement) {
      var anchor = document.createComment('anchor');
      if (isCustomElement) {
        anchor.hasAttribute = function(name) {
          return element.hasAttribute(name);
        };
        anchor.getAttribute = function(name) {
          return element.getAttribute(name);
        };
        anchor.setAttribute = function(name, value) {
          element.setAttribute(name, value);
        };
      }
      element.parentNode.replaceChild(anchor, element);
      return anchor;
    }
    function applyInstructions(containers, executionContext, element, instruction, behaviors, bindings, children, contentSelectors, partReplacements, resources) {
      var behaviorInstructions = instruction.behaviorInstructions,
          expressions = instruction.expressions,
          elementContainer,
          i,
          ii,
          current,
          instance;
      if (instruction.contentExpression) {
        bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
        element.parentNode.removeChild(element);
        return ;
      }
      if (instruction.contentSelector) {
        var commentAnchor = document.createComment('anchor');
        element.parentNode.replaceChild(commentAnchor, element);
        contentSelectors.push(new ContentSelector(commentAnchor, instruction.selector));
        return ;
      }
      if (behaviorInstructions.length) {
        if (!instruction.anchorIsContainer) {
          element = makeElementIntoAnchor(element, instruction.isCustomElement);
        }
        containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, executionContext, children, partReplacements, resources);
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(elementContainer, current, element, bindings, current.partReplacements);
          if (instance.contentView) {
            children.push(instance.contentView);
          }
          behaviors.push(instance);
        }
      }
      for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
      }
    }
    function styleStringToObject(style, target) {
      var attributes = style.split(';'),
          firstIndexOfColon,
          i,
          current,
          key,
          value;
      target = target || {};
      for (i = 0; i < attributes.length; i++) {
        current = attributes[i];
        firstIndexOfColon = current.indexOf(':');
        key = current.substring(0, firstIndexOfColon).trim();
        value = current.substring(firstIndexOfColon + 1).trim();
        target[key] = value;
      }
      return target;
    }
    function styleObjectToString(obj) {
      var result = '';
      for (var key in obj) {
        result += key + ':' + obj[key] + ';';
      }
      return result;
    }
    function applySurrogateInstruction(container, element, instruction, behaviors, bindings, children) {
      var behaviorInstructions = instruction.behaviorInstructions,
          expressions = instruction.expressions,
          providers = instruction.providers,
          values = instruction.values,
          i = undefined,
          ii = undefined,
          current = undefined,
          instance = undefined,
          currentAttributeValue = undefined,
          styleParts = undefined;
      i = providers.length;
      while (i--) {
        container.registerSingleton(providers[i]);
      }
      for (var key in values) {
        currentAttributeValue = element.getAttribute(key);
        if (currentAttributeValue) {
          if (key === 'class') {
            if (currentAttributeValue !== 'au-target') {
              element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
            }
          } else if (key === 'style') {
            var styleObject = styleStringToObject(values[key]);
            styleStringToObject(currentAttributeValue, styleObject);
            element.setAttribute('style', styleObjectToString(styleObject));
          }
        } else {
          element.setAttribute(key, values[key]);
        }
      }
      if (behaviorInstructions.length) {
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(container, current, element, bindings, current.partReplacements);
          if (instance.contentView) {
            children.push(instance.contentView);
          }
          behaviors.push(instance);
        }
      }
      for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
      }
    }
    var BoundViewFactory = (function() {
      function BoundViewFactory(parentContainer, viewFactory, executionContext, partReplacements) {
        _classCallCheck(this, BoundViewFactory);
        this.parentContainer = parentContainer;
        this.viewFactory = viewFactory;
        this.executionContext = executionContext;
        this.factoryOptions = {
          behaviorInstance: false,
          partReplacements: partReplacements
        };
      }
      BoundViewFactory.prototype.create = function create(executionContext) {
        var childContainer = this.parentContainer.createChild(),
            context = executionContext || this.executionContext;
        this.factoryOptions.systemControlled = !executionContext;
        return this.viewFactory.create(childContainer, context, this.factoryOptions);
      };
      return BoundViewFactory;
    })();
    exports.BoundViewFactory = BoundViewFactory;
    var defaultFactoryOptions = {
      systemControlled: false,
      suppressBind: false,
      enhance: false
    };
    var ViewFactory = (function() {
      function ViewFactory(template, instructions, resources) {
        _classCallCheck(this, ViewFactory);
        this.template = template;
        this.instructions = instructions;
        this.resources = resources;
      }
      ViewFactory.prototype.create = function create(container, executionContext) {
        var options = arguments[2] === undefined ? defaultFactoryOptions : arguments[2];
        var element = arguments[3] === undefined ? null : arguments[3];
        var fragment = options.enhance ? this.template : this.template.cloneNode(true),
            instructables = fragment.querySelectorAll('.au-target'),
            instructions = this.instructions,
            resources = this.resources,
            behaviors = [],
            bindings = [],
            children = [],
            contentSelectors = [],
            containers = {root: container},
            partReplacements = options.partReplacements,
            i,
            ii,
            view,
            instructable,
            instruction;
        if (element !== null && this.surrogateInstruction !== null) {
          applySurrogateInstruction(container, element, this.surrogateInstruction, behaviors, bindings, children);
        }
        for (i = 0, ii = instructables.length; i < ii; ++i) {
          instructable = instructables[i];
          instruction = instructions[instructable.getAttribute('au-target-id')];
          applyInstructions(containers, executionContext, instructable, instruction, behaviors, bindings, children, contentSelectors, partReplacements, resources);
        }
        view = new View(container, fragment, behaviors, bindings, children, options.systemControlled, contentSelectors);
        view.created(executionContext);
        if (!options.suppressBind) {
          view.bind(executionContext);
        }
        return view;
      };
      return ViewFactory;
    })();
    exports.ViewFactory = ViewFactory;
    var nextInjectorId = 0,
        defaultCompileOptions = {targetShadowDOM: false},
        hasShadowDOM = !!HTMLElement.prototype.createShadowRoot;
    function getNextInjectorId() {
      return ++nextInjectorId;
    }
    function configureProperties(instruction, resources) {
      var type = instruction.type,
          attrName = instruction.attrName,
          attributes = instruction.attributes,
          property,
          key,
          value;
      var knownAttribute = resources.mapAttribute(attrName);
      if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
        attributes[knownAttribute] = attributes[attrName];
        delete attributes[attrName];
      }
      for (key in attributes) {
        value = attributes[key];
        if (value !== null && typeof value === 'object') {
          property = type.attributes[key];
          if (property !== undefined) {
            value.targetProperty = property.name;
          } else {
            value.targetProperty = key;
          }
        }
      }
    }
    var lastAUTargetID = 0;
    function getNextAUTargetID() {
      return (++lastAUTargetID).toString();
    }
    function makeIntoInstructionTarget(element) {
      var value = element.getAttribute('class'),
          auTargetID = getNextAUTargetID();
      element.setAttribute('class', value ? value += ' au-target' : 'au-target');
      element.setAttribute('au-target-id', auTargetID);
      return auTargetID;
    }
    var ViewCompiler = (function() {
      function ViewCompiler(bindingLanguage) {
        _classCallCheck(this, ViewCompiler);
        this.bindingLanguage = bindingLanguage;
      }
      ViewCompiler.inject = function inject() {
        return [BindingLanguage];
      };
      ViewCompiler.prototype.compile = function compile(templateOrFragment, resources) {
        var options = arguments[2] === undefined ? defaultCompileOptions : arguments[2];
        var instructions = {},
            targetShadowDOM = options.targetShadowDOM,
            content,
            part,
            factory;
        targetShadowDOM = targetShadowDOM && hasShadowDOM;
        if (options.beforeCompile) {
          options.beforeCompile(templateOrFragment);
        }
        if (typeof templateOrFragment === 'string') {
          templateOrFragment = createTemplateFromMarkup(templateOrFragment);
        }
        if (templateOrFragment.content) {
          part = templateOrFragment.getAttribute('part');
          content = document.adoptNode(templateOrFragment.content, true);
        } else {
          content = templateOrFragment;
        }
        this.compileNode(content, resources, instructions, templateOrFragment, 'root', !targetShadowDOM);
        content.insertBefore(document.createComment('<view>'), content.firstChild);
        content.appendChild(document.createComment('</view>'));
        var factory = new ViewFactory(content, instructions, resources);
        factory.surrogateInstruction = options.compileSurrogate ? this.compileSurrogate(templateOrFragment, resources) : null;
        if (part) {
          factory.part = part;
        }
        return factory;
      };
      ViewCompiler.prototype.compileNode = function compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        switch (node.nodeType) {
          case 1:
            return this.compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
          case 3:
            var expression = this.bindingLanguage.parseText(resources, node.wholeText);
            if (expression) {
              var marker = document.createElement('au-marker'),
                  auTargetID = makeIntoInstructionTarget(marker);
              (node.parentNode || parentNode).insertBefore(marker, node);
              node.textContent = ' ';
              instructions[auTargetID] = {contentExpression: expression};
              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                (node.parentNode || parentNode).removeChild(node.nextSibling);
              }
            } else {
              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                node = node.nextSibling;
              }
            }
            return node.nextSibling;
          case 11:
            var currentChild = node.firstChild;
            while (currentChild) {
              currentChild = this.compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
            }
            break;
        }
        return node.nextSibling;
      };
      ViewCompiler.prototype.compileSurrogate = function compileSurrogate(node, resources) {
        var attributes = node.attributes,
            bindingLanguage = this.bindingLanguage,
            knownAttribute = undefined,
            property = undefined,
            instruction = undefined,
            i = undefined,
            ii = undefined,
            attr = undefined,
            attrName = undefined,
            attrValue = undefined,
            info = undefined,
            type = undefined,
            expressions = [],
            expression = undefined,
            behaviorInstructions = [],
            values = {},
            hasValues = false,
            providers = [];
        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          attrName = attr.name;
          attrValue = attr.value;
          info = bindingLanguage.inspectAttribute(resources, attrName, attrValue);
          type = resources.getAttribute(info.attrName);
          if (type) {
            knownAttribute = resources.mapAttribute(info.attrName);
            if (knownAttribute) {
              property = type.attributes[knownAttribute];
              if (property) {
                info.defaultBindingMode = property.defaultBindingMode;
                if (!info.command && !info.expression) {
                  info.command = property.hasOptions ? 'options' : null;
                }
              }
            }
          }
          instruction = bindingLanguage.createAttributeInstruction(resources, node, info);
          if (instruction) {
            if (instruction.alteredAttr) {
              type = resources.getAttribute(instruction.attrName);
            }
            if (instruction.discrete) {
              expressions.push(instruction);
            } else {
              if (type) {
                instruction.type = type;
                configureProperties(instruction, resources);
                if (type.liftsContent) {
                  throw new Error('You cannot place a template controller on a surrogate element.');
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = {
                attrName: attrName,
                type: type,
                attributes: {}
              };
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
              if (type.liftsContent) {
                throw new Error('You cannot place a template controller on a surrogate element.');
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
              hasValues = true;
              values[attrName] = attrValue;
            }
          }
        }
        if (expressions.length || behaviorInstructions.length || hasValues) {
          for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            instruction = behaviorInstructions[i];
            instruction.type.compile(this, resources, node, instruction);
            providers.push(instruction.type.target);
          }
          for (i = 0, ii = expressions.length; i < ii; ++i) {
            expression = expressions[i];
            if (expression.attrToRemove !== undefined) {
              node.removeAttribute(expression.attrToRemove);
            }
          }
          return {
            anchorIsContainer: false,
            isCustomElement: false,
            injectorId: null,
            parentInjectorId: null,
            expressions: expressions,
            behaviorInstructions: behaviorInstructions,
            providers: providers,
            values: values
          };
        }
        return null;
      };
      ViewCompiler.prototype.compileElement = function compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        var tagName = node.tagName.toLowerCase(),
            attributes = node.attributes,
            expressions = [],
            expression,
            behaviorInstructions = [],
            providers = [],
            bindingLanguage = this.bindingLanguage,
            liftingInstruction,
            viewFactory,
            type,
            elementInstruction,
            elementProperty,
            i,
            ii,
            attr,
            attrName,
            attrValue,
            instruction,
            info,
            property,
            knownAttribute,
            auTargetID,
            injectorId;
        if (tagName === 'content') {
          if (targetLightDOM) {
            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = {
              parentInjectorId: parentInjectorId,
              contentSelector: true,
              selector: node.getAttribute('select'),
              suppressBind: true
            };
          }
          return node.nextSibling;
        } else if (tagName === 'template') {
          viewFactory = this.compile(node, resources);
          viewFactory.part = node.getAttribute('part');
        } else {
          type = resources.getElement(tagName);
          if (type) {
            elementInstruction = {
              type: type,
              attributes: {}
            };
            elementInstruction.anchorIsContainer = !node.hasAttribute('containerless') && !type.containerless;
            behaviorInstructions.push(elementInstruction);
          }
        }
        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          attrName = attr.name;
          attrValue = attr.value;
          info = bindingLanguage.inspectAttribute(resources, attrName, attrValue);
          type = resources.getAttribute(info.attrName);
          elementProperty = null;
          if (type) {
            knownAttribute = resources.mapAttribute(info.attrName);
            if (knownAttribute) {
              property = type.attributes[knownAttribute];
              if (property) {
                info.defaultBindingMode = property.defaultBindingMode;
                if (!info.command && !info.expression) {
                  info.command = property.hasOptions ? 'options' : null;
                }
              }
            }
          } else if (elementInstruction) {
            elementProperty = elementInstruction.type.attributes[info.attrName];
            if (elementProperty) {
              info.defaultBindingMode = elementProperty.defaultBindingMode;
              if (!info.command && !info.expression) {
                info.command = elementProperty.hasOptions ? 'options' : null;
              }
            }
          }
          if (elementProperty) {
            instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
          } else {
            instruction = bindingLanguage.createAttributeInstruction(resources, node, info);
          }
          if (instruction) {
            if (instruction.alteredAttr) {
              type = resources.getAttribute(instruction.attrName);
            }
            if (instruction.discrete) {
              expressions.push(instruction);
            } else {
              if (type) {
                instruction.type = type;
                configureProperties(instruction, resources);
                if (type.liftsContent) {
                  instruction.originalAttrName = attrName;
                  liftingInstruction = instruction;
                  break;
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else if (elementProperty) {
                elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = {
                attrName: attrName,
                type: type,
                attributes: {}
              };
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;
              if (type.liftsContent) {
                instruction.originalAttrName = attrName;
                liftingInstruction = instruction;
                break;
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (elementProperty) {
              elementInstruction.attributes[attrName] = attrValue;
            }
          }
        }
        if (liftingInstruction) {
          liftingInstruction.viewFactory = viewFactory;
          node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = {
            anchorIsContainer: false,
            parentInjectorId: parentInjectorId,
            expressions: [],
            behaviorInstructions: [liftingInstruction],
            viewFactory: liftingInstruction.viewFactory,
            providers: [liftingInstruction.type.target]
          };
        } else {
          if (expressions.length || behaviorInstructions.length) {
            injectorId = behaviorInstructions.length ? getNextInjectorId() : false;
            for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
              instruction = behaviorInstructions[i];
              instruction.type.compile(this, resources, node, instruction, parentNode);
              providers.push(instruction.type.target);
            }
            for (i = 0, ii = expressions.length; i < ii; ++i) {
              expression = expressions[i];
              if (expression.attrToRemove !== undefined) {
                node.removeAttribute(expression.attrToRemove);
              }
            }
            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = {
              anchorIsContainer: elementInstruction ? elementInstruction.anchorIsContainer : true,
              isCustomElement: !!elementInstruction,
              injectorId: injectorId,
              parentInjectorId: parentInjectorId,
              expressions: expressions,
              behaviorInstructions: behaviorInstructions,
              providers: providers
            };
          }
          if (elementInstruction && elementInstruction.skipContentProcessing) {
            return node.nextSibling;
          }
          var currentChild = node.firstChild;
          while (currentChild) {
            currentChild = this.compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
          }
        }
        return node.nextSibling;
      };
      return ViewCompiler;
    })();
    exports.ViewCompiler = ViewCompiler;
    var logger = _aureliaLogging.getLogger('templating');
    function ensureRegistryEntry(loader, urlOrRegistryEntry) {
      if (urlOrRegistryEntry instanceof _aureliaLoader.TemplateRegistryEntry) {
        return Promise.resolve(urlOrRegistryEntry);
      }
      return loader.loadTemplate(urlOrRegistryEntry);
    }
    var ProxyViewFactory = (function() {
      function ProxyViewFactory(promise) {
        var _this4 = this;
        _classCallCheck(this, ProxyViewFactory);
        promise.then(function(x) {
          return _this4.absorb(x);
        });
      }
      ProxyViewFactory.prototype.absorb = function absorb(factory) {
        this.create = factory.create.bind(factory);
      };
      return ProxyViewFactory;
    })();
    var ViewEngine = (function() {
      function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
        _classCallCheck(this, ViewEngine);
        this.loader = loader;
        this.container = container;
        this.viewCompiler = viewCompiler;
        this.moduleAnalyzer = moduleAnalyzer;
        this.appResources = appResources;
      }
      ViewEngine.inject = function inject() {
        return [_aureliaLoader.Loader, _aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ResourceRegistry];
      };
      ViewEngine.prototype.enhance = function enhance(container, element, resources, bindingContext) {
        var instructions = {};
        this.viewCompiler.compileNode(element, resources, instructions, element.parentNode, 'root', true);
        var factory = new ViewFactory(element, instructions, resources);
        var options = {
          systemControlled: false,
          suppressBind: false,
          enhance: true
        };
        return factory.create(container, bindingContext, options);
      };
      ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileOptions, associatedModuleId, loadContext) {
        var _this5 = this;
        loadContext = loadContext || [];
        return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function(viewRegistryEntry) {
          if (viewRegistryEntry.onReady) {
            if (loadContext.indexOf(urlOrRegistryEntry) === -1) {
              loadContext.push(urlOrRegistryEntry);
              return viewRegistryEntry.onReady;
            }
            return Promise.resolve(new ProxyViewFactory(viewRegistryEntry.onReady));
          }
          loadContext.push(urlOrRegistryEntry);
          return viewRegistryEntry.onReady = _this5.loadTemplateResources(viewRegistryEntry, associatedModuleId, loadContext).then(function(resources) {
            viewRegistryEntry.setResources(resources);
            var viewFactory = _this5.viewCompiler.compile(viewRegistryEntry.template, resources, compileOptions);
            viewRegistryEntry.setFactory(viewFactory);
            return viewFactory;
          });
        });
      };
      ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(viewRegistryEntry, associatedModuleId, loadContext) {
        var resources = new ViewResources(this.appResources, viewRegistryEntry.id),
            dependencies = viewRegistryEntry.dependencies,
            importIds,
            names;
        if (dependencies.length === 0 && !associatedModuleId) {
          return Promise.resolve(resources);
        }
        importIds = dependencies.map(function(x) {
          return x.src;
        });
        names = dependencies.map(function(x) {
          return x.name;
        });
        logger.debug('importing resources for ' + viewRegistryEntry.id, importIds);
        return this.importViewResources(importIds, names, resources, associatedModuleId, loadContext);
      };
      ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
        var _this6 = this;
        return this.loader.loadModule(moduleImport).then(function(viewModelModule) {
          var normalizedId = _aureliaMetadata.Origin.get(viewModelModule).moduleId,
              resourceModule = _this6.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);
          if (!resourceModule.mainResource) {
            throw new Error('No view model found in module "' + moduleImport + '".');
          }
          resourceModule.analyze(_this6.container);
          return resourceModule.mainResource;
        });
      };
      ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, associatedModuleId, loadContext) {
        var _this7 = this;
        loadContext = loadContext || [];
        return this.loader.loadAllModules(moduleIds).then(function(imports) {
          var i,
              ii,
              analysis,
              normalizedId,
              current,
              associatedModule,
              container = _this7.container,
              moduleAnalyzer = _this7.moduleAnalyzer,
              allAnalysis = new Array(imports.length);
          for (i = 0, ii = imports.length; i < ii; ++i) {
            current = imports[i];
            normalizedId = _aureliaMetadata.Origin.get(current).moduleId;
            analysis = moduleAnalyzer.analyze(normalizedId, current);
            analysis.analyze(container);
            analysis.register(resources, names[i]);
            allAnalysis[i] = analysis;
          }
          if (associatedModuleId) {
            associatedModule = moduleAnalyzer.getAnalysis(associatedModuleId);
            if (associatedModule) {
              associatedModule.register(resources);
            }
          }
          for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
            allAnalysis[i] = allAnalysis[i].load(container, loadContext);
          }
          return Promise.all(allAnalysis).then(function() {
            return resources;
          });
        });
      };
      return ViewEngine;
    })();
    exports.ViewEngine = ViewEngine;
    var BehaviorInstance = (function() {
      function BehaviorInstance(behavior, executionContext, instruction) {
        _classCallCheck(this, BehaviorInstance);
        this.behavior = behavior;
        this.executionContext = executionContext;
        this.isAttached = false;
        var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(executionContext),
            handlesBind = behavior.handlesBind,
            attributes = instruction.attributes,
            boundProperties = this.boundProperties = [],
            properties = behavior.properties,
            i,
            ii;
        behavior.ensurePropertiesDefined(executionContext, observerLookup);
        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i].initialize(executionContext, observerLookup, attributes, handlesBind, boundProperties);
        }
      }
      BehaviorInstance.createForUnitTest = function createForUnitTest(type, attributes, bindingContext) {
        var description = ResourceDescription.get(type);
        description.analyze(_aureliaDependencyInjection.Container.instance);
        var executionContext = _aureliaDependencyInjection.Container.instance.get(type);
        var behaviorInstance = new BehaviorInstance(description.metadata, executionContext, {attributes: attributes || {}});
        behaviorInstance.bind(bindingContext || {});
        return executionContext;
      };
      BehaviorInstance.prototype.created = function created(context) {
        if (this.behavior.handlesCreated) {
          this.executionContext.created(context);
        }
      };
      BehaviorInstance.prototype.bind = function bind(context) {
        var skipSelfSubscriber = this.behavior.handlesBind,
            boundProperties = this.boundProperties,
            i,
            ii,
            x,
            observer,
            selfSubscriber;
        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          x = boundProperties[i];
          observer = x.observer;
          selfSubscriber = observer.selfSubscriber;
          observer.publishing = false;
          if (skipSelfSubscriber) {
            observer.selfSubscriber = null;
          }
          x.binding.bind(context);
          observer.call();
          observer.publishing = true;
          observer.selfSubscriber = selfSubscriber;
        }
        if (skipSelfSubscriber) {
          this.executionContext.bind(context);
        }
        if (this.view) {
          this.view.bind(this.executionContext);
        }
      };
      BehaviorInstance.prototype.unbind = function unbind() {
        var boundProperties = this.boundProperties,
            i,
            ii;
        if (this.view) {
          this.view.unbind();
        }
        if (this.behavior.handlesUnbind) {
          this.executionContext.unbind();
        }
        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          boundProperties[i].binding.unbind();
        }
      };
      BehaviorInstance.prototype.attached = function attached() {
        if (this.isAttached) {
          return ;
        }
        this.isAttached = true;
        if (this.behavior.handlesAttached) {
          this.executionContext.attached();
        }
        if (this.view) {
          this.view.attached();
        }
      };
      BehaviorInstance.prototype.detached = function detached() {
        if (this.isAttached) {
          this.isAttached = false;
          if (this.view) {
            this.view.detached();
          }
          if (this.behavior.handlesDetached) {
            this.executionContext.detached();
          }
        }
      };
      return BehaviorInstance;
    })();
    exports.BehaviorInstance = BehaviorInstance;
    function getObserver(behavior, instance, name) {
      var lookup = instance.__observers__;
      if (lookup === undefined) {
        lookup = behavior.observerLocator.getOrCreateObserversLookup(instance);
        behavior.ensurePropertiesDefined(instance, lookup);
      }
      return lookup[name];
    }
    var BindableProperty = (function() {
      function BindableProperty(nameOrConfig) {
        _classCallCheck(this, BindableProperty);
        if (typeof nameOrConfig === 'string') {
          this.name = nameOrConfig;
        } else {
          Object.assign(this, nameOrConfig);
        }
        this.attribute = this.attribute || hyphenate(this.name);
        this.defaultBindingMode = this.defaultBindingMode || _aureliaBinding.bindingMode.oneWay;
        this.changeHandler = this.changeHandler || null;
        this.owner = null;
      }
      BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
        behavior.properties.push(this);
        behavior.attributes[this.attribute] = this;
        this.owner = behavior;
        if (descriptor) {
          this.descriptor = descriptor;
          return this.configureDescriptor(behavior, descriptor);
        }
      };
      BindableProperty.prototype.configureDescriptor = function configureDescriptor(behavior, descriptor) {
        var name = this.name;
        descriptor.configurable = true;
        descriptor.enumerable = true;
        if ('initializer' in descriptor) {
          this.defaultValue = descriptor.initializer;
          delete descriptor.initializer;
          delete descriptor.writable;
        }
        if ('value' in descriptor) {
          this.defaultValue = descriptor.value;
          delete descriptor.value;
          delete descriptor.writable;
        }
        descriptor.get = function() {
          return getObserver(behavior, this, name).getValue();
        };
        descriptor.set = function(value) {
          getObserver(behavior, this, name).setValue(value);
        };
        descriptor.get.getObserver = function(obj) {
          return getObserver(behavior, obj, name);
        };
        return descriptor;
      };
      BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
        var name = this.name,
            handlerName;
        if (this.changeHandler === null) {
          handlerName = name + 'Changed';
          if (handlerName in target.prototype) {
            this.changeHandler = handlerName;
          }
        }
        if (!this.descriptor) {
          Object.defineProperty(target.prototype, name, this.configureDescriptor(behavior, {}));
        }
      };
      BindableProperty.prototype.createObserver = function createObserver(executionContext) {
        var selfSubscriber = null,
            defaultValue = this.defaultValue,
            changeHandlerName = this.changeHandler,
            name = this.name,
            initialValue;
        if (this.hasOptions) {
          return ;
        }
        if (changeHandlerName in executionContext) {
          if ('propertyChanged' in executionContext) {
            selfSubscriber = function(newValue, oldValue) {
              executionContext[changeHandlerName](newValue, oldValue);
              executionContext.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function(newValue, oldValue) {
              return executionContext[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in executionContext) {
          selfSubscriber = function(newValue, oldValue) {
            return executionContext.propertyChanged(name, newValue, oldValue);
          };
        } else if (changeHandlerName !== null) {
          throw new Error('Change handler ' + changeHandlerName + ' was specified but not delcared on the class.');
        }
        if (defaultValue !== undefined) {
          initialValue = typeof defaultValue === 'function' ? defaultValue.call(executionContext) : defaultValue;
        }
        return new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, this.name, selfSubscriber, initialValue);
      };
      BindableProperty.prototype.initialize = function initialize(executionContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
        var selfSubscriber,
            observer,
            attribute,
            defaultValue = this.defaultValue;
        if (this.isDynamic) {
          for (var key in attributes) {
            this.createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
          }
        } else if (!this.hasOptions) {
          observer = observerLookup[this.name];
          if (attributes !== undefined) {
            selfSubscriber = observer.selfSubscriber;
            attribute = attributes[this.attribute];
            if (behaviorHandlesBind) {
              observer.selfSubscriber = null;
            }
            if (typeof attribute === 'string') {
              executionContext[this.name] = attribute;
              observer.call();
            } else if (attribute) {
              boundProperties.push({
                observer: observer,
                binding: attribute.createBinding(executionContext)
              });
            } else if (defaultValue !== undefined) {
              observer.call();
            }
            observer.selfSubscriber = selfSubscriber;
          }
          observer.publishing = true;
        }
      };
      BindableProperty.prototype.createDynamicProperty = function createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
        var changeHandlerName = name + 'Changed',
            selfSubscriber = null,
            observer,
            info;
        if (changeHandlerName in executionContext) {
          if ('propertyChanged' in executionContext) {
            selfSubscriber = function(newValue, oldValue) {
              executionContext[changeHandlerName](newValue, oldValue);
              executionContext.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function(newValue, oldValue) {
              return executionContext[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in executionContext) {
          selfSubscriber = function(newValue, oldValue) {
            return executionContext.propertyChanged(name, newValue, oldValue);
          };
        }
        observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, name, selfSubscriber);
        Object.defineProperty(executionContext, name, {
          configurable: true,
          enumerable: true,
          get: observer.getValue.bind(observer),
          set: observer.setValue.bind(observer)
        });
        if (behaviorHandlesBind) {
          observer.selfSubscriber = null;
        }
        if (typeof attribute === 'string') {
          executionContext[name] = attribute;
          observer.call();
        } else if (attribute) {
          info = {
            observer: observer,
            binding: attribute.createBinding(executionContext)
          };
          boundProperties.push(info);
        }
        observer.publishing = true;
        observer.selfSubscriber = selfSubscriber;
      };
      return BindableProperty;
    })();
    exports.BindableProperty = BindableProperty;
    var BehaviorPropertyObserver = (function() {
      function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
        _classCallCheck(this, BehaviorPropertyObserver);
        this.taskQueue = taskQueue;
        this.obj = obj;
        this.propertyName = propertyName;
        this.callbacks = [];
        this.notqueued = true;
        this.publishing = false;
        this.selfSubscriber = selfSubscriber;
        this.currentValue = this.oldValue = initialValue;
      }
      BehaviorPropertyObserver.prototype.getValue = function getValue() {
        return this.currentValue;
      };
      BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
        var oldValue = this.currentValue;
        if (oldValue !== newValue) {
          if (this.publishing && this.notqueued) {
            this.notqueued = false;
            this.taskQueue.queueMicroTask(this);
          }
          this.oldValue = oldValue;
          this.currentValue = newValue;
        }
      };
      BehaviorPropertyObserver.prototype.call = function call() {
        var callbacks = this.callbacks,
            i = callbacks.length,
            oldValue = this.oldValue,
            newValue = this.currentValue;
        this.notqueued = true;
        if (newValue !== oldValue) {
          if (this.selfSubscriber !== null) {
            this.selfSubscriber(newValue, oldValue);
          }
          while (i--) {
            callbacks[i](newValue, oldValue);
          }
          this.oldValue = newValue;
        }
      };
      BehaviorPropertyObserver.prototype.subscribe = function subscribe(callback) {
        var callbacks = this.callbacks;
        callbacks.push(callback);
        return function() {
          callbacks.splice(callbacks.indexOf(callback), 1);
        };
      };
      return BehaviorPropertyObserver;
    })();
    var defaultInstruction = {suppressBind: false},
        contentSelectorFactoryOptions = {
          suppressBind: true,
          enhance: false
        },
        hasShadowDOM = !!HTMLElement.prototype.createShadowRoot;
    function doProcessContent() {
      return true;
    }
    var HtmlBehaviorResource = (function() {
      function HtmlBehaviorResource() {
        _classCallCheck(this, HtmlBehaviorResource);
        this.elementName = null;
        this.attributeName = null;
        this.attributeDefaultBindingMode = undefined;
        this.liftsContent = false;
        this.targetShadowDOM = false;
        this.processContent = doProcessContent;
        this.usesShadowDOM = false;
        this.childBindings = null;
        this.hasDynamicOptions = false;
        this.containerless = false;
        this.properties = [];
        this.attributes = {};
      }
      HtmlBehaviorResource.convention = function convention(name, existing) {
        var behavior;
        if (name.endsWith('CustomAttribute')) {
          behavior = existing || new HtmlBehaviorResource();
          behavior.attributeName = hyphenate(name.substring(0, name.length - 15));
        }
        if (name.endsWith('CustomElement')) {
          behavior = existing || new HtmlBehaviorResource();
          behavior.elementName = hyphenate(name.substring(0, name.length - 13));
        }
        return behavior;
      };
      HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
        if (this.childBindings === null) {
          this.childBindings = [];
        }
        this.childBindings.push(behavior);
      };
      HtmlBehaviorResource.prototype.analyze = function analyze(container, target) {
        var proto = target.prototype,
            properties = this.properties,
            attributeName = this.attributeName,
            attributeDefaultBindingMode = this.attributeDefaultBindingMode,
            i,
            ii,
            current;
        this.observerLocator = container.get(_aureliaBinding.ObserverLocator);
        this.taskQueue = container.get(_aureliaTaskQueue.TaskQueue);
        this.target = target;
        this.usesShadowDOM = this.targetShadowDOM && hasShadowDOM;
        this.handlesCreated = 'created' in proto;
        this.handlesBind = 'bind' in proto;
        this.handlesUnbind = 'unbind' in proto;
        this.handlesAttached = 'attached' in proto;
        this.handlesDetached = 'detached' in proto;
        this.htmlName = this.elementName || this.attributeName;
        this.apiName = this.htmlName.replace(/-([a-z])/g, function(m, w) {
          return w.toUpperCase();
        });
        if (attributeName !== null) {
          if (properties.length === 0) {
            new BindableProperty({
              name: 'value',
              changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
              attribute: attributeName,
              defaultBindingMode: attributeDefaultBindingMode
            }).registerWith(target, this);
          }
          current = properties[0];
          if (properties.length === 1 && current.name === 'value') {
            current.isDynamic = current.hasOptions = this.hasDynamicOptions;
            current.defineOn(target, this);
          } else {
            for (i = 0, ii = properties.length; i < ii; ++i) {
              properties[i].defineOn(target, this);
            }
            current = new BindableProperty({
              name: 'value',
              changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
              attribute: attributeName,
              defaultBindingMode: attributeDefaultBindingMode
            });
            current.hasOptions = true;
            current.registerWith(target, this);
          }
        } else {
          for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].defineOn(target, this);
          }
        }
      };
      HtmlBehaviorResource.prototype.load = function load(container, target, viewStrategy, transientView, loadContext) {
        var _this8 = this;
        var options;
        if (this.elementName !== null) {
          viewStrategy = viewStrategy || this.viewStrategy || ViewStrategy.getDefault(target);
          options = {
            targetShadowDOM: this.targetShadowDOM,
            beforeCompile: target.beforeCompile,
            compileSurrogate: true
          };
          if (!viewStrategy.moduleId) {
            viewStrategy.moduleId = _aureliaMetadata.Origin.get(target).moduleId;
          }
          return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext).then(function(viewFactory) {
            if (!transientView || !_this8.viewFactory) {
              _this8.viewFactory = viewFactory;
            }
            return viewFactory;
          });
        }
        return Promise.resolve(this);
      };
      HtmlBehaviorResource.prototype.register = function register(registry, name) {
        if (this.attributeName !== null) {
          registry.registerAttribute(name || this.attributeName, this, this.attributeName);
        }
        if (this.elementName !== null) {
          registry.registerElement(name || this.elementName, this);
        }
      };
      HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
        if (this.liftsContent) {
          if (!instruction.viewFactory) {
            var template = document.createElement('template'),
                fragment = document.createDocumentFragment(),
                part = node.getAttribute('part');
            node.removeAttribute(instruction.originalAttrName);
            replaceNode(template, node, parentNode);
            fragment.appendChild(node);
            instruction.viewFactory = compiler.compile(fragment, resources);
            if (part) {
              instruction.viewFactory.part = part;
              node.removeAttribute('part');
            }
            node = template;
          }
        } else if (this.elementName !== null) {
          var partReplacements = instruction.partReplacements = {};
          if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
            if (this.usesShadowDOM) {
              var currentChild = node.firstChild,
                  nextSibling,
                  toReplace;
              while (currentChild) {
                nextSibling = currentChild.nextSibling;
                if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                  partReplacements[toReplace] = compiler.compile(currentChild, resources);
                  removeNode(currentChild, parentNode);
                }
                currentChild = nextSibling;
              }
              instruction.skipContentProcessing = false;
            } else {
              var fragment = document.createDocumentFragment(),
                  currentChild = node.firstChild,
                  nextSibling;
              while (currentChild) {
                nextSibling = currentChild.nextSibling;
                if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                  partReplacements[toReplace] = compiler.compile(currentChild, resources);
                  removeNode(currentChild, parentNode);
                } else {
                  fragment.appendChild(currentChild);
                }
                currentChild = nextSibling;
              }
              instruction.contentFactory = compiler.compile(fragment, resources);
              instruction.skipContentProcessing = true;
            }
          } else {
            instruction.skipContentProcessing = true;
          }
        }
        instruction.suppressBind = true;
        return node;
      };
      HtmlBehaviorResource.prototype.create = function create(container) {
        var instruction = arguments[1] === undefined ? defaultInstruction : arguments[1];
        var element = arguments[2] === undefined ? null : arguments[2];
        var bindings = arguments[3] === undefined ? null : arguments[3];
        var host = undefined;
        if (this.elementName !== null && element) {
          if (this.usesShadowDOM) {
            host = element.createShadowRoot();
            container.registerInstance(DOMBoundary, host);
          } else {
            host = element;
            if (this.targetShadowDOM) {
              container.registerInstance(DOMBoundary, host);
            }
          }
        }
        var executionContext = instruction.executionContext || container.get(this.target),
            behaviorInstance = new BehaviorInstance(this, executionContext, instruction),
            childBindings = this.childBindings,
            viewFactory = undefined;
        if (this.liftsContent) {
          element.primaryBehavior = behaviorInstance;
        } else if (this.elementName !== null) {
          viewFactory = instruction.viewFactory || this.viewFactory;
          container.viewModel = executionContext;
          if (viewFactory) {
            behaviorInstance.view = viewFactory.create(container, executionContext, instruction, element);
          }
          if (element) {
            element.primaryBehavior = behaviorInstance;
            if (behaviorInstance.view) {
              if (!this.usesShadowDOM) {
                if (instruction.contentFactory) {
                  var contentView = instruction.contentFactory.create(container, null, contentSelectorFactoryOptions);
                  ContentSelector.applySelectors(contentView, behaviorInstance.view.contentSelectors, function(contentSelector, group) {
                    return contentSelector.add(group);
                  });
                  behaviorInstance.contentView = contentView;
                }
              }
              if (instruction.anchorIsContainer) {
                if (childBindings !== null) {
                  for (var i = 0,
                      ii = childBindings.length; i < ii; ++i) {
                    behaviorInstance.view.addBinding(childBindings[i].create(host, executionContext));
                  }
                }
                behaviorInstance.view.appendNodesTo(host);
              } else {
                behaviorInstance.view.insertNodesBefore(host);
              }
            } else if (childBindings !== null) {
              for (var i = 0,
                  ii = childBindings.length; i < ii; ++i) {
                bindings.push(childBindings[i].create(element, executionContext));
              }
            }
          } else if (behaviorInstance.view) {
            behaviorInstance.view.owner = behaviorInstance;
            if (childBindings !== null) {
              for (var i = 0,
                  ii = childBindings.length; i < ii; ++i) {
                behaviorInstance.view.addBinding(childBindings[i].create(instruction.host, executionContext));
              }
            }
          } else if (childBindings !== null) {
            for (var i = 0,
                ii = childBindings.length; i < ii; ++i) {
              bindings.push(childBindings[i].create(instruction.host, executionContext));
            }
          }
        } else if (childBindings !== null) {
          for (var i = 0,
              ii = childBindings.length; i < ii; ++i) {
            bindings.push(childBindings[i].create(element, executionContext));
          }
        }
        if (element) {
          if (!(this.apiName in element)) {
            element[this.apiName] = executionContext;
          }
          if (!(this.htmlName in element)) {
            element[this.htmlName] = behaviorInstance;
          }
        }
        return behaviorInstance;
      };
      HtmlBehaviorResource.prototype.ensurePropertiesDefined = function ensurePropertiesDefined(instance, lookup) {
        var properties,
            i,
            ii,
            observer;
        if ('__propertiesDefined__' in lookup) {
          return ;
        }
        lookup.__propertiesDefined__ = true;
        properties = this.properties;
        for (i = 0, ii = properties.length; i < ii; ++i) {
          observer = properties[i].createObserver(instance);
          if (observer !== undefined) {
            lookup[observer.propertyName] = observer;
          }
        }
      };
      return HtmlBehaviorResource;
    })();
    exports.HtmlBehaviorResource = HtmlBehaviorResource;
    var ResourceModule = (function() {
      function ResourceModule(moduleId) {
        _classCallCheck(this, ResourceModule);
        this.id = moduleId;
        this.moduleInstance = null;
        this.mainResource = null;
        this.resources = null;
        this.viewStrategy = null;
        this.isAnalyzed = false;
      }
      ResourceModule.prototype.analyze = function analyze(container) {
        var current = this.mainResource,
            resources = this.resources,
            viewStrategy = this.viewStrategy,
            i,
            ii;
        if (this.isAnalyzed) {
          return ;
        }
        this.isAnalyzed = true;
        if (current) {
          current.metadata.viewStrategy = viewStrategy;
          current.analyze(container);
        }
        for (i = 0, ii = resources.length; i < ii; ++i) {
          current = resources[i];
          current.metadata.viewStrategy = viewStrategy;
          current.analyze(container);
        }
      };
      ResourceModule.prototype.register = function register(registry, name) {
        var i,
            ii,
            resources = this.resources;
        if (this.mainResource) {
          this.mainResource.register(registry, name);
          name = null;
        }
        for (i = 0, ii = resources.length; i < ii; ++i) {
          resources[i].register(registry, name);
          name = null;
        }
      };
      ResourceModule.prototype.load = function load(container, loadContext) {
        if (this.onLoaded) {
          return this.onLoaded;
        }
        var current = this.mainResource,
            resources = this.resources,
            i,
            ii,
            loads = [];
        if (current) {
          loads.push(current.load(container, loadContext));
        }
        for (i = 0, ii = resources.length; i < ii; ++i) {
          loads.push(resources[i].load(container, loadContext));
        }
        this.onLoaded = Promise.all(loads);
        return this.onLoaded;
      };
      return ResourceModule;
    })();
    exports.ResourceModule = ResourceModule;
    var ResourceDescription = (function() {
      function ResourceDescription(key, exportedValue, resourceTypeMeta) {
        _classCallCheck(this, ResourceDescription);
        if (!resourceTypeMeta) {
          resourceTypeMeta = _aureliaMetadata.Metadata.get(_aureliaMetadata.Metadata.resource, exportedValue);
          if (!resourceTypeMeta) {
            resourceTypeMeta = new HtmlBehaviorResource();
            resourceTypeMeta.elementName = hyphenate(key);
            _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, resourceTypeMeta, exportedValue);
          }
        }
        if (resourceTypeMeta instanceof HtmlBehaviorResource) {
          if (resourceTypeMeta.elementName === undefined) {
            resourceTypeMeta.elementName = hyphenate(key);
          } else if (resourceTypeMeta.attributeName === undefined) {
            resourceTypeMeta.attributeName = hyphenate(key);
          } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
        } else if (!resourceTypeMeta.name) {
          resourceTypeMeta.name = hyphenate(key);
        }
        this.metadata = resourceTypeMeta;
        this.value = exportedValue;
      }
      ResourceDescription.prototype.analyze = function analyze(container) {
        var metadata = this.metadata,
            value = this.value;
        if ('analyze' in metadata) {
          metadata.analyze(container, value);
        }
      };
      ResourceDescription.prototype.register = function register(registry, name) {
        this.metadata.register(registry, name);
      };
      ResourceDescription.prototype.load = function load(container, loadContext) {
        var metadata = this.metadata,
            value = this.value;
        if ('load' in metadata) {
          return metadata.load(container, value, null, null, loadContext);
        }
      };
      ResourceDescription.get = function get(resource) {
        var key = arguments[1] === undefined ? 'custom-resource' : arguments[1];
        var resourceTypeMeta = _aureliaMetadata.Metadata.get(_aureliaMetadata.Metadata.resource, resource),
            resourceDescription;
        if (resourceTypeMeta) {
          if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
          if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            resourceTypeMeta.elementName = hyphenate(key);
          }
          resourceDescription = new ResourceDescription(key, resource, resourceTypeMeta);
        } else {
          if (resourceTypeMeta = HtmlBehaviorResource.convention(key)) {
            resourceDescription = new ResourceDescription(key, resource, resourceTypeMeta);
            _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, resourceTypeMeta, resource);
          } else if (resourceTypeMeta = _aureliaBinding.ValueConverterResource.convention(key)) {
            resourceDescription = new ResourceDescription(key, resource, resourceTypeMeta);
            _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, resourceTypeMeta, resource);
          }
        }
        return resourceDescription;
      };
      return ResourceDescription;
    })();
    exports.ResourceDescription = ResourceDescription;
    var ModuleAnalyzer = (function() {
      function ModuleAnalyzer() {
        _classCallCheck(this, ModuleAnalyzer);
        this.cache = {};
      }
      ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
        return this.cache[moduleId];
      };
      ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, viewModelMember) {
        var mainResource,
            fallbackValue,
            fallbackKey,
            resourceTypeMeta,
            key,
            exportedValue,
            resources = [],
            conventional,
            viewStrategy,
            resourceModule;
        resourceModule = this.cache[moduleId];
        if (resourceModule) {
          return resourceModule;
        }
        resourceModule = new ResourceModule(moduleId);
        this.cache[moduleId] = resourceModule;
        if (typeof moduleInstance === 'function') {
          moduleInstance = {'default': moduleInstance};
        }
        if (viewModelMember) {
          mainResource = new ResourceDescription(viewModelMember, moduleInstance[viewModelMember]);
        }
        for (key in moduleInstance) {
          exportedValue = moduleInstance[key];
          if (key === viewModelMember || typeof exportedValue !== 'function') {
            continue;
          }
          resourceTypeMeta = _aureliaMetadata.Metadata.get(_aureliaMetadata.Metadata.resource, exportedValue);
          if (resourceTypeMeta) {
            if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
              HtmlBehaviorResource.convention(key, resourceTypeMeta);
            }
            if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
              resourceTypeMeta.elementName = hyphenate(key);
            }
            if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
              mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
            } else {
              resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
            }
          } else if (exportedValue instanceof ViewStrategy) {
            viewStrategy = exportedValue;
          } else if (exportedValue instanceof _aureliaLoader.TemplateRegistryEntry) {
            viewStrategy = new TemplateRegistryViewStrategy(moduleId, exportedValue);
          } else {
            if (conventional = HtmlBehaviorResource.convention(key)) {
              if (conventional.elementName !== null && !mainResource) {
                mainResource = new ResourceDescription(key, exportedValue, conventional);
              } else {
                resources.push(new ResourceDescription(key, exportedValue, conventional));
              }
              _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, conventional, exportedValue);
            } else if (conventional = _aureliaBinding.ValueConverterResource.convention(key)) {
              resources.push(new ResourceDescription(key, exportedValue, conventional));
              _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, conventional, exportedValue);
            } else if (!fallbackValue) {
              fallbackValue = exportedValue;
              fallbackKey = key;
            }
          }
        }
        if (!mainResource && fallbackValue) {
          mainResource = new ResourceDescription(fallbackKey, fallbackValue);
        }
        resourceModule.moduleInstance = moduleInstance;
        resourceModule.mainResource = mainResource;
        resourceModule.resources = resources;
        resourceModule.viewStrategy = viewStrategy;
        return resourceModule;
      };
      return ModuleAnalyzer;
    })();
    exports.ModuleAnalyzer = ModuleAnalyzer;
    var noMutations = [];
    var ChildObserver = (function() {
      function ChildObserver(config) {
        _classCallCheck(this, ChildObserver);
        this.name = config.name;
        this.changeHandler = config.changeHandler || this.name + 'Changed';
        this.selector = config.selector;
      }
      ChildObserver.prototype.create = function create(target, behavior) {
        return new ChildObserverBinder(this.selector, target, this.name, behavior, this.changeHandler);
      };
      return ChildObserver;
    })();
    exports.ChildObserver = ChildObserver;
    var ChildObserverBinder = (function() {
      function ChildObserverBinder(selector, target, property, behavior, changeHandler) {
        _classCallCheck(this, ChildObserverBinder);
        this.selector = selector;
        this.target = target;
        this.property = property;
        this.behavior = behavior;
        this.changeHandler = changeHandler in behavior ? changeHandler : null;
        this.observer = new MutationObserver(this.onChange.bind(this));
      }
      ChildObserverBinder.prototype.bind = function bind(source) {
        var items,
            results,
            i,
            ii,
            node,
            behavior = this.behavior;
        this.observer.observe(this.target, {
          childList: true,
          subtree: true
        });
        items = behavior[this.property];
        if (!items) {
          items = behavior[this.property] = [];
        } else {
          items.length = 0;
        }
        results = this.target.querySelectorAll(this.selector);
        for (i = 0, ii = results.length; i < ii; ++i) {
          node = results[i];
          items.push(node.primaryBehavior ? node.primaryBehavior.executionContext : node);
        }
        if (this.changeHandler !== null) {
          this.behavior[this.changeHandler](noMutations);
        }
      };
      ChildObserverBinder.prototype.unbind = function unbind() {
        this.observer.disconnect();
      };
      ChildObserverBinder.prototype.onChange = function onChange(mutations) {
        var items = this.behavior[this.property],
            selector = this.selector;
        mutations.forEach(function(record) {
          var added = record.addedNodes,
              removed = record.removedNodes,
              prev = record.previousSibling,
              i,
              ii,
              primary,
              index,
              node;
          for (i = 0, ii = removed.length; i < ii; ++i) {
            node = removed[i];
            if (node.nodeType === 1 && node.matches(selector)) {
              primary = node.primaryBehavior ? node.primaryBehavior.executionContext : node;
              index = items.indexOf(primary);
              if (index != -1) {
                items.splice(index, 1);
              }
            }
          }
          for (i = 0, ii = added.length; i < ii; ++i) {
            node = added[i];
            if (node.nodeType === 1 && node.matches(selector)) {
              primary = node.primaryBehavior ? node.primaryBehavior.executionContext : node;
              index = 0;
              while (prev) {
                if (prev.nodeType === 1 && prev.matches(selector)) {
                  index++;
                }
                prev = prev.previousSibling;
              }
              items.splice(index, 0, primary);
            }
          }
        });
        if (this.changeHandler !== null) {
          this.behavior[this.changeHandler](mutations);
        }
      };
      return ChildObserverBinder;
    })();
    exports.ChildObserverBinder = ChildObserverBinder;
    var CompositionEngine = (function() {
      function CompositionEngine(viewEngine) {
        _classCallCheck(this, CompositionEngine);
        this.viewEngine = viewEngine;
      }
      CompositionEngine.inject = function inject() {
        return [ViewEngine];
      };
      CompositionEngine.prototype.activate = function activate(instruction) {
        if (instruction.skipActivation || typeof instruction.viewModel.activate !== 'function') {
          return Promise.resolve();
        }
        return instruction.viewModel.activate(instruction.model) || Promise.resolve();
      };
      CompositionEngine.prototype.createBehaviorAndSwap = function createBehaviorAndSwap(instruction) {
        return this.createBehavior(instruction).then(function(behavior) {
          behavior.view.bind(behavior.executionContext);
          instruction.viewSlot.swap(behavior.view);
          if (instruction.currentBehavior) {
            instruction.currentBehavior.unbind();
          }
          return behavior;
        });
      };
      CompositionEngine.prototype.createBehavior = function createBehavior(instruction) {
        var childContainer = instruction.childContainer,
            viewModelResource = instruction.viewModelResource,
            viewModel = instruction.viewModel,
            metadata;
        return this.activate(instruction).then(function() {
          var doneLoading,
              viewStrategyFromViewModel,
              origin;
          if ('getViewStrategy' in viewModel && !instruction.view) {
            viewStrategyFromViewModel = true;
            instruction.view = ViewStrategy.normalize(viewModel.getViewStrategy());
          }
          if (instruction.view) {
            if (viewStrategyFromViewModel) {
              origin = _aureliaMetadata.Origin.get(viewModel.constructor);
              if (origin) {
                instruction.view.makeRelativeTo(origin.moduleId);
              }
            } else if (instruction.viewResources) {
              instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
            }
          }
          if (viewModelResource) {
            metadata = viewModelResource.metadata;
            doneLoading = metadata.load(childContainer, viewModelResource.value, instruction.view, true);
          } else {
            metadata = new HtmlBehaviorResource();
            metadata.elementName = 'dynamic-element';
            metadata.analyze(instruction.container || childContainer, viewModel.constructor);
            doneLoading = metadata.load(childContainer, viewModel.constructor, instruction.view, true).then(function(viewFactory) {
              return viewFactory;
            });
          }
          return doneLoading.then(function(viewFactory) {
            return metadata.create(childContainer, {
              executionContext: viewModel,
              viewFactory: viewFactory,
              suppressBind: true,
              host: instruction.host
            });
          });
        });
      };
      CompositionEngine.prototype.createViewModel = function createViewModel(instruction) {
        var childContainer = instruction.childContainer || instruction.container.createChild();
        instruction.viewModel = instruction.viewResources ? instruction.viewResources.relativeToView(instruction.viewModel) : instruction.viewModel;
        return this.viewEngine.importViewModelResource(instruction.viewModel).then(function(viewModelResource) {
          childContainer.autoRegister(viewModelResource.value);
          if (instruction.host) {
            childContainer.registerInstance(Element, instruction.host);
          }
          instruction.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
          instruction.viewModelResource = viewModelResource;
          return instruction;
        });
      };
      CompositionEngine.prototype.compose = function compose(instruction) {
        var _this9 = this;
        instruction.childContainer = instruction.childContainer || instruction.container.createChild();
        instruction.view = ViewStrategy.normalize(instruction.view);
        if (instruction.viewModel) {
          if (typeof instruction.viewModel === 'string') {
            return this.createViewModel(instruction).then(function(instruction) {
              return _this9.createBehaviorAndSwap(instruction);
            });
          } else {
            return this.createBehaviorAndSwap(instruction);
          }
        } else if (instruction.view) {
          if (instruction.viewResources) {
            instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
          }
          return instruction.view.loadViewFactory(this.viewEngine).then(function(viewFactory) {
            var result = viewFactory.create(instruction.childContainer, instruction.executionContext);
            instruction.viewSlot.swap(result);
            return result;
          });
        } else if (instruction.viewSlot) {
          instruction.viewSlot.removeAll();
          return Promise.resolve(null);
        }
      };
      return CompositionEngine;
    })();
    exports.CompositionEngine = CompositionEngine;
    var ElementConfigResource = (function() {
      function ElementConfigResource() {
        _classCallCheck(this, ElementConfigResource);
      }
      ElementConfigResource.prototype.load = function load(container, target) {
        var config = new target(),
            eventManager = container.get(_aureliaBinding.EventManager);
        eventManager.registerElementConfig(config);
        return Promise.resolve(this);
      };
      ElementConfigResource.prototype.register = function register() {};
      return ElementConfigResource;
    })();
    exports.ElementConfigResource = ElementConfigResource;
    function validateBehaviorName(name, type) {
      if (/[A-Z]/.test(name)) {
        throw new Error('\'' + name + '\' is not a valid ' + type + ' name.  Upper-case letters are not allowed because the DOM is not case-sensitive.');
      }
    }
    function behavior(override) {
      return function(target) {
        if (override instanceof HtmlBehaviorResource) {
          _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, override, target);
        } else {
          var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
          Object.assign(resource, override);
        }
      };
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('behavior', behavior);
    function customElement(name) {
      validateBehaviorName(name, 'custom element');
      return function(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.elementName = name;
      };
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('customElement', customElement);
    function customAttribute(name, defaultBindingMode) {
      validateBehaviorName(name, 'custom attribute');
      return function(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.attributeName = name;
        resource.attributeDefaultBindingMode = defaultBindingMode;
      };
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
    function templateController(target) {
      var deco = function deco(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.liftsContent = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('templateController', templateController);
    function bindable(nameOrConfigOrTarget, key, descriptor) {
      var deco = function deco(target, key, descriptor) {
        var actualTarget = key ? target.constructor : target,
            resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, actualTarget),
            prop;
        if (key) {
          nameOrConfigOrTarget = nameOrConfigOrTarget || {};
          nameOrConfigOrTarget.name = key;
        }
        prop = new BindableProperty(nameOrConfigOrTarget);
        return prop.registerWith(actualTarget, resource, descriptor);
      };
      if (!nameOrConfigOrTarget) {
        return deco;
      }
      if (key) {
        var target = nameOrConfigOrTarget;
        nameOrConfigOrTarget = null;
        return deco(target, key, descriptor);
      }
      return deco;
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('bindable', bindable);
    function dynamicOptions(target) {
      var deco = function deco(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.hasDynamicOptions = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
    function sync(selectorOrConfig) {
      return function(target, key, descriptor) {
        var actualTarget = key ? target.constructor : target,
            resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, actualTarget);
        if (typeof selectorOrConfig === 'string') {
          selectorOrConfig = {
            selector: selectorOrConfig,
            name: key
          };
        }
        resource.addChildBinding(new ChildObserver(selectorOrConfig));
      };
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('sync', sync);
    function useShadowDOM(target) {
      var deco = function deco(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.targetShadowDOM = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
    function doNotProcessContent() {
      return false;
    }
    function skipContentProcessing(target) {
      var deco = function deco(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.processContent = doNotProcessContent;
        console.warn('The @skipContentProcessing decorator is deprecated and will be removed in a future release. Please use @processContent(false) instead.');
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);
    function processContent(processor) {
      return function(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.processContent = processor || doNotProcessContent;
      };
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('processContent', processContent);
    function containerless(target) {
      var deco = function deco(target) {
        var resource = _aureliaMetadata.Metadata.getOrCreateOwn(_aureliaMetadata.Metadata.resource, HtmlBehaviorResource, target);
        resource.containerless = true;
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('containerless', containerless);
    function viewStrategy(strategy) {
      return function(target) {
        _aureliaMetadata.Metadata.define(ViewStrategy.metadataKey, strategy, target);
      };
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('viewStrategy', useView);
    function useView(path) {
      return viewStrategy(new UseViewStrategy(path));
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('useView', useView);
    function inlineView(markup, dependencies, dependencyBaseUrl) {
      return viewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
    }
    _aureliaMetadata.Decorators.configure.parameterizedDecorator('inlineView', inlineView);
    function noView(target) {
      var deco = function deco(target) {
        _aureliaMetadata.Metadata.define(ViewStrategy.metadataKey, new NoViewStrategy(), target);
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('noView', noView);
    function elementConfig(target) {
      var deco = function deco(target) {
        _aureliaMetadata.Metadata.define(_aureliaMetadata.Metadata.resource, new ElementConfigResource(), target);
      };
      return target ? deco(target) : deco;
    }
    _aureliaMetadata.Decorators.configure.simpleDecorator('elementConfig', elementConfig);
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/metadata@0.7.2'), __require('github:aurelia/path@0.8.1'), __require('github:aurelia/loader@0.8.3'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/binding@0.8.5'), __require('github:aurelia/task-queue@0.6.1'), __require('github:aurelia/logging@0.6.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating@0.13.16", ["github:aurelia/templating@0.13.16/aurelia-templating"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/templating@0.13.16/aurelia-templating'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-router@0.14.1/route-loader", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/templating@0.13.16", "github:aurelia/router@0.10.4", "github:aurelia/path@0.8.1", "github:aurelia/metadata@0.7.2"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaRouter, _aureliaPath, _aureliaMetadata) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    var TemplatingRouteLoader = (function(_RouteLoader) {
      function TemplatingRouteLoader(compositionEngine) {
        _classCallCheck(this, _TemplatingRouteLoader);
        _RouteLoader.call(this);
        this.compositionEngine = compositionEngine;
      }
      _inherits(TemplatingRouteLoader, _RouteLoader);
      var _TemplatingRouteLoader = TemplatingRouteLoader;
      _TemplatingRouteLoader.prototype.loadRoute = function loadRoute(router, config) {
        var childContainer = router.container.createChild(),
            instruction = {
              viewModel: _aureliaPath.relativeToFile(config.moduleId, _aureliaMetadata.Origin.get(router.container.viewModel.constructor).moduleId),
              childContainer: childContainer,
              view: config.view || config.viewStrategy
            };
        childContainer.getChildRouter = function() {
          var childRouter;
          childContainer.registerHandler(_aureliaRouter.Router, function(c) {
            return childRouter || (childRouter = router.createChild(childContainer));
          });
          return childContainer.get(_aureliaRouter.Router);
        };
        return this.compositionEngine.createViewModel(instruction).then(function(instruction) {
          instruction.executionContext = instruction.viewModel;
          instruction.router = router;
          return instruction;
        });
      };
      TemplatingRouteLoader = _aureliaDependencyInjection.inject(_aureliaTemplating.CompositionEngine)(TemplatingRouteLoader) || TemplatingRouteLoader;
      return TemplatingRouteLoader;
    })(_aureliaRouter.RouteLoader);
    exports.TemplatingRouteLoader = TemplatingRouteLoader;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/router@0.10.4'), __require('github:aurelia/path@0.8.1'), __require('github:aurelia/metadata@0.7.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/router@0.10.4/aurelia-router", ["npm:core-js@0.9.18", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/route-recognizer@0.6.1", "github:aurelia/path@0.8.1", "github:aurelia/history@0.6.1", "github:aurelia/event-aggregator@0.6.2", "github:aurelia/logging@0.6.2"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaDependencyInjection, _aureliaRouteRecognizer, _aureliaPath, _aureliaHistory, _aureliaEventAggregator, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    exports.processPotential = processPotential;
    exports.normalizeAbsolutePath = normalizeAbsolutePath;
    exports.createRootedPath = createRootedPath;
    exports.resolveUrl = resolveUrl;
    exports.isNavigationCommand = isNavigationCommand;
    exports.buildNavigationPlan = buildNavigationPlan;
    exports.createRouteFilterStep = createRouteFilterStep;
    exports.loadNewRoute = loadNewRoute;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    function processPotential(obj, resolve, reject) {
      if (obj && typeof obj.then === 'function') {
        var dfd = obj.then(resolve);
        if (typeof dfd['catch'] === 'function') {
          return dfd['catch'](reject);
        } else if (typeof dfd.fail === 'function') {
          return dfd.fail(reject);
        }
        return dfd;
      } else {
        try {
          return resolve(obj);
        } catch (error) {
          return reject(error);
        }
      }
    }
    function normalizeAbsolutePath(path, hasPushState) {
      if (!hasPushState && path[0] !== '#') {
        path = '#' + path;
      }
      return path;
    }
    function createRootedPath(fragment, baseUrl, hasPushState) {
      if (isAbsoluteUrl.test(fragment)) {
        return fragment;
      }
      var path = '';
      if (baseUrl.length && baseUrl[0] !== '/') {
        path += '/';
      }
      path += baseUrl;
      if ((!path.length || path[path.length - 1] != '/') && fragment[0] != '/') {
        path += '/';
      }
      if (path.length && path[path.length - 1] == '/' && fragment[0] == '/') {
        path = path.substring(0, path.length - 1);
      }
      return normalizeAbsolutePath(path + fragment, hasPushState);
    }
    function resolveUrl(fragment, baseUrl, hasPushState) {
      if (isRootedPath.test(fragment)) {
        return normalizeAbsolutePath(fragment, hasPushState);
      } else {
        return createRootedPath(fragment, baseUrl, hasPushState);
      }
    }
    var isRootedPath = /^#?\//;
    var isAbsoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
    function isNavigationCommand(obj) {
      return obj && typeof obj.navigate === 'function';
    }
    var Redirect = (function() {
      function Redirect(url, options) {
        _classCallCheck(this, Redirect);
        this.url = url;
        this.options = Object.assign({
          trigger: true,
          replace: true
        }, options || {});
        this.shouldContinueProcessing = false;
      }
      Redirect.prototype.setRouter = function setRouter(router) {
        this.router = router;
      };
      Redirect.prototype.navigate = function navigate(appRouter) {
        var navigatingRouter = this.options.useAppRouter ? appRouter : this.router || appRouter;
        navigatingRouter.navigate(this.url, this.options);
      };
      return Redirect;
    })();
    exports.Redirect = Redirect;
    var activationStrategy = {
      noChange: 'no-change',
      invokeLifecycle: 'invoke-lifecycle',
      replace: 'replace'
    };
    exports.activationStrategy = activationStrategy;
    function buildNavigationPlan(navigationContext, forceLifecycleMinimum) {
      var prev = navigationContext.prevInstruction;
      var next = navigationContext.nextInstruction;
      var plan = {},
          viewPortName;
      if ('redirect' in next.config) {
        var redirectLocation = resolveUrl(next.config.redirect, getInstructionBaseUrl(next));
        if (next.queryString) {
          redirectLocation += '?' + next.queryString;
        }
        return Promise.reject(new Redirect(redirectLocation));
      }
      if (prev) {
        var newParams = hasDifferentParameterValues(prev, next);
        var pending = [];
        for (viewPortName in prev.viewPortInstructions) {
          var prevViewPortInstruction = prev.viewPortInstructions[viewPortName];
          var nextViewPortConfig = next.config.viewPorts[viewPortName];
          var viewPortPlan = plan[viewPortName] = {
            name: viewPortName,
            config: nextViewPortConfig,
            prevComponent: prevViewPortInstruction.component,
            prevModuleId: prevViewPortInstruction.moduleId
          };
          if (prevViewPortInstruction.moduleId != nextViewPortConfig.moduleId) {
            viewPortPlan.strategy = activationStrategy.replace;
          } else if ('determineActivationStrategy' in prevViewPortInstruction.component.executionContext) {
            var _prevViewPortInstruction$component$executionContext;
            viewPortPlan.strategy = (_prevViewPortInstruction$component$executionContext = prevViewPortInstruction.component.executionContext).determineActivationStrategy.apply(_prevViewPortInstruction$component$executionContext, next.lifecycleArgs);
          } else if (newParams || forceLifecycleMinimum) {
            viewPortPlan.strategy = activationStrategy.invokeLifecycle;
          } else {
            viewPortPlan.strategy = activationStrategy.noChange;
          }
          if (viewPortPlan.strategy !== activationStrategy.replace && prevViewPortInstruction.childRouter) {
            var path = next.getWildcardPath();
            var task = prevViewPortInstruction.childRouter.createNavigationInstruction(path, next).then(function(childInstruction) {
              viewPortPlan.childNavigationContext = prevViewPortInstruction.childRouter.createNavigationContext(childInstruction);
              return buildNavigationPlan(viewPortPlan.childNavigationContext, viewPortPlan.strategy == activationStrategy.invokeLifecycle).then(function(childPlan) {
                viewPortPlan.childNavigationContext.plan = childPlan;
              });
            });
            pending.push(task);
          }
        }
        return Promise.all(pending).then(function() {
          return plan;
        });
      } else {
        for (viewPortName in next.config.viewPorts) {
          plan[viewPortName] = {
            name: viewPortName,
            strategy: activationStrategy.replace,
            config: next.config.viewPorts[viewPortName]
          };
        }
        return Promise.resolve(plan);
      }
    }
    var BuildNavigationPlanStep = (function() {
      function BuildNavigationPlanStep() {
        _classCallCheck(this, BuildNavigationPlanStep);
      }
      BuildNavigationPlanStep.prototype.run = function run(navigationContext, next) {
        return buildNavigationPlan(navigationContext).then(function(plan) {
          navigationContext.plan = plan;
          return next();
        })['catch'](next.cancel);
      };
      return BuildNavigationPlanStep;
    })();
    exports.BuildNavigationPlanStep = BuildNavigationPlanStep;
    function hasDifferentParameterValues(prev, next) {
      var prevParams = prev.params,
          nextParams = next.params,
          nextWildCardName = next.config.hasChildRouter ? next.getWildCardName() : null;
      for (var key in nextParams) {
        if (key === nextWildCardName) {
          continue;
        }
        if (prevParams[key] !== nextParams[key]) {
          return true;
        }
      }
      for (var key in prevParams) {
        if (key === nextWildCardName) {
          continue;
        }
        if (prevParams[key] !== nextParams[key]) {
          return true;
        }
      }
      return false;
    }
    function getInstructionBaseUrl(instruction) {
      var instructionBaseUrlParts = [];
      while (instruction = instruction.parentInstruction) {
        instructionBaseUrlParts.unshift(instruction.getBaseUrl());
      }
      instructionBaseUrlParts.unshift('/');
      return instructionBaseUrlParts.join('');
    }
    var affirmations = ['yes', 'ok', 'true'];
    exports.affirmations = affirmations;
    var CanDeactivatePreviousStep = (function() {
      function CanDeactivatePreviousStep() {
        _classCallCheck(this, CanDeactivatePreviousStep);
      }
      CanDeactivatePreviousStep.prototype.run = function run(navigationContext, next) {
        return processDeactivatable(navigationContext.plan, 'canDeactivate', next);
      };
      return CanDeactivatePreviousStep;
    })();
    exports.CanDeactivatePreviousStep = CanDeactivatePreviousStep;
    var CanActivateNextStep = (function() {
      function CanActivateNextStep() {
        _classCallCheck(this, CanActivateNextStep);
      }
      CanActivateNextStep.prototype.run = function run(navigationContext, next) {
        return processActivatable(navigationContext, 'canActivate', next);
      };
      return CanActivateNextStep;
    })();
    exports.CanActivateNextStep = CanActivateNextStep;
    var DeactivatePreviousStep = (function() {
      function DeactivatePreviousStep() {
        _classCallCheck(this, DeactivatePreviousStep);
      }
      DeactivatePreviousStep.prototype.run = function run(navigationContext, next) {
        return processDeactivatable(navigationContext.plan, 'deactivate', next, true);
      };
      return DeactivatePreviousStep;
    })();
    exports.DeactivatePreviousStep = DeactivatePreviousStep;
    var ActivateNextStep = (function() {
      function ActivateNextStep() {
        _classCallCheck(this, ActivateNextStep);
      }
      ActivateNextStep.prototype.run = function run(navigationContext, next) {
        return processActivatable(navigationContext, 'activate', next, true);
      };
      return ActivateNextStep;
    })();
    exports.ActivateNextStep = ActivateNextStep;
    function processDeactivatable(plan, callbackName, next, ignoreResult) {
      var infos = findDeactivatable(plan, callbackName),
          i = infos.length;
      function inspect(val) {
        if (ignoreResult || shouldContinue(val)) {
          return iterate();
        } else {
          return next.cancel(val);
        }
      }
      function iterate() {
        if (i--) {
          try {
            var controller = infos[i];
            var result = controller[callbackName]();
            return processPotential(result, inspect, next.cancel);
          } catch (error) {
            return next.cancel(error);
          }
        } else {
          return next();
        }
      }
      return iterate();
    }
    function findDeactivatable(plan, callbackName, list) {
      list = list || [];
      for (var viewPortName in plan) {
        var viewPortPlan = plan[viewPortName];
        var prevComponent = viewPortPlan.prevComponent;
        if ((viewPortPlan.strategy == activationStrategy.invokeLifecycle || viewPortPlan.strategy == activationStrategy.replace) && prevComponent) {
          var controller = prevComponent.executionContext;
          if (callbackName in controller) {
            list.push(controller);
          }
        }
        if (viewPortPlan.childNavigationContext) {
          findDeactivatable(viewPortPlan.childNavigationContext.plan, callbackName, list);
        } else if (prevComponent) {
          addPreviousDeactivatable(prevComponent, callbackName, list);
        }
      }
      return list;
    }
    function addPreviousDeactivatable(component, callbackName, list) {
      var controller = component.executionContext,
          childRouter = component.childRouter;
      if (childRouter && childRouter.currentInstruction) {
        var viewPortInstructions = childRouter.currentInstruction.viewPortInstructions;
        for (var viewPortName in viewPortInstructions) {
          var viewPortInstruction = viewPortInstructions[viewPortName];
          var prevComponent = viewPortInstruction.component;
          var prevController = prevComponent.executionContext;
          if (callbackName in prevController) {
            list.push(prevController);
          }
          addPreviousDeactivatable(prevComponent, callbackName, list);
        }
      }
    }
    function processActivatable(navigationContext, callbackName, next, ignoreResult) {
      var infos = findActivatable(navigationContext, callbackName),
          length = infos.length,
          i = -1;
      function inspect(val, router) {
        if (ignoreResult || shouldContinue(val, router)) {
          return iterate();
        } else {
          return next.cancel(val);
        }
      }
      function iterate() {
        i++;
        if (i < length) {
          try {
            var _current$controller;
            var current = infos[i];
            var result = (_current$controller = current.controller)[callbackName].apply(_current$controller, current.lifecycleArgs);
            return processPotential(result, function(val) {
              return inspect(val, current.router);
            }, next.cancel);
          } catch (error) {
            return next.cancel(error);
          }
        } else {
          return next();
        }
      }
      return iterate();
    }
    function findActivatable(navigationContext, callbackName, list, router) {
      var plan = navigationContext.plan;
      var next = navigationContext.nextInstruction;
      list = list || [];
      Object.keys(plan).filter(function(viewPortName) {
        var viewPortPlan = plan[viewPortName];
        var viewPortInstruction = next.viewPortInstructions[viewPortName];
        var controller = viewPortInstruction.component.executionContext;
        if ((viewPortPlan.strategy === activationStrategy.invokeLifecycle || viewPortPlan.strategy === activationStrategy.replace) && callbackName in controller) {
          list.push({
            controller: controller,
            lifecycleArgs: viewPortInstruction.lifecycleArgs,
            router: router
          });
        }
        if (viewPortPlan.childNavigationContext) {
          findActivatable(viewPortPlan.childNavigationContext, callbackName, list, viewPortInstruction.component.childRouter || router);
        }
      });
      return list;
    }
    function shouldContinue(output, router) {
      if (output instanceof Error) {
        return false;
      }
      if (isNavigationCommand(output)) {
        if (typeof output.setRouter === 'function') {
          output.setRouter(router);
        }
        return !!output.shouldContinueProcessing;
      }
      if (typeof output === 'string') {
        return affirmations.indexOf(output.toLowerCase()) !== -1;
      }
      if (typeof output === 'undefined') {
        return true;
      }
      return output;
    }
    var NavigationContext = (function() {
      function NavigationContext(router, nextInstruction) {
        _classCallCheck(this, NavigationContext);
        this.router = router;
        this.nextInstruction = nextInstruction;
        this.currentInstruction = router.currentInstruction;
        this.prevInstruction = router.currentInstruction;
      }
      NavigationContext.prototype.getAllContexts = function getAllContexts() {
        var acc = arguments[0] === undefined ? [] : arguments[0];
        acc.push(this);
        if (this.plan) {
          for (var key in this.plan) {
            this.plan[key].childNavigationContext && this.plan[key].childNavigationContext.getAllContexts(acc);
          }
        }
        return acc;
      };
      NavigationContext.prototype.commitChanges = function commitChanges(waitToSwap) {
        var next = this.nextInstruction,
            prev = this.prevInstruction,
            viewPortInstructions = next.viewPortInstructions,
            router = this.router,
            loads = [],
            delaySwaps = [];
        router.currentInstruction = next;
        if (prev) {
          prev.config.navModel.isActive = false;
        }
        next.config.navModel.isActive = true;
        router.refreshBaseUrl();
        router.refreshNavigation();
        for (var viewPortName in viewPortInstructions) {
          var viewPortInstruction = viewPortInstructions[viewPortName];
          var viewPort = router.viewPorts[viewPortName];
          if (!viewPort) {
            throw new Error('There was no router-view found in the view for ' + viewPortInstruction.moduleId + '.');
          }
          if (viewPortInstruction.strategy === activationStrategy.replace) {
            if (waitToSwap) {
              delaySwaps.push({
                viewPort: viewPort,
                viewPortInstruction: viewPortInstruction
              });
            }
            loads.push(viewPort.process(viewPortInstruction, waitToSwap).then(function(x) {
              if ('childNavigationContext' in viewPortInstruction) {
                return viewPortInstruction.childNavigationContext.commitChanges();
              }
            }));
          } else {
            if ('childNavigationContext' in viewPortInstruction) {
              loads.push(viewPortInstruction.childNavigationContext.commitChanges(waitToSwap));
            }
          }
        }
        return Promise.all(loads).then(function() {
          delaySwaps.forEach(function(x) {
            return x.viewPort.swap(x.viewPortInstruction);
          });
        });
      };
      NavigationContext.prototype.updateTitle = function updateTitle() {
        var title = this.buildTitle();
        if (title) {
          document.title = title;
        }
      };
      NavigationContext.prototype.buildTitle = function buildTitle() {
        var separator = arguments[0] === undefined ? ' | ' : arguments[0];
        var next = this.nextInstruction,
            title = next.config.navModel.title || '',
            viewPortInstructions = next.viewPortInstructions,
            childTitles = [];
        for (var viewPortName in viewPortInstructions) {
          var viewPortInstruction = viewPortInstructions[viewPortName];
          if ('childNavigationContext' in viewPortInstruction) {
            var childTitle = viewPortInstruction.childNavigationContext.buildTitle(separator);
            if (childTitle) {
              childTitles.push(childTitle);
            }
          }
        }
        if (childTitles.length) {
          title = childTitles.join(separator) + (title ? separator : '') + title;
        }
        if (this.router.title) {
          title += (title ? separator : '') + this.router.title;
        }
        return title;
      };
      _createClass(NavigationContext, [{
        key: 'nextInstructions',
        get: function get() {
          return this.getAllContexts().map(function(c) {
            return c.nextInstruction;
          }).filter(function(c) {
            return c;
          });
        }
      }, {
        key: 'currentInstructions',
        get: function get() {
          return this.getAllContexts().map(function(c) {
            return c.currentInstruction;
          }).filter(function(c) {
            return c;
          });
        }
      }, {
        key: 'prevInstructions',
        get: function get() {
          return this.getAllContexts().map(function(c) {
            return c.prevInstruction;
          }).filter(function(c) {
            return c;
          });
        }
      }]);
      return NavigationContext;
    })();
    exports.NavigationContext = NavigationContext;
    var CommitChangesStep = (function() {
      function CommitChangesStep() {
        _classCallCheck(this, CommitChangesStep);
      }
      CommitChangesStep.prototype.run = function run(navigationContext, next) {
        return navigationContext.commitChanges(true).then(function() {
          navigationContext.updateTitle();
          return next();
        });
      };
      return CommitChangesStep;
    })();
    exports.CommitChangesStep = CommitChangesStep;
    var NavigationInstruction = (function() {
      function NavigationInstruction(fragment, queryString, params, queryParams, config, parentInstruction) {
        _classCallCheck(this, NavigationInstruction);
        this.fragment = fragment;
        this.queryString = queryString;
        this.params = params || {};
        this.queryParams = queryParams;
        this.config = config;
        this.viewPortInstructions = {};
        this.parentInstruction = parentInstruction;
        var ancestorParams = [];
        var current = this;
        do {
          var currentParams = Object.assign({}, current.params);
          if (current.config.hasChildRouter) {
            delete currentParams[current.getWildCardName()];
          }
          ancestorParams.unshift(currentParams);
          current = current.parentInstruction;
        } while (current);
        var allParams = Object.assign.apply(Object, [{}, queryParams].concat(ancestorParams));
        this.lifecycleArgs = [allParams, config, this];
      }
      NavigationInstruction.prototype.addViewPortInstruction = function addViewPortInstruction(viewPortName, strategy, moduleId, component) {
        return this.viewPortInstructions[viewPortName] = {
          name: viewPortName,
          strategy: strategy,
          moduleId: moduleId,
          component: component,
          childRouter: component.childRouter,
          lifecycleArgs: this.lifecycleArgs.slice()
        };
      };
      NavigationInstruction.prototype.getWildCardName = function getWildCardName() {
        var wildcardIndex = this.config.route.lastIndexOf('*');
        return this.config.route.substr(wildcardIndex + 1);
      };
      NavigationInstruction.prototype.getWildcardPath = function getWildcardPath() {
        var wildcardName = this.getWildCardName();
        var path = this.params[wildcardName] || '';
        if (this.queryString) {
          path += '?' + this.queryString;
        }
        return path;
      };
      NavigationInstruction.prototype.getBaseUrl = function getBaseUrl() {
        if (!this.params) {
          return this.fragment;
        }
        var wildcardName = this.getWildCardName();
        var path = this.params[wildcardName] || '';
        if (!path) {
          return this.fragment;
        }
        return this.fragment.substr(0, this.fragment.lastIndexOf(path));
      };
      return NavigationInstruction;
    })();
    exports.NavigationInstruction = NavigationInstruction;
    var NavModel = (function() {
      function NavModel(router, relativeHref) {
        _classCallCheck(this, NavModel);
        this.router = router;
        this.relativeHref = relativeHref;
        this.isActive = false;
        this.title = null;
        this.href = null;
        this.settings = {};
        this.config = null;
      }
      NavModel.prototype.setTitle = function setTitle(title) {
        this.title = title;
        if (this.isActive) {
          this.router.updateTitle();
        }
      };
      return NavModel;
    })();
    exports.NavModel = NavModel;
    var RouteFilterContainer = (function() {
      function RouteFilterContainer(container) {
        _classCallCheck(this, RouteFilterContainer);
        this.container = container;
        this.filters = {};
        this.filterCache = {};
      }
      RouteFilterContainer.inject = function inject() {
        return [_aureliaDependencyInjection.Container];
      };
      RouteFilterContainer.prototype.addStep = function addStep(name, step) {
        var index = arguments[2] === undefined ? -1 : arguments[2];
        var filter = this.filters[name];
        if (!filter) {
          filter = this.filters[name] = [];
        }
        if (index === -1) {
          index = filter.length;
        }
        filter.splice(index, 0, step);
        this.filterCache = {};
      };
      RouteFilterContainer.prototype.getFilterSteps = function getFilterSteps(name) {
        if (this.filterCache[name]) {
          return this.filterCache[name];
        }
        var steps = [];
        var filter = this.filters[name];
        if (!filter) {
          return steps;
        }
        for (var i = 0,
            l = filter.length; i < l; i++) {
          if (typeof filter[i] === 'string') {
            steps.push.apply(steps, this.getFilterSteps(filter[i]));
          } else {
            steps.push(this.container.get(filter[i]));
          }
        }
        return this.filterCache[name] = steps;
      };
      return RouteFilterContainer;
    })();
    exports.RouteFilterContainer = RouteFilterContainer;
    function createRouteFilterStep(name) {
      function create(routeFilterContainer) {
        return new RouteFilterStep(name, routeFilterContainer);
      }
      ;
      create.inject = function() {
        return [RouteFilterContainer];
      };
      return create;
    }
    var RouteFilterStep = (function() {
      function RouteFilterStep(name, routeFilterContainer) {
        _classCallCheck(this, RouteFilterStep);
        this.name = name;
        this.routeFilterContainer = routeFilterContainer;
        this.isMultiStep = true;
      }
      RouteFilterStep.prototype.getSteps = function getSteps() {
        return this.routeFilterContainer.getFilterSteps(this.name);
      };
      return RouteFilterStep;
    })();
    var RouterConfiguration = (function() {
      function RouterConfiguration() {
        _classCallCheck(this, RouterConfiguration);
        this.instructions = [];
        this.options = {};
        this.pipelineSteps = [];
      }
      RouterConfiguration.prototype.addPipelineStep = function addPipelineStep(name, step) {
        this.pipelineSteps.push({
          name: name,
          step: step
        });
      };
      RouterConfiguration.prototype.map = function map(route) {
        if (Array.isArray(route)) {
          route.forEach(this.map.bind(this));
          return this;
        }
        return this.mapRoute(route);
      };
      RouterConfiguration.prototype.mapRoute = function mapRoute(config) {
        this.instructions.push(function(router) {
          var routeConfigs = [];
          if (Array.isArray(config.route)) {
            for (var i = 0,
                ii = config.route.length; i < ii; ++i) {
              var current = Object.assign({}, config);
              current.route = config.route[i];
              routeConfigs.push(current);
            }
          } else {
            routeConfigs.push(Object.assign({}, config));
          }
          var navModel = undefined;
          for (var i = 0,
              ii = routeConfigs.length; i < ii; ++i) {
            var routeConfig = routeConfigs[i];
            routeConfig.settings = routeConfig.settings || {};
            if (!navModel) {
              navModel = router.createNavModel(routeConfig);
            }
            router.addRoute(routeConfig, navModel);
          }
        });
        return this;
      };
      RouterConfiguration.prototype.mapUnknownRoutes = function mapUnknownRoutes(config) {
        this.unknownRouteConfig = config;
        return this;
      };
      RouterConfiguration.prototype.exportToRouter = function exportToRouter(router) {
        var instructions = this.instructions;
        for (var i = 0,
            ii = instructions.length; i < ii; ++i) {
          instructions[i](router);
        }
        if (this.title) {
          router.title = this.title;
        }
        if (this.unknownRouteConfig) {
          router.handleUnknownRoutes(this.unknownRouteConfig);
        }
        router.options = this.options;
        var pipelineSteps = this.pipelineSteps;
        if (pipelineSteps.length) {
          if (!router.isRoot) {
            throw new Error('Pipeline steps can only be added to the root router');
          }
          var filterContainer = router.container.get(RouteFilterContainer);
          for (var i = 0,
              ii = pipelineSteps.length; i < ii; ++i) {
            var _pipelineSteps$i = pipelineSteps[i];
            var _name = _pipelineSteps$i.name;
            var step = _pipelineSteps$i.step;
            filterContainer.addStep(_name, step);
          }
        }
      };
      return RouterConfiguration;
    })();
    exports.RouterConfiguration = RouterConfiguration;
    var Router = (function() {
      function Router(container, history) {
        _classCallCheck(this, Router);
        this.viewPorts = {};
        this.baseUrl = '';
        this.isConfigured = false;
        this.fallbackOrder = 100;
        this.recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.routes = [];
        this.isNavigating = false;
        this.navigation = [];
        this.container = container;
        this.history = history;
        this.reset();
      }
      Router.prototype.registerViewPort = function registerViewPort(viewPort, name) {
        name = name || 'default';
        this.viewPorts[name] = viewPort;
      };
      Router.prototype.refreshBaseUrl = function refreshBaseUrl() {
        if (this.parent) {
          var baseUrl = this.parent.currentInstruction.getBaseUrl();
          this.baseUrl = this.parent.baseUrl + baseUrl;
        }
      };
      Router.prototype.refreshNavigation = function refreshNavigation() {
        var nav = this.navigation;
        for (var i = 0,
            length = nav.length; i < length; i++) {
          var current = nav[i];
          current.href = createRootedPath(current.relativeHref, this.baseUrl, this.history._hasPushState);
        }
      };
      Router.prototype.configure = function configure(callbackOrConfig) {
        this.isConfigured = true;
        if (typeof callbackOrConfig == 'function') {
          var config = new RouterConfiguration();
          callbackOrConfig(config);
          config.exportToRouter(this);
        } else {
          callbackOrConfig.exportToRouter(this);
        }
        return this;
      };
      Router.prototype.navigate = function navigate(fragment, options) {
        if (!this.isConfigured && this.parent) {
          return this.parent.navigate(fragment, options);
        }
        return this.history.navigate(resolveUrl(fragment, this.baseUrl, this.history._hasPushState), options);
      };
      Router.prototype.navigateToRoute = function navigateToRoute(route, params, options) {
        var path = this.generate(route, params);
        return this.navigate(path, options);
      };
      Router.prototype.navigateBack = function navigateBack() {
        this.history.navigateBack();
      };
      Router.prototype.createChild = function createChild(container) {
        var childRouter = new Router(container || this.container.createChild(), this.history);
        childRouter.parent = this;
        return childRouter;
      };
      Router.prototype.createNavigationInstruction = function createNavigationInstruction() {
        var url = arguments[0] === undefined ? '' : arguments[0];
        var parentInstruction = arguments[1] === undefined ? null : arguments[1];
        var fragment = url;
        var queryString = '';
        var queryIndex = url.indexOf('?');
        if (queryIndex != -1) {
          fragment = url.substr(0, queryIndex);
          queryString = url.substr(queryIndex + 1);
        }
        var results = this.recognizer.recognize(url);
        if (!results || !results.length) {
          results = this.childRecognizer.recognize(url);
        }
        if ((!results || !results.length) && this.catchAllHandler) {
          results = [{
            config: {navModel: {}},
            handler: this.catchAllHandler,
            params: {path: fragment}
          }];
        }
        if (results && results.length) {
          var first = results[0];
          var instruction = new NavigationInstruction(fragment, queryString, first.params, first.queryParams || results.queryParams, first.config || first.handler, parentInstruction);
          if (typeof first.handler === 'function') {
            return evaluateNavigationStrategy(instruction, first.handler, first);
          } else if (first.handler && 'navigationStrategy' in first.handler) {
            return evaluateNavigationStrategy(instruction, first.handler.navigationStrategy, first.handler);
          }
          return Promise.resolve(instruction);
        }
        return Promise.reject(new Error('Route not found: ' + url));
      };
      Router.prototype.createNavigationContext = function createNavigationContext(instruction) {
        instruction.navigationContext = new NavigationContext(this, instruction);
        return instruction.navigationContext;
      };
      Router.prototype.generate = function generate(name, params) {
        var hasRoute = this.recognizer.hasRoute(name);
        if ((!this.isConfigured || !hasRoute) && this.parent) {
          return this.parent.generate(name, params);
        }
        if (!hasRoute) {
          throw new Error('A route with name \'' + name + '\' could not be found. Check that `name: \'' + name + '\'` was specified in the route\'s config.');
        }
        var path = this.recognizer.generate(name, params);
        return createRootedPath(path, this.baseUrl, this.history._hasPushState);
      };
      Router.prototype.createNavModel = function createNavModel(config) {
        var navModel = new NavModel(this, 'href' in config ? config.href : config.route);
        navModel.title = config.title;
        navModel.order = config.nav;
        navModel.href = config.href;
        navModel.settings = config.settings;
        navModel.config = config;
        return navModel;
      };
      Router.prototype.addRoute = function addRoute(config, navModel) {
        validateRouteConfig(config);
        if (!('viewPorts' in config) && !config.navigationStrategy) {
          config.viewPorts = {'default': {
              moduleId: config.moduleId,
              view: config.view
            }};
        }
        if (!navModel) {
          navModel = this.createNavModel(config);
        }
        this.routes.push(config);
        var path = config.route;
        if (path.charAt(0) === '/') {
          path = path.substr(1);
        }
        var state = this.recognizer.add({
          path: path,
          handler: config
        });
        if (path) {
          var withChild = undefined,
              settings = config.settings;
          delete config.settings;
          withChild = JSON.parse(JSON.stringify(config));
          config.settings = settings;
          withChild.route = path + '/*childRoute';
          withChild.hasChildRouter = true;
          this.childRecognizer.add({
            path: withChild.route,
            handler: withChild
          });
          withChild.navModel = navModel;
          withChild.settings = config.settings;
        }
        config.navModel = navModel;
        if ((navModel.order || navModel.order === 0) && this.navigation.indexOf(navModel) === -1) {
          if (!navModel.href && navModel.href != '' && (state.types.dynamics || state.types.stars)) {
            throw new Error('Invalid route config: dynamic routes must specify an href to be included in the navigation model.');
          }
          if (typeof navModel.order != 'number') {
            navModel.order = ++this.fallbackOrder;
          }
          this.navigation.push(navModel);
          this.navigation = this.navigation.sort(function(a, b) {
            return a.order - b.order;
          });
        }
      };
      Router.prototype.hasRoute = function hasRoute(name) {
        return !!(this.recognizer.hasRoute(name) || this.parent && this.parent.hasRoute(name));
      };
      Router.prototype.hasOwnRoute = function hasOwnRoute(name) {
        return this.recognizer.hasRoute(name);
      };
      Router.prototype.handleUnknownRoutes = function handleUnknownRoutes(config) {
        var callback = function callback(instruction) {
          return new Promise(function(resolve, reject) {
            function done(inst) {
              inst = inst || instruction;
              inst.config.route = inst.params.path;
              resolve(inst);
            }
            if (!config) {
              instruction.config.moduleId = instruction.fragment;
              done(instruction);
            } else if (typeof config == 'string') {
              instruction.config.moduleId = config;
              done(instruction);
            } else if (typeof config == 'function') {
              processPotential(config(instruction), done, reject);
            } else {
              instruction.config = config;
              done(instruction);
            }
          });
        };
        this.catchAllHandler = callback;
      };
      Router.prototype.updateTitle = function updateTitle() {
        if (this.parent) {
          return this.parent.updateTitle();
        }
        this.currentInstruction.navigationContext.updateTitle();
      };
      Router.prototype.reset = function reset() {
        this.fallbackOrder = 100;
        this.recognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.childRecognizer = new _aureliaRouteRecognizer.RouteRecognizer();
        this.routes = [];
        this.isNavigating = false;
        this.navigation = [];
        this.isConfigured = false;
      };
      _createClass(Router, [{
        key: 'isRoot',
        get: function get() {
          return false;
        }
      }]);
      return Router;
    })();
    exports.Router = Router;
    function validateRouteConfig(config) {
      if (typeof config !== 'object') {
        throw new Error('Invalid Route Config');
      }
      if (typeof config.route !== 'string') {
        throw new Error('Invalid Route Config: You must specify a route pattern.');
      }
      if (!('redirect' in config || config.moduleId || config.navigationStrategy || config.viewPorts)) {
        throw new Error('Invalid Route Config: You must specify a moduleId, redirect, navigationStrategy, or viewPorts.');
      }
    }
    function evaluateNavigationStrategy(instruction, evaluator, context) {
      return Promise.resolve(evaluator.call(context, instruction)).then(function() {
        if (!('viewPorts' in instruction.config)) {
          instruction.config.viewPorts = {'default': {moduleId: instruction.config.moduleId}};
        }
        return instruction;
      });
    }
    function createResult(ctx, next) {
      return {
        status: next.status,
        context: ctx,
        output: next.output,
        completed: next.status == pipelineStatus.completed
      };
    }
    var pipelineStatus = {
      completed: 'completed',
      cancelled: 'cancelled',
      rejected: 'rejected',
      running: 'running'
    };
    exports.pipelineStatus = pipelineStatus;
    var Pipeline = (function() {
      function Pipeline() {
        _classCallCheck(this, Pipeline);
        this.steps = [];
      }
      Pipeline.prototype.withStep = function withStep(step) {
        var run,
            steps,
            i,
            l;
        if (typeof step == 'function') {
          run = step;
        } else if (step.isMultiStep) {
          steps = step.getSteps();
          for (i = 0, l = steps.length; i < l; i++) {
            this.withStep(steps[i]);
          }
          return this;
        } else {
          run = step.run.bind(step);
        }
        this.steps.push(run);
        return this;
      };
      Pipeline.prototype.run = function run(ctx) {
        var index = -1,
            steps = this.steps,
            next,
            currentStep;
        next = function() {
          index++;
          if (index < steps.length) {
            currentStep = steps[index];
            try {
              return currentStep(ctx, next);
            } catch (e) {
              return next.reject(e);
            }
          } else {
            return next.complete();
          }
        };
        next.complete = function(output) {
          next.status = pipelineStatus.completed;
          next.output = output;
          return Promise.resolve(createResult(ctx, next));
        };
        next.cancel = function(reason) {
          next.status = pipelineStatus.cancelled;
          next.output = reason;
          return Promise.resolve(createResult(ctx, next));
        };
        next.reject = function(error) {
          next.status = pipelineStatus.rejected;
          next.output = error;
          return Promise.resolve(createResult(ctx, next));
        };
        next.status = pipelineStatus.running;
        return next();
      };
      return Pipeline;
    })();
    exports.Pipeline = Pipeline;
    var RouteLoader = (function() {
      function RouteLoader() {
        _classCallCheck(this, RouteLoader);
      }
      RouteLoader.prototype.loadRoute = function loadRoute(router, config) {
        throw Error('Route loaders must implement "loadRoute(router, config)".');
      };
      return RouteLoader;
    })();
    exports.RouteLoader = RouteLoader;
    var LoadRouteStep = (function() {
      function LoadRouteStep(routeLoader) {
        _classCallCheck(this, LoadRouteStep);
        this.routeLoader = routeLoader;
      }
      LoadRouteStep.inject = function inject() {
        return [RouteLoader];
      };
      LoadRouteStep.prototype.run = function run(navigationContext, next) {
        return loadNewRoute(this.routeLoader, navigationContext).then(next)['catch'](next.cancel);
      };
      return LoadRouteStep;
    })();
    exports.LoadRouteStep = LoadRouteStep;
    function loadNewRoute(routeLoader, navigationContext) {
      var toLoad = determineWhatToLoad(navigationContext);
      var loadPromises = toLoad.map(function(current) {
        return loadRoute(routeLoader, current.navigationContext, current.viewPortPlan);
      });
      return Promise.all(loadPromises);
    }
    function determineWhatToLoad(navigationContext, toLoad) {
      var plan = navigationContext.plan;
      var next = navigationContext.nextInstruction;
      toLoad = toLoad || [];
      for (var viewPortName in plan) {
        var viewPortPlan = plan[viewPortName];
        if (viewPortPlan.strategy == activationStrategy.replace) {
          toLoad.push({
            viewPortPlan: viewPortPlan,
            navigationContext: navigationContext
          });
          if (viewPortPlan.childNavigationContext) {
            determineWhatToLoad(viewPortPlan.childNavigationContext, toLoad);
          }
        } else {
          var viewPortInstruction = next.addViewPortInstruction(viewPortName, viewPortPlan.strategy, viewPortPlan.prevModuleId, viewPortPlan.prevComponent);
          if (viewPortPlan.childNavigationContext) {
            viewPortInstruction.childNavigationContext = viewPortPlan.childNavigationContext;
            determineWhatToLoad(viewPortPlan.childNavigationContext, toLoad);
          }
        }
      }
      return toLoad;
    }
    function loadRoute(routeLoader, navigationContext, viewPortPlan) {
      var moduleId = viewPortPlan.config.moduleId;
      var next = navigationContext.nextInstruction;
      return loadComponent(routeLoader, navigationContext, viewPortPlan.config).then(function(component) {
        var viewPortInstruction = next.addViewPortInstruction(viewPortPlan.name, viewPortPlan.strategy, moduleId, component);
        var controller = component.executionContext,
            childRouter = component.childRouter;
        if (childRouter) {
          var path = next.getWildcardPath();
          return childRouter.createNavigationInstruction(path, next).then(function(childInstruction) {
            var childNavigationContext = childRouter.createNavigationContext(childInstruction);
            viewPortPlan.childNavigationContext = childNavigationContext;
            return buildNavigationPlan(childNavigationContext).then(function(childPlan) {
              childNavigationContext.plan = childPlan;
              viewPortInstruction.childNavigationContext = childNavigationContext;
              return loadNewRoute(routeLoader, childNavigationContext);
            });
          });
        }
      });
    }
    function loadComponent(routeLoader, navigationContext, config) {
      var router = navigationContext.router,
          lifecycleArgs = navigationContext.nextInstruction.lifecycleArgs;
      return routeLoader.loadRoute(router, config).then(function(component) {
        component.router = router;
        component.config = config;
        if ('configureRouter' in component.executionContext) {
          var _component$executionContext;
          component.childRouter = component.childContainer.getChildRouter();
          var config = new RouterConfiguration();
          var result = Promise.resolve((_component$executionContext = component.executionContext).configureRouter.apply(_component$executionContext, [config, component.childRouter].concat(lifecycleArgs)));
          return result.then(function() {
            component.childRouter.configure(config);
            return component;
          });
        }
        return component;
      });
    }
    var PipelineProvider = (function() {
      function PipelineProvider(container) {
        _classCallCheck(this, PipelineProvider);
        this.container = container;
        this.steps = [BuildNavigationPlanStep, CanDeactivatePreviousStep, LoadRouteStep, createRouteFilterStep('authorize'), createRouteFilterStep('modelbind'), CanActivateNextStep, DeactivatePreviousStep, ActivateNextStep, createRouteFilterStep('precommit'), CommitChangesStep, createRouteFilterStep('postcomplete')];
      }
      PipelineProvider.inject = function inject() {
        return [_aureliaDependencyInjection.Container];
      };
      PipelineProvider.prototype.createPipeline = function createPipeline(navigationContext) {
        var _this = this;
        var pipeline = new Pipeline();
        this.steps.forEach(function(step) {
          return pipeline.withStep(_this.container.get(step));
        });
        return pipeline;
      };
      return PipelineProvider;
    })();
    exports.PipelineProvider = PipelineProvider;
    var logger = _aureliaLogging.getLogger('app-router');
    var AppRouter = (function(_Router) {
      function AppRouter(container, history, pipelineProvider, events) {
        _classCallCheck(this, AppRouter);
        _Router.call(this, container, history);
        this.pipelineProvider = pipelineProvider;
        document.addEventListener('click', handleLinkClick.bind(this), true);
        this.events = events;
        this.maxInstructionCount = 10;
      }
      _inherits(AppRouter, _Router);
      AppRouter.inject = function inject() {
        return [_aureliaDependencyInjection.Container, _aureliaHistory.History, PipelineProvider, _aureliaEventAggregator.EventAggregator];
      };
      AppRouter.prototype.loadUrl = function loadUrl(url) {
        var _this2 = this;
        return this.createNavigationInstruction(url).then(function(instruction) {
          return _this2.queueInstruction(instruction);
        })['catch'](function(error) {
          logger.error(error);
          restorePreviousLocation(_this2);
        });
      };
      AppRouter.prototype.queueInstruction = function queueInstruction(instruction) {
        var _this3 = this;
        return new Promise(function(resolve) {
          instruction.resolve = resolve;
          _this3.queue.unshift(instruction);
          _this3.dequeueInstruction();
        });
      };
      AppRouter.prototype.dequeueInstruction = function dequeueInstruction() {
        var _this4 = this;
        var instructionCount = arguments[0] === undefined ? 0 : arguments[0];
        return Promise.resolve().then(function() {
          if (_this4.isNavigating && !instructionCount) {
            return ;
          }
          var instruction = _this4.queue.shift();
          _this4.queue = [];
          if (!instruction) {
            return ;
          }
          _this4.isNavigating = true;
          if (!instructionCount) {
            _this4.events.publish('router:navigation:processing', {instruction: instruction});
          } else if (instructionCount === _this4.maxInstructionCount - 1) {
            logger.error(instructionCount + 1 + ' navigation instructions have been attempted without success. Restoring last known good location.');
            restorePreviousLocation(_this4);
            return _this4.dequeueInstruction(instructionCount + 1);
          } else if (instructionCount > _this4.maxInstructionCount) {
            throw new Error('Maximum navigation attempts exceeded. Giving up.');
          }
          var context = _this4.createNavigationContext(instruction);
          var pipeline = _this4.pipelineProvider.createPipeline(context);
          return pipeline.run(context).then(function(result) {
            return processResult(instruction, result, instructionCount, _this4);
          })['catch'](function(error) {
            return {output: error instanceof Error ? error : new Error(error)};
          }).then(function(result) {
            return resolveInstruction(instruction, result, !!instructionCount, _this4);
          });
        });
      };
      AppRouter.prototype.registerViewPort = function registerViewPort(viewPort, name) {
        var _this5 = this;
        _Router.prototype.registerViewPort.call(this, viewPort, name);
        if (!this.isActive) {
          var viewModel = this._findViewModel(viewPort);
          if ('configureRouter' in viewModel) {
            var config = new RouterConfiguration();
            var result = Promise.resolve(viewModel.configureRouter(config, this));
            return result.then(function() {
              _this5.configure(config);
              _this5.activate();
            });
          } else {
            this.activate();
          }
        } else {
          this.dequeueInstruction();
        }
      };
      AppRouter.prototype._findViewModel = function _findViewModel(viewPort) {
        if (this.container.viewModel) {
          return this.container.viewModel;
        }
        if (viewPort.container) {
          var _container = viewPort.container;
          while (_container) {
            if (_container.viewModel) {
              return this.container.viewModel = _container.viewModel;
            }
            _container = _container.parent;
          }
        }
      };
      AppRouter.prototype.activate = function activate(options) {
        if (this.isActive) {
          return ;
        }
        this.isActive = true;
        this.options = Object.assign({routeHandler: this.loadUrl.bind(this)}, this.options, options);
        this.history.activate(this.options);
        this.dequeueInstruction();
      };
      AppRouter.prototype.deactivate = function deactivate() {
        this.isActive = false;
        this.history.deactivate();
      };
      AppRouter.prototype.reset = function reset() {
        _Router.prototype.reset.call(this);
        this.queue = [];
        this.options = null;
      };
      _createClass(AppRouter, [{
        key: 'isRoot',
        get: function get() {
          return true;
        }
      }]);
      return AppRouter;
    })(Router);
    exports.AppRouter = AppRouter;
    function findAnchor(el) {
      while (el) {
        if (el.tagName === 'A')
          return el;
        el = el.parentNode;
      }
    }
    function handleLinkClick(evt) {
      if (!this.isActive) {
        return ;
      }
      var target = findAnchor(evt.target);
      if (!target) {
        return ;
      }
      if (this.history._hasPushState) {
        if (!evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && targetIsThisWindow(target)) {
          var href = target.getAttribute('href');
          if (href !== null && !(href.charAt(0) === '#' || /^[a-z]+:/i.test(href))) {
            evt.preventDefault();
            this.history.navigate(href);
          }
        }
      }
    }
    function targetIsThisWindow(target) {
      var targetWindow = target.getAttribute('target');
      return !targetWindow || targetWindow === window.name || targetWindow === '_self' || targetWindow === 'top' && window === window.top;
    }
    function processResult(instruction, result, instructionCount, router) {
      if (!(result && 'completed' in result && 'output' in result)) {
        resut = result || {};
        result.output = new Error('Expected router pipeline to return a navigation result, but got [' + JSON.stringify(result) + '] instead.');
      }
      var finalResult = null;
      if (isNavigationCommand(result.output)) {
        result.output.navigate(router);
      } else {
        finalResult = result;
        if (!result.completed) {
          if (result.output instanceof Error) {
            logger.error(result.output);
          }
          restorePreviousLocation(router);
        }
      }
      return router.dequeueInstruction(instructionCount + 1).then(function(innerResult) {
        return finalResult || innerResult || result;
      });
    }
    function resolveInstruction(instruction, result, isInnerInstruction, router) {
      instruction.resolve(result);
      if (!isInnerInstruction) {
        router.isNavigating = false;
        var eventArgs = {
          instruction: instruction,
          result: result
        };
        var eventName = undefined;
        if (result.output instanceof Error) {
          eventName = 'error';
        } else if (!result.completed) {
          eventName = 'canceled';
        } else {
          var _queryString = instruction.queryString ? '?' + instruction.queryString : '';
          router.history.previousLocation = instruction.fragment + _queryString;
          eventName = 'success';
        }
        router.events.publish('router:navigation:' + eventName, eventArgs);
        router.events.publish('router:navigation:complete', eventArgs);
      }
      return result;
    }
    function restorePreviousLocation(router) {
      var previousLocation = router.history.previousLocation;
      if (previousLocation) {
        router.navigate(router.history.previousLocation, {
          trigger: false,
          replace: true
        });
      } else {
        logger.error('Router navigation failed, and no previous location could be restored.');
      }
    }
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/route-recognizer@0.6.1'), __require('github:aurelia/path@0.8.1'), __require('github:aurelia/history@0.6.1'), __require('github:aurelia/event-aggregator@0.6.2'), __require('github:aurelia/logging@0.6.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/router@0.10.4", ["github:aurelia/router@0.10.4/aurelia-router"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/router@0.10.4/aurelia-router'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-router@0.14.1/aurelia-templating-router", ["github:aurelia/router@0.10.4", "github:aurelia/templating-router@0.14.1/route-loader", "github:aurelia/templating-router@0.14.1/router-view", "github:aurelia/templating-router@0.14.1/route-href"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaRouter, _routeLoader, _routerView, _routeHref) {
    'use strict';
    exports.__esModule = true;
    function configure(aurelia) {
      aurelia.withSingleton(_aureliaRouter.RouteLoader, _routeLoader.TemplatingRouteLoader).withSingleton(_aureliaRouter.Router, _aureliaRouter.AppRouter).globalizeResources('./router-view', './route-href');
    }
    exports.TemplatingRouteLoader = _routeLoader.TemplatingRouteLoader;
    exports.RouterView = _routerView.RouterView;
    exports.RouteHref = _routeHref.RouteHref;
    exports.configure = configure;
  }).call(__exports, __exports, __require('github:aurelia/router@0.10.4'), __require('github:aurelia/templating-router@0.14.1/route-loader'), __require('github:aurelia/templating-router@0.14.1/router-view'), __require('github:aurelia/templating-router@0.14.1/route-href'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-router@0.14.1", ["github:aurelia/templating-router@0.14.1/aurelia-templating-router"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/templating-router@0.14.1/aurelia-templating-router'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/if", ["github:aurelia/templating@0.13.16", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/task-queue@0.6.1"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaTaskQueue) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var If = (function() {
      function If(viewFactory, viewSlot, taskQueue) {
        _classCallCheck(this, _If);
        this.viewFactory = viewFactory;
        this.viewSlot = viewSlot;
        this.showing = false;
        this.taskQueue = taskQueue;
      }
      var _If = If;
      _If.prototype.bind = function bind(executionContext) {
        this.$parent = executionContext;
        this.valueChanged(this.value);
      };
      _If.prototype.valueChanged = function valueChanged(newValue) {
        var _this = this;
        if (!newValue) {
          if (this.view && this.showing) {
            this.taskQueue.queueMicroTask(function() {
              _this.viewSlot.remove(_this.view);
              _this.view.unbind();
            });
          }
          this.showing = false;
          return ;
        }
        if (!this.view) {
          this.view = this.viewFactory.create(this.$parent);
        }
        if (!this.showing) {
          this.showing = true;
          if (!this.view.isBound) {
            this.view.bind();
          }
          this.viewSlot.add(this.view);
        }
      };
      If = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot, _aureliaTaskQueue.TaskQueue)(If) || If;
      If = _aureliaTemplating.templateController(If) || If;
      If = _aureliaTemplating.customAttribute('if')(If) || If;
      return If;
    })();
    exports.If = If;
  }).call(__exports, __exports, __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/task-queue@0.6.1'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/with", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/templating@0.13.16"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var With = (function() {
      function With(viewFactory, viewSlot) {
        _classCallCheck(this, _With);
        this.viewFactory = viewFactory;
        this.viewSlot = viewSlot;
      }
      var _With = With;
      _With.prototype.valueChanged = function valueChanged(newValue) {
        if (!this.view) {
          this.view = this.viewFactory.create(newValue);
          this.viewSlot.add(this.view);
        } else {
          this.view.bind(newValue);
        }
      };
      With = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot)(With) || With;
      With = _aureliaTemplating.templateController(With) || With;
      With = _aureliaTemplating.customAttribute('with')(With) || With;
      return With;
    })();
    exports.With = With;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/templating@0.13.16'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/repeat", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/binding@0.8.5", "github:aurelia/templating@0.13.16"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    var _createDecoratedClass = (function() {
      function defineProperties(target, descriptors, initializers) {
        for (var i = 0; i < descriptors.length; i++) {
          var descriptor = descriptors[i];
          var decorators = descriptor.decorators;
          var key = descriptor.key;
          delete descriptor.key;
          delete descriptor.decorators;
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor || descriptor.initializer)
            descriptor.writable = true;
          if (decorators) {
            for (var f = 0; f < decorators.length; f++) {
              var decorator = decorators[f];
              if (typeof decorator === 'function') {
                descriptor = decorator(target, key, descriptor) || descriptor;
              } else {
                throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
              }
            }
            if (descriptor.initializer !== undefined) {
              initializers[key] = descriptor;
              continue;
            }
          }
          Object.defineProperty(target, key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps, protoInitializers);
        if (staticProps)
          defineProperties(Constructor, staticProps, staticInitializers);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
      var _descriptor = descriptors[key];
      if (!_descriptor)
        return ;
      var descriptor = {};
      for (var _key in _descriptor)
        descriptor[_key] = _descriptor[_key];
      descriptor.value = descriptor.initializer.call(target);
      Object.defineProperty(target, key, descriptor);
    }
    var Repeat = (function() {
      var _instanceInitializers = {};
      function Repeat(viewFactory, viewSlot, observerLocator) {
        _classCallCheck(this, _Repeat);
        _defineDecoratedPropertyDescriptor(this, 'items', _instanceInitializers);
        _defineDecoratedPropertyDescriptor(this, 'local', _instanceInitializers);
        _defineDecoratedPropertyDescriptor(this, 'key', _instanceInitializers);
        _defineDecoratedPropertyDescriptor(this, 'value', _instanceInitializers);
        this.viewFactory = viewFactory;
        this.viewSlot = viewSlot;
        this.observerLocator = observerLocator;
        this.local = 'item';
        this.key = 'key';
        this.value = 'value';
      }
      var _Repeat = Repeat;
      _Repeat.prototype.bind = function bind(executionContext) {
        var _this = this;
        var items = this.items,
            observer;
        this.executionContext = executionContext;
        if (!items) {
          if (this.oldItems) {
            this.removeAll();
          }
          return ;
        }
        if (this.oldItems === items) {
          if (items instanceof Map) {
            var records = _aureliaBinding.getChangeRecords(items);
            observer = this.observerLocator.getMapObserver(items);
            this.handleMapChangeRecords(items, records);
            this.disposeSubscription = observer.subscribe(function(records) {
              _this.handleMapChangeRecords(items, records);
            });
          } else {
            var splices = _aureliaBinding.calcSplices(items, 0, items.length, this.lastBoundItems, 0, this.lastBoundItems.length);
            observer = this.observerLocator.getArrayObserver(items);
            this.handleSplices(items, splices);
            this.lastBoundItems = this.oldItems = null;
            this.disposeSubscription = observer.subscribe(function(splices) {
              _this.handleSplices(items, splices);
            });
            return ;
          }
        } else if (this.oldItems) {
          this.removeAll();
        }
        this.processItems();
      };
      _Repeat.prototype.unbind = function unbind() {
        this.oldItems = this.items;
        if (this.items instanceof Array) {
          this.lastBoundItems = this.items.slice(0);
        }
        if (this.disposeSubscription) {
          this.disposeSubscription();
          this.disposeSubscription = null;
        }
      };
      _Repeat.prototype.itemsChanged = function itemsChanged() {
        this.processItems();
      };
      _Repeat.prototype.processItems = function processItems() {
        var items = this.items;
        if (this.disposeSubscription) {
          this.disposeSubscription();
          this.removeAll();
        }
        if (!items && items !== 0) {
          return ;
        }
        if (items instanceof Array) {
          this.processArrayItems(items);
        } else if (items instanceof Map) {
          this.processMapEntries(items);
        } else if (typeof items === 'number') {
          this.processNumber(items);
        } else {
          throw new Error('Object in "repeat" must be of type Array, Map or Number');
        }
      };
      _Repeat.prototype.processArrayItems = function processArrayItems(items) {
        var _this2 = this;
        var viewFactory = this.viewFactory,
            viewSlot = this.viewSlot,
            i,
            ii,
            row,
            view,
            observer;
        observer = this.observerLocator.getArrayObserver(items);
        for (i = 0, ii = items.length; i < ii; ++i) {
          row = this.createFullExecutionContext(items[i], i, ii);
          view = viewFactory.create(row);
          viewSlot.add(view);
        }
        this.disposeSubscription = observer.subscribe(function(splices) {
          _this2.handleSplices(items, splices);
        });
      };
      _Repeat.prototype.processMapEntries = function processMapEntries(items) {
        var _this3 = this;
        var viewFactory = this.viewFactory,
            viewSlot = this.viewSlot,
            index = 0,
            row,
            view,
            observer;
        observer = this.observerLocator.getMapObserver(items);
        items.forEach(function(value, key) {
          row = _this3.createFullExecutionKvpContext(key, value, index, items.size);
          view = viewFactory.create(row);
          viewSlot.add(view);
          ++index;
        });
        this.disposeSubscription = observer.subscribe(function(record) {
          _this3.handleMapChangeRecords(items, record);
        });
      };
      _Repeat.prototype.processNumber = function processNumber(value) {
        var viewFactory = this.viewFactory,
            viewSlot = this.viewSlot,
            childrenLength = viewSlot.children.length,
            i,
            ii,
            row,
            view,
            viewsToRemove;
        value = Math.floor(value);
        viewsToRemove = childrenLength - value;
        if (viewsToRemove > 0) {
          if (viewsToRemove > childrenLength) {
            viewsToRemove = childrenLength;
          }
          for (i = 0, ii = viewsToRemove; i < ii; ++i) {
            viewSlot.removeAt(childrenLength - (i + 1));
          }
          return ;
        }
        for (i = childrenLength, ii = value; i < ii; ++i) {
          row = this.createFullExecutionContext(i, i, ii);
          view = viewFactory.create(row);
          viewSlot.add(view);
        }
      };
      _Repeat.prototype.createBaseExecutionContext = function createBaseExecutionContext(data) {
        var context = {};
        context[this.local] = data;
        context.$parent = this.executionContext;
        return context;
      };
      _Repeat.prototype.createBaseExecutionKvpContext = function createBaseExecutionKvpContext(key, value) {
        var context = {};
        context[this.key] = key;
        context[this.value] = value;
        context.$parent = this.executionContext;
        return context;
      };
      _Repeat.prototype.createFullExecutionContext = function createFullExecutionContext(data, index, length) {
        var context = this.createBaseExecutionContext(data);
        return this.updateExecutionContext(context, index, length);
      };
      _Repeat.prototype.createFullExecutionKvpContext = function createFullExecutionKvpContext(key, value, index, length) {
        var context = this.createBaseExecutionKvpContext(key, value);
        return this.updateExecutionContext(context, index, length);
      };
      _Repeat.prototype.updateExecutionContext = function updateExecutionContext(context, index, length) {
        var first = index === 0,
            last = index === length - 1,
            even = index % 2 === 0;
        context.$index = index;
        context.$first = first;
        context.$last = last;
        context.$middle = !(first || last);
        context.$odd = !even;
        context.$even = even;
        return context;
      };
      _Repeat.prototype.handleSplices = function handleSplices(array, splices) {
        var viewLookup = new Map(),
            viewSlot = this.viewSlot,
            spliceIndexLow,
            viewOrPromise,
            view,
            i,
            ii,
            j,
            jj,
            row,
            splice,
            addIndex,
            end,
            itemsLeftToAdd,
            removed,
            model,
            children,
            length,
            context,
            spliceIndex;
        for (i = 0, ii = splices.length; i < ii; ++i) {
          splice = splices[i];
          addIndex = spliceIndex = splice.index;
          itemsLeftToAdd = splice.addedCount;
          end = splice.index + splice.addedCount;
          removed = splice.removed;
          if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
            spliceIndexLow = spliceIndex;
          }
          for (j = 0, jj = removed.length; j < jj; ++j) {
            if (itemsLeftToAdd > 0) {
              view = viewSlot.children[spliceIndex + j];
              view.detached();
              context = this.createFullExecutionContext(array[addIndex + j], spliceIndex + j, array.length);
              view.bind(context);
              view.attached();
              --itemsLeftToAdd;
            } else {
              viewOrPromise = viewSlot.removeAt(addIndex + splice.addedCount);
              if (viewOrPromise) {
                viewLookup.set(removed[j], viewOrPromise);
              }
            }
          }
          addIndex += removed.length;
          for (; 0 < itemsLeftToAdd; ++addIndex) {
            model = array[addIndex];
            viewOrPromise = viewLookup.get(model);
            if (viewOrPromise instanceof Promise) {
              (function(localAddIndex, localModel) {
                viewOrPromise.then(function(view) {
                  viewLookup['delete'](localModel);
                  viewSlot.insert(localAddIndex, view);
                });
              })(addIndex, model);
            } else if (viewOrPromise) {
              viewLookup['delete'](model);
              viewSlot.insert(addIndex, viewOrPromise);
            } else {
              row = this.createBaseExecutionContext(model);
              view = this.viewFactory.create(row);
              viewSlot.insert(addIndex, view);
            }
            --itemsLeftToAdd;
          }
        }
        children = this.viewSlot.children;
        length = children.length;
        if (spliceIndexLow > 0) {
          spliceIndexLow = spliceIndexLow - 1;
        }
        for (; spliceIndexLow < length; ++spliceIndexLow) {
          this.updateExecutionContext(children[spliceIndexLow].executionContext, spliceIndexLow, length);
        }
        viewLookup.forEach(function(x) {
          if (x instanceof Promise) {
            x.then(function(y) {
              return y.unbind();
            });
          } else {
            x.unbind();
          }
        });
      };
      _Repeat.prototype.handleMapChangeRecords = function handleMapChangeRecords(map, records) {
        var viewSlot = this.viewSlot,
            key,
            i,
            ii,
            view,
            children,
            length,
            row,
            removeIndex,
            record;
        for (i = 0, ii = records.length; i < ii; ++i) {
          record = records[i];
          key = record.key;
          switch (record.type) {
            case 'update':
              removeIndex = this.getViewIndexByKey(key);
              viewSlot.removeAt(removeIndex);
              row = this.createBaseExecutionKvpContext(key, map.get(key));
              view = this.viewFactory.create(row);
              viewSlot.insert(removeIndex, view);
              break;
            case 'add':
              row = this.createBaseExecutionKvpContext(key, map.get(key));
              view = this.viewFactory.create(row);
              viewSlot.insert(map.size, view);
              break;
            case 'delete':
              if (!record.oldValue) {
                return ;
              }
              removeIndex = this.getViewIndexByKey(key);
              viewSlot.removeAt(removeIndex);
              break;
            case 'clear':
              viewSlot.removeAll();
          }
        }
        children = viewSlot.children;
        length = children.length;
        for (i = 0; i < length; i++) {
          this.updateExecutionContext(children[i].executionContext, i, length);
        }
      };
      _Repeat.prototype.getViewIndexByKey = function getViewIndexByKey(key) {
        var viewSlot = this.viewSlot,
            i,
            ii,
            child;
        for (i = 0, ii = viewSlot.children.length; i < ii; ++i) {
          child = viewSlot.children[i];
          if (child.bindings[0].source[this.key] === key) {
            return i;
          }
        }
      };
      _Repeat.prototype.removeAll = function removeAll() {
        var viewSlot = this.viewSlot,
            views,
            i;
        views = viewSlot.children;
        viewSlot.removeAll();
        i = views.length;
        while (i--) {
          views[i].unbind();
        }
      };
      _createDecoratedClass(_Repeat, [{
        key: 'items',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }, {
        key: 'local',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }, {
        key: 'key',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }, {
        key: 'value',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }], null, _instanceInitializers);
      Repeat = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot, _aureliaBinding.ObserverLocator)(Repeat) || Repeat;
      Repeat = _aureliaTemplating.templateController(Repeat) || Repeat;
      Repeat = _aureliaTemplating.customAttribute('repeat')(Repeat) || Repeat;
      return Repeat;
    })();
    exports.Repeat = Repeat;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/binding@0.8.5'), __require('github:aurelia/templating@0.13.16'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/show", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/templating@0.13.16"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function addStyleString(str) {
      var node = document.createElement('style');
      node.innerHTML = str;
      node.type = 'text/css';
      document.head.appendChild(node);
    }
    if (!!HTMLElement.prototype.createShadowRoot) {
      addStyleString('body /deep/ .aurelia-hide { display:none !important; }');
    } else {
      addStyleString('.aurelia-hide { display:none !important; }');
    }
    var Show = (function() {
      function Show(element) {
        _classCallCheck(this, _Show);
        this.element = element;
      }
      var _Show = Show;
      _Show.prototype.valueChanged = function valueChanged(newValue) {
        if (newValue) {
          this.element.classList.remove('aurelia-hide');
        } else {
          this.element.classList.add('aurelia-hide');
        }
      };
      _Show.prototype.bind = function bind(executionContext) {
        this.valueChanged(this.value);
      };
      Show = _aureliaDependencyInjection.inject(Element)(Show) || Show;
      Show = _aureliaTemplating.customAttribute('show')(Show) || Show;
      return Show;
    })();
    exports.Show = Show;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/templating@0.13.16'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/global-behavior", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/templating@0.13.16", "github:aurelia/logging@0.6.2"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var GlobalBehavior = (function() {
      function GlobalBehavior(element) {
        _classCallCheck(this, _GlobalBehavior);
        this.element = element;
      }
      var _GlobalBehavior = GlobalBehavior;
      _GlobalBehavior.prototype.bind = function bind() {
        var handler = GlobalBehavior.handlers[this.aureliaAttrName];
        if (!handler) {
          throw new Error('Binding handler not found for \'' + this.aureliaAttrName + '.' + this.aureliaCommand + '\'. Element:\n' + this.element.outerHTML + '\n');
        }
        try {
          this.handler = handler.bind(this, this.element, this.aureliaCommand) || handler;
        } catch (error) {
          throw _aureliaLogging.AggregateError('Conventional binding handler failed.', error);
        }
      };
      _GlobalBehavior.prototype.attached = function attached() {
        if (this.handler && 'attached' in this.handler) {
          this.handler.attached(this, this.element);
        }
      };
      _GlobalBehavior.prototype.detached = function detached() {
        if (this.handler && 'detached' in this.handler) {
          this.handler.detached(this, this.element);
        }
      };
      _GlobalBehavior.prototype.unbind = function unbind() {
        if (this.handler && 'unbind' in this.handler) {
          this.handler.unbind(this, this.element);
        }
        this.handler = null;
      };
      GlobalBehavior = _aureliaDependencyInjection.inject(Element)(GlobalBehavior) || GlobalBehavior;
      GlobalBehavior = _aureliaTemplating.dynamicOptions(GlobalBehavior) || GlobalBehavior;
      GlobalBehavior = _aureliaTemplating.customAttribute('global-behavior')(GlobalBehavior) || GlobalBehavior;
      return GlobalBehavior;
    })();
    exports.GlobalBehavior = GlobalBehavior;
    GlobalBehavior.createSettingsFromBehavior = function(behavior) {
      var settings = {};
      for (var key in behavior) {
        if (key === 'aureliaAttrName' || key === 'aureliaCommand' || !behavior.hasOwnProperty(key)) {
          continue;
        }
        settings[key] = behavior[key];
      }
      return settings;
    };
    GlobalBehavior.jQueryPlugins = {};
    GlobalBehavior.handlers = {jquery: {
        bind: function bind(behavior, element, command) {
          var settings = GlobalBehavior.createSettingsFromBehavior(behavior);
          var pluginName = GlobalBehavior.jQueryPlugins[command] || command;
          var jqueryElement = window.jQuery(element);
          if (!jqueryElement[pluginName]) {
            _aureliaLogging.getLogger('templating-resources').warn('Could not find the jQuery plugin ' + pluginName + ', possibly due to case mismatch. Trying to enumerate jQuery methods in lowercase. Add the correctly cased plugin name to the GlobalBehavior to avoid this performance hit.');
            for (var prop in jqueryElement) {
              if (prop.toLowerCase() === pluginName) {
                pluginName = prop;
              }
            }
          }
          behavior.plugin = jqueryElement[pluginName](settings);
        },
        unbind: function unbind(behavior, element) {
          if (typeof behavior.plugin.destroy === 'function') {
            behavior.plugin.destroy();
            behavior.plugin = null;
          }
        }
      }};
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/logging@0.6.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/sanitize-html", ["github:aurelia/binding@0.8.5"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaBinding) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    var SanitizeHtmlValueConverter = (function() {
      function SanitizeHtmlValueConverter() {
        _classCallCheck(this, _SanitizeHtmlValueConverter);
        this.sanitizer = SanitizeHtmlValueConverter.defaultSanitizer;
      }
      var _SanitizeHtmlValueConverter = SanitizeHtmlValueConverter;
      _SanitizeHtmlValueConverter.defaultSanitizer = function defaultSanitizer(untrustedMarkup) {
        return untrustedMarkup.replace(SCRIPT_REGEX, '');
      };
      _SanitizeHtmlValueConverter.prototype.toView = function toView(untrustedMarkup) {
        if (untrustedMarkup === null) {
          return null;
        }
        return this.sanitizer(untrustedMarkup);
      };
      SanitizeHtmlValueConverter = _aureliaBinding.valueConverter('sanitizeHtml')(SanitizeHtmlValueConverter) || SanitizeHtmlValueConverter;
      return SanitizeHtmlValueConverter;
    })();
    exports.SanitizeHtmlValueConverter = SanitizeHtmlValueConverter;
  }).call(__exports, __exports, __require('github:aurelia/binding@0.8.5'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/replaceable", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/templating@0.13.16"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Replaceable = (function() {
      function Replaceable(viewFactory, viewSlot) {
        _classCallCheck(this, _Replaceable);
        viewSlot.add(viewFactory.create());
      }
      var _Replaceable = Replaceable;
      Replaceable = _aureliaDependencyInjection.inject(_aureliaTemplating.BoundViewFactory, _aureliaTemplating.ViewSlot)(Replaceable) || Replaceable;
      Replaceable = _aureliaTemplating.templateController(Replaceable) || Replaceable;
      Replaceable = _aureliaTemplating.customAttribute('replaceable')(Replaceable) || Replaceable;
      return Replaceable;
    })();
    exports.Replaceable = Replaceable;
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/templating@0.13.16'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/focus", ["github:aurelia/templating@0.13.16", "github:aurelia/binding@0.8.5", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/task-queue@0.6.1"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaTemplating, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var Focus = (function() {
      function Focus(element, taskQueue) {
        var _this = this;
        _classCallCheck(this, _Focus);
        this.element = element;
        this.taskQueue = taskQueue;
        this.focusListener = function(e) {
          _this.value = true;
        };
        this.blurListener = function(e) {
          if (document.activeElement !== _this.element) {
            _this.value = false;
          }
        };
      }
      var _Focus = Focus;
      _Focus.prototype.valueChanged = function valueChanged(newValue) {
        if (newValue) {
          this.giveFocus();
        } else {
          this.element.blur();
        }
      };
      _Focus.prototype.giveFocus = function giveFocus() {
        var _this2 = this;
        this.taskQueue.queueMicroTask(function() {
          if (_this2.value) {
            _this2.element.focus();
          }
        });
      };
      _Focus.prototype.attached = function attached() {
        this.element.addEventListener('focus', this.focusListener);
        this.element.addEventListener('blur', this.blurListener);
      };
      _Focus.prototype.detached = function detached() {
        this.element.removeEventListener('focus', this.focusListener);
        this.element.removeEventListener('blur', this.blurListener);
      };
      Focus = _aureliaDependencyInjection.inject(Element, _aureliaTaskQueue.TaskQueue)(Focus) || Focus;
      Focus = _aureliaTemplating.customAttribute('focus', _aureliaBinding.bindingMode.twoWay)(Focus) || Focus;
      return Focus;
    })();
    exports.Focus = Focus;
  }).call(__exports, __exports, __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/binding@0.8.5'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/task-queue@0.6.1'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/compose", ["github:aurelia/dependency-injection@0.9.1", "github:aurelia/task-queue@0.6.1", "github:aurelia/templating@0.13.16"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaDependencyInjection, _aureliaTaskQueue, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    var _createDecoratedClass = (function() {
      function defineProperties(target, descriptors, initializers) {
        for (var i = 0; i < descriptors.length; i++) {
          var descriptor = descriptors[i];
          var decorators = descriptor.decorators;
          var key = descriptor.key;
          delete descriptor.key;
          delete descriptor.decorators;
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor || descriptor.initializer)
            descriptor.writable = true;
          if (decorators) {
            for (var f = 0; f < decorators.length; f++) {
              var decorator = decorators[f];
              if (typeof decorator === 'function') {
                descriptor = decorator(target, key, descriptor) || descriptor;
              } else {
                throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
              }
            }
            if (descriptor.initializer !== undefined) {
              initializers[key] = descriptor;
              continue;
            }
          }
          Object.defineProperty(target, key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps, protoInitializers);
        if (staticProps)
          defineProperties(Constructor, staticProps, staticInitializers);
        return Constructor;
      };
    })();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
      var _descriptor = descriptors[key];
      if (!_descriptor)
        return ;
      var descriptor = {};
      for (var _key in _descriptor)
        descriptor[_key] = _descriptor[_key];
      descriptor.value = descriptor.initializer.call(target);
      Object.defineProperty(target, key, descriptor);
    }
    var Compose = (function() {
      var _instanceInitializers = {};
      function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
        _classCallCheck(this, _Compose);
        _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);
        _defineDecoratedPropertyDescriptor(this, 'view', _instanceInitializers);
        _defineDecoratedPropertyDescriptor(this, 'viewModel', _instanceInitializers);
        this.element = element;
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.viewSlot = viewSlot;
        this.viewResources = viewResources;
        this.taskQueue = taskQueue;
      }
      var _Compose = Compose;
      _Compose.prototype.bind = function bind(executionContext) {
        this.executionContext = executionContext;
        processInstruction(this, createInstruction(this, {
          view: this.view,
          viewModel: this.viewModel,
          model: this.model
        }));
      };
      _Compose.prototype.modelChanged = function modelChanged(newValue, oldValue) {
        var _this = this;
        if (this.currentInstruction) {
          this.currentInstruction.model = newValue;
          return ;
        }
        this.taskQueue.queueMicroTask(function() {
          if (_this.currentInstruction) {
            _this.currentInstruction.model = newValue;
            return ;
          }
          var vm = _this.currentViewModel;
          if (vm && typeof vm.activate === 'function') {
            vm.activate(newValue);
          }
        });
      };
      _Compose.prototype.viewChanged = function viewChanged(newValue, oldValue) {
        var _this2 = this;
        var instruction = createInstruction(this, {
          view: newValue,
          viewModel: this.currentViewModel || this.viewModel,
          model: this.model
        });
        if (this.currentInstruction) {
          this.currentInstruction = instruction;
          return ;
        }
        this.currentInstruction = instruction;
        this.taskQueue.queueMicroTask(function() {
          return processInstruction(_this2, _this2.currentInstruction);
        });
      };
      _Compose.prototype.viewModelChanged = function viewModelChanged(newValue, oldValue) {
        var _this3 = this;
        var instruction = createInstruction(this, {
          viewModel: newValue,
          view: this.view,
          model: this.model
        });
        if (this.currentInstruction) {
          this.currentInstruction = instruction;
          return ;
        }
        this.currentInstruction = instruction;
        this.taskQueue.queueMicroTask(function() {
          return processInstruction(_this3, _this3.currentInstruction);
        });
      };
      _createDecoratedClass(_Compose, [{
        key: 'model',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }, {
        key: 'view',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }, {
        key: 'viewModel',
        decorators: [_aureliaTemplating.bindable],
        initializer: null,
        enumerable: true
      }], null, _instanceInitializers);
      Compose = _aureliaDependencyInjection.inject(Element, _aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine, _aureliaTemplating.ViewSlot, _aureliaTemplating.ViewResources, _aureliaTaskQueue.TaskQueue)(Compose) || Compose;
      Compose = _aureliaTemplating.noView(Compose) || Compose;
      Compose = _aureliaTemplating.customElement('compose')(Compose) || Compose;
      return Compose;
    })();
    exports.Compose = Compose;
    function createInstruction(composer, instruction) {
      return Object.assign(instruction, {
        executionContext: composer.executionContext,
        container: composer.container,
        viewSlot: composer.viewSlot,
        viewResources: composer.viewResources,
        currentBehavior: composer.currentBehavior,
        host: composer.element
      });
    }
    function processInstruction(composer, instruction) {
      composer.currentInstruction = null;
      composer.compositionEngine.compose(instruction).then(function(next) {
        composer.currentBehavior = next;
        composer.currentViewModel = next ? next.executionContext : null;
      });
    }
  }).call(__exports, __exports, __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/task-queue@0.6.1'), __require('github:aurelia/templating@0.13.16'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4/aurelia-templating-resources", ["github:aurelia/templating-resources@0.13.4/compose", "github:aurelia/templating-resources@0.13.4/if", "github:aurelia/templating-resources@0.13.4/with", "github:aurelia/templating-resources@0.13.4/repeat", "github:aurelia/templating-resources@0.13.4/show", "github:aurelia/templating-resources@0.13.4/global-behavior", "github:aurelia/templating-resources@0.13.4/sanitize-html", "github:aurelia/templating-resources@0.13.4/replaceable", "github:aurelia/templating-resources@0.13.4/focus"], false, function(__require, __exports, __module) {
  return (function(exports, _compose, _if, _with, _repeat, _show, _globalBehavior, _sanitizeHtml, _replaceable, _focus) {
    'use strict';
    exports.__esModule = true;
    function configure(aurelia) {
      aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './replaceable', './global-behavior', './sanitize-html', './focus');
    }
    exports.Compose = _compose.Compose;
    exports.If = _if.If;
    exports.With = _with.With;
    exports.Repeat = _repeat.Repeat;
    exports.Show = _show.Show;
    exports.SanitizeHtmlValueConverter = _sanitizeHtml.SanitizeHtmlValueConverter;
    exports.GlobalBehavior = _globalBehavior.GlobalBehavior;
    exports.Replaceable = _replaceable.Replaceable;
    exports.Focus = _focus.Focus;
    exports.configure = configure;
  }).call(__exports, __exports, __require('github:aurelia/templating-resources@0.13.4/compose'), __require('github:aurelia/templating-resources@0.13.4/if'), __require('github:aurelia/templating-resources@0.13.4/with'), __require('github:aurelia/templating-resources@0.13.4/repeat'), __require('github:aurelia/templating-resources@0.13.4/show'), __require('github:aurelia/templating-resources@0.13.4/global-behavior'), __require('github:aurelia/templating-resources@0.13.4/sanitize-html'), __require('github:aurelia/templating-resources@0.13.4/replaceable'), __require('github:aurelia/templating-resources@0.13.4/focus'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-resources@0.13.4", ["github:aurelia/templating-resources@0.13.4/aurelia-templating-resources"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/templating-resources@0.13.4/aurelia-templating-resources'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-binding@0.13.2/aurelia-templating-binding", ["github:aurelia/binding@0.8.5", "github:aurelia/templating@0.13.16", "github:aurelia/logging@0.6.2"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaBinding, _aureliaTemplating, _aureliaLogging) {
    'use strict';
    exports.__esModule = true;
    exports.configure = configure;
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var SyntaxInterpreter = (function() {
      function SyntaxInterpreter(parser, observerLocator, eventManager) {
        _classCallCheck(this, SyntaxInterpreter);
        this.parser = parser;
        this.observerLocator = observerLocator;
        this.eventManager = eventManager;
      }
      SyntaxInterpreter.inject = function inject() {
        return [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, _aureliaBinding.EventManager];
      };
      SyntaxInterpreter.prototype.interpret = function interpret(resources, element, info, existingInstruction) {
        if (info.command in this) {
          return this[info.command](resources, element, info, existingInstruction);
        }
        return this.handleUnknownCommand(resources, element, info, existingInstruction);
      };
      SyntaxInterpreter.prototype.handleUnknownCommand = function handleUnknownCommand(resources, element, info, existingInstruction) {
        var attrName = info.attrName,
            command = info.command;
        var instruction = this.options(resources, element, info, existingInstruction);
        instruction.alteredAttr = true;
        instruction.attrName = 'global-behavior';
        instruction.attributes.aureliaAttrName = attrName;
        instruction.attributes.aureliaCommand = command;
        return instruction;
      };
      SyntaxInterpreter.prototype.determineDefaultBindingMode = function determineDefaultBindingMode(element, attrName) {
        var tagName = element.tagName.toLowerCase();
        if (tagName === 'input') {
          return attrName === 'value' || attrName === 'checked' || attrName === 'files' ? _aureliaBinding.bindingMode.twoWay : _aureliaBinding.bindingMode.oneWay;
        } else if (tagName == 'textarea' || tagName == 'select') {
          return attrName == 'value' ? _aureliaBinding.bindingMode.twoWay : _aureliaBinding.bindingMode.oneWay;
        } else if (attrName === 'textcontent' || attrName === 'innerhtml') {
          return element.contentEditable === 'true' ? _aureliaBinding.bindingMode.twoWay : _aureliaBinding.bindingMode.oneWay;
        } else if (attrName === 'scrolltop' || attrName === 'scrollleft') {
          return _aureliaBinding.bindingMode.twoWay;
        }
        return _aureliaBinding.bindingMode.oneWay;
      };
      SyntaxInterpreter.prototype.bind = function bind(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || {
          attrName: info.attrName,
          attributes: {}
        };
        instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), info.defaultBindingMode || this.determineDefaultBindingMode(element, info.attrName), resources.valueConverterLookupFunction);
        return instruction;
      };
      SyntaxInterpreter.prototype.trigger = function trigger(resources, element, info) {
        return new _aureliaBinding.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), false, true);
      };
      SyntaxInterpreter.prototype.delegate = function delegate(resources, element, info) {
        return new _aureliaBinding.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), true, true);
      };
      SyntaxInterpreter.prototype.call = function call(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || {
          attrName: info.attrName,
          attributes: {}
        };
        instruction.attributes[info.attrName] = new _aureliaBinding.CallExpression(this.observerLocator, info.attrName, this.parser.parse(info.attrValue), resources.valueConverterLookupFunction);
        return instruction;
      };
      SyntaxInterpreter.prototype.options = function options(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || {
          attrName: info.attrName,
          attributes: {}
        },
            attrValue = info.attrValue,
            language = this.language,
            name = null,
            target = '',
            current,
            i,
            ii;
        for (i = 0, ii = attrValue.length; i < ii; ++i) {
          current = attrValue[i];
          if (current === ';') {
            info = language.inspectAttribute(resources, name, target.trim());
            language.createAttributeInstruction(resources, element, info, instruction);
            if (!instruction.attributes[info.attrName]) {
              instruction.attributes[info.attrName] = info.attrValue;
            }
            target = '';
            name = null;
          } else if (current === ':' && name === null) {
            name = target.trim();
            target = '';
          } else {
            target += current;
          }
        }
        if (name !== null) {
          info = language.inspectAttribute(resources, name, target.trim());
          language.createAttributeInstruction(resources, element, info, instruction);
          if (!instruction.attributes[info.attrName]) {
            instruction.attributes[info.attrName] = info.attrValue;
          }
        }
        return instruction;
      };
      return SyntaxInterpreter;
    })();
    exports.SyntaxInterpreter = SyntaxInterpreter;
    SyntaxInterpreter.prototype['for'] = function(resources, element, info, existingInstruction) {
      var parts,
          keyValue,
          instruction,
          attrValue,
          isDestructuring;
      attrValue = info.attrValue;
      isDestructuring = attrValue.match(/[[].+[\]]/);
      parts = isDestructuring ? attrValue.split('of ') : attrValue.split(' of ');
      if (parts.length !== 2) {
        throw new Error('Incorrect syntax for "for". The form is: "$local of $items" or "[$key, $value] of $items".');
      }
      instruction = existingInstruction || {
        attrName: info.attrName,
        attributes: {}
      };
      if (isDestructuring) {
        keyValue = parts[0].replace(/[[\]]/g, '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
        instruction.attributes.key = keyValue[0];
        instruction.attributes.value = keyValue[1];
      } else {
        instruction.attributes.local = parts[0];
      }
      instruction.attributes.items = new _aureliaBinding.BindingExpression(this.observerLocator, 'items', this.parser.parse(parts[1]), _aureliaBinding.bindingMode.oneWay, resources.valueConverterLookupFunction);
      return instruction;
    };
    SyntaxInterpreter.prototype['two-way'] = function(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || {
        attrName: info.attrName,
        attributes: {}
      };
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.twoWay, resources.valueConverterLookupFunction);
      return instruction;
    };
    SyntaxInterpreter.prototype['one-way'] = function(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || {
        attrName: info.attrName,
        attributes: {}
      };
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneWay, resources.valueConverterLookupFunction);
      return instruction;
    };
    SyntaxInterpreter.prototype['one-time'] = function(resources, element, info, existingInstruction) {
      var instruction = existingInstruction || {
        attrName: info.attrName,
        attributes: {}
      };
      instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneTime, resources.valueConverterLookupFunction);
      return instruction;
    };
    var info = {},
        logger = _aureliaLogging.getLogger('templating-binding');
    var TemplatingBindingLanguage = (function(_BindingLanguage) {
      function TemplatingBindingLanguage(parser, observerLocator, syntaxInterpreter) {
        _classCallCheck(this, TemplatingBindingLanguage);
        _BindingLanguage.call(this);
        this.parser = parser;
        this.observerLocator = observerLocator;
        this.syntaxInterpreter = syntaxInterpreter;
        this.emptyStringExpression = this.parser.parse('\'\'');
        syntaxInterpreter.language = this;
        this.attributeMap = syntaxInterpreter.attributeMap = {
          'contenteditable': 'contentEditable',
          'for': 'htmlFor',
          'tabindex': 'tabIndex',
          'textcontent': 'textContent',
          'innerhtml': 'innerHTML',
          'maxlength': 'maxLength',
          'minlength': 'minLength',
          'formaction': 'formAction',
          'formenctype': 'formEncType',
          'formmethod': 'formMethod',
          'formnovalidate': 'formNoValidate',
          'formtarget': 'formTarget',
          'rowspan': 'rowSpan',
          'colspan': 'colSpan',
          'scrolltop': 'scrollTop',
          'scrollleft': 'scrollLeft',
          'readonly': 'readOnly'
        };
      }
      _inherits(TemplatingBindingLanguage, _BindingLanguage);
      TemplatingBindingLanguage.inject = function inject() {
        return [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, SyntaxInterpreter];
      };
      TemplatingBindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, attrName, attrValue) {
        var parts = attrName.split('.');
        info.defaultBindingMode = null;
        if (parts.length == 2) {
          info.attrName = parts[0].trim();
          info.attrValue = attrValue;
          info.command = parts[1].trim();
          if (info.command === 'ref') {
            info.expression = new _aureliaBinding.NameExpression(attrValue, info.attrName);
            info.command = null;
            info.attrName = 'ref';
          } else {
            info.expression = null;
          }
        } else if (attrName == 'ref') {
          info.attrName = attrName;
          info.attrValue = attrValue;
          info.command = null;
          info.expression = new _aureliaBinding.NameExpression(attrValue, 'element');
        } else {
          info.attrName = attrName;
          info.attrValue = attrValue;
          info.command = null;
          info.expression = this.parseContent(resources, attrName, attrValue);
        }
        return info;
      };
      TemplatingBindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
        var instruction;
        if (info.expression) {
          if (info.attrName === 'ref') {
            return info.expression;
          }
          instruction = existingInstruction || {
            attrName: info.attrName,
            attributes: {}
          };
          instruction.attributes[info.attrName] = info.expression;
        } else if (info.command) {
          instruction = this.syntaxInterpreter.interpret(resources, element, info, existingInstruction);
        }
        return instruction;
      };
      TemplatingBindingLanguage.prototype.parseText = function parseText(resources, value) {
        return this.parseContent(resources, 'textContent', value);
      };
      TemplatingBindingLanguage.prototype.parseContent = function parseContent(resources, attrName, attrValue) {
        var i = attrValue.indexOf('${', 0),
            ii = attrValue.length,
            char,
            pos = 0,
            open = 0,
            quote = null,
            interpolationStart,
            parts,
            partIndex = 0;
        while (i >= 0 && i < ii - 2) {
          open = 1;
          interpolationStart = i;
          i += 2;
          do {
            char = attrValue[i];
            i++;
            switch (char) {
              case '\'':
              case '"':
                if (quote === null) {
                  quote = char;
                } else if (quote === char) {
                  quote = null;
                }
                continue;
              case '\\':
                i++;
                continue;
            }
            if (quote !== null) {
              continue;
            }
            if (char === '{') {
              open++;
            } else if (char === '}') {
              open--;
            }
          } while (open > 0 && i < ii);
          if (open === 0) {
            parts = parts || [];
            if (attrValue[interpolationStart - 1] === '\\' && attrValue[interpolationStart - 2] !== '\\') {
              parts[partIndex] = attrValue.substring(pos, interpolationStart - 1) + attrValue.substring(interpolationStart, i);
              partIndex++;
              parts[partIndex] = this.emptyStringExpression;
              partIndex++;
            } else {
              parts[partIndex] = attrValue.substring(pos, interpolationStart);
              partIndex++;
              parts[partIndex] = this.parser.parse(attrValue.substring(interpolationStart + 2, i - 1));
              partIndex++;
            }
            pos = i;
            i = attrValue.indexOf('${', i);
          } else {
            break;
          }
        }
        if (partIndex === 0) {
          return null;
        }
        parts[partIndex] = attrValue.substr(pos);
        return new InterpolationBindingExpression(this.observerLocator, this.attributeMap[attrName] || attrName, parts, _aureliaBinding.bindingMode.oneWay, resources.valueConverterLookupFunction, attrName);
      };
      return TemplatingBindingLanguage;
    })(_aureliaTemplating.BindingLanguage);
    exports.TemplatingBindingLanguage = TemplatingBindingLanguage;
    var InterpolationBindingExpression = (function() {
      function InterpolationBindingExpression(observerLocator, targetProperty, parts, mode, valueConverterLookupFunction, attribute) {
        _classCallCheck(this, InterpolationBindingExpression);
        this.observerLocator = observerLocator;
        this.targetProperty = targetProperty;
        this.parts = parts;
        this.mode = mode;
        this.valueConverterLookupFunction = valueConverterLookupFunction;
        this.attribute = this.attrToRemove = attribute;
        this.discrete = false;
      }
      InterpolationBindingExpression.prototype.createBinding = function createBinding(target) {
        return new InterpolationBinding(this.observerLocator, this.parts, target, this.targetProperty, this.mode, this.valueConverterLookupFunction);
      };
      return InterpolationBindingExpression;
    })();
    exports.InterpolationBindingExpression = InterpolationBindingExpression;
    var InterpolationBinding = (function() {
      function InterpolationBinding(observerLocator, parts, target, targetProperty, mode, valueConverterLookupFunction) {
        _classCallCheck(this, InterpolationBinding);
        if (targetProperty === 'style') {
          logger.info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
        } else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && targetProperty === 'textContent') {
          throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
        }
        this.observerLocator = observerLocator;
        this.parts = parts;
        this.targetProperty = observerLocator.getObserver(target, targetProperty);
        this.mode = mode;
        this.valueConverterLookupFunction = valueConverterLookupFunction;
        this.toDispose = [];
      }
      InterpolationBinding.prototype.getObserver = function getObserver(obj, propertyName) {
        return this.observerLocator.getObserver(obj, propertyName);
      };
      InterpolationBinding.prototype.bind = function bind(source) {
        this.source = source;
        if (this.mode == _aureliaBinding.bindingMode.oneWay) {
          this.unbind();
          this.connect();
          this.setValue();
        } else {
          this.setValue();
        }
      };
      InterpolationBinding.prototype.setValue = function setValue() {
        var value = this.interpolate();
        this.targetProperty.setValue(value);
      };
      InterpolationBinding.prototype.partChanged = function partChanged(newValue, oldValue, connecting) {
        var _this = this;
        var map,
            info;
        if (!connecting) {
          this.setValue();
        }
        if (oldValue instanceof Array) {
          map = this.arrayPartMap;
          info = map ? map.get(oldValue) : null;
          if (info) {
            info.refs--;
            if (info.refs === 0) {
              info.dispose();
              map['delete'](oldValue);
            }
          }
        }
        if (newValue instanceof Array) {
          map = this.arrayPartMap || (this.arrayPartMap = new Map());
          info = map.get(newValue);
          if (!info) {
            info = {
              refs: 0,
              dispose: this.observerLocator.getArrayObserver(newValue).subscribe(function() {
                return _this.setValue();
              })
            };
            map.set(newValue, info);
          }
          info.refs++;
        }
      };
      InterpolationBinding.prototype.connect = function connect() {
        var info,
            parts = this.parts,
            source = this.source,
            toDispose = this.toDispose = [],
            partChanged = this.partChanged.bind(this),
            i,
            ii;
        for (i = 0, ii = parts.length; i < ii; ++i) {
          if (i % 2 === 0) {} else {
            info = parts[i].connect(this, source);
            if (info.observer) {
              toDispose.push(info.observer.subscribe(partChanged));
            }
            if (info.value instanceof Array) {
              partChanged(info.value, undefined, true);
            }
          }
        }
      };
      InterpolationBinding.prototype.interpolate = function interpolate() {
        var value = '',
            parts = this.parts,
            source = this.source,
            valueConverterLookupFunction = this.valueConverterLookupFunction,
            i,
            ii,
            temp;
        for (i = 0, ii = parts.length; i < ii; ++i) {
          if (i % 2 === 0) {
            value += parts[i];
          } else {
            temp = parts[i].evaluate(source, valueConverterLookupFunction);
            value += typeof temp !== 'undefined' && temp !== null ? temp.toString() : '';
          }
        }
        return value;
      };
      InterpolationBinding.prototype.unbind = function unbind() {
        var i,
            ii,
            toDispose = this.toDispose,
            map = this.arrayPartMap;
        if (toDispose) {
          for (i = 0, ii = toDispose.length; i < ii; ++i) {
            toDispose[i]();
          }
        }
        this.toDispose = null;
        if (map) {
          for (var _iterator = map.values(),
              _isArray = Array.isArray(_iterator),
              _i = 0,
              _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
            if (_isArray) {
              if (_i >= _iterator.length)
                break;
              toDispose = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done)
                break;
              toDispose = _i.value;
            }
            toDispose.dispose();
          }
          map.clear();
        }
        this.arrayPartMap = null;
      };
      return InterpolationBinding;
    })();
    function configure(aurelia) {
      var instance,
          getInstance = function getInstance(c) {
            return instance || (instance = c.invoke(TemplatingBindingLanguage));
          };
      if (aurelia.container.hasHandler(TemplatingBindingLanguage)) {
        instance = aurelia.container.get(TemplatingBindingLanguage);
      } else {
        aurelia.container.registerHandler(TemplatingBindingLanguage, getInstance);
      }
      aurelia.container.registerHandler(_aureliaTemplating.BindingLanguage, getInstance);
    }
  }).call(__exports, __exports, __require('github:aurelia/binding@0.8.5'), __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/logging@0.6.2'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/templating-binding@0.13.2", ["github:aurelia/templating-binding@0.13.2/aurelia-templating-binding"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/templating-binding@0.13.2/aurelia-templating-binding'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/animator-css@0.13.0/index", ["github:aurelia/templating@0.13.16"], false, function(__require, __exports, __module) {
  return (function(exports, _aureliaTemplating) {
    'use strict';
    exports.__esModule = true;
    exports.configure = configure;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var CssAnimator = (function() {
      function CssAnimator() {
        _classCallCheck(this, CssAnimator);
        this.animationStack = [];
        this.useAnimationDoneClasses = false;
        this.animationEnteredClass = 'au-entered';
        this.animationLeftClass = 'au-left';
        this.isAnimating = false;
        this.animationTimeout = 50;
      }
      CssAnimator.prototype._addMultipleEventListener = function _addMultipleEventListener(el, s, fn) {
        var evts = s.split(' '),
            i,
            ii;
        for (i = 0, ii = evts.length; i < ii; ++i) {
          el.addEventListener(evts[i], fn, false);
        }
      };
      CssAnimator.prototype._addAnimationToStack = function _addAnimationToStack(animId) {
        if (this.animationStack.indexOf(animId) < 0) {
          this.animationStack.push(animId);
        }
      };
      CssAnimator.prototype._removeAnimationFromStack = function _removeAnimationFromStack(animId) {
        var idx = this.animationStack.indexOf(animId);
        if (idx > -1) {
          this.animationStack.splice(idx, 1);
        }
      };
      CssAnimator.prototype._getElementAnimationDelay = function _getElementAnimationDelay(element) {
        var styl = window.getComputedStyle(element);
        var prop,
            delay;
        if (styl.getPropertyValue('animation-delay')) {
          prop = 'animation-delay';
        } else if (styl.getPropertyValue('-webkit-animation-delay')) {
          prop = '-webkit-animation-delay';
        } else if (styl.getPropertyValue('-moz-animation-delay')) {
          prop = '-moz-animation-delay';
        } else {
          return 0;
        }
        delay = styl.getPropertyValue(prop);
        delay = Number(delay.replace(/[^\d\.]/g, ''));
        return delay * 1000;
      };
      CssAnimator.prototype._performSingleAnimate = function _performSingleAnimate(element, className) {
        var _this = this;
        this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateBegin, element);
        return this.addClass(element, className, true).then(function(result) {
          _this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateActive, element);
          if (result !== false) {
            return _this.removeClass(element, className, true).then(function() {
              _this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateDone, element);
            });
          } else {
            return false;
          }
        })['catch'](function() {
          _this._triggerDOMEvent(_aureliaTemplating.animationEvent.animateTimeout, element);
        });
      };
      CssAnimator.prototype._triggerDOMEvent = function _triggerDOMEvent(eventType, element) {
        var evt = new window.CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: element
        });
        document.dispatchEvent(evt);
      };
      CssAnimator.prototype.animate = function animate(element, className) {
        var _this2 = this;
        if (Array.isArray(element)) {
          return Promise.all(element.map(function(el) {
            return _this2._performSingleAnimate(el, className);
          }));
        } else {
          return this._performSingleAnimate(element, className);
        }
      };
      CssAnimator.prototype.runSequence = function runSequence(animations) {
        var _this3 = this;
        this._triggerDOMEvent(_aureliaTemplating.animationEvent.sequenceBegin, null);
        return animations.reduce(function(p, anim) {
          return p.then(function() {
            return _this3.animate(anim.element, anim.className);
          });
        }, Promise.resolve(true)).then(function() {
          _this3._triggerDOMEvent(_aureliaTemplating.animationEvent.sequenceDone, null);
        });
      };
      CssAnimator.prototype.move = function move() {
        return Promise.resolve(false);
      };
      CssAnimator.prototype.enter = function enter(element) {
        var _this4 = this;
        return new Promise(function(resolve, reject) {
          var animId = element.toString() + Math.random(),
              classList = element.classList;
          _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterBegin, element);
          if (_this4.useAnimationDoneClasses) {
            classList.remove(_this4.animationEnteredClass);
            classList.remove(_this4.animationLeftClass);
          }
          classList.add('au-enter');
          var animStart;
          _this4._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function(evAnimStart) {
            _this4.isAnimating = true;
            _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterActive, element);
            evAnimStart.stopPropagation();
            _this4._addAnimationToStack(animId);
            var animEnd;
            _this4._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function(evAnimEnd) {
              evAnimEnd.stopPropagation();
              classList.remove('au-enter-active');
              classList.remove('au-enter');
              _this4._removeAnimationFromStack(animId);
              evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);
              if (_this4.useAnimationDoneClasses && _this4.animationEnteredClass !== undefined && _this4.animationEnteredClass !== null) {
                classList.add(_this4.animationEnteredClass);
              }
              _this4.isAnimating = false;
              _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterDone, element);
              resolve(true);
            }, false);
            evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
          }, false);
          var parent = element.parentElement,
              delay = 0;
          if (parent !== null && parent !== undefined && parent.classList.contains('au-stagger')) {
            var elemPos = Array.prototype.indexOf.call(parent.childNodes, element);
            delay = _this4._getElementAnimationDelay(parent) * elemPos;
            _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.staggerNext, element);
            setTimeout(function() {
              classList.add('au-enter-active');
            }, delay);
          } else {
            classList.add('au-enter-active');
          }
          setTimeout(function() {
            if (_this4.animationStack.indexOf(animId) < 0) {
              classList.remove('au-enter-active');
              classList.remove('au-enter');
              _this4._triggerDOMEvent(_aureliaTemplating.animationEvent.enterTimeout, element);
              resolve(false);
            }
          }, _this4._getElementAnimationDelay(element) + _this4.animationTimeout + delay);
        });
      };
      CssAnimator.prototype.leave = function leave(element) {
        var _this5 = this;
        return new Promise(function(resolve, reject) {
          var animId = element.toString() + Math.random(),
              classList = element.classList;
          _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveBegin, element);
          if (_this5.useAnimationDoneClasses) {
            classList.remove(_this5.animationEnteredClass);
            classList.remove(_this5.animationLeftClass);
          }
          classList.add('au-leave');
          var animStart;
          _this5._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function(evAnimStart) {
            _this5.isAnimating = true;
            _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveActive, element);
            evAnimStart.stopPropagation();
            _this5._addAnimationToStack(animId);
            var animEnd;
            _this5._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function(evAnimEnd) {
              evAnimEnd.stopPropagation();
              classList.remove('au-leave-active');
              classList.remove('au-leave');
              _this5._removeAnimationFromStack(animId);
              evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);
              if (_this5.useAnimationDoneClasses && _this5.animationLeftClass !== undefined && _this5.animationLeftClass !== null) {
                classList.add(_this5.animationLeftClass);
              }
              _this5.isAnimating = false;
              _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveDone, element);
              resolve(true);
            }, false);
            evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
          }, false);
          var parent = element.parentElement,
              delay = 0;
          if (parent !== null && parent !== undefined && parent.classList.contains('au-stagger')) {
            var elemPos = Array.prototype.indexOf.call(parent.childNodes, element);
            delay = _this5._getElementAnimationDelay(parent) * elemPos;
            _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.staggerNext, element);
            setTimeout(function() {
              classList.add('au-leave-active');
            }, delay);
          } else {
            classList.add('au-leave-active');
          }
          setTimeout(function() {
            if (_this5.animationStack.indexOf(animId) < 0) {
              classList.remove('au-leave-active');
              classList.remove('au-leave');
              _this5._triggerDOMEvent(_aureliaTemplating.animationEvent.leaveTimeout, element);
              resolve(false);
            }
          }, _this5._getElementAnimationDelay(element) + _this5.animationTimeout + delay);
        });
      };
      CssAnimator.prototype.removeClass = function removeClass(element, className) {
        var _this6 = this;
        var suppressEvents = arguments[2] === undefined ? false : arguments[2];
        return new Promise(function(resolve, reject) {
          var classList = element.classList;
          if (!classList.contains(className)) {
            resolve(false);
            return ;
          }
          if (suppressEvents !== true) {
            _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassBegin, element);
          }
          var animId = element.toString() + className + Math.random();
          classList.remove(className);
          var animStart;
          _this6._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function(evAnimStart) {
            _this6.isAnimating = true;
            if (suppressEvents !== true) {
              _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassActive, element);
            }
            evAnimStart.stopPropagation();
            _this6._addAnimationToStack(animId);
            var animEnd;
            _this6._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function(evAnimEnd) {
              evAnimEnd.stopPropagation();
              classList.remove(className + '-remove');
              _this6._removeAnimationFromStack(animId);
              evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);
              _this6.isAnimating = false;
              if (suppressEvents !== true) {
                _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassDone, element);
              }
              resolve(true);
            }, false);
            evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
          }, false);
          classList.add(className + '-remove');
          setTimeout(function() {
            if (_this6.animationStack.indexOf(animId) < 0) {
              classList.remove(className + '-remove');
              classList.remove(className);
              if (suppressEvents !== true) {
                _this6._triggerDOMEvent(_aureliaTemplating.animationEvent.removeClassTimeout, element);
              }
              resolve(false);
            }
          }, _this6._getElementAnimationDelay(element) + _this6.animationTimeout);
        });
      };
      CssAnimator.prototype.addClass = function addClass(element, className) {
        var _this7 = this;
        var suppressEvents = arguments[2] === undefined ? false : arguments[2];
        return new Promise(function(resolve, reject) {
          var animId = element.toString() + className + Math.random(),
              classList = element.classList;
          if (suppressEvents !== true) {
            _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassBegin, element);
          }
          var animStart;
          _this7._addMultipleEventListener(element, 'webkitAnimationStart animationstart', animStart = function(evAnimStart) {
            _this7.isAnimating = true;
            if (suppressEvents !== true) {
              _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassActive, element);
            }
            evAnimStart.stopPropagation();
            _this7._addAnimationToStack(animId);
            var animEnd;
            _this7._addMultipleEventListener(element, 'webkitAnimationEnd animationend', animEnd = function(evAnimEnd) {
              evAnimEnd.stopPropagation();
              classList.add(className);
              classList.remove(className + '-add');
              _this7._removeAnimationFromStack(animId);
              evAnimEnd.target.removeEventListener(evAnimEnd.type, animEnd);
              _this7.isAnimating = false;
              if (suppressEvents !== true) {
                _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassDone, element);
              }
              resolve(true);
            }, false);
            evAnimStart.target.removeEventListener(evAnimStart.type, animStart);
          }, false);
          classList.add(className + '-add');
          setTimeout(function() {
            if (_this7.animationStack.indexOf(animId) < 0) {
              classList.remove(className + '-add');
              classList.add(className);
              if (suppressEvents !== true) {
                _this7._triggerDOMEvent(_aureliaTemplating.animationEvent.addClassTimeout, element);
              }
              resolve(false);
            }
          }, _this7._getElementAnimationDelay(element) + _this7.animationTimeout);
        });
      };
      return CssAnimator;
    })();
    exports.CssAnimator = CssAnimator;
    function configure(aurelia, cb) {
      var animator = aurelia.container.get(CssAnimator);
      _aureliaTemplating.Animator.configureDefault(aurelia.container, animator);
      if (typeof cb === 'function') {
        cb(animator);
      }
    }
  }).call(__exports, __exports, __require('github:aurelia/templating@0.13.16'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/animator-css@0.13.0", ["github:aurelia/animator-css@0.13.0/index"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/animator-css@0.13.0/index'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/http-client@0.10.2/aurelia-http-client", ["npm:core-js@0.9.18", "github:aurelia/path@0.8.1"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaPath) {
    'use strict';
    exports.__esModule = true;
    var _createClass = (function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ('value' in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();
    exports.timeoutTransformer = timeoutTransformer;
    exports.callbackParameterNameTransformer = callbackParameterNameTransformer;
    exports.credentialsTransformer = credentialsTransformer;
    exports.progressTransformer = progressTransformer;
    exports.responseTypeTransformer = responseTypeTransformer;
    exports.headerTransformer = headerTransformer;
    exports.contentTransformer = contentTransformer;
    exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
    exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var Headers = (function() {
      function Headers() {
        var headers = arguments[0] === undefined ? {} : arguments[0];
        _classCallCheck(this, Headers);
        this.headers = headers;
      }
      Headers.prototype.add = function add(key, value) {
        this.headers[key] = value;
      };
      Headers.prototype.get = function get(key) {
        return this.headers[key];
      };
      Headers.prototype.clear = function clear() {
        this.headers = {};
      };
      Headers.prototype.configureXHR = function configureXHR(xhr) {
        var headers = this.headers,
            key;
        for (key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
      };
      Headers.parse = function parse(headerStr) {
        var headers = new Headers();
        if (!headerStr) {
          return headers;
        }
        var headerPairs = headerStr.split('\r\n');
        for (var i = 0; i < headerPairs.length; i++) {
          var headerPair = headerPairs[i];
          var index = headerPair.indexOf(': ');
          if (index > 0) {
            var key = headerPair.substring(0, index);
            var val = headerPair.substring(index + 2);
            headers.add(key, val);
          }
        }
        return headers;
      };
      return Headers;
    })();
    exports.Headers = Headers;
    var RequestMessage = (function() {
      function RequestMessage(method, url, content, headers) {
        _classCallCheck(this, RequestMessage);
        this.method = method;
        this.url = url;
        this.content = content;
        this.headers = headers || new Headers();
        this.baseUrl = '';
      }
      RequestMessage.prototype.buildFullUrl = function buildFullUrl() {
        var url = _aureliaPath.join(this.baseUrl, this.url);
        if (this.params) {
          var qs = _aureliaPath.buildQueryString(this.params);
          url = qs ? url + '?' + qs : url;
        }
        return url;
      };
      return RequestMessage;
    })();
    exports.RequestMessage = RequestMessage;
    var HttpResponseMessage = (function() {
      function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
        _classCallCheck(this, HttpResponseMessage);
        this.requestMessage = requestMessage;
        this.statusCode = xhr.status;
        this.response = xhr.response || xhr.responseText;
        this.isSuccess = xhr.status >= 200 && xhr.status < 400;
        this.statusText = xhr.statusText;
        this.reviver = reviver;
        this.mimeType = null;
        if (xhr.getAllResponseHeaders) {
          try {
            this.headers = Headers.parse(xhr.getAllResponseHeaders());
          } catch (err) {
            if (xhr.requestHeaders)
              this.headers = {headers: xhr.requestHeaders};
          }
        } else {
          this.headers = new Headers();
        }
        var contentType;
        if (this.headers && this.headers.headers)
          contentType = this.headers.headers['Content-Type'];
        if (contentType) {
          this.mimeType = responseType = contentType.split(';')[0].trim();
          if (mimeTypes.hasOwnProperty(this.mimeType))
            responseType = mimeTypes[this.mimeType];
        }
        this.responseType = responseType;
      }
      _createClass(HttpResponseMessage, [{
        key: 'content',
        get: function get() {
          try {
            if (this._content !== undefined) {
              return this._content;
            }
            if (this.response === undefined || this.response === null) {
              return this._content = this.response;
            }
            if (this.responseType === 'json') {
              return this._content = JSON.parse(this.response, this.reviver);
            }
            if (this.reviver) {
              return this._content = this.reviver(this.response);
            }
            return this._content = this.response;
          } catch (e) {
            if (this.isSuccess) {
              throw e;
            }
            return this._content = null;
          }
        }
      }]);
      return HttpResponseMessage;
    })();
    exports.HttpResponseMessage = HttpResponseMessage;
    var mimeTypes = {
      'text/html': 'html',
      'text/javascript': 'js',
      'application/javascript': 'js',
      'text/json': 'json',
      'application/json': 'json',
      'application/rss+xml': 'rss',
      'application/atom+xml': 'atom',
      'application/xhtml+xml': 'xhtml',
      'text/markdown': 'md',
      'text/xml': 'xml',
      'text/mathml': 'mml',
      'application/xml': 'xml',
      'text/yml': 'yml',
      'text/csv': 'csv',
      'text/css': 'css',
      'text/less': 'less',
      'text/stylus': 'styl',
      'text/scss': 'scss',
      'text/sass': 'sass',
      'text/plain': 'txt'
    };
    exports.mimeTypes = mimeTypes;
    function applyXhrTransformers(xhrTransformers, client, processor, message, xhr) {
      var i,
          ii;
      for (i = 0, ii = xhrTransformers.length; i < ii; ++i) {
        xhrTransformers[i](client, processor, message, xhr);
      }
    }
    var RequestMessageProcessor = (function() {
      function RequestMessageProcessor(xhrType, xhrTransformers) {
        _classCallCheck(this, RequestMessageProcessor);
        this.XHRType = xhrType;
        this.xhrTransformers = xhrTransformers;
        this.isAborted = false;
      }
      RequestMessageProcessor.prototype.abort = function abort() {
        if (this.xhr && this.xhr.readyState !== XMLHttpRequest.UNSENT) {
          this.xhr.abort();
        }
        this.isAborted = true;
      };
      RequestMessageProcessor.prototype.process = function process(client, message) {
        var _this = this;
        var promise = new Promise(function(resolve, reject) {
          var xhr = _this.xhr = new _this.XHRType();
          xhr.onload = function(e) {
            var response = new HttpResponseMessage(message, xhr, message.responseType, message.reviver);
            if (response.isSuccess) {
              resolve(response);
            } else {
              reject(response);
            }
          };
          xhr.ontimeout = function(e) {
            reject(new HttpResponseMessage(message, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'timeout'));
          };
          xhr.onerror = function(e) {
            reject(new HttpResponseMessage(message, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'error'));
          };
          xhr.onabort = function(e) {
            reject(new HttpResponseMessage(message, {
              response: e,
              status: xhr.status,
              statusText: xhr.statusText
            }, 'abort'));
          };
        });
        return Promise.resolve(message).then(function(message) {
          var processRequest = function processRequest() {
            if (_this.isAborted) {
              _this.xhr.abort();
            } else {
              _this.xhr.open(message.method, message.buildFullUrl(), true);
              applyXhrTransformers(_this.xhrTransformers, client, _this, message, _this.xhr);
              _this.xhr.send(message.content);
            }
            return promise;
          };
          var chain = [[processRequest, undefined]];
          var interceptors = message.interceptors || [];
          interceptors.forEach(function(interceptor) {
            if (interceptor.request || interceptor.requestError) {
              chain.unshift([interceptor.request ? interceptor.request.bind(interceptor) : undefined, interceptor.requestError ? interceptor.requestError.bind(interceptor) : undefined]);
            }
            if (interceptor.response || interceptor.responseError) {
              chain.push([interceptor.response ? interceptor.response.bind(interceptor) : undefined, interceptor.responseError ? interceptor.responseError.bind(interceptor) : undefined]);
            }
          });
          var interceptorsPromise = Promise.resolve(message);
          while (chain.length) {
            interceptorsPromise = interceptorsPromise.then.apply(interceptorsPromise, chain.shift());
          }
          return interceptorsPromise;
        });
      };
      return RequestMessageProcessor;
    })();
    exports.RequestMessageProcessor = RequestMessageProcessor;
    function timeoutTransformer(client, processor, message, xhr) {
      if (message.timeout !== undefined) {
        xhr.timeout = message.timeout;
      }
    }
    function callbackParameterNameTransformer(client, processor, message, xhr) {
      if (message.callbackParameterName !== undefined) {
        xhr.callbackParameterName = message.callbackParameterName;
      }
    }
    function credentialsTransformer(client, processor, message, xhr) {
      if (message.withCredentials !== undefined) {
        xhr.withCredentials = message.withCredentials;
      }
    }
    function progressTransformer(client, processor, message, xhr) {
      if (message.progressCallback) {
        xhr.upload.onprogress = message.progressCallback;
      }
    }
    function responseTypeTransformer(client, processor, message, xhr) {
      var responseType = message.responseType;
      if (responseType === 'json') {
        responseType = 'text';
      }
      xhr.responseType = responseType;
    }
    function headerTransformer(client, processor, message, xhr) {
      message.headers.configureXHR(xhr);
    }
    function contentTransformer(client, processor, message, xhr) {
      if (window.FormData && message.content instanceof FormData) {
        return ;
      }
      if (window.Blob && message.content instanceof Blob) {
        return ;
      }
      if (window.ArrayBufferView && message.content instanceof ArrayBufferView) {
        return ;
      }
      if (message.content instanceof Document) {
        return ;
      }
      if (typeof message.content === 'string') {
        return ;
      }
      if (message.content === null || message.content === undefined) {
        return ;
      }
      message.content = JSON.stringify(message.content, message.replacer);
      if (message.headers.get('Content-Type') === undefined) {
        message.headers.add('Content-Type', 'application/json');
      }
    }
    var JSONPRequestMessage = (function(_RequestMessage) {
      function JSONPRequestMessage(url, callbackParameterName) {
        _classCallCheck(this, JSONPRequestMessage);
        _RequestMessage.call(this, 'JSONP', url);
        this.responseType = 'jsonp';
        this.callbackParameterName = callbackParameterName;
      }
      _inherits(JSONPRequestMessage, _RequestMessage);
      return JSONPRequestMessage;
    })(RequestMessage);
    exports.JSONPRequestMessage = JSONPRequestMessage;
    var JSONPXHR = (function() {
      function JSONPXHR() {
        _classCallCheck(this, JSONPXHR);
      }
      JSONPXHR.prototype.open = function open(method, url) {
        this.method = method;
        this.url = url;
        this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      };
      JSONPXHR.prototype.send = function send() {
        var _this2 = this;
        var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + encodeURIComponent(this.callbackParameterName) + '=' + this.callbackName;
        var script = document.createElement('script');
        script.src = url;
        script.onerror = function(e) {
          cleanUp();
          _this2.status = 0;
          _this2.onerror(new Error('error'));
        };
        var cleanUp = function cleanUp() {
          delete window[_this2.callbackName];
          document.body.removeChild(script);
        };
        window[this.callbackName] = function(data) {
          cleanUp();
          if (_this2.status === undefined) {
            _this2.status = 200;
            _this2.statusText = 'OK';
            _this2.response = data;
            _this2.onload(_this2);
          }
        };
        document.body.appendChild(script);
        if (this.timeout !== undefined) {
          setTimeout(function() {
            if (_this2.status === undefined) {
              _this2.status = 0;
              _this2.ontimeout(new Error('timeout'));
            }
          }, this.timeout);
        }
      };
      JSONPXHR.prototype.abort = function abort() {
        if (this.status === undefined) {
          this.status = 0;
          this.onabort(new Error('abort'));
        }
      };
      JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};
      return JSONPXHR;
    })();
    function createJSONPRequestMessageProcessor() {
      return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
    }
    var HttpRequestMessage = (function(_RequestMessage2) {
      function HttpRequestMessage(method, url, content, headers) {
        _classCallCheck(this, HttpRequestMessage);
        _RequestMessage2.call(this, method, url, content, headers);
        this.responseType = 'json';
      }
      _inherits(HttpRequestMessage, _RequestMessage2);
      return HttpRequestMessage;
    })(RequestMessage);
    exports.HttpRequestMessage = HttpRequestMessage;
    function createHttpRequestMessageProcessor() {
      return new RequestMessageProcessor(XMLHttpRequest, [timeoutTransformer, credentialsTransformer, progressTransformer, responseTypeTransformer, contentTransformer, headerTransformer]);
    }
    var RequestBuilder = (function() {
      function RequestBuilder(client) {
        _classCallCheck(this, RequestBuilder);
        this.client = client;
        this.transformers = client.requestTransformers.slice(0);
        this.useJsonp = false;
      }
      RequestBuilder.addHelper = function addHelper(name, fn) {
        RequestBuilder.prototype[name] = function() {
          this.transformers.push(fn.apply(this, arguments));
          return this;
        };
      };
      RequestBuilder.prototype.send = function send() {
        var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
        return this.client.send(message, this.transformers);
      };
      return RequestBuilder;
    })();
    exports.RequestBuilder = RequestBuilder;
    RequestBuilder.addHelper('asDelete', function() {
      return function(client, processor, message) {
        message.method = 'DELETE';
      };
    });
    RequestBuilder.addHelper('asGet', function() {
      return function(client, processor, message) {
        message.method = 'GET';
      };
    });
    RequestBuilder.addHelper('asHead', function() {
      return function(client, processor, message) {
        message.method = 'HEAD';
      };
    });
    RequestBuilder.addHelper('asOptions', function() {
      return function(client, processor, message) {
        message.method = 'OPTIONS';
      };
    });
    RequestBuilder.addHelper('asPatch', function() {
      return function(client, processor, message) {
        message.method = 'PATCH';
      };
    });
    RequestBuilder.addHelper('asPost', function() {
      return function(client, processor, message) {
        message.method = 'POST';
      };
    });
    RequestBuilder.addHelper('asPut', function() {
      return function(client, processor, message) {
        message.method = 'PUT';
      };
    });
    RequestBuilder.addHelper('asJsonp', function(callbackParameterName) {
      this.useJsonp = true;
      return function(client, processor, message) {
        message.callbackParameterName = callbackParameterName;
      };
    });
    RequestBuilder.addHelper('withUrl', function(url) {
      return function(client, processor, message) {
        message.url = url;
      };
    });
    RequestBuilder.addHelper('withContent', function(content) {
      return function(client, processor, message) {
        message.content = content;
      };
    });
    RequestBuilder.addHelper('withBaseUrl', function(baseUrl) {
      return function(client, processor, message) {
        message.baseUrl = baseUrl;
      };
    });
    RequestBuilder.addHelper('withParams', function(params) {
      return function(client, processor, message) {
        message.params = params;
      };
    });
    RequestBuilder.addHelper('withResponseType', function(responseType) {
      return function(client, processor, message) {
        message.responseType = responseType;
      };
    });
    RequestBuilder.addHelper('withTimeout', function(timeout) {
      return function(client, processor, message) {
        message.timeout = timeout;
      };
    });
    RequestBuilder.addHelper('withHeader', function(key, value) {
      return function(client, processor, message) {
        message.headers.add(key, value);
      };
    });
    RequestBuilder.addHelper('withCredentials', function(value) {
      return function(client, processor, message) {
        message.withCredentials = value;
      };
    });
    RequestBuilder.addHelper('withReviver', function(reviver) {
      return function(client, processor, message) {
        message.reviver = reviver;
      };
    });
    RequestBuilder.addHelper('withReplacer', function(replacer) {
      return function(client, processor, message) {
        message.replacer = replacer;
      };
    });
    RequestBuilder.addHelper('withProgressCallback', function(progressCallback) {
      return function(client, processor, message) {
        message.progressCallback = progressCallback;
      };
    });
    RequestBuilder.addHelper('withCallbackParameterName', function(callbackParameterName) {
      return function(client, processor, message) {
        message.callbackParameterName = callbackParameterName;
      };
    });
    RequestBuilder.addHelper('withInterceptor', function(interceptor) {
      return function(client, processor, message) {
        message.interceptors = message.interceptors || [];
        message.interceptors.unshift(interceptor);
      };
    });
    function trackRequestStart(client, processor) {
      client.pendingRequests.push(processor);
      client.isRequesting = true;
    }
    function trackRequestEnd(client, processor) {
      var index = client.pendingRequests.indexOf(processor);
      client.pendingRequests.splice(index, 1);
      client.isRequesting = client.pendingRequests.length > 0;
      if (!client.isRequesting) {
        var evt = new window.CustomEvent('aurelia-http-client-requests-drained', {
          bubbles: true,
          cancelable: true
        });
        setTimeout(function() {
          return document.dispatchEvent(evt);
        }, 1);
      }
    }
    var HttpClient = (function() {
      function HttpClient() {
        _classCallCheck(this, HttpClient);
        this.requestTransformers = [];
        this.requestProcessorFactories = new Map();
        this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
        this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
        this.pendingRequests = [];
        this.isRequesting = false;
      }
      HttpClient.prototype.configure = function configure(fn) {
        var builder = new RequestBuilder(this);
        fn(builder);
        this.requestTransformers = builder.transformers;
        return this;
      };
      HttpClient.prototype.createRequest = function createRequest(url) {
        var builder = new RequestBuilder(this);
        if (url) {
          builder.withUrl(url);
        }
        return builder;
      };
      HttpClient.prototype.send = function send(message, transformers) {
        var _this3 = this;
        var createProcessor = this.requestProcessorFactories.get(message.constructor),
            processor,
            promise,
            i,
            ii,
            processRequest;
        if (!createProcessor) {
          throw new Error('No request message processor factory for ' + message.constructor + '.');
        }
        processor = createProcessor();
        trackRequestStart(this, processor);
        transformers = transformers || this.requestTransformers;
        promise = Promise.resolve(message).then(function(message) {
          for (i = 0, ii = transformers.length; i < ii; ++i) {
            transformers[i](_this3, processor, message);
          }
          return processor.process(_this3, message).then(function(response) {
            trackRequestEnd(_this3, processor);
            return response;
          })['catch'](function(response) {
            trackRequestEnd(_this3, processor);
            throw response;
          });
        });
        promise.abort = promise.cancel = function() {
          processor.abort();
        };
        return promise;
      };
      HttpClient.prototype['delete'] = function _delete(url) {
        return this.createRequest(url).asDelete().send();
      };
      HttpClient.prototype.get = function get(url) {
        return this.createRequest(url).asGet().send();
      };
      HttpClient.prototype.head = function head(url) {
        return this.createRequest(url).asHead().send();
      };
      HttpClient.prototype.jsonp = function jsonp(url) {
        var callbackParameterName = arguments[1] === undefined ? 'jsoncallback' : arguments[1];
        return this.createRequest(url).asJsonp(callbackParameterName).send();
      };
      HttpClient.prototype.options = function options(url) {
        return this.createRequest(url).asOptions().send();
      };
      HttpClient.prototype.put = function put(url, content) {
        return this.createRequest(url).asPut().withContent(content).send();
      };
      HttpClient.prototype.patch = function patch(url, content) {
        return this.createRequest(url).asPatch().withContent(content).send();
      };
      HttpClient.prototype.post = function post(url, content) {
        return this.createRequest(url).asPost().withContent(content).send();
      };
      return HttpClient;
    })();
    exports.HttpClient = HttpClient;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/path@0.8.1'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/http-client@0.10.2", ["github:aurelia/http-client@0.10.2/aurelia-http-client"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/http-client@0.10.2/aurelia-http-client'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/logging-console@0.6.1/aurelia-logging-console", [], false, function(__require, __exports, __module) {
  return (function(exports) {
    'use strict';
    exports.__esModule = true;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    (function(global) {
      'use strict';
      global.console = global.console || {};
      var con = global.console;
      var prop,
          method;
      var empty = {};
      var dummy = function dummy() {};
      var properties = 'memory'.split(',');
      var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' + 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' + 'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
      while (prop = properties.pop())
        if (!con[prop])
          con[prop] = empty;
      while (method = methods.pop())
        if (!con[method])
          con[method] = dummy;
    })(typeof window === 'undefined' ? undefined : window);
    if (Function.prototype.bind && window.console && typeof console.log == 'object') {
      ['log', 'info', 'warn', 'error', 'assert', 'dir', 'clear', 'profile', 'profileEnd'].forEach(function(method) {
        console[method] = this.bind(console[method], console);
      }, Function.prototype.call);
    }
    var ConsoleAppender = (function() {
      function ConsoleAppender() {
        _classCallCheck(this, ConsoleAppender);
      }
      ConsoleAppender.prototype.debug = function debug(logger) {
        for (var _len = arguments.length,
            rest = Array(_len > 1 ? _len - 1 : 0),
            _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }
        console.debug.apply(console, ['DEBUG [' + logger.id + ']'].concat(rest));
      };
      ConsoleAppender.prototype.info = function info(logger) {
        for (var _len2 = arguments.length,
            rest = Array(_len2 > 1 ? _len2 - 1 : 0),
            _key2 = 1; _key2 < _len2; _key2++) {
          rest[_key2 - 1] = arguments[_key2];
        }
        console.info.apply(console, ['INFO [' + logger.id + ']'].concat(rest));
      };
      ConsoleAppender.prototype.warn = function warn(logger) {
        for (var _len3 = arguments.length,
            rest = Array(_len3 > 1 ? _len3 - 1 : 0),
            _key3 = 1; _key3 < _len3; _key3++) {
          rest[_key3 - 1] = arguments[_key3];
        }
        console.warn.apply(console, ['WARN [' + logger.id + ']'].concat(rest));
      };
      ConsoleAppender.prototype.error = function error(logger) {
        for (var _len4 = arguments.length,
            rest = Array(_len4 > 1 ? _len4 - 1 : 0),
            _key4 = 1; _key4 < _len4; _key4++) {
          rest[_key4 - 1] = arguments[_key4];
        }
        console.error.apply(console, ['ERROR [' + logger.id + ']'].concat(rest));
      };
      return ConsoleAppender;
    })();
    exports.ConsoleAppender = ConsoleAppender;
  }).call(__exports, __exports);
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/logging-console@0.6.1", ["github:aurelia/logging-console@0.6.1/aurelia-logging-console"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/logging-console@0.6.1/aurelia-logging-console'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/framework@0.13.4/aurelia-framework", ["npm:core-js@0.9.18", "github:aurelia/logging@0.6.2", "github:aurelia/metadata@0.7.2", "github:aurelia/dependency-injection@0.9.1", "github:aurelia/loader@0.8.3", "github:aurelia/path@0.8.1", "github:aurelia/templating@0.13.16", "github:aurelia/binding@0.8.5", "github:aurelia/task-queue@0.6.1"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaLogging, _aureliaMetadata, _aureliaDependencyInjection, _aureliaLoader, _aureliaPath, _aureliaTemplating, _aureliaBinding, _aureliaTaskQueue) {
    'use strict';
    exports.__esModule = true;
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj['default'] = obj;
        return newObj;
      }
    }
    function _defaults(obj, defaults) {
      var keys = Object.getOwnPropertyNames(defaults);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) {
          Object.defineProperty(obj, key, value);
        }
      }
      return obj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    var _core = _interopRequireDefault(_coreJs);
    var logger = _aureliaLogging.getLogger('aurelia');
    function loadPlugin(aurelia, loader, info) {
      logger.debug('Loading plugin ' + info.moduleId + '.');
      aurelia.currentPluginId = info.moduleId.endsWith('.js') || info.moduleId.endsWith('.ts') ? info.moduleId.substring(0, info.moduleId.length - 3) : info.moduleId;
      return loader.loadModule(info.moduleId).then(function(m) {
        if ('configure' in m) {
          return Promise.resolve(m.configure(aurelia, info.config || {})).then(function() {
            aurelia.currentPluginId = null;
            logger.debug('Configured plugin ' + info.moduleId + '.');
          });
        } else {
          aurelia.currentPluginId = null;
          logger.debug('Loaded plugin ' + info.moduleId + '.');
        }
      });
    }
    var Plugins = (function() {
      function Plugins(aurelia) {
        _classCallCheck(this, Plugins);
        this.aurelia = aurelia;
        this.info = [];
        this.processed = false;
      }
      Plugins.prototype.plugin = function plugin(moduleId, config) {
        var plugin = {
          moduleId: moduleId,
          config: config || {}
        };
        if (this.processed) {
          loadPlugin(this.aurelia, this.aurelia.loader, plugin);
        } else {
          this.info.push(plugin);
        }
        return this;
      };
      Plugins.prototype._process = function _process() {
        var _this = this;
        var aurelia = this.aurelia,
            loader = aurelia.loader,
            info = this.info,
            current;
        if (this.processed) {
          return ;
        }
        var next = function next() {
          if (current = info.shift()) {
            return loadPlugin(aurelia, loader, current).then(next);
          }
          _this.processed = true;
          return Promise.resolve();
        };
        return next();
      };
      return Plugins;
    })();
    exports.Plugins = Plugins;
    var logger = _aureliaLogging.getLogger('aurelia'),
        slice = Array.prototype.slice;
    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
      var CustomEvent = function CustomEvent(event, params) {
        var params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };
      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    }
    function preventActionlessFormSubmit() {
      document.body.addEventListener('submit', function(evt) {
        var target = evt.target;
        var action = target.action;
        if (target.tagName.toLowerCase() === 'form' && !action) {
          evt.preventDefault();
        }
      });
    }
    function loadResources(container, resourcesToLoad, appResources) {
      var viewEngine = container.get(_aureliaTemplating.ViewEngine),
          importIds = Object.keys(resourcesToLoad),
          names = new Array(importIds.length),
          i,
          ii;
      for (i = 0, ii = importIds.length; i < ii; ++i) {
        names[i] = resourcesToLoad[importIds[i]];
      }
      return viewEngine.importViewResources(importIds, names, appResources);
    }
    var Aurelia = (function() {
      function Aurelia(loader, container, resources) {
        _classCallCheck(this, Aurelia);
        this.loader = loader || new window.AureliaLoader();
        this.container = container || new _aureliaDependencyInjection.Container();
        this.resources = resources || new _aureliaTemplating.ResourceRegistry();
        this.use = new Plugins(this);
        this.resourcesToLoad = {};
        this.withInstance(Aurelia, this);
        this.withInstance(_aureliaLoader.Loader, this.loader);
        this.withInstance(_aureliaTemplating.ResourceRegistry, this.resources);
        this.container.makeGlobal();
      }
      Aurelia.prototype.withInstance = function withInstance(type, instance) {
        this.container.registerInstance(type, instance);
        return this;
      };
      Aurelia.prototype.withSingleton = function withSingleton(type, implementation) {
        this.container.registerSingleton(type, implementation);
        return this;
      };
      Aurelia.prototype.withTransient = function withTransient(type, implementation) {
        this.container.registerTransient(type, implementation);
        return this;
      };
      Aurelia.prototype.globalizeResources = function globalizeResources(resources) {
        var toAdd = Array.isArray(resources) ? resources : arguments,
            i,
            ii,
            resource,
            pluginPath = this.currentPluginId || '',
            path,
            internalPlugin = pluginPath.startsWith('./');
        for (i = 0, ii = toAdd.length; i < ii; ++i) {
          resource = toAdd[i];
          if (typeof resource != 'string') {
            throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
          }
          path = internalPlugin ? _aureliaPath.relativeToFile(resource, pluginPath) : _aureliaPath.join(pluginPath, resource);
          this.resourcesToLoad[path] = this.resourcesToLoad[path];
        }
        return this;
      };
      Aurelia.prototype.renameGlobalResource = function renameGlobalResource(resourcePath, newName) {
        this.resourcesToLoad[resourcePath] = newName;
        return this;
      };
      Aurelia.prototype.start = function start() {
        var _this2 = this;
        if (this.started) {
          return Promise.resolve(this);
        }
        this.started = true;
        logger.info('Aurelia Starting');
        preventActionlessFormSubmit();
        return this.use._process().then(function() {
          if (!_this2.container.hasHandler(_aureliaTemplating.BindingLanguage)) {
            var message = 'You must configure Aurelia with a BindingLanguage implementation.';
            logger.error(message);
            throw new Error(message);
          }
          if (!_this2.container.hasHandler(_aureliaTemplating.Animator)) {
            _aureliaTemplating.Animator.configureDefault(_this2.container);
          }
          return loadResources(_this2.container, _this2.resourcesToLoad, _this2.resources).then(function() {
            logger.info('Aurelia Started');
            var evt = new window.CustomEvent('aurelia-started', {
              bubbles: true,
              cancelable: true
            });
            document.dispatchEvent(evt);
            return _this2;
          });
        });
      };
      Aurelia.prototype.setRoot = function setRoot() {
        var _this3 = this;
        var root = arguments[0] === undefined ? 'app' : arguments[0];
        var applicationHost = arguments[1] === undefined ? null : arguments[1];
        var compositionEngine,
            instruction = {};
        applicationHost = applicationHost || this.host;
        if (!applicationHost || typeof applicationHost == 'string') {
          this.host = document.getElementById(applicationHost || 'applicationHost') || document.body;
        } else {
          this.host = applicationHost;
        }
        this.host.aurelia = this;
        this.container.registerInstance(_aureliaTemplating.DOMBoundary, this.host);
        compositionEngine = this.container.get(_aureliaTemplating.CompositionEngine);
        instruction.viewModel = root;
        instruction.container = instruction.childContainer = this.container;
        instruction.viewSlot = new _aureliaTemplating.ViewSlot(this.host, true);
        instruction.viewSlot.transformChildNodesIntoView();
        instruction.host = this.host;
        return compositionEngine.compose(instruction).then(function(root) {
          _this3.root = root;
          instruction.viewSlot.attached();
          var evt = new window.CustomEvent('aurelia-composed', {
            bubbles: true,
            cancelable: true
          });
          setTimeout(function() {
            return document.dispatchEvent(evt);
          }, 1);
          return _this3;
        });
      };
      return Aurelia;
    })();
    exports.Aurelia = Aurelia;
    _defaults(exports, _interopRequireWildcard(_aureliaDependencyInjection));
    _defaults(exports, _interopRequireWildcard(_aureliaBinding));
    _defaults(exports, _interopRequireWildcard(_aureliaMetadata));
    _defaults(exports, _interopRequireWildcard(_aureliaTemplating));
    _defaults(exports, _interopRequireWildcard(_aureliaLoader));
    _defaults(exports, _interopRequireWildcard(_aureliaTaskQueue));
    _defaults(exports, _interopRequireWildcard(_aureliaPath));
    var LogManager = _aureliaLogging;
    exports.LogManager = LogManager;
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/logging@0.6.2'), __require('github:aurelia/metadata@0.7.2'), __require('github:aurelia/dependency-injection@0.9.1'), __require('github:aurelia/loader@0.8.3'), __require('github:aurelia/path@0.8.1'), __require('github:aurelia/templating@0.13.16'), __require('github:aurelia/binding@0.8.5'), __require('github:aurelia/task-queue@0.6.1'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/framework@0.13.4", ["github:aurelia/framework@0.13.4/aurelia-framework"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/framework@0.13.4/aurelia-framework'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/bootstrapper@0.14.1/aurelia-bootstrapper", ["npm:core-js@0.9.18", "github:aurelia/framework@0.13.4", "github:aurelia/logging-console@0.6.1"], false, function(__require, __exports, __module) {
  return (function(exports, _coreJs, _aureliaFramework, _aureliaLoggingConsole) {
    'use strict';
    exports.__esModule = true;
    exports.bootstrap = bootstrap;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {'default': obj};
    }
    var _core = _interopRequireDefault(_coreJs);
    var logger = _aureliaFramework.LogManager.getLogger('bootstrapper');
    var readyQueue = [];
    var isReady = false;
    function onReady(callback) {
      return new Promise(function(resolve, reject) {
        if (!isReady) {
          readyQueue.push(function() {
            try {
              resolve(callback());
            } catch (e) {
              reject(e);
            }
          });
        } else {
          resolve(callback());
        }
      });
    }
    function bootstrap(configure) {
      return onReady(function() {
        var loader = new window.AureliaLoader(),
            aurelia = new _aureliaFramework.Aurelia(loader);
        return configureAurelia(aurelia).then(function() {
          return configure(aurelia);
        });
      });
    }
    function ready(global) {
      return new Promise(function(resolve, reject) {
        if (global.document.readyState === 'complete') {
          resolve(global.document);
        } else {
          global.document.addEventListener('DOMContentLoaded', completed, false);
          global.addEventListener('load', completed, false);
        }
        function completed() {
          global.document.removeEventListener('DOMContentLoaded', completed, false);
          global.removeEventListener('load', completed, false);
          resolve(global.document);
        }
      });
    }
    function ensureLoader() {
      if (!window.AureliaLoader) {
        if (window.System && !window.System.isFake) {
          return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
            return System.normalize('aurelia-loader-default', bootstrapperName).then(function(loaderName) {
              return System['import'](loaderName);
            });
          });
        } else if (window.require) {
          return new Promise(function(resolve, reject) {
            require(['aurelia-loader-default'], resolve, reject);
          });
        } else {
          throw new Error('No window.AureliaLoader is defined and there is neither a System API (ES6) or a Require API (AMD) available to load your app.');
        }
      }
      return Promise.resolve();
    }
    function preparePlatform() {
      return System.normalize('aurelia-bootstrapper').then(function(bootstrapperName) {
        return System.normalize('aurelia-framework', bootstrapperName).then(function(frameworkName) {
          System.map['aurelia-framework'] = frameworkName;
          return System.normalize('aurelia-loader', frameworkName).then(function(loaderName) {
            var toLoad = [];
            toLoad.push(System.normalize('aurelia-dependency-injection', frameworkName).then(function(name) {
              System.map['aurelia-dependency-injection'] = name;
            }));
            toLoad.push(System.normalize('aurelia-router', bootstrapperName).then(function(name) {
              System.map['aurelia-router'] = name;
            }));
            toLoad.push(System.normalize('aurelia-logging-console', bootstrapperName).then(function(name) {
              System.map['aurelia-logging-console'] = name;
            }));
            if (!('import' in document.createElement('link'))) {
              logger.debug('loading the HTMLImports polyfill');
              toLoad.push(System.normalize('webcomponentsjs/HTMLImports.min', loaderName).then(function(name) {
                return System['import'](name);
              }));
            }
            if (!('content' in document.createElement('template'))) {
              logger.debug('loading the HTMLTemplateElement polyfill');
              toLoad.push(System.normalize('aurelia-html-template-element', loaderName).then(function(name) {
                return System['import'](name);
              }));
            }
            return Promise.all(toLoad);
          });
        });
      });
    }
    var installedDevelopmentLogging = false;
    function configureAurelia(aurelia) {
      return System.normalize('aurelia-bootstrapper').then(function(bName) {
        var toLoad = [];
        toLoad.push(System.normalize('aurelia-templating-binding', bName).then(function(templatingBinding) {
          aurelia.use.defaultBindingLanguage = function() {
            aurelia.use.plugin(templatingBinding);
            return this;
          };
        }));
        toLoad.push(System.normalize('aurelia-templating-router', bName).then(function(templatingRouter) {
          aurelia.use.router = function() {
            aurelia.use.plugin(templatingRouter);
            return this;
          };
        }));
        toLoad.push(System.normalize('aurelia-history-browser', bName).then(function(historyBrowser) {
          aurelia.use.history = function() {
            aurelia.use.plugin(historyBrowser);
            return this;
          };
        }));
        toLoad.push(System.normalize('aurelia-templating-resources', bName).then(function(name) {
          System.map['aurelia-templating-resources'] = name;
          aurelia.use.defaultResources = function() {
            aurelia.use.plugin(name);
            return this;
          };
        }));
        toLoad.push(System.normalize('aurelia-event-aggregator', bName).then(function(eventAggregator) {
          System.map['aurelia-event-aggregator'] = eventAggregator;
          aurelia.use.eventAggregator = function() {
            aurelia.use.plugin(eventAggregator);
            return this;
          };
        }));
        aurelia.use.standardConfiguration = function() {
          aurelia.use.defaultBindingLanguage().defaultResources().history().router().eventAggregator();
          return this;
        };
        aurelia.use.developmentLogging = function() {
          if (!installedDevelopmentLogging) {
            installedDevelopmentLogging = true;
            _aureliaFramework.LogManager.addAppender(new _aureliaLoggingConsole.ConsoleAppender());
            _aureliaFramework.LogManager.setLevel(_aureliaFramework.LogManager.logLevel.debug);
          }
          return this;
        };
        return Promise.all(toLoad);
      });
    }
    function runningLocally() {
      return window.location.protocol !== 'http' && window.location.protocol !== 'https';
    }
    function handleApp(appHost) {
      var configModuleId = appHost.getAttribute('aurelia-app'),
          aurelia,
          loader;
      if (configModuleId) {
        loader = new window.AureliaLoader();
        return loader.loadModule(configModuleId).then(function(m) {
          aurelia = new _aureliaFramework.Aurelia(loader);
          aurelia.host = appHost;
          return configureAurelia(aurelia).then(function() {
            return m.configure(aurelia);
          });
        });
      } else {
        aurelia = new _aureliaFramework.Aurelia();
        aurelia.host = appHost;
        return configureAurelia(aurelia).then(function() {
          if (runningLocally()) {
            aurelia.use.developmentLogging();
          }
          aurelia.use.standardConfiguration();
          return aurelia.start().then(function(a) {
            return a.setRoot();
          });
        });
      }
    }
    function run() {
      return ready(window).then(function(doc) {
        var appHost = doc.querySelectorAll('[aurelia-app]');
        return ensureLoader().then(function() {
          return preparePlatform().then(function() {
            var i,
                ii;
            for (i = 0, ii = appHost.length; i < ii; ++i) {
              handleApp(appHost[i]);
            }
            isReady = true;
            for (i = 0, ii = readyQueue.length; i < ii; ++i) {
              readyQueue[i]();
            }
            readyQueue = [];
          });
        });
      });
    }
    run();
  }).call(__exports, __exports, __require('npm:core-js@0.9.18'), __require('github:aurelia/framework@0.13.4'), __require('github:aurelia/logging-console@0.6.1'));
});
})();
(function() {
function define(){};  define.amd = {};
System.register("github:aurelia/bootstrapper@0.14.1", ["github:aurelia/bootstrapper@0.14.1/aurelia-bootstrapper"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:aurelia/bootstrapper@0.14.1/aurelia-bootstrapper'));
});
})();
System.register("views/index/welcome", ["github:aurelia/framework@0.13.4"], function(e) {
  "use strict";
  function t(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var r,
      n,
      i,
      o = function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      }(),
      a = function() {
        function e(e, t, r) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n],
                o = i.decorators,
                a = i.key;
            if (delete i.key, delete i.decorators, i.enumerable = i.enumerable || !1, i.configurable = !0, ("value" in i || i.initializer) && (i.writable = !0), o) {
              for (var u = 0; u < o.length; u++) {
                var l = o[u];
                if ("function" != typeof l)
                  throw new TypeError("The decorator for method " + i.key + " is of the invalid type " + typeof l);
                i = l(e, a, i) || i;
              }
              if (void 0 !== i.initializer) {
                r[a] = i;
                continue;
              }
            }
            Object.defineProperty(e, a, i);
          }
        }
        return function(t, r, n, i, o) {
          return r && e(t.prototype, r, i), n && e(t, n, o), t;
        };
      }();
  return {
    setters: [function(e) {
      r = e.computedFrom;
    }],
    execute: function() {
      n = function() {
        function e() {
          t(this, e), this.heading = "Welcome to the Aurelia Navigation App!", this.firstName = "John", this.lastName = "Doe", this.previousValue = this.fullName;
        }
        return a(e, [{
          key: "submit",
          value: function() {
            this.previousValue = this.fullName, alert("Welcome, " + this.fullName + "!");
          }
        }, {
          key: "canDeactivate",
          value: function() {
            return this.fullName !== this.previousValue ? confirm("Are you sure you want to leave?") : void 0;
          }
        }, {
          key: "fullName",
          decorators: [r("firstName", "lastName")],
          get: function() {
            return this.firstName + " " + this.lastName;
          }
        }]), e;
      }(), e("Welcome", n), i = function() {
        function e() {
          t(this, e);
        }
        return o(e, [{
          key: "toView",
          value: function(e) {
            return e && e.toUpperCase();
          }
        }]), e;
      }(), e("UpperValueConverter", i);
    }
  };
});

System.register("views/index/flickr", ["github:aurelia/framework@0.13.4", "github:aurelia/http-client@0.10.2"], function(t) {
  "use strict";
  function e(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  var n,
      i,
      r,
      a = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e;
        };
      }();
  return {
    setters: [function(t) {
      n = t.inject;
    }, function(t) {
      i = t.HttpClient;
    }],
    execute: function() {
      r = function() {
        function t(t) {
          e(this, r), this.heading = "Flickr", this.images = [], this.url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=rainier&tagmode=any&format=json", this.http = t;
        }
        a(t, [{
          key: "activate",
          value: function() {
            var t = this;
            return this.http.jsonp(this.url).then(function(e) {
              t.images = e.content.items;
            });
          }
        }]);
        var r = t;
        return t = n(i)(t) || t;
      }(), t("Flickr", r);
    }
  };
});

System.register("views/index/components/nav-bar", ["github:aurelia/framework@0.13.4"], function(e) {
  "use strict";
  function r(e, r) {
    if (!(e instanceof r))
      throw new TypeError("Cannot call a class as a function");
  }
  function t(e, r, t) {
    var i = t[r];
    if (i) {
      var n = {};
      for (var o in i)
        n[o] = i[o];
      n.value = n.initializer ? n.initializer.call(e) : void 0, Object.defineProperty(e, r, n);
    }
  }
  var i,
      n,
      o = function() {
        function e(e, r, t) {
          for (var i = 0; i < r.length; i++) {
            var n = r[i],
                o = n.decorators,
                a = n.key;
            if (delete n.key, delete n.decorators, n.enumerable = n.enumerable || !1, n.configurable = !0, ("value" in n || n.initializer) && (n.writable = !0), o) {
              for (var u = 0; u < o.length; u++) {
                var f = o[u];
                if ("function" != typeof f)
                  throw new TypeError("The decorator for method " + n.key + " is of the invalid type " + typeof f);
                n = f(e, a, n) || n;
              }
              if (void 0 !== n.initializer) {
                t[a] = n;
                continue;
              }
            }
            Object.defineProperty(e, a, n);
          }
        }
        return function(r, t, i, n, o) {
          return t && e(r.prototype, t, n), i && e(r, i, o), r;
        };
      }();
  return {
    setters: [function(e) {
      i = e.bindable;
    }],
    execute: function() {
      n = function() {
        function e() {
          r(this, e), t(this, "router", n);
        }
        var n = {};
        return o(e, [{
          key: "router",
          decorators: [i],
          initializer: function() {
            return {};
          },
          enumerable: !0
        }], null, n), e;
      }(), e("NavBar", n);
    }
  };
});

System.register("views/index/child-router", [], function(e) {
  "use strict";
  function t(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var r,
      n = function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      }();
  return {
    setters: [],
    execute: function() {
      r = function() {
        function e() {
          t(this, e), this.heading = "Child Router";
        }
        return n(e, [{
          key: "configureRouter",
          value: function(e, t) {
            e.map([{
              route: ["", "welcome"],
              name: "welcome",
              moduleId: "./welcome",
              nav: !0,
              title: "Welcome"
            }, {
              route: "flickr",
              name: "flickr",
              moduleId: "./flickr",
              nav: !0,
              title: "Flickr"
            }, {
              route: "child-router",
              name: "child-router",
              moduleId: "./child-router",
              nav: !0,
              title: "Child Router"
            }]), this.router = t;
          }
        }]), e;
      }(), e("ChildRouter", r);
    }
  };
});

(function() {
function define(){};  define.amd = {};
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document ? factory(global, true) : function(w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var arr = [];
  var slice = arr.slice;
  var concat = arr.concat;
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var document = window.document,
      version = "2.1.4",
      jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      },
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback, args) {
      return jQuery.each(this, callback, args);
    },
    map: function(callback) {
      return this.pushStack(jQuery.map(this, function(elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor(null);
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray: Array.isArray,
    isWindow: function(obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function(obj) {
      return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
    },
    isPlainObject: function(obj) {
      if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
      return true;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
    },
    globalEval: function(code) {
      var script,
          indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf("use strict") === 1) {
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function(obj, callback, args) {
      var value,
          i = 0,
          length = obj.length,
          isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    merge: function(first, second) {
      var len = +second.length,
          j = 0,
          i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var value,
          i = 0,
          length = elems.length,
          isArray = isArraylike(elems),
          ret = [];
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var tmp,
          args,
          proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: Date.now,
    support: support
  });
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArraylike(obj) {
    var length = "length" in obj && obj.length,
        type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }
  var Sizzle = (function(window) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function(a, b) {
          if (a === b) {
            hasDuplicate = true;
          }
          return 0;
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function(list, elem) {
          var i = 0,
              len = list.length;
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i;
            }
          }
          return -1;
        },
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        whitespace = "[\\x20\\t\\r\\n\\f]",
        characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        identifier = characterEncoding.replace("w", "w#"),
        attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
        pseudos = ":(" + characterEncoding + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)",
        rwhitespace = new RegExp(whitespace + "+", "g"),
        rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
        rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
        rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
        rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp("^" + identifier + "$"),
        matchExpr = {
          "ID": new RegExp("^#(" + characterEncoding + ")"),
          "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
          "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
          "ATTR": new RegExp("^" + attributes),
          "PSEUDO": new RegExp("^" + pseudos),
          "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
          "bool": new RegExp("^(?:" + booleans + ")$", "i"),
          "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
        funescape = function(_, escaped, escapedWhitespace) {
          var high = "0x" + escaped - 0x10000;
          return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        },
        unloadHandler = function() {
          setDocument();
        };
    try {
      push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {apply: arr.length ? function(target, els) {
          push_native.apply(target, slice.call(els));
        } : function(target, els) {
          var j = target.length,
              i = 0;
          while ((target[j++] = els[i++])) {}
          target.length = j - 1;
        }};
    }
    function Sizzle(selector, context, results, seed) {
      var match,
          elem,
          m,
          nodeType,
          i,
          groups,
          old,
          nid,
          newContext,
          newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context);
      }
      context = context || document;
      results = results || [];
      nodeType = context.nodeType;
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      if (!seed && documentIsHTML) {
        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
          if ((m = match[1])) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
          } else if ((m = match[3]) && support.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType !== 1 && selector;
          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
            groups = tokenize(selector);
            if ((old = context.getAttribute("id"))) {
              nid = old.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {} finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
          i = attrs.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = doc.documentElement;
      parent = doc.defaultView;
      if (parent && parent !== parent.top) {
        if (parent.addEventListener) {
          parent.addEventListener("unload", unloadHandler, false);
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", unloadHandler);
        }
      }
      documentIsHTML = !isXML(doc);
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(doc.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName = rnative.test(doc.getElementsByClassName);
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function(tag, context) {
        var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);
        if (tag === "*") {
          while ((elem = results[i++])) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
        if (documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(doc.querySelectorAll))) {
        assert(function(div) {
          docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>";
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
            rbuggyQSA.push("~=");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
          if (!div.querySelectorAll("a#" + expando + "+*").length) {
            rbuggyQSA.push(".#.+[+~]");
          }
        });
        assert(function(div) {
          var input = doc.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function(a, b) {
        if (b) {
          while ((b = b.parentNode)) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      sortOrder = hasCompare ? function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
        if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
          if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function(a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];
        if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while ((cur = cur.parentNode)) {
          ap.unshift(cur);
        }
        cur = b;
        while ((cur = cur.parentNode)) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return doc;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
          duplicates = [],
          j = 0,
          i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
          ret = "",
          i = 0,
          nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {dir: "parentNode"},
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        "ATTR": function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        "CHILD": function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        "PSEUDO": function(match) {
          var excess,
              unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        "TAG": function(nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function() {
            return true;
          } : function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        "CLASS": function(className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        "ATTR": function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
          };
        },
        "CHILD": function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
              forward = type.slice(-4) !== "last",
              ofType = what === "of-type";
          return first === 1 && last === 0 ? function(elem) {
            return !!elem.parentNode;
          } : function(elem, context, xml) {
            var cache,
                outerCache,
                node,
                diff,
                nodeIndex,
                start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while ((node = node[dir])) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                diff = cache[1];
              } else {
                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                    if (useCache) {
                      (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                    }
                    if (node === elem) {
                      break;
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || (diff % first === 0 && diff / first >= 0);
            }
          };
        },
        "PSEUDO": function(pseudo, argument) {
          var args,
              fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
              var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function(elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        "not": markFunction(function(selector) {
          var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
            var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;
            while (i--) {
              if ((elem = unmatched[i])) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function(elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            input[0] = null;
            return !results.pop();
          };
        }),
        "has": markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        "contains": markFunction(function(text) {
          text = text.replace(runescape, funescape);
          return function(elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        "lang": markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        "target": function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        "root": function(elem) {
          return elem === docElem;
        },
        "focus": function(elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        "enabled": function(elem) {
          return elem.disabled === false;
        },
        "disabled": function(elem) {
          return elem.disabled === true;
        },
        "checked": function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },
        "selected": function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        "empty": function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        "parent": function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        "header": function(elem) {
          return rheader.test(elem.nodeName);
        },
        "input": function(elem) {
          return rinputs.test(elem.nodeName);
        },
        "button": function(elem) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },
        "text": function(elem) {
          var attr;
          return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        "first": createPositionalPseudo(function() {
          return [0];
        }),
        "last": createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        "even": createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "odd": createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
          len = tokens.length,
          selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
          checkNonElements = base && dir === "parentNode",
          doneName = done++;
      return combinator.first ? function(elem, context, xml) {
        while ((elem = elem[dir])) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function(elem, context, xml) {
        var oldCache,
            outerCache,
            newCache = [dirruns, doneName];
        if (xml) {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while ((elem = elem[dir])) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                return (newCache[2] = oldCache[2]);
              } else {
                outerCache[dir] = newCache;
                if ((newCache[2] = matcher(elem, context, xml))) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
          len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
            matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
            matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[" "],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(function(elem) {
            return elem === checkContext;
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function(elem) {
            return indexOf(checkContext, elem) > -1;
          }, implicitRelative, true),
          matchers = [function(elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({value: tokens[i - 2].type === " " ? "*" : ""})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function(seed, context, xml, results, outermost) {
            var elem,
                j,
                matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;
            if (outermost) {
              outermostContext = context !== document && context;
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0;
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context, xml)) {
                    results.push(elem);
                    break;
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique;
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--;
                }
                if (seed) {
                  unmatched.push(elem);
                }
              }
            }
            matchedCount += i;
            if (bySet && i !== matchedCount) {
              j = 0;
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml);
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results);
                    }
                  }
                }
                setMatched = condense(setMatched);
              }
              push.apply(results, setMatched);
              if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                Sizzle.uniqueSort(results);
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique;
              outermostContext = contextBackup;
            }
            return unmatched;
          };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === "function" && selector,
          match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (!assert(function(div) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#";
    })) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (!support.attributes || !assert(function(div) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute("value", "");
      return div.firstChild.getAttribute("value") === "";
    })) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (!assert(function(div) {
      return div.getAttribute("disabled") == null;
    })) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return (indexOf.call(qualifier, elem) >= 0) !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
          len = this.length,
          ret = [],
          self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });
  var rootjQuery,
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      init = jQuery.fn.init = function(selector, context) {
        var match,
            elem;
        if (!selector) {
          return this;
        }
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document.getElementById(match[2]);
              if (elem && elem.parentNode) {
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || rootjQuery).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;
        } else if (jQuery.isFunction(selector)) {
          return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
  jQuery.extend({
    dir: function(elem, dir, until) {
      var matched = [],
          truncate = until !== undefined;
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    },
    sibling: function(n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    }
  });
  jQuery.fn.extend({
    has: function(target) {
      var targets = jQuery(target, this),
          l = targets.length;
      return this.filter(function() {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
    },
    index: function(elem) {
      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
      }
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function(selector, context) {
      return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function(elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
      return jQuery.dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
      return jQuery.dir(elem, "parentNode", until);
    },
    next: function(elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
      return jQuery.dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
      return jQuery.dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function(elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.unique(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnotwhite = (/\S+/g);
  var optionsCache = {};
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
    var memory,
        fired,
        firing,
        firingStart,
        firingLength,
        firingIndex,
        list = [],
        stack = !options.once && [],
        fire = function(data) {
          memory = options.memory && data;
          fired = true;
          firingIndex = firingStart || 0;
          firingStart = 0;
          firingLength = list.length;
          firing = true;
          for (; list && firingIndex < firingLength; firingIndex++) {
            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
              memory = false;
              break;
            }
          }
          firing = false;
          if (list) {
            if (stack) {
              if (stack.length) {
                fire(stack.shift());
              }
            } else if (memory) {
              list = [];
            } else {
              self.disable();
            }
          }
        },
        self = {
          add: function() {
            if (list) {
              var start = list.length;
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  var type = jQuery.type(arg);
                  if (type === "function") {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && type !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (firing) {
                firingLength = list.length;
              } else if (memory) {
                firingStart = start;
                fire(memory);
              }
            }
            return this;
          },
          remove: function() {
            if (list) {
              jQuery.each(arguments, function(_, arg) {
                var index;
                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);
                  if (firing) {
                    if (index <= firingLength) {
                      firingLength--;
                    }
                    if (index <= firingIndex) {
                      firingIndex--;
                    }
                  }
                }
              });
            }
            return this;
          },
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
          },
          empty: function() {
            list = [];
            firingLength = 0;
            return this;
          },
          disable: function() {
            list = stack = memory = undefined;
            return this;
          },
          disabled: function() {
            return !list;
          },
          lock: function() {
            stack = undefined;
            if (!memory) {
              self.disable();
            }
            return this;
          },
          locked: function() {
            return !stack;
          },
          fireWith: function(context, args) {
            if (list && (!fired || stack)) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              if (firing) {
                stack.push(args);
              } else {
                fire(args);
              }
            }
            return this;
          },
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          fired: function() {
            return !!fired;
          }
        };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },
          progressValues,
          progressContexts,
          resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return ;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return ;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed, false);
    window.removeEventListener("load", completed, false);
    jQuery.ready();
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete") {
        setTimeout(jQuery.ready);
      } else {
        document.addEventListener("DOMContentLoaded", completed, false);
        window.addEventListener("load", completed, false);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.ready.promise();
  var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
        len = elems.length,
        bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
  };
  jQuery.acceptData = function(owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
  };
  function Data() {
    Object.defineProperty(this.cache = {}, 0, {get: function() {
        return {};
      }});
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.accepts = jQuery.acceptData;
  Data.prototype = {
    key: function(owner) {
      if (!Data.accepts(owner)) {
        return 0;
      }
      var descriptor = {},
          unlock = owner[this.expando];
      if (!unlock) {
        unlock = Data.uid++;
        try {
          descriptor[this.expando] = {value: unlock};
          Object.defineProperties(owner, descriptor);
        } catch (e) {
          descriptor[this.expando] = unlock;
          jQuery.extend(owner, descriptor);
        }
      }
      if (!this.cache[unlock]) {
        this.cache[unlock] = {};
      }
      return unlock;
    },
    set: function(owner, data, value) {
      var prop,
          unlock = this.key(owner),
          cache = this.cache[unlock];
      if (typeof data === "string") {
        cache[data] = value;
      } else {
        if (jQuery.isEmptyObject(cache)) {
          jQuery.extend(this.cache[unlock], data);
        } else {
          for (prop in data) {
            cache[prop] = data[prop];
          }
        }
      }
      return cache;
    },
    get: function(owner, key) {
      var cache = this.cache[this.key(owner)];
      return key === undefined ? cache : cache[key];
    },
    access: function(owner, key, value) {
      var stored;
      if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
        stored = this.get(owner, key);
        return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function(owner, key) {
      var i,
          name,
          camel,
          unlock = this.key(owner),
          cache = this.cache[unlock];
      if (key === undefined) {
        this.cache[unlock] = {};
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [key, camel];
          } else {
            name = camel;
            name = name in cache ? [name] : (name.match(rnotwhite) || []);
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
    },
    hasData: function(owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
    },
    discard: function(owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]];
      }
    }
  };
  var data_priv = new Data();
  var data_user = new Data();
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /([A-Z])/g;
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
        } catch (e) {}
        data_user.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function(elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    data: function(elem, name, data) {
      return data_user.access(elem, name, data);
    },
    removeData: function(elem, name) {
      data_user.remove(elem, name);
    },
    _data: function(elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    _removeData: function(elem, name) {
      data_priv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
          name,
          data,
          elem = this[0],
          attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = data_user.get(elem);
          if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            data_priv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          data_user.set(this, key);
        });
      }
      return access(this, function(value) {
        var data,
            camelKey = jQuery.camelCase(key);
        if (elem && value === undefined) {
          data = data_user.get(elem, key);
          if (data !== undefined) {
            return data;
          }
          data = data_user.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return ;
        }
        this.each(function() {
          var data = data_user.get(this, camelKey);
          data_user.set(this, camelKey, value);
          if (key.indexOf("-") !== -1 && data !== undefined) {
            data_user.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function(key) {
      return this.each(function() {
        data_user.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = data_priv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = data_priv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return data_priv.get(elem, key) || data_priv.access(elem, key, {empty: jQuery.Callbacks("once memory").add(function() {
          data_priv.remove(elem, [type + "queue", key]);
        })});
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = data_priv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
  };
  var rcheckableType = (/^(?:checkbox|radio)$/i);
  (function() {
    var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
  })();
  var strundefined = typeof undefined;
  support.focusinBubbles = "onfocusin" in window;
  var rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
      rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var handleObjIn,
          eventHandle,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = data_priv.get(elem);
      if (!elemData) {
        return ;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
          origCount,
          tmp,
          events,
          t,
          handleObj,
          special,
          handlers,
          type,
          namespaces,
          origType,
          elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return ;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        data_priv.remove(elem, "events");
      }
    },
    trigger: function(event, data, elem, onlyHandlers) {
      var i,
          cur,
          tmp,
          bubbleType,
          ontype,
          handle,
          special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return ;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return ;
      }
      if (type.indexOf(".") >= 0) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return ;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && jQuery.acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
          j,
          ret,
          matched,
          handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (data_priv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return ;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var i,
          matches,
          sel,
          handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== "click") {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(event, original) {
        var eventDoc,
            doc,
            body,
            button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
        }
        return event;
      }
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
          prop,
          copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: {noBubble: true},
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }}
    },
    simulate: function(type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true,
        originalEvent: {}
      });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = function(elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function(event) {
        var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  if (!support.focusinBubbles) {
    jQuery.each({
      focus: "focusin",
      blur: "focusout"
    }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
              attaches = data_priv.access(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          data_priv.access(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
              attaches = data_priv.access(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            data_priv.remove(doc, fix);
          } else {
            data_priv.access(doc, fix, attaches);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function(types, selector, data, fn, one) {
      var origFn,
          type;
      if (typeof types === "object") {
        if (typeof selector !== "string") {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === "string") {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function(event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function(types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj,
          type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      rtagName = /<([\w:]+)/,
      rhtml = /<|&#?\w+;/,
      rnoInnerhtml = /<(?:script|style|link)/i,
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptType = /^$|\/(?:java|ecma)script/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function setGlobalEval(elems, refElements) {
    var i = 0,
        l = elems.length;
    for (; i < l; i++) {
      data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"));
    }
  }
  function cloneCopyEvent(src, dest) {
    var i,
        l,
        type,
        pdataOld,
        pdataCur,
        udataOld,
        udataCur,
        events;
    if (dest.nodeType !== 1) {
      return ;
    }
    if (data_priv.hasData(src)) {
      pdataOld = data_priv.access(src);
      pdataCur = data_priv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (data_user.hasData(src)) {
      udataOld = data_user.access(src);
      udataCur = jQuery.extend({}, udataOld);
      data_user.set(dest, udataCur);
    }
  }
  function getAll(context, tag) {
    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  jQuery.extend({
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var i,
          l,
          srcElements,
          destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      return clone;
    },
    buildFragment: function(elems, context, scripts, selection) {
      var elem,
          tmp,
          tag,
          wrap,
          contains,
          j,
          fragment = context.createDocumentFragment(),
          nodes = [],
          i = 0,
          l = elems.length;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (jQuery.type(elem) === "object") {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = "";
          }
        }
      }
      fragment.textContent = "";
      i = 0;
      while ((elem = nodes[i++])) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        tmp = getAll(fragment.appendChild(elem), "script");
        if (contains) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while ((elem = tmp[j++])) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    },
    cleanData: function(elems) {
      var data,
          elem,
          type,
          key,
          special = jQuery.event.special,
          i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (jQuery.acceptData(elem)) {
          key = elem[data_priv.expando];
          if (key && (data = data_priv.cache[key])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (data_priv.cache[key]) {
              delete data_priv.cache[key];
            }
          }
        }
        delete data_user.cache[elem[data_user.expando]];
      }
    }
  });
  jQuery.fn.extend({
    text: function(value) {
      return access(this, function(value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function() {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function() {
      return this.domManip(arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return this.domManip(arguments, function(elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove: function(selector, keepData) {
      var elem,
          elems = selector ? jQuery.filter(selector, this) : this,
          i = 0;
      for (; (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, "script"));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty: function() {
      var elem,
          i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(this, function(value) {
        var elem = this[0] || {},
            i = 0,
            l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function() {
      var arg = arguments[0];
      this.domManip(arguments, function(elem) {
        arg = this.parentNode;
        jQuery.cleanData(getAll(this));
        if (arg) {
          arg.replaceChild(elem, this);
        }
      });
      return arg && (arg.length || arg.nodeType) ? this : this.remove();
    },
    detach: function(selector) {
      return this.remove(selector, true);
    },
    domManip: function(args, callback) {
      args = concat.apply([], args);
      var fragment,
          first,
          scripts,
          hasScripts,
          node,
          doc,
          i = 0,
          l = this.length,
          set = this,
          iNoClone = l - 1,
          value = args[0],
          isFunction = jQuery.isFunction(value);
      if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
        return this.each(function(index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          self.domManip(args, callback);
        });
      }
      if (l) {
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, "script"));
              }
            }
            callback.call(this[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                if (node.src) {
                  if (jQuery._evalUrl) {
                    jQuery._evalUrl(node.src);
                  }
                } else {
                  jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                }
              }
            }
          }
        }
      }
      return this;
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(name, original) {
    jQuery.fn[name] = function(selector) {
      var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var iframe,
      elemdisplay = {};
  function actualDisplay(name, doc) {
    var style,
        elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
        doc = iframe[0].contentDocument;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  var rmargin = (/^margin/);
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles = function(elem) {
    if (elem.ownerDocument.defaultView.opener) {
      return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    }
    return window.getComputedStyle(elem, null);
  };
  function curCSS(elem, name, computed) {
    var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
    computed = computed || getStyles(elem);
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name];
    }
    if (computed) {
      if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ? ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {get: function() {
        if (conditionFn()) {
          delete this.get;
          return ;
        }
        return (this.get = hookFn).apply(this, arguments);
      }};
  }
  (function() {
    var pixelPositionVal,
        boxSizingReliableVal,
        docElem = document.documentElement,
        container = document.createElement("div"),
        div = document.createElement("div");
    if (!div.style) {
      return ;
    }
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" + "position:absolute";
    container.appendChild(div);
    function computePixelPositionAndBoxSizingReliable() {
      div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" + "box-sizing:border-box;display:block;margin-top:1%;top:1%;" + "border:1px;padding:1px;width:4px;position:absolute";
      div.innerHTML = "";
      docElem.appendChild(container);
      var divStyle = window.getComputedStyle(div, null);
      pixelPositionVal = divStyle.top !== "1%";
      boxSizingReliableVal = divStyle.width === "4px";
      docElem.removeChild(container);
    }
    if (window.getComputedStyle) {
      jQuery.extend(support, {
        pixelPosition: function() {
          computePixelPositionAndBoxSizingReliable();
          return pixelPositionVal;
        },
        boxSizingReliable: function() {
          if (boxSizingReliableVal == null) {
            computePixelPositionAndBoxSizingReliable();
          }
          return boxSizingReliableVal;
        },
        reliableMarginRight: function() {
          var ret,
              marginDiv = div.appendChild(document.createElement("div"));
          marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" + "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
          marginDiv.style.marginRight = marginDiv.style.width = "0";
          div.style.width = "1px";
          docElem.appendChild(container);
          ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
          docElem.removeChild(container);
          div.removeChild(marginDiv);
          return ret;
        }
      });
    }
  })();
  jQuery.swap = function(elem, options, callback, args) {
    var ret,
        name,
        old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
      rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },
      cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name[0].toUpperCase() + name.slice(1),
        origName = name,
        i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
        val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
  }
  function showHide(elements, show) {
    var display,
        elem,
        hidden,
        values = [],
        index = 0,
        length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = data_priv.get(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
        }
      } else {
        hidden = isHidden(elem);
        if (display !== "none" || !hidden) {
          data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  jQuery.extend({
    cssHooks: {opacity: {get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }}},
    cssNumber: {
      "columnCount": true,
      "fillOpacity": true,
      "flexGrow": true,
      "flexShrink": true,
      "fontWeight": true,
      "lineHeight": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "widows": true,
      "zIndex": true,
      "zoom": true
    },
    cssProps: {"float": "cssFloat"},
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return ;
      }
      var ret,
          type,
          hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = "number";
        }
        if (value == null || value !== value) {
          return ;
        }
        if (type === "number" && !jQuery.cssNumber[origName]) {
          value += "px";
        }
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var val,
          num,
          hooks,
          origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0);
      }
    };
  });
  jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
    if (computed) {
      return jQuery.swap(elem, {"display": "inline-block"}, curCSS, [elem, "marginRight"]);
    }
  });
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {expand: function(value) {
        var i = 0,
            expanded = {},
            parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }};
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(this, function(elem, name, value) {
        var styles,
            len,
            map = {},
            i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || "swing";
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
          hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {_default: {
      get: function(tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }};
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }};
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
      timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
      rrun = /queueHooks$/,
      animationPrefilters = [defaultPrefilter],
      tweeners = {"*": [function(prop, value) {
          var tween = this.createTween(prop, value),
              target = tween.cur(),
              parts = rfxnum.exec(value),
              unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
              start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
              scale = 1,
              maxIterations = 20;
          if (start && start[3] !== unit) {
            unit = unit || start[3];
            parts = parts || [];
            start = +target || 1;
            do {
              scale = scale || ".5";
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit);
            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
          }
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
          }
          return tween;
        }]};
  function createFxNow() {
    setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
        i = 0,
        attrs = {height: type};
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
        collection = (tweeners[prop] || []).concat(tweeners["*"]),
        index = 0,
        length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
        value,
        toggle,
        tween,
        hooks,
        oldfire,
        display,
        checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = data_priv.get(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay = display === "none" ? data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        style.display = "inline-block";
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function() {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = data_priv.access(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        data_priv.remove(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index,
        name,
        easing,
        value,
        hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
        stopped,
        index = 0,
        length = animationPrefilters.length,
        deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
              remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
              temp = remaining / animation.duration || 0,
              percent = 1 - temp,
              index = 0,
              length = animation.tweens.length;
          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {specialEasing: {}}, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
                length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }
            if (gotoEnd) {
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.split(" ");
      }
      var prop,
          index = 0,
          length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function(callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: to}, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || data_priv.get(this, "finish")) {
              anim.stop(true);
            }
          };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = data_priv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
            data = data_priv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function(name, props) {
    jQuery.fn[name] = function(speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
        i = 0,
        timers = jQuery.timers;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = setTimeout(next, time);
      hooks.stop = function() {
        clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";
    support.checkOn = input.value !== "";
    support.optSelected = opt.selected;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var nodeHook,
      boolHook,
      attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var hooks,
          ret,
          nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return ;
      }
      if (typeof elem.getAttribute === strundefined) {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
        } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + "");
          return value;
        }
      } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = jQuery.find.attr(elem, name);
        return ret == null ? undefined : ret;
      }
    },
    removeAttr: function(elem, value) {
      var name,
          propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
    attrHooks: {type: {set: function(elem, value) {
          if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }}}
  });
  boolHook = {set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }};
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function(elem, name, isXML) {
      var ret,
          handle;
      if (!isXML) {
        handle = attrHandle[name];
        attrHandle[name] = ret;
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
        attrHandle[name] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      return this.each(function() {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(elem, name, value) {
      var ret,
          hooks,
          notxml,
          nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return ;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value);
      } else {
        return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
      }
    },
    propHooks: {tabIndex: {get: function(elem) {
          return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
        }}}
  });
  if (!support.optSelected) {
    jQuery.propHooks.selected = {get: function(elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }};
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
          elem,
          cur,
          clazz,
          j,
          finalValue,
          proceed = typeof value === "string" && value,
          i = 0,
          len = this.length;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || "").match(rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
          elem,
          cur,
          clazz,
          j,
          finalValue,
          proceed = arguments.length === 0 || typeof value === "string" && value,
          i = 0,
          len = this.length;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || "").match(rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") >= 0) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = value ? jQuery.trim(cur) : "";
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function() {
        if (type === "string") {
          var className,
              i = 0,
              self = jQuery(this),
              classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (type === strundefined || type === "boolean") {
          if (this.className) {
            data_priv.set(this, "__className__", this.className);
          }
          this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
        }
      });
    },
    hasClass: function(selector) {
      var className = " " + selector + " ",
          i = 0,
          l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({val: function(value) {
      var hooks,
          ret,
          isFunction,
          elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
        }
        return ;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return ;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }});
  jQuery.extend({valHooks: {
      option: {get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : jQuery.trim(jQuery.text(elem));
        }},
      select: {
        get: function(elem) {
          var value,
              option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
              option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;
          while (i--) {
            option = options[i];
            if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }});
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
        }
      }};
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
    jQuery.fn[name] = function(data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }
  });
  var nonce = jQuery.now();
  var rquery = (/\?/);
  jQuery.parseJSON = function(data) {
    return JSON.parse(data + "");
  };
  jQuery.parseXML = function(data) {
    var xml,
        tmp;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      tmp = new DOMParser();
      xml = tmp.parseFromString(data, "text/xml");
    } catch (e) {
      xml = undefined;
    }
    if (!xml || xml.getElementsByTagName("parsererror").length) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      prefilters = {},
      transports = {},
      allTypes = "*/".concat("*"),
      ajaxLocation = window.location.href,
      ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
        seekingTransport = (structure === transports);
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  function ajaxExtend(target, src) {
    var key,
        deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
        type,
        finalDataType,
        firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
        current,
        conv,
        tmp,
        prev,
        converters = {},
        dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s["throws"]) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: "GET",
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport,
          cacheURL,
          responseHeadersString,
          responseHeaders,
          timeoutTimer,
          parts,
          fireGlobals,
          i,
          s = jQuery.ajaxSetup({}, options),
          callbackContext = s.context || s,
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          statusCode = s.statusCode || {},
          requestHeaders = {},
          requestHeadersNames = {},
          state = 0,
          strAbort = "canceled",
          jqXHR = {
            readyState: 0,
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))));
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = jQuery.event && s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
            success,
            error,
            response,
            modified,
            statusText = nativeStatusText;
        if (state === 2) {
          return ;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!(--jQuery.active)) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function() {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
            contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
  };
  jQuery.expr.filters.visible = function(elem) {
    return !jQuery.expr.filters.hidden(elem);
  };
  var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
        s = [],
        add = function(key, value) {
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var type = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, "\r\n")
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  jQuery.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
  };
  var xhrId = 0,
      xhrCallbacks = {},
      xhrSuccessStatus = {
        0: 200,
        1223: 204
      },
      xhrSupported = jQuery.ajaxSettings.xhr();
  if (window.attachEvent) {
    window.attachEvent("onunload", function() {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key]();
      }
    });
  }
  support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function(options) {
    var callback;
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function(headers, complete) {
          var i,
              xhr = options.xhr(),
              id = ++xhrId;
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function(type) {
            return function() {
              if (callback) {
                delete xhrCallbacks[id];
                callback = xhr.onload = xhr.onerror = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  complete(xhr.status, xhr.statusText);
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {text: xhr.responseText} : undefined, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          xhr.onerror = callback("error");
          callback = xhrCallbacks[id] = callback("abort");
          try {
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            if (callback) {
              throw e;
            }
          }
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  jQuery.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /(?:java|ecma)script/},
    converters: {"text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }}
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
          callback;
      return {
        send: function(_, complete) {
          script = jQuery("<script>").prop({
            async: true,
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function(evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function() {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
        overwritten,
        responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = jQuery.buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
        type,
        response,
        self = this,
        off = url.indexOf(" ");
    if (off >= 0) {
      selector = jQuery.trim(url.slice(off));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type,
        dataType: "html",
        data: params
      }).done(function(responseText) {
        response = arguments;
        self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).complete(callback && function(jqXHR, status) {
        self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
      });
    }
    return this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
    jQuery.fn[type] = function(fn) {
      return this.on(type, fn);
    };
  });
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  var docElem = window.document.documentElement;
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.offset = {setOffset: function(elem, options, i) {
      var curPosition,
          curLeft,
          curCSSTop,
          curTop,
          curOffset,
          curCSSLeft,
          calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = (options.top - curOffset.top) + curTop;
      }
      if (options.left != null) {
        props.left = (options.left - curOffset.left) + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }};
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined ? this : this.each(function(i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var docElem,
          win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;
      if (!doc) {
        return ;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      if (typeof elem.getBoundingClientRect !== strundefined) {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      };
    },
    position: function() {
      if (!this[0]) {
        return ;
      }
      var offsetParent,
          offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || docElem;
        while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function(val) {
      return access(this, function(elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function(name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function(defaultExtra, funcName) {
      jQuery.fn[funcName] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function(elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement["client" + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.size = function() {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    System.register("github:components/jquery@2.1.4/jquery", [], false, function(__require, __exports, __module) {
      return (function() {
        return jQuery;
      }).call(this);
    });
  }
  var _jQuery = window.jQuery,
      _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (typeof noGlobal === strundefined) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
}));
})();
(function() {
function define(){};  define.amd = {};
System.register("github:components/jquery@2.1.4", ["github:components/jquery@2.1.4/jquery"], false, function(__require, __exports, __module) {
  return (function(main) {
    return main;
  }).call(this, __require('github:components/jquery@2.1.4/jquery'));
});
})();
System.register("github:twbs/bootstrap@3.3.5/js/bootstrap", ["github:components/jquery@2.1.4"], false, function(__require, __exports, __module) {
  System.get("@@global-helpers").prepareGlobal(__module.id, ["github:components/jquery@2.1.4"]);
  (function() {
    "format global";
    "deps jquery";
    "exports $";
    if (typeof jQuery === 'undefined') {
      throw new Error('Bootstrap\'s JavaScript requires jQuery');
    }
    +function($) {
      'use strict';
      var version = $.fn.jquery.split(' ')[0].split('.');
      if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
      }
    }(jQuery);
    +function($) {
      'use strict';
      function transitionEnd() {
        var el = document.createElement('bootstrap');
        var transEndEventNames = {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend',
          transition: 'transitionend'
        };
        for (var name in transEndEventNames) {
          if (el.style[name] !== undefined) {
            return {end: transEndEventNames[name]};
          }
        }
        return false;
      }
      $.fn.emulateTransitionEnd = function(duration) {
        var called = false;
        var $el = this;
        $(this).one('bsTransitionEnd', function() {
          called = true;
        });
        var callback = function() {
          if (!called)
            $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
      };
      $(function() {
        $.support.transition = transitionEnd();
        if (!$.support.transition)
          return ;
        $.event.special.bsTransitionEnd = {
          bindType: $.support.transition.end,
          delegateType: $.support.transition.end,
          handle: function(e) {
            if ($(e.target).is(this))
              return e.handleObj.handler.apply(this, arguments);
          }
        };
      });
    }(jQuery);
    +function($) {
      'use strict';
      var dismiss = '[data-dismiss="alert"]';
      var Alert = function(el) {
        $(el).on('click', dismiss, this.close);
      };
      Alert.VERSION = '3.3.5';
      Alert.TRANSITION_DURATION = 150;
      Alert.prototype.close = function(e) {
        var $this = $(this);
        var selector = $this.attr('data-target');
        if (!selector) {
          selector = $this.attr('href');
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = $(selector);
        if (e)
          e.preventDefault();
        if (!$parent.length) {
          $parent = $this.closest('.alert');
        }
        $parent.trigger(e = $.Event('close.bs.alert'));
        if (e.isDefaultPrevented())
          return ;
        $parent.removeClass('in');
        function removeElement() {
          $parent.detach().trigger('closed.bs.alert').remove();
        }
        $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.alert');
          if (!data)
            $this.data('bs.alert', (data = new Alert(this)));
          if (typeof option == 'string')
            data[option].call($this);
        });
      }
      var old = $.fn.alert;
      $.fn.alert = Plugin;
      $.fn.alert.Constructor = Alert;
      $.fn.alert.noConflict = function() {
        $.fn.alert = old;
        return this;
      };
      $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
    }(jQuery);
    +function($) {
      'use strict';
      var Button = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Button.DEFAULTS, options);
        this.isLoading = false;
      };
      Button.VERSION = '3.3.5';
      Button.DEFAULTS = {loadingText: 'loading...'};
      Button.prototype.setState = function(state) {
        var d = 'disabled';
        var $el = this.$element;
        var val = $el.is('input') ? 'val' : 'html';
        var data = $el.data();
        state += 'Text';
        if (data.resetText == null)
          $el.data('resetText', $el[val]());
        setTimeout($.proxy(function() {
          $el[val](data[state] == null ? this.options[state] : data[state]);
          if (state == 'loadingText') {
            this.isLoading = true;
            $el.addClass(d).attr(d, d);
          } else if (this.isLoading) {
            this.isLoading = false;
            $el.removeClass(d).removeAttr(d);
          }
        }, this), 0);
      };
      Button.prototype.toggle = function() {
        var changed = true;
        var $parent = this.$element.closest('[data-toggle="buttons"]');
        if ($parent.length) {
          var $input = this.$element.find('input');
          if ($input.prop('type') == 'radio') {
            if ($input.prop('checked'))
              changed = false;
            $parent.find('.active').removeClass('active');
            this.$element.addClass('active');
          } else if ($input.prop('type') == 'checkbox') {
            if (($input.prop('checked')) !== this.$element.hasClass('active'))
              changed = false;
            this.$element.toggleClass('active');
          }
          $input.prop('checked', this.$element.hasClass('active'));
          if (changed)
            $input.trigger('change');
        } else {
          this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
          this.$element.toggleClass('active');
        }
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.button');
          var options = typeof option == 'object' && option;
          if (!data)
            $this.data('bs.button', (data = new Button(this, options)));
          if (option == 'toggle')
            data.toggle();
          else if (option)
            data.setState(option);
        });
      }
      var old = $.fn.button;
      $.fn.button = Plugin;
      $.fn.button.Constructor = Button;
      $.fn.button.noConflict = function() {
        $.fn.button = old;
        return this;
      };
      $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('btn'))
          $btn = $btn.closest('.btn');
        Plugin.call($btn, 'toggle');
        if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]')))
          e.preventDefault();
      }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
        $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Carousel = function(element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find('.carousel-indicators');
        this.options = options;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));
        this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
      };
      Carousel.VERSION = '3.3.5';
      Carousel.TRANSITION_DURATION = 600;
      Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
      };
      Carousel.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName))
          return ;
        switch (e.which) {
          case 37:
            this.prev();
            break;
          case 39:
            this.next();
            break;
          default:
            return ;
        }
        e.preventDefault();
      };
      Carousel.prototype.cycle = function(e) {
        e || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
        return this;
      };
      Carousel.prototype.getItemIndex = function(item) {
        this.$items = item.parent().children('.item');
        return this.$items.index(item || this.$active);
      };
      Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active);
        var willWrap = (direction == 'prev' && activeIndex === 0) || (direction == 'next' && activeIndex == (this.$items.length - 1));
        if (willWrap && !this.options.wrap)
          return active;
        var delta = direction == 'prev' ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
      };
      Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));
        if (pos > (this.$items.length - 1) || pos < 0)
          return ;
        if (this.sliding)
          return this.$element.one('slid.bs.carousel', function() {
            that.to(pos);
          });
        if (activeIndex == pos)
          return this.pause().cycle();
        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
      };
      Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find('.next, .prev').length && $.support.transition) {
          this.$element.trigger($.support.transition.end);
          this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
      };
      Carousel.prototype.next = function() {
        if (this.sliding)
          return ;
        return this.slide('next');
      };
      Carousel.prototype.prev = function() {
        if (this.sliding)
          return ;
        return this.slide('prev');
      };
      Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active');
        var $next = next || this.getItemForDirection(type, $active);
        var isCycling = this.interval;
        var direction = type == 'next' ? 'left' : 'right';
        var that = this;
        if ($next.hasClass('active'))
          return (this.sliding = false);
        var relatedTarget = $next[0];
        var slideEvent = $.Event('slide.bs.carousel', {
          relatedTarget: relatedTarget,
          direction: direction
        });
        this.$element.trigger(slideEvent);
        if (slideEvent.isDefaultPrevented())
          return ;
        this.sliding = true;
        isCycling && this.pause();
        if (this.$indicators.length) {
          this.$indicators.find('.active').removeClass('active');
          var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
          $nextIndicator && $nextIndicator.addClass('active');
        }
        var slidEvent = $.Event('slid.bs.carousel', {
          relatedTarget: relatedTarget,
          direction: direction
        });
        if ($.support.transition && this.$element.hasClass('slide')) {
          $next.addClass(type);
          $next[0].offsetWidth;
          $active.addClass(direction);
          $next.addClass(direction);
          $active.one('bsTransitionEnd', function() {
            $next.removeClass([type, direction].join(' ')).addClass('active');
            $active.removeClass(['active', direction].join(' '));
            that.sliding = false;
            setTimeout(function() {
              that.$element.trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
        } else {
          $active.removeClass('active');
          $next.addClass('active');
          this.sliding = false;
          this.$element.trigger(slidEvent);
        }
        isCycling && this.cycle();
        return this;
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.carousel');
          var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
          var action = typeof option == 'string' ? option : options.slide;
          if (!data)
            $this.data('bs.carousel', (data = new Carousel(this, options)));
          if (typeof option == 'number')
            data.to(option);
          else if (action)
            data[action]();
          else if (options.interval)
            data.pause().cycle();
        });
      }
      var old = $.fn.carousel;
      $.fn.carousel = Plugin;
      $.fn.carousel.Constructor = Carousel;
      $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
      };
      var clickHandler = function(e) {
        var href;
        var $this = $(this);
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
        if (!$target.hasClass('carousel'))
          return ;
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr('data-slide-to');
        if (slideIndex)
          options.interval = false;
        Plugin.call($target, options);
        if (slideIndex) {
          $target.data('bs.carousel').to(slideIndex);
        }
        e.preventDefault();
      };
      $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
      $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
          var $carousel = $(this);
          Plugin.call($carousel, $carousel.data());
        });
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
        this.transitioning = null;
        if (this.options.parent) {
          this.$parent = this.getParent();
        } else {
          this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        }
        if (this.options.toggle)
          this.toggle();
      };
      Collapse.VERSION = '3.3.5';
      Collapse.TRANSITION_DURATION = 350;
      Collapse.DEFAULTS = {toggle: true};
      Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width');
        return hasWidth ? 'width' : 'height';
      };
      Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in'))
          return ;
        var activesData;
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
        if (actives && actives.length) {
          activesData = actives.data('bs.collapse');
          if (activesData && activesData.transitioning)
            return ;
        }
        var startEvent = $.Event('show.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented())
          return ;
        if (actives && actives.length) {
          Plugin.call(actives, 'hide');
          activesData || actives.data('bs.collapse', null);
        }
        var dimension = this.dimension();
        this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);
        this.$trigger.removeClass('collapsed').attr('aria-expanded', true);
        this.transitioning = 1;
        var complete = function() {
          this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
          this.transitioning = 0;
          this.$element.trigger('shown.bs.collapse');
        };
        if (!$.support.transition)
          return complete.call(this);
        var scrollSize = $.camelCase(['scroll', dimension].join('-'));
        this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
      };
      Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in'))
          return ;
        var startEvent = $.Event('hide.bs.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented())
          return ;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);
        this.$trigger.addClass('collapsed').attr('aria-expanded', false);
        this.transitioning = 1;
        var complete = function() {
          this.transitioning = 0;
          this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
        };
        if (!$.support.transition)
          return complete.call(this);
        this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
      };
      Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
      };
      Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
          var $element = $(element);
          this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
      };
      Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass('in');
        $element.attr('aria-expanded', isOpen);
        $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
      };
      function getTargetFromTrigger($trigger) {
        var href;
        var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '');
        return $(target);
      }
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.collapse');
          var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
          if (!data && options.toggle && /show|hide/.test(option))
            options.toggle = false;
          if (!data)
            $this.data('bs.collapse', (data = new Collapse(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.collapse;
      $.fn.collapse = Plugin;
      $.fn.collapse.Constructor = Collapse;
      $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
      };
      $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        if (!$this.attr('data-target'))
          e.preventDefault();
        var $target = getTargetFromTrigger($this);
        var data = $target.data('bs.collapse');
        var option = data ? 'toggle' : $this.data();
        Plugin.call($target, option);
      });
    }(jQuery);
    +function($) {
      'use strict';
      var backdrop = '.dropdown-backdrop';
      var toggle = '[data-toggle="dropdown"]';
      var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle);
      };
      Dropdown.VERSION = '3.3.5';
      function getParent($this) {
        var selector = $this.attr('data-target');
        if (!selector) {
          selector = $this.attr('href');
          selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        var $parent = selector && $(selector);
        return $parent && $parent.length ? $parent : $this.parent();
      }
      function clearMenus(e) {
        if (e && e.which === 3)
          return ;
        $(backdrop).remove();
        $(toggle).each(function() {
          var $this = $(this);
          var $parent = getParent($this);
          var relatedTarget = {relatedTarget: this};
          if (!$parent.hasClass('open'))
            return ;
          if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target))
            return ;
          $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
          if (e.isDefaultPrevented())
            return ;
          $this.attr('aria-expanded', 'false');
          $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
        });
      }
      Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled'))
          return ;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        clearMenus();
        if (!isActive) {
          if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
            $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
          }
          var relatedTarget = {relatedTarget: this};
          $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
          if (e.isDefaultPrevented())
            return ;
          $this.trigger('focus').attr('aria-expanded', 'true');
          $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
        }
        return false;
      };
      Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName))
          return ;
        var $this = $(this);
        e.preventDefault();
        e.stopPropagation();
        if ($this.is('.disabled, :disabled'))
          return ;
        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');
        if (!isActive && e.which != 27 || isActive && e.which == 27) {
          if (e.which == 27)
            $parent.find(toggle).trigger('focus');
          return $this.trigger('click');
        }
        var desc = ' li:not(.disabled):visible a';
        var $items = $parent.find('.dropdown-menu' + desc);
        if (!$items.length)
          return ;
        var index = $items.index(e.target);
        if (e.which == 38 && index > 0)
          index--;
        if (e.which == 40 && index < $items.length - 1)
          index++;
        if (!~index)
          index = 0;
        $items.eq(index).trigger('focus');
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.dropdown');
          if (!data)
            $this.data('bs.dropdown', (data = new Dropdown(this)));
          if (typeof option == 'string')
            data[option].call($this);
        });
      }
      var old = $.fn.dropdown;
      $.fn.dropdown = Plugin;
      $.fn.dropdown.Constructor = Dropdown;
      $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old;
        return this;
      };
      $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation();
      }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
    }(jQuery);
    +function($) {
      'use strict';
      var Modal = function(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.modal-dialog');
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
          this.$element.find('.modal-content').load(this.options.remote, $.proxy(function() {
            this.$element.trigger('loaded.bs.modal');
          }, this));
        }
      };
      Modal.VERSION = '3.3.5';
      Modal.TRANSITION_DURATION = 300;
      Modal.BACKDROP_TRANSITION_DURATION = 150;
      Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
      };
      Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
      };
      Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget});
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented())
          return ;
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('modal-open');
        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.$dialog.on('mousedown.dismiss.bs.modal', function() {
          that.$element.one('mouseup.dismiss.bs.modal', function(e) {
            if ($(e.target).is(that.$element))
              that.ignoreBackdropClick = true;
          });
        });
        this.backdrop(function() {
          var transition = $.support.transition && that.$element.hasClass('fade');
          if (!that.$element.parent().length) {
            that.$element.appendTo(that.$body);
          }
          that.$element.show().scrollTop(0);
          that.adjustDialog();
          if (transition) {
            that.$element[0].offsetWidth;
          }
          that.$element.addClass('in');
          that.enforceFocus();
          var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget});
          transition ? that.$dialog.one('bsTransitionEnd', function() {
            that.$element.trigger('focus').trigger(e);
          }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
        });
      };
      Modal.prototype.hide = function(e) {
        if (e)
          e.preventDefault();
        e = $.Event('hide.bs.modal');
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented())
          return ;
        this.isShown = false;
        this.escape();
        this.resize();
        $(document).off('focusin.bs.modal');
        this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
        this.$dialog.off('mousedown.dismiss.bs.modal');
        $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
      };
      Modal.prototype.enforceFocus = function() {
        $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function(e) {
          if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
            this.$element.trigger('focus');
          }
        }, this));
      };
      Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keydown.dismiss.bs.modal', $.proxy(function(e) {
            e.which == 27 && this.hide();
          }, this));
        } else if (!this.isShown) {
          this.$element.off('keydown.dismiss.bs.modal');
        }
      };
      Modal.prototype.resize = function() {
        if (this.isShown) {
          $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
        } else {
          $(window).off('resize.bs.modal');
        }
      };
      Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
          that.$body.removeClass('modal-open');
          that.resetAdjustments();
          that.resetScrollbar();
          that.$element.trigger('hidden.bs.modal');
        });
      };
      Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
      };
      Modal.prototype.backdrop = function(callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate;
          this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);
          this.$element.on('click.dismiss.bs.modal', $.proxy(function(e) {
            if (this.ignoreBackdropClick) {
              this.ignoreBackdropClick = false;
              return ;
            }
            if (e.target !== e.currentTarget)
              return ;
            this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
          }, this));
          if (doAnimate)
            this.$backdrop[0].offsetWidth;
          this.$backdrop.addClass('in');
          if (!callback)
            return ;
          doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in');
          var callbackRemove = function() {
            that.removeBackdrop();
            callback && callback();
          };
          $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else if (callback) {
          callback();
        }
      };
      Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
      };
      Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
          paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        });
      };
      Modal.prototype.resetAdjustments = function() {
        this.$element.css({
          paddingLeft: '',
          paddingRight: ''
        });
      };
      Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
          var documentElementRect = document.documentElement.getBoundingClientRect();
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
      };
      Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing)
          this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
      };
      Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', this.originalBodyPad);
      };
      Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'modal-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
      };
      function Plugin(option, _relatedTarget) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.modal');
          var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
          if (!data)
            $this.data('bs.modal', (data = new Modal(this, options)));
          if (typeof option == 'string')
            data[option](_relatedTarget);
          else if (options.show)
            data.show(_relatedTarget);
        });
      }
      var old = $.fn.modal;
      $.fn.modal = Plugin;
      $.fn.modal.Constructor = Modal;
      $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
      };
      $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data());
        if ($this.is('a'))
          e.preventDefault();
        $target.one('show.bs.modal', function(showEvent) {
          if (showEvent.isDefaultPrevented())
            return ;
          $target.one('hidden.bs.modal', function() {
            $this.is(':visible') && $this.trigger('focus');
          });
        });
        Plugin.call($target, option, this);
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Tooltip = function(element, options) {
        this.type = null;
        this.options = null;
        this.enabled = null;
        this.timeout = null;
        this.hoverState = null;
        this.$element = null;
        this.inState = null;
        this.init('tooltip', element, options);
      };
      Tooltip.VERSION = '3.3.5';
      Tooltip.TRANSITION_DURATION = 150;
      Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
          selector: 'body',
          padding: 0
        }
      };
      Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport));
        this.inState = {
          click: false,
          hover: false,
          focus: false
        };
        if (this.$element[0] instanceof document.constructor && !this.options.selector) {
          throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
        }
        var triggers = this.options.trigger.split(' ');
        for (var i = triggers.length; i--; ) {
          var trigger = triggers[i];
          if (trigger == 'click') {
            this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
          } else if (trigger != 'manual') {
            var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
            var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
            this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
            this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
          }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {
          trigger: 'manual',
          selector: ''
        })) : this.fixTitle();
      };
      Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
      };
      Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options);
        if (options.delay && typeof options.delay == 'number') {
          options.delay = {
            show: options.delay,
            hide: options.delay
          };
        }
        return options;
      };
      Tooltip.prototype.getDelegateOptions = function() {
        var options = {};
        var defaults = this.getDefaults();
        this._options && $.each(this._options, function(key, value) {
          if (defaults[key] != value)
            options[key] = value;
        });
        return options;
      };
      Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
          $(obj.currentTarget).data('bs.' + this.type, self);
        }
        if (obj instanceof $.Event) {
          self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
        }
        if (self.tip().hasClass('in') || self.hoverState == 'in') {
          self.hoverState = 'in';
          return ;
        }
        clearTimeout(self.timeout);
        self.hoverState = 'in';
        if (!self.options.delay || !self.options.delay.show)
          return self.show();
        self.timeout = setTimeout(function() {
          if (self.hoverState == 'in')
            self.show();
        }, self.options.delay.show);
      };
      Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) {
          if (this.inState[key])
            return true;
        }
        return false;
      };
      Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);
        if (!self) {
          self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
          $(obj.currentTarget).data('bs.' + this.type, self);
        }
        if (obj instanceof $.Event) {
          self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
        }
        if (self.isInStateTrue())
          return ;
        clearTimeout(self.timeout);
        self.hoverState = 'out';
        if (!self.options.delay || !self.options.delay.hide)
          return self.hide();
        self.timeout = setTimeout(function() {
          if (self.hoverState == 'out')
            self.hide();
        }, self.options.delay.hide);
      };
      Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(e);
          var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
          if (e.isDefaultPrevented() || !inDom)
            return ;
          var that = this;
          var $tip = this.tip();
          var tipId = this.getUID(this.type);
          this.setContent();
          $tip.attr('id', tipId);
          this.$element.attr('aria-describedby', tipId);
          if (this.options.animation)
            $tip.addClass('fade');
          var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
          var autoToken = /\s?auto?\s?/i;
          var autoPlace = autoToken.test(placement);
          if (autoPlace)
            placement = placement.replace(autoToken, '') || 'top';
          $tip.detach().css({
            top: 0,
            left: 0,
            display: 'block'
          }).addClass(placement).data('bs.' + this.type, this);
          this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
          this.$element.trigger('inserted.bs.' + this.type);
          var pos = this.getPosition();
          var actualWidth = $tip[0].offsetWidth;
          var actualHeight = $tip[0].offsetHeight;
          if (autoPlace) {
            var orgPlacement = placement;
            var viewportDim = this.getPosition(this.$viewport);
            placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;
            $tip.removeClass(orgPlacement).addClass(placement);
          }
          var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
          this.applyPlacement(calculatedOffset, placement);
          var complete = function() {
            var prevHoverState = that.hoverState;
            that.$element.trigger('shown.bs.' + that.type);
            that.hoverState = null;
            if (prevHoverState == 'out')
              that.leave(that);
          };
          $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        }
      };
      Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        var marginTop = parseInt($tip.css('margin-top'), 10);
        var marginLeft = parseInt($tip.css('margin-left'), 10);
        if (isNaN(marginTop))
          marginTop = 0;
        if (isNaN(marginLeft))
          marginLeft = 0;
        offset.top += marginTop;
        offset.left += marginLeft;
        $.offset.setOffset($tip[0], $.extend({using: function(props) {
            $tip.css({
              top: Math.round(props.top),
              left: Math.round(props.left)
            });
          }}, offset), 0);
        $tip.addClass('in');
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        if (placement == 'top' && actualHeight != height) {
          offset.top = offset.top + height - actualHeight;
        }
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        if (delta.left)
          offset.left += delta.left;
        else
          offset.top += delta.top;
        var isVertical = /top|bottom/.test(placement);
        var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
        $tip.offset(offset);
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
      };
      Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
      };
      Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
        $tip.removeClass('fade in top bottom left right');
      };
      Tooltip.prototype.hide = function(callback) {
        var that = this;
        var $tip = $(this.$tip);
        var e = $.Event('hide.bs.' + this.type);
        function complete() {
          if (that.hoverState != 'in')
            $tip.detach();
          that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
          callback && callback();
        }
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
          return ;
        $tip.removeClass('in');
        $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
        this.hoverState = null;
        return this;
      };
      Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
          $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
        }
      };
      Tooltip.prototype.hasContent = function() {
        return this.getTitle();
      };
      Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element;
        var el = $element[0];
        var isBody = el.tagName == 'BODY';
        var elRect = el.getBoundingClientRect();
        if (elRect.width == null) {
          elRect = $.extend({}, elRect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
          });
        }
        var elOffset = isBody ? {
          top: 0,
          left: 0
        } : $element.offset();
        var scroll = {scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()};
        var outerDims = isBody ? {
          width: $(window).width(),
          height: $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
      };
      Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
          top: pos.top + pos.height,
          left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'top' ? {
          top: pos.top - actualHeight,
          left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'left' ? {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left - actualWidth
        } : {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left + pos.width
        };
      };
      Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
          top: 0,
          left: 0
        };
        if (!this.$viewport)
          return delta;
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
        var viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
          var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
          var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
          if (topEdgeOffset < viewportDimensions.top) {
            delta.top = viewportDimensions.top - topEdgeOffset;
          } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
            delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
          }
        } else {
          var leftEdgeOffset = pos.left - viewportPadding;
          var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
          if (leftEdgeOffset < viewportDimensions.left) {
            delta.left = viewportDimensions.left - leftEdgeOffset;
          } else if (rightEdgeOffset > viewportDimensions.right) {
            delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
          }
        }
        return delta;
      };
      Tooltip.prototype.getTitle = function() {
        var title;
        var $e = this.$element;
        var o = this.options;
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
        return title;
      };
      Tooltip.prototype.getUID = function(prefix) {
        do
          prefix += ~~(Math.random() * 1000000);
 while (document.getElementById(prefix));
        return prefix;
      };
      Tooltip.prototype.tip = function() {
        if (!this.$tip) {
          this.$tip = $(this.options.template);
          if (this.$tip.length != 1) {
            throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
          }
        }
        return this.$tip;
      };
      Tooltip.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'));
      };
      Tooltip.prototype.enable = function() {
        this.enabled = true;
      };
      Tooltip.prototype.disable = function() {
        this.enabled = false;
      };
      Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
      };
      Tooltip.prototype.toggle = function(e) {
        var self = this;
        if (e) {
          self = $(e.currentTarget).data('bs.' + this.type);
          if (!self) {
            self = new this.constructor(e.currentTarget, this.getDelegateOptions());
            $(e.currentTarget).data('bs.' + this.type, self);
          }
        }
        if (e) {
          self.inState.click = !self.inState.click;
          if (self.isInStateTrue())
            self.enter(self);
          else
            self.leave(self);
        } else {
          self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
        }
      };
      Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout);
        this.hide(function() {
          that.$element.off('.' + that.type).removeData('bs.' + that.type);
          if (that.$tip) {
            that.$tip.detach();
          }
          that.$tip = null;
          that.$arrow = null;
          that.$viewport = null;
        });
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.tooltip');
          var options = typeof option == 'object' && option;
          if (!data && /destroy|hide/.test(option))
            return ;
          if (!data)
            $this.data('bs.tooltip', (data = new Tooltip(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.tooltip;
      $.fn.tooltip = Plugin;
      $.fn.tooltip.Constructor = Tooltip;
      $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old;
        return this;
      };
    }(jQuery);
    +function($) {
      'use strict';
      var Popover = function(element, options) {
        this.init('popover', element, options);
      };
      if (!$.fn.tooltip)
        throw new Error('Popover requires tooltip.js');
      Popover.VERSION = '3.3.5';
      Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
      });
      Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
      Popover.prototype.constructor = Popover;
      Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS;
      };
      Popover.prototype.setContent = function() {
        var $tip = this.tip();
        var title = this.getTitle();
        var content = this.getContent();
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
        $tip.find('.popover-content').children().detach().end()[this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'](content);
        $tip.removeClass('fade top bottom left right in');
        if (!$tip.find('.popover-title').html())
          $tip.find('.popover-title').hide();
      };
      Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
      };
      Popover.prototype.getContent = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
      };
      Popover.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'));
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.popover');
          var options = typeof option == 'object' && option;
          if (!data && /destroy|hide/.test(option))
            return ;
          if (!data)
            $this.data('bs.popover', (data = new Popover(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.popover;
      $.fn.popover = Plugin;
      $.fn.popover.Constructor = Popover;
      $.fn.popover.noConflict = function() {
        $.fn.popover = old;
        return this;
      };
    }(jQuery);
    +function($) {
      'use strict';
      function ScrollSpy(element, options) {
        this.$body = $(document.body);
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
        this.selector = (this.options.target || '') + ' .nav li > a';
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
        this.refresh();
        this.process();
      }
      ScrollSpy.VERSION = '3.3.5';
      ScrollSpy.DEFAULTS = {offset: 10};
      ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
      };
      ScrollSpy.prototype.refresh = function() {
        var that = this;
        var offsetMethod = 'offset';
        var offsetBase = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        if (!$.isWindow(this.$scrollElement[0])) {
          offsetMethod = 'position';
          offsetBase = this.$scrollElement.scrollTop();
        }
        this.$body.find(this.selector).map(function() {
          var $el = $(this);
          var href = $el.data('target') || $el.attr('href');
          var $href = /^#./.test(href) && $(href);
          return ($href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]]) || null;
        }).sort(function(a, b) {
          return a[0] - b[0];
        }).each(function() {
          that.offsets.push(this[0]);
          that.targets.push(this[1]);
        });
      };
      ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
        var scrollHeight = this.getScrollHeight();
        var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
        var offsets = this.offsets;
        var targets = this.targets;
        var activeTarget = this.activeTarget;
        var i;
        if (this.scrollHeight != scrollHeight) {
          this.refresh();
        }
        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
        }
        if (activeTarget && scrollTop < offsets[0]) {
          this.activeTarget = null;
          return this.clear();
        }
        for (i = offsets.length; i--; ) {
          activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
        }
      };
      ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target;
        this.clear();
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
        var active = $(selector).parents('li').addClass('active');
        if (active.parent('.dropdown-menu').length) {
          active = active.closest('li.dropdown').addClass('active');
        }
        active.trigger('activate.bs.scrollspy');
      };
      ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.scrollspy');
          var options = typeof option == 'object' && option;
          if (!data)
            $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.scrollspy;
      $.fn.scrollspy = Plugin;
      $.fn.scrollspy.Constructor = ScrollSpy;
      $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old;
        return this;
      };
      $(window).on('load.bs.scrollspy.data-api', function() {
        $('[data-spy="scroll"]').each(function() {
          var $spy = $(this);
          Plugin.call($spy, $spy.data());
        });
      });
    }(jQuery);
    +function($) {
      'use strict';
      var Tab = function(element) {
        this.element = $(element);
      };
      Tab.VERSION = '3.3.5';
      Tab.TRANSITION_DURATION = 150;
      Tab.prototype.show = function() {
        var $this = this.element;
        var $ul = $this.closest('ul:not(.dropdown-menu)');
        var selector = $this.data('target');
        if (!selector) {
          selector = $this.attr('href');
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        if ($this.parent('li').hasClass('active'))
          return ;
        var $previous = $ul.find('.active:last a');
        var hideEvent = $.Event('hide.bs.tab', {relatedTarget: $this[0]});
        var showEvent = $.Event('show.bs.tab', {relatedTarget: $previous[0]});
        $previous.trigger(hideEvent);
        $this.trigger(showEvent);
        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented())
          return ;
        var $target = $(selector);
        this.activate($this.closest('li'), $ul);
        this.activate($target, $target.parent(), function() {
          $previous.trigger({
            type: 'hidden.bs.tab',
            relatedTarget: $this[0]
          });
          $this.trigger({
            type: 'shown.bs.tab',
            relatedTarget: $previous[0]
          });
        });
      };
      Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active');
        var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);
        function next() {
          $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
          element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);
          if (transition) {
            element[0].offsetWidth;
            element.addClass('in');
          } else {
            element.removeClass('fade');
          }
          if (element.parent('.dropdown-menu').length) {
            element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
          }
          callback && callback();
        }
        $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
        $active.removeClass('in');
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.tab');
          if (!data)
            $this.data('bs.tab', (data = new Tab(this)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.tab;
      $.fn.tab = Plugin;
      $.fn.tab.Constructor = Tab;
      $.fn.tab.noConflict = function() {
        $.fn.tab = old;
        return this;
      };
      var clickHandler = function(e) {
        e.preventDefault();
        Plugin.call($(this), 'show');
      };
      $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
    }(jQuery);
    +function($) {
      'use strict';
      var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options);
        this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
        this.$element = $(element);
        this.affixed = null;
        this.unpin = null;
        this.pinnedOffset = null;
        this.checkPosition();
      };
      Affix.VERSION = '3.3.5';
      Affix.RESET = 'affix affix-top affix-bottom';
      Affix.DEFAULTS = {
        offset: 0,
        target: window
      };
      Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop();
        var position = this.$element.offset();
        var targetHeight = this.$target.height();
        if (offsetTop != null && this.affixed == 'top')
          return scrollTop < offsetTop ? 'top' : false;
        if (this.affixed == 'bottom') {
          if (offsetTop != null)
            return (scrollTop + this.unpin <= position.top) ? false : 'bottom';
          return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom';
        }
        var initializing = this.affixed == null;
        var colliderTop = initializing ? scrollTop : position.top;
        var colliderHeight = initializing ? targetHeight : height;
        if (offsetTop != null && scrollTop <= offsetTop)
          return 'top';
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom))
          return 'bottom';
        return false;
      };
      Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
          return this.pinnedOffset;
        this.$element.removeClass(Affix.RESET).addClass('affix');
        var scrollTop = this.$target.scrollTop();
        var position = this.$element.offset();
        return (this.pinnedOffset = position.top - scrollTop);
      };
      Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1);
      };
      Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible'))
          return ;
        var height = this.$element.height();
        var offset = this.options.offset;
        var offsetTop = offset.top;
        var offsetBottom = offset.bottom;
        var scrollHeight = Math.max($(document).height(), $(document.body).height());
        if (typeof offset != 'object')
          offsetBottom = offsetTop = offset;
        if (typeof offsetTop == 'function')
          offsetTop = offset.top(this.$element);
        if (typeof offsetBottom == 'function')
          offsetBottom = offset.bottom(this.$element);
        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
        if (this.affixed != affix) {
          if (this.unpin != null)
            this.$element.css('top', '');
          var affixType = 'affix' + (affix ? '-' + affix : '');
          var e = $.Event(affixType + '.bs.affix');
          this.$element.trigger(e);
          if (e.isDefaultPrevented())
            return ;
          this.affixed = affix;
          this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
          this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
        }
        if (affix == 'bottom') {
          this.$element.offset({top: scrollHeight - height - offsetBottom});
        }
      };
      function Plugin(option) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data('bs.affix');
          var options = typeof option == 'object' && option;
          if (!data)
            $this.data('bs.affix', (data = new Affix(this, options)));
          if (typeof option == 'string')
            data[option]();
        });
      }
      var old = $.fn.affix;
      $.fn.affix = Plugin;
      $.fn.affix.Constructor = Affix;
      $.fn.affix.noConflict = function() {
        $.fn.affix = old;
        return this;
      };
      $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
          var $spy = $(this);
          var data = $spy.data();
          data.offset = data.offset || {};
          if (data.offsetBottom != null)
            data.offset.bottom = data.offsetBottom;
          if (data.offsetTop != null)
            data.offset.top = data.offsetTop;
          Plugin.call($spy, data);
        });
      });
    }(jQuery);
  }).call(System.global);
  return System.get("@@global-helpers").retrieveGlobal(__module.id, "$");
});

System.register("github:twbs/bootstrap@3.3.5", ["github:twbs/bootstrap@3.3.5/js/bootstrap"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:twbs/bootstrap@3.3.5/js/bootstrap");
  global.define = __define;
  return module.exports;
});

System.register("views/app/index", ["github:twbs/bootstrap@3.3.5"], function(e) {
  "use strict";
  function t(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  var n,
      r = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      }();
  return {
    setters: [function(e) {}],
    execute: function() {
      n = function() {
        function e() {
          t(this, e);
        }
        return r(e, [{
          key: "configureRouter",
          value: function(e, t) {
            e.title = "Aurelia", e.map([{
              route: ["", "welcome"],
              name: "welcome",
              moduleId: "views/index/welcome",
              nav: !0,
              title: "Welcome"
            }, {
              route: "flickr",
              name: "flickr",
              moduleId: "views/index/flickr",
              nav: !0,
              title: "Flickr"
            }, {
              route: "child-router",
              name: "child-router",
              moduleId: "views/index/child-router",
              nav: !0,
              title: "Child Router"
            }]), this.router = t;
          }
        }]), e;
      }(), e("App", n);
    }
  };
});

System.register("main", [], function(t) {
  "use strict";
  function e(t) {
    t.use.standardConfiguration().developmentLogging().plugin("aurelia-animator-css"), t.start().then(function(t) {
      return t.setRoot("views/app/index", document.body);
    });
  }
  return t("configure", e), {
    setters: [],
    execute: function() {}
  };
});
