import { createStore } from 'vuex'
import  ModuleUser  from './user' //这个ModuleUser不能有大括号
import ModulePk from './pk'
import ModuleRecord from './record'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    pk: ModulePk,
    record: ModuleRecord,
  } 
})
