/*
Only support ">=IE9" because of "document.getEelementsByClassName"
 */

(function (ROOT) {
  var jDom = function (selector) {
    return new jDom.fn.init(selector);
  }

  jDom.fn = jDom.prototype = {
    construtor: jDom,
    // 版本号
    versions: '1.0.0',
    // 真正的构造函数
    // init: function(selector) {
    //   var elem, type;
    //   if (typeof selector === "string") {
    //     type = selector[0];
    //     if (type === "<" && selector[selector.length - 1] ===">") {
    //     // 如果是dom的话
    //       var elem = document.createDocumentFragment();
    //       elem.innerHTML = selector;

    //     } else {
    //       if (document.querySelectorAll) {
    //         elem = document.querySelectorAll(selector);
    //       } else {
    //         type = selector[0];
    //         switch(type) {
    //           case '#':
    //             elem = document.getElementById(selector.slice(1));
    //           case '.':
    //             elem = document.getElementsByClassName(selector.slice(1));
    //           default: 
    //             elem = document.getElementsByTagName(selector.slice(1));
    //         }
    //       }
    //     }
    //   }
    //   this.elem = elem;
    //   // this.length = elem.length;
    //   this.context = document;
    //   this.selector = selector;
    //   return this;
    // },

    // 原型上的其他方法
    toString: function() {
    },
    // 下面这两个可以将普通对象变成一个类Array的对象
    length: 0,
    splice: [].splice,
  }

  jDom.fn.init = function(selector) {
    var elem, type, i;
    if (typeof selector === "string") {
      type = selector[0];
      if (type === "<" && selector[selector.length - 1] ===">") {
        // 处理字符串dom
        var elemContainer = document.createElement('div');
        elemContainer.innerHTML = selector;
        elem = elemContainer.childNodes;
      } else {
        // 处理正常的选择符
        if (document.querySelectorAll) {
          elem = document.querySelectorAll(selector);
        } else {
          type = selector[0];
          switch(type) {
            case '#':
              elem = document.getElementById(selector.slice(1));
            case '.':
              elem = document.getElementsByClassName(selector.slice(1));
            default: 
              elem = document.getElementsByTagName(selector.slice(1));
          }
        }
      }
    } else if (selector.nodeType) {
      // 处理Dom
      this.length = 1;
      this[0] = selector;
    }
    this.length = elem.length;
    i = this.length-1;
    for (;i>=0;i--) {
      this[i] = elem[i];
    }
    // this.elem = elem;
    this.context = document;
    this.selector = selector;
    return this;
  }
  // 将init的prototype重写，保证jDom.prototype.someFunc也可以被新对象访问到
  jDom.fn.init.prototype = jDom.fn;
  // extend方法
  jDom.extend = jDom.fn.prototype = function (obj) {
    var target = arguments[0],
      index = 1,
      keys = Object.keys(obj),
      length = arguments.length,
      options;
    if (index === length) {
      target = this;
      index--;
    }
    for(;index<length;index++) {
      options = arguments[index]
      for (name in options) {
        target[name] = options[name];
      }
    }
    return target
  }

  jDom.extend({
    // getTagFromString: function(string, reg) {
    //   var tagName = reg.exec(string)
    // }
  })
  // 将接口暴露到全局作用域中
  ROOT.jDom = ROOT._ = jDom;
})(window)