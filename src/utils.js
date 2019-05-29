export function getInRange (value, min, max) {
  return Math.max(Math.min(value, max), min)
}

export function now () {
  return Date.now();
}

export function Timer (callback, defaultTime) {
  this.create = function createTimer() {
    return window.setTimeout(callback,defaultTime);
  };
  this.start = function startTimer() {
    if (!this.timer) {
      this.timer = this.create();
    }
  };
  this.set = function setTimer(newTime) {
      var timeout = newTime || defaultTime;
      this.timer = window.setTimeout(callback,timeout);
  };
  this.stop = function stopTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer=null;
    }
  };
  this.restart = function restartTimer (newTime){
    defaultTime = newTime || defaultTime;
    this.stop();
    this.start();
  };
  this.timer=this.create();
}

export function camelCaseToString (camelCase) {
  camelCase = camelCase.replace(/([A-Z]+)/g, ' $1');
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

export function normalizeSlideIndex (index, slidesCount) {
  if (index < 0) {
    return (index + slidesCount) % slidesCount;
  }
  return index % slidesCount;
}

function extractData(vnode, indx) {
  const cOpts = vnode.componentOptions;
  return {
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
    key: vnode.data.key ? `${indx}-clone` : undefined,
  };
}

export function cloneSlide(vnode, indx) {
	// use the context that the original vnode was created in.
  const h = vnode.context && vnode.context.$createElement;
  const children =  vnode.componentOptions.children;
  
  const data = extractData(vnode, indx);
  
  const tag = vnode.componentOptions.Ctor;
  
  return h(tag, data, children)
}