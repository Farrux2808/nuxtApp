<template>
<el-card>
  <el-row :gutter="20">
    <el-col :span="7"><el-button-group>
        <el-button type="defoult">Today</el-button>
        <el-button type="defoult">Yesterday</el-button>
        <el-button type="defoult">Month</el-button>
        <el-button type="defoult">Year</el-button>
      </el-button-group></el-col>
    <el-col :span="6">
      <el-input  placeholder="Pick a date" suffix-icon="el-icon-date"></el-input>
    </el-col>
    <el-col :span="2"><el-button type="primary" icon="el-icon-refresh"></el-button></el-col>
    <el-col :span="1"><el-button type="primary" icon="el-icon-document">Download CSV</el-button></el-col>
  </el-row>
  <data-tables-server v-loading="loading" :data="data" :current-page="query.currentPage" 
      :total="query.total" @query-change="loadData" :page-size="query.limit"
      :pagination-props="query.pageSizes"
      :checkbox-filter-def="checkboxFilterDef">
      <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
      </el-table-column>
    </data-tables-server>
</el-card>

</template>

<script>
  var data = [
    {
      "content": "Water flood",
      "flow_no": "FW201601010001",
      "flow_type": "Repair",
      "flow_type_code": "repair",
    }, {
      "content": "Lock broken",
      "flow_no": "FW201601010002",
      "flow_type": "Repair",
      "flow_type_code": "repair",
    }, {
      "content": "Help to buy some drinks",
      "flow_no": "FW201601010003",
      "flow_type": "Help",
      "flow_type_code": "help"
    }
  ]

  // fake server
  let serverData = []
  for (let i = 0; i < 1000; i++) {
    serverData.push({
      'content': 'Lock broken' + i,
      'flow_no': 'FW20160101000' + i,
      'flow_type': i % 2 === 0 ? 'Repair' : 'Help',
      'flow_type_code': i % 2 === 0 ? 'repair' : 'help',
    })
  }

  let mockServer = function(res) {
    let datas = serverData.slice()
    let allKeys = Object.keys(data[0])
    console.log(res)
    // do filter
    res.filters.forEach(filter => {
      datas = datas.filter(data => {
        let props = filter.props || allKeys
        return props.some(prop => {
          if (!filter.vals || filter.vals.length === 0) {
            return true
          }
          return filter.vals.some(val => {
            return data[prop].toString().toLowerCase().indexOf(val.toLowerCase()) > -1
          })
        })
      })
    })

    // do sort
    if (res.sort.order) {
      let order = res.sort.order
      let prop = res.sort.prop
      let isDescending = order === 'descending'

      datas.sort(function(a, b) {
        if (a[prop] > b[prop]) {
          return 1
        } else if (a[prop] < b[prop]) {
          return -1
        } else {
          return 0
        }
      })
      if (isDescending) {
        datas.reverse()
      }
    }

    return {
      data: datas.slice((res.page - 1) * res.pageSize, res.page * res.pageSize),
      req: res,
      ts: new Date(),
      total: datas.length
    }
  }

  let i = 1

  // fake http
  function http(res, time = 200) {
    return new Promise((resolve, reject) => {
      setTimeout(_ => {
        i++ % 5 !== 0
          ? resolve(mockServer(res))
          : reject('network error')
      }, time)
    })
  }
export default {
  data() {
    return {
      data: [],
      loading: true,
      titles: [
        {
          prop: "flow_no",
          label: "NO."
        }, {
          prop: "content",
          label: "Content"
        }, {
          prop: "flow_type",
          label: "Type"
        }
      ],
      total: 0,
      checkboxFilterDef: {
        props: 'flow_type_code',
        def: [
          {
            'code': 'repair',
            'name': 'Repair'
          }, {
            'code': 'help',
            'name': 'Help'
          }
        ]
      },
      query: {
          total: 100,
          limit: 10,
          offset: 0,
          search: "",
          sort: {
              prop: "createdAt",
              order: "ascending"
          },
          currentPage: 1,
          pageSizes: { pageSizes: [10, 20, 50, 100] }
      }
    }
  },
  methods: {
    async loadData(queryInfo) {
      this.loading = true
      return await http(queryInfo, 1000)
        .then(data => {
          this.data = data.data
          this.total = data.total
          this.loading = false
        })
        .catch(error => {
          this.$message(error)
          this.loading = false
        })
    }
  }
}
</script>

<style>
.bg-purple-light {
    background: #e5e9f2;
  }
</style>