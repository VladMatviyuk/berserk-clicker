/**
 * Получение рандомного числа от 0 до 1
 */
export const getRandom = () => {
  return Math.round(Math.random());
}

/**
 * Получение рандомного числа по диапазону
 * @param min {number} - от
 * @param max {number} - до
 */
export const getRandomMinMAx = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
