const makeEaseOut = (timing) => (timeFraction) => 1 - timing(1 - timeFraction);

const makeEaseInOut = (timing) => (timeFraction) => {
  if (timeFraction < .5) return timing(2 * timeFraction) / 2;
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
const easings = new Map();

easings.set('linear', timeFraction => timeFraction);
easings.set('quad', timeFraction => timeFraction ** 2);
easings.set('cubic', timeFraction => timeFraction ** 3);
easings.set('circ', timeFraction => 1 - Math.sin(Math.acos(timeFraction)));
easings.set('back', timeFraction => {
  return Math.pow(timeFraction, 2) * (2.5 * timeFraction - 1.5);
});
easings.set('bounce', timeFraction => {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
});
easings.set('elastic', timeFraction => {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(31.415926535 * timeFraction)
});

easings.set('quadOut', makeEaseOut(easings.get('quad')));
easings.set('cubicOut', makeEaseOut(easings.get('cubic')));
easings.set('circOut', makeEaseOut(easings.get('circ')));
easings.set('backOut', makeEaseOut(easings.get('back')));
easings.set('bounceOut', makeEaseOut(easings.get('bounce')));
easings.set('elasticOut', makeEaseOut(easings.get('elastic')));

easings.set('quadInOut', makeEaseInOut(easings.get('quad')));
easings.set('cubicInOut', makeEaseInOut(easings.get('cubic')));
easings.set('circInOut', makeEaseInOut(easings.get('circ')));
easings.set('backInOut', makeEaseInOut(easings.get('back')));
easings.set('bounceInOut', makeEaseInOut(easings.get('bounce')));
easings.set('elasticInOut', makeEaseInOut(easings.get('elastic')));

export const easingsFct = [...easings.keys()];

export default class Tweens{

  constructor() {
    this.tweens = new Set();
    this.tweensAfter = new Map();
  }

  isRunning(tween) {
    return this.tweens.has(tween);
  }

  delete(tween) {
    this.tweens.delete(tween);
  }

  deleteAll() {
    this.tweens = new Set();
    this.tweensAfter = new Map();
  }

  create({
    duration = 1000,
    from = 0,
    to = 1,
    loop = false,
    ease = 'linear',
    after = null,
    yoyo = false,
    animate
  } = {}) {
    ease = easings.get(ease);
    const tween = {duration, ease, yoyo, loop, from , to, time: 0, animate};
    if (after) {
      this.tweensAfter.set(after, tween)
    } else {
      this.tweens.add(tween);
    }
    return tween;

  }

  update(dt) {
    const newTweens = [];

    for (const tween of this.tweens) {
      tween.time += dt;
      let timeFraction = tween.time / tween.duration;
      if (timeFraction >= 1) timeFraction = 1;

      const progress = (tween.to - tween.from) * tween.ease(timeFraction) + tween.from;
      tween.animate(progress);
      if (timeFraction != 1) continue;

      // Manage the end of life of the tween
      if (tween.loop || tween.yoyo) {
        if (tween.yoyo) {
          [tween.to, tween.from] = [tween.from, tween.to];
          if (!tween.loop) tween.yoyo = false;
        }
        tween.time = 0;
      } else {
        if (this.tweensAfter.has(tween)) {
          newTweens.push(this.tweensAfter.get(tween));
          this.tweensAfter.delete(tween);
        }
        this.tweens.delete(tween);
      }
    }

    newTweens.forEach(tween => this.tweens.add(tween));
  }

}