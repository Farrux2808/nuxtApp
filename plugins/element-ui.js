import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { DataTablesServer } from 'vue-data-tables/dist/data-tables.server'

Vue.use(DataTablesServer)
Vue.use(Element, { locale })
