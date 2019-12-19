export function getInRange(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

export function now() {
  return Date.now();
}

export function Timer(callback, defaultTime) {
  this.create = function() {
    return window.setTimeout(callback, defaultTime);
  };

  this.stop = function() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  };

  this.start = function() {
    if (!this.timer) {
      this.timer = this.create();
    }
  };

  this.set = function(newTime) {
    const timeout = newTime || defaultTime;
    this.timer = window.setTimeout(callback, timeout);
  };
  this.timer = this.create();
}

export function camelCaseToString(camelCase) {
  camelCase = camelCase.replace(/([A-Z]+)/g, ' $1');
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function normalizeSlideIndex(index, slidesCount) {
  let realIndex;
  if (index < 0) {
    realIndex = (index + slidesCount) % slidesCount;
  } else {
    realIndex = index % slidesCount;
  }

  // Test for NaN
  if (realIndex !== realIndex) {
    return 0;
  }

  return realIndex;
}

export function cloneNode(h, vNode) {
  // use the context that the original vnode was created in.
  const children = vNode.children || vNode.componentOptions.children || vNode.text;
  const tag = vNode.componentOptions.Ctor;

  return h(tag, vNode.data, children);
}

// IE11 :)
function assignPoly(target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }
    nextSource = Object(nextSource);

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }

  return to;
}

export const assign = Object.assign || assignPoly;

function signPoly(value) {
  if (value < 0) {
    return -1;
  }

  return value > 0 ? 1 : 0;
}

export const sign = Math.sign || signPoly;

export function normalizeChildren(context, slotProps = {}) {
  if (context.$scopedSlots.default) {
    return context.$scopedSlots.default(slotProps) || [];
  }

  return context.$slots.default || [];
}

export const focusableHTMLElements = [
  'a',
  'area',
  'audio',
  'button',
  'iframe',
  'input',
  'select',
  'summary',
  'textarea',
  'video'
];
