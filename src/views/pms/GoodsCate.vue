<template>
  <div class="app-container">
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets" style="margin-left: 5px"></i>
      <span style="margin-left: 5px">数据列表</span>
      <!-- <el-button  class="btn-add" style="margin-left: 5px" @click="dialogVisible = true" size="medium">
        添加
      </el-button> -->
      <el-button type="primary" style="margin-left: 10px;" @click="dialogVisible = true"
            >新增</el-button
          >
    </el-card>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        stripe
        border
      >
        <el-table-column label="编号" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="级别" width="130" align="center">
          <template slot-scope="scope">{{
            scope.row.level == 0 ? "一级" : "二级"
          }}</template>
        </el-table-column>
        <el-table-column label="导航栏" width="130" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="130" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level != 0"
              @click="handleShowNextLevel(scope.$index, scope.row)"
              v-if="parentId == 0"
              >查看下级
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.row.level == 0"
              @click="handleShowPrevLevel(scope.$index, scope.row)"
              v-if="parentId != 0"
              >返回上级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>

            <template>
						<el-popconfirm title="这一条数据确定删除吗？" @confirm="delHandle(scope.row.id)">
							<el-button size="mini" style="margin-left: 10px;" type="danger" slot="reference">删除</el-button>
						</el-popconfirm>
					</template>
          

            
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        hide-on-single-page="true"
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next"
        :page-size="size"
        :current-page="current"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        label-width="150px"
        class="demo-editForm"
      >
        <el-form-item label="上级分类：" >
          <el-select v-model="editForm.parentId" placeholder="请选择分类">
            <el-option label="无上级分类" :key="0" :value="0"> </el-option>
            <el-option
              v-for="item in parentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>

        <el-form-item label="排序：" >
          <el-input v-model="editForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="editForm.showStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示在导航栏：">
          <el-radio-group v-model="editForm.navStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GoodsCate",
  data() {
    return {
      dialogVisible: false,
      list: [],
      parentList: [],
      total: 0,
      listLoading: true,
      size: 10,
      current: 1,
      parentId: 0,
      temId: "",
      editForm: {},
      editFormRules: {
        parentId: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择状态", trigger: "blur" }],
        orderNum: [{ required: true, message: "请填入排序号", trigger: "blur"}],
        statu: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    //改变导航栏状态
    handleNavStatusChange(index,row){

    },
    //改变现实状态
    handleShowStatusChange(index,row){

    },

    getLists(){
      this.getList();
      this.getParentList();
    },
    //删除
    delHandle(id){
      this.$axios.get("/pms/cate/delete/"+id).then(res=>{
        this.getLists()
								this.$message({
									showClose: true,
									message: res.data.msg,
									type: 'success',
								});
      })
    },

    //获得顶级分类列表
    getParentList(){
      this.$axios.get("/pms/cate/cateInfo").then(res=>{
        this.parentList = res.data.data;
      })
      
    },
    //获得分类列表
    getList() {
      // this.listLoading = true;
      this.$axios
        .get("/pms/cate/list", {
          params: {
            parentId: this.parentId,
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          this.list = res.data.data.records;
          this.size = res.data.data.size;
          this.current = res.data.data.current;
          this.total = res.data.data.total;
        });
    },
    //获取当前分类的下一级分类
    handleShowNextLevel(index, row) {
      this.parentId = row.id;
      this.getList();
    },

    //返回上一级分类
    handleShowPrevLevel(index, row) {
      this.parentId = 0;
      this.getList();
    },

    //分页页码改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.getList();
    },


    //关闭提示框
    handleClose() {
      this.resetForm("editForm");
    },

    //清除表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.editForm = {};
    },

    handleUpdate(index,row){
      this.$axios.get('/pms/cate/info/'+row.id).then(res =>{
        this.editForm = res.data.data
        this.dialogVisible = true
      })
    },
    
        
    

    //分类添加或更新
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
      	if (valid) {
      		this.$axios.post('/pms/cate/' + (this.editForm.id?'update' : 'save'), this.editForm)
      			.then(res => {
      				this.getLists()
      				this.$message({
      					showClose: true,
      					message: res.data.msg,
      					type: 'success',
      					onClose:() => {
      						this.editForm ={}
      					}
      				});

      				this.dialogVisible = false
      		})
      	} else {
      		console.log('error submit!!');
      		return false;
      	}
      });
    },
  },
  created() {
    this.getLists()
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  // watch: {
  //   $route(route) {
  //     this.resetParentId();
  //     this.getList();
  //   }
  // },
};
</script>

<style scoped>
.pagination-container{
  margin-top: 30px;
}
.operate-container{
 display: flex;
}

</style>