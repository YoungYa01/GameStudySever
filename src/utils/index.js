/**
 * 分页函数
 * @param dataArray 数据源
 * @param currentPage 当前页
 * @param pageSize 每页大小
 * @return {{total: *, data: *, totalPages: number, pageSize, currentPage}}
 */
export const startPage = (dataArray, currentPage = 1, pageSize = 10) => {
  const totalCount = dataArray.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // 计算起始索引和结束索引
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  // 获取当前页的数据
  const data = dataArray.slice(startIndex, endIndex);
  
  return {
    data,
    total: totalCount,
    currentPage,
    pageSize,
    totalPages
  };
}
