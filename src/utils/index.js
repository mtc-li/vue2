// 将列表型的数据转化成树形数据 => 递归算法 => 自身调用自身 => 一定条件不能一样， 否则就会死循环
export function tranListToTreeData (list, rootValue) {
  const arr = []
  list.forEach(item => {
    if (item.pid === rootValue) {
      const children = tranListToTreeData(list, item.id)
      if (children.length) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}
