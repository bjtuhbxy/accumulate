class Dep {
  constructor () {
    this.dep = {}
  }

  /**
   * 
   * @description 添加订阅者
   * @param {*} key 需要订阅的字段名称
   * @param {*} fn 订阅方法的回调函数
   * @returns 订阅者的唯一id
   */
  sub (key, fn) {
    this.dep[key] = this.dep[key] || {}
    let id = Symbol()
    this.dep[key][id] = fn
    return id
  }

  /**
   * @description 向订阅者发布订阅变更
   * @param {*} key 订阅的发生改变的字段
   * @returns {null}
   */
  pub (key) {
    let args = Array.from(arguments)
    let pubList = this.dep[key]
    let pubListSymbol = Object.getOwnPropertySymbols(pubList)
    if (!pubList) {
      // 变量未被订阅，不作任何处理
      return
    }
    args.shift()
    for (const k in pubListSymbol) {
      if (Object.hasOwnProperty.call(pubListSymbol, k)) {
        const fn = pubList[pubListSymbol[k]];
        fn(...args)
      }
    }
  }
  
  /**
   * @description 删除订阅关系
   * @param {*} key 订阅的变量关键字
   * @param {*} id 添加订阅者方法返回的唯一id
   */
  delete (key, id) {
    delete this.dep[key][id]
  }

  /**
   * @description 获取唯一随机id
   * @param {*} range 唯一id随机数区间
   * @returns {String} 唯一id
   */
  static getId (range = 1000) {
    return 'T' + new Date().getTime() + 'R' + parseInt(Math.random() * range)
  }
}
export default Dep