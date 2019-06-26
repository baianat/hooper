export function getInRange(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

export function now() {
  return Date.now();
}

export function Timer(callback, time) {
  this.create = function createTimer() {
    return window.setInterval(callback, time);
  };

  this.stop = function stopTimer() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  };

  this.start = function startTimer() {
    if (!this.timer) {
      this.timer = this.create();
    }
  };

  this.restart = function restartTimer(newTime) {
    time = newTime || time;
    this.stop();
    this.start();
  };
  this.timer = this.create();
}

export function camelCaseToString(camelCase) {
  camelCase = camelCase.replace(/([A-Z]+)/g, ' $1');
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function normalizeSlideIndex(index, slidesCount) {
  if (index < 0) {
    return (index + slidesCount) % slidesCount;
  }
  return index % slidesCount;
}

function extractData(vnode, indx) {
  const cOpts = vnode.componentOptions;
  const data = {
    class: vnode.data.class,
    staticClass: vnode.data.staticClass,
    style: vnode.data.style,
    attrs: vnode.data.attrs,
    props: {
      ...cOpts.propsData,
      isClone: true,
      index: indx
    },
    on: cOpts.listeners,
    nativeOn: vnode.data.nativeOn,
    directives: vnode.data.directives,
    scopesSlots: vnode.data.scopesSlots,
    slot: vnode.data.slot,
    ref: vnode.data.ref,
    key: vnode.data.key ? `${indx}-clone` : undefined
  };

  return data;
}

export function cloneSlide(vnode, indx) {
  // use the context that the original vnode was created in.
  const h = vnode.context && vnode.context.$createElement;
  const children = vnode.componentOptions.children;

  const data = extractData(vnode, indx);

  const tag = vnode.componentOptions.Ctor;

  return h(tag, data, children);
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
