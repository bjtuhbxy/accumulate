/**
 * @description 状态管理插件
 * @author zhangw
 * @date 2021-05-23
 * @version 1.0.0
 */
import Dep from "./dep.js";
class Store {
  constructor(option) {
    this.state = option.state
    this.mutations = option.mutations
    this.write = false
    Store.handleProperty.call(this)
    this.dep = new Dep()
    this.sub = this.dep.sub.bind(this.dep)
    this.delete = this.dep.delete.bind(this.dep)
  }
  /**
   * @description 严格管理数据，防止直接修改（只允许mutations修改）
   * @param {*} state 需要setter处理的数据源
   */
  static handleProperty() {
    let state = this.state
    Object.keys(state).forEach(item => {
      let key = state[item]
      Object.defineProperty(state, item, {
        get: () => {
          return key
        },
        set: (val) => {
          if (this.write) {
            key = val
            this.dep.pub(item, val)
          }
        }
      })
    })
  }
  commit(key) {
    let args = Array.from(arguments)
    args.shift()
    this.write = true
    this.mutations[key](this.state, ...args)
    this.write = false
  }
}
/**
 * @description 单元测试
 */
window.store = new Store({
  state: {
    online_users: [],
    user_setting: []
  },
  mutations: {
    changeOnlineUser(state, val) {
      state.online_users = val
    },
    changeUserSetting(state, val) {
      state.user_setting = val
    }
  }
})
// 测试订阅数据
let sub1 = store.sub('online_users', item => {
  console.log('【cc log】监听到人员列表变化:新值为' + item);
})
// 删除订阅者
// store.delete('online_users', sub1)
// 测试更新数据
console.log(store.state.online_users, '2');
store.commit('changeOnlineUser', ['李四', '王五'])
console.log(store.state.online_users, '3');