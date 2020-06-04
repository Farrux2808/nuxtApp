<template>
<div>
  <v-card flat class="py-12">
    <v-card-text>
      <v-row align="center" justify="center">
        <v-btn-toggle v-model="toggle_exclusive"  mandatory>
          <v-btn>
            today
          </v-btn>
          <v-btn>
            yesterday
          </v-btn>
          <v-btn>
            week
          </v-btn>
          <v-btn>
            year
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
  <data-tables :data="data" :table-props="tableProps">
    <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.label" sortable="custom">
    </el-table-column>
  </data-tables>
</div>
</template>

<script>
export default {
  
  data() {
    var data, titles

data = [{
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
  }];

  titles = [{
    prop: "flow_no",
    label: "NO."
    }, {
    prop: "content",
    label: "Content"
    }, {
    prop: "flow_type",
    label: "Type"
  }]
    return {
      toggle_exclusive: undefined,
      data,
      titles,
      tableProps: {
        border: true,
        stripe: true,
        defaultSort: {
          prop: 'flow_no',
          order: 'descending'
        }
      }
    }
  }
}
</script>