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