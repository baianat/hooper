export function getInRange (value, min, max) {
  return Math.max(Math.min(value, max), min)
}

export function now () {
  return Date.now();
}

export function Timer (callback, time) {
  this.create = function createTimer () {
    return window.setInterval(callback, time);
  }

  this.stop = function stopTimer () {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  this.start = function startTimer () {
    if (!this.timer) {
      this.timer = this.create();
    }
  }

  this.restart = function restartTimer (newTime) {
    time = newTime || time;
    this.stop();
    this.start();
  }
  this.timer = this.create();

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

export function mergeObjects() {
  var resObj = {};
  for(var i=0; i < arguments.length; i += 1) {
       var obj = arguments[i],
           keys = Object.keys(obj);
       for(var j=0; j < keys.length; j += 1) {
           resObj[keys[j]] = obj[keys[j]];
       }
  }
  return resObj;
}