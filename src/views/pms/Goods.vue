<template>
  <div>
    <el-card shadow="never" class="header">
      <el-form
        :inline="true"
        size="medium"
        :model="selectForm"
        class="demo-form-inline"
      >
        <el-form-item class="demo-form-inline-item">
          <el-input v-model="selectForm.name" placeholder="商品名"></el-input>
        </el-form-item>

        <el-form-item class="demo-form-inline-item">
          <el-cascader
            :props="defaultParams"
            v-model="selectProductCateValue"
            @change="getProductCategoryId"
            :options="productCateOptions"
            placeholder="请选择商品类别"
           
          >
          </el-cascader>
    
        </el-form-item>

        <el-form-item class="demo-form-inline-item">
          <el-select v-model="selectForm.status"  placeholder="请选择状态" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="demo-form-inline-item">
          <el-select v-model="selectForm.stock"  placeholder="请选择库存" clearable>
            <el-option
              v-for="item in stockOptions"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        
        <el-form-item class="demo-form-inline-item-button">
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="table-button">
        <el-button type="primary" @click="addGoods">添加</el-button>
        <el-button type="danger" @click="deleteAll">批量删除</el-button>
      </div> -->
    </el-card>

    <div class="table" style="width: 100%">
      <el-table :data="goodsList" border class="goods-style">
      
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">
            {{ (scope.$index+1)+(current-1)*size }}
          </template>
        </el-table-column>

        <el-table-column prop="pic" label="商品图片" width="140" align="center">
          <template slot-scope="scope"
            ><el-image
              style="width: 60px; height: 80px"
              :src="scope.row.pic"
            ></el-image
          ></template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="商品名称"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column
          prop="productCategoryName"
          label="类别"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.productCategoryName}}
          </template>
        </el-table-column>

        <el-table-column prop="brandName" label="品牌" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.brandName }}
          </template>
        </el-table-column>

        <el-table-column
          prop="inventory"
          label="SKU"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handlerEditSKU(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>

        <el-table-column prop="sale" label="销量" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.sale }}
          </template>
        </el-table-column>

        <el-table-column prop="publishStatus" label="状态" width="140" align="center">
          <template slot-scope="scope">
            <p>
              上架中：
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus"
                @change="chandPublishStatus(scope.row)"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>

        <el-table-column
          prop="operation"
          label="操作"
          width="218px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleShowProduct(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              @click="handleEditProduct(scope.$index, scope.row)"
              >修改</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteProduct(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="current"
      background
      layout="total,prev, pager, next"
      :total="total">
    </el-pagination>
    </div>


    <el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%">
      <span>商品货号：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <!-- <el-input placeholder="按sku编号搜索" v-model="editSkuInfo.keyword" size="small" style="width: 50%;margin-left: 20px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
      </el-input> -->
      <el-table style="width: 100%;margin-top: 20px"
                :data="editSkuInfo.stockList"
                border>
        <el-table-column
          label="销售价格"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.price" ></el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="促销价格"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-input  v-model.number="scope.row.promotionPrice" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-input disabled="disabled" v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="库存更改"
        
          align="center">
          <template slot-scope="scope" >
            <el-input-number v-model.number="scope.row.stockNum"  controls-position="right" :min="-100" :max="100"></el-input-number>

          </template>
        </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <div class="table-dialog">
      <el-dialog
        title="商品详情"
        class="goods-dialog"
        width="50%"
        :visible.sync="dialogFormVisible"
      >
        <el-row>
          <el-col :span="12">
            <el-image style="width: 300px; height: 400px"> </el-image>
          </el-col>
          <el-col :span="12">
            <el-descriptions
              class="margin-top"
              :title="currentGoods.name"
              :column="1"
              :size="medium"
            >
              <el-descriptions-item label="商品编号">{{
                currentGoods.ProductId
              }}</el-descriptions-item>
              <el-descriptions-item label="商品描述">{{
                currentGoods.description
              }}</el-descriptions-item>
              <el-descriptions-item label="分类">
                <span
                  v-for="(item, index) in currentGoods.category"
                  :key="index"
                  >{{ item + "\xa0" }}</span
                >
              </el-descriptions-item>
              <el-descriptions-item label="价格"
                >￥{{ currentGoods.price }}</el-descriptions-item
              >
              <el-descriptions-item label="折扣"
                >{{ currentGoods.discount * 10.0 }} 折</el-descriptions-item
              >
              <el-descriptions-item label="颜色">{{
                currentGoods.attribute.color
              }}</el-descriptions-item>
              <el-descriptions-item label="版本">{{
                currentGoods.attribute.size
              }}</el-descriptions-item>
              <el-descriptions-item label="促销价"
                >￥{{ discountPrice }}</el-descriptions-item
              >
              <el-descriptions-item label="库存">{{
                currentGoods.inventory
              }}</el-descriptions-item>
              <el-descriptions-item label="销量">
                {{ currentGoods.sales }}
              </el-descriptions-item>
              <el-descriptions-item label="状态">
                {{ currentGoods.status == 0 ? "已下架" : "销售中" }}
              </el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>

export default {
  name: "goods",
  data() {
    return {
      total: 0,
      size: 10,
      current: 1,
      num:0,
      dialogTableVisible: false,
      dialogFormVisible: false,
       editSkuInfo:{
          dialogVisible:false,
          productId:null,
          productSn:'productSn',
          productAttributeCategoryId:null,
          stockNum:0,
          stockList:[],
          productAttr:[],
          keyword:null
        },
      selectForm:{},
      goodsList:[],
      selectProductCateValue:[],
      productCateOptions:[],
      defaultParams: {
        label: "name",
        value: "id",
        children: "childrenCategoryList",
      },
      stockOptions:[
         {
          lable: "售罄",
          value: 0,
        },
        {
          lable: "紧张",
          value: 1,
        },
        {
          lable: "充足",
          value: 2,
        }
      ],
      statusOptions:[
        {
          lable: "已上架",
          value: 1,
        },
        
        {
          lable: "新品",
          value: 2,
        },
        {
          lable: "推荐",
          value: 3,
        },
        {
          lable: "已下架",
          value: 0,
        },
      ],
      
      
    };
  },
  created(){
    this.getList()
    this.getProductCate()
  },
  computed: {
  },
  methods: {

    numValid(val){
   //只能输入数字
   this[val] =this[val].replace(/[^0-9]/g,'')
    },

    change(e) {
    let a = e.target.value.replace(/[^\d]/g, "");
    // console.log(a, e.target.value)
    if (a != e.target.value) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  },

  handleDeleteProduct(index,row){
      this.$confirm('确定删除此商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$axios.get('/pms/goods/delete/'+row.id).then(res=>{
            this.getList()
            this.$message({
            message: res.data.msg,
            type: 'sucess',
            duration: 1000
          });
          })
        })
  },




    chandPublishStatus(row){
      this.$axios.get("/pms/goods/updatePublishStatus",{
        params: {
            id:row.id,
            publishStatus:row.publishStatus
          }
      }).then(res=>{
        this.$message({
            message: res.data.msg,
            type: 'sucess',
            duration: 1000
          });
      })
    },

    //获得商品分类
    getProductCate() {
      
      this.$axios.get("/pms/cate/allList").then((res) => {
        this.productCateOptions = res.data.data
        this.productCateOptions.push({name:"全部",id:null})
      
      });
    },

    getProductCategoryId() {
      if (this.selectProductCateValue.length != 0) {  
        this.selectForm.categoryId = this.selectProductCateValue[1];
      }
    },

    //查看详情窗口
    handleShowProduct(index, row) {
       this.$router.push({path:'/pms/goodsDetails',query:{id:row.id}});
    },
    //SKU窗口
    handlerEditSKU(index,row){
      this.editSkuInfo.dialogVisible = true
      this.$axios.get("/pms/goods/stockInfo/"+row.id).then(res=>{
        
        
        this.editSkuInfo.stockList = res.data.data
      })
    },
    // getLists(){
    //   console.log(this.selectForm)
    // },


    //获得商品列表
    getList(){
      this.selectForm.current = this.current
      this.selectForm.size = this.size
      
      this.$axios.post("/pms/goods/list",this.selectForm
      ).then(res=>{
        this.goodsList = res.data.data.records
        this.size = res.data.data.size;
        this.current = res.data.data.current;
        this.total = res.data.data.total;
      })
    },
  
    //修改库存商品价格
    handleEditSkuConfirm(){
        if(this.editSkuInfo.stockList==null||this.editSkuInfo.stockList.length<=0){
          this.$message({
            message: '暂无信息',
            type: 'warning',
            duration: 1000
          });
          return
        }
        this.$confirm('是否要进行修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          
          this.$axios.post("/pms/goods/editStockInfo",this.editSkuInfo.stockList[0]).then(res=>{
            this.editSkuInfo.stockList = []
            this.editSkuInfo.dialogVisible = false
            this.$message({
            message: res.data.msg,
            type: 'success',
            duration: 1000
          });

            
          })
        });
      },
      //分页页码改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.getList();
    },
    handleEditProduct(index,row){
      this.$router.push({path:'/pms/updateGoods',query:{id:row.id}});

    }
    
  },
};
</script>

<style scoped>
/* .header {
  width: 320px;
  height: 40px;
  
} */
.margin-top {
  font-size: 15px;
  /* line-height: 20; */
}

.pagination{
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 15px;
}
.el-descriptions-item {
  line-height: 1;
}

.demo-form-inline {
  width: 100%;
  /* height: 40px; */
  margin-left: 0;
  float: left;
}
.demo-form-inline-item {
  margin-right: 20px;
  width: 200px;
  float: left;
}
.demo-form-inline-item-button{
  float: left;
}


.table-button {
  float: right;
}
.el-card {
  /* height: 80px; */
  margin-bottom: 10px;
  width: 100%;
}
.goods-style {
  text-align: center;
}
</style>