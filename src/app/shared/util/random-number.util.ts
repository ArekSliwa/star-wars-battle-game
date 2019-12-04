// source: https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Math/random
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
