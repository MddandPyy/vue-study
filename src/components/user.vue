<template>
<div>
  <el-container>
  <el-main>
   <el-table :data="tableData">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="140">
        </el-table-column>
        <el-table-column prop="createtime" :formatter="formatTime" label="创建日期">
        </el-table-column>
      </el-table>
  </el-main>
  <el-footer>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-footer>
</el-container>

</div>
</template>

<script>

export default {
  name: 'user',
  data () {
      return {
        tableData: [],
        currentPage:1,
        pageSize:5,
        total:0
      }
  },
  methods:{
      getUserList(){//一点击登录按钮，这个方法就会执行
        this.$axios.get('/api/getUser',{
        params: {
          "currentPage":this.currentPage,
          "pageSize":this.pageSize
        }
        })
        .then((response) => {
          console.log(response.data);//请求的返回体
          this.tableData = response.data.data.data;
          this.total = response.data.data.total;
        })
        .catch((error) => {
          console.log(error);//异常
        });
      },
      formatTime(row){
        var date = new Date(row.createtime);
        var y = date.getFullYear();
        var m = (date.getMonth()+1).toString().padStart(2,'0');
        var d = date.getDate().toString().padStart(2,'0');
        return `${y}-${m}-${d}`;
      },
      handleSizeChange(val) {
        //修改每一页的数据量
        this.pageSize = val;
        this.getUserList();
      },
      handleCurrentChange(val) {
        //修改当前页
        this.currentPage = val;
        this.getUserList();
      }
    },
    created(){
        console.log("create");
        this.getUserList();
    }
}
</script>



