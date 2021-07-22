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
  const children = vNode.children || vNode.text;
  return h(vNode.type, vNode.data, children);
}
