/**
 * 更新轮播图
 * @return {string}
 */
export const updateCarousel = () => {
  return `UPDATE carousel SET src = ? WHERE id = ?`
}
/**
 * 插入轮播图
 * @return {string}
 */
export const insertCarousel = () => {
  return "INSERT INTO carousel (src, title, `order`, `show`) VALUES (?, ?, ?, ?)"
}
