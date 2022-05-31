<template>
   <el-card class="box-card" v-loading="loading">
    <el-form
      :model="editForm"
      :rules="editFormRules"
      class="editForms"
      ref="editFormRef"
      label-width="80px"
      size="small"
    >
      <!-- <el-steps
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品详情"></el-step>
        <el-step title="商品属性"></el-step>
        
      </el-steps> -->

      <el-steps :active="activeIndex - 0" simple>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="商品详情" icon="el-icon-upload"></el-step>
        <el-step title="商品属性" icon="el-icon-picture"></el-step>
      </el-steps>

      <div class="div-step" v-show="activeIndex == 0" style="width: 400px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="子标题" prop="goods_price">
          <el-input v-model="editForm.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goods_price">
          <el-cascader
            :props="defaultParams"
            v-model="selectProductCateValue"
            @change="getProductCategoryId"
            :options="productCateOptions"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="商品品牌" prop="goods_weight">
          <el-select v-model="editForm.brandId" placeholder="请选择品牌">
            <el-option
              v-for="item in brandOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品介绍" prop="goods_number">
          <el-input v-model="editForm.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="goods_name">
          <el-input v-model="editForm.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="goods_name">
          <el-input v-model.number="editForm.stock"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" size="medium " @click="handleNext"
            >下一步，填写商品详情</el-button
          >
        </el-form-item>
      </div>

      <div class="div-step" v-show="activeIndex == 1" style="width: 500px">
        <el-form-item label="商品上架">
          <el-switch
            v-model="editForm.publishStatus"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品促销">
          <el-switch
            v-model="editForm.promotionType"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="商品推荐">
          <span style="margin-right: 10px">新品</span>
          <el-switch
            style="margin-right: 10px"
            v-model="editForm.newStatus"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
          <span style="margin-right: 10px">推荐</span>
          <el-switch
            style="margin-right: 10px"
            v-model="editForm.recommandStatus"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>

        <el-form-item
          label="促销价格"
          v-if="editForm.promotionType == 1"
          prop="goods_price"
        >
          <el-input v-model="editForm.promotionPrice" type="number"></el-input>
        </el-form-item>

        <el-form-item label="详情标题" prop="goods_price">
          <el-input v-model="editForm.detailTitle" ></el-input>
        </el-form-item>

        <el-form-item label="详情内容" prop="goods_price">
          <el-input v-model="editForm.detailDesc" type="textarea"></el-input>
        </el-form-item>

        <el-form-item style="text-align: center">
          <el-button style="width=100px" size="medium " @click="handleLast"
            >上一步，填写商品信息</el-button
          >
          <el-button
            type="primary"
            style="width=100px"
            size="medium "
            @click="handleNext"
            >下一步，填写商品属性</el-button
          >
        </el-form-item>
      </div>

      <div class="div-step" v-show="activeIndex == 2" style="width: 500px">
        <el-form-item label="商品分类" prop="brandId">
          <el-cascader
            disabled
            v-model="selectProductCateValue"
            :props="defaultParams"
            :options="productCateOptions"
          >
          </el-cascader>
          <el-button style="margin-left: 10px" @click="addDomain"
            >新增属性</el-button
          >
        </el-form-item>

        <el-card
          shadow="never"
          class="cardBg"
          style="margin-bottom: 20px"
          v-if="
            attributeOptions != undefined &&
            attributeOptions != null &&
            attributeOptions.length > 0
          "
        >
          <el-form-item label="例如:" class="attribute">
            <el-input
              placeholder="颜色"
              disabled
              style="width: 100px; margin-right: 20px"
            ></el-input>
            <el-input
              placeholder="白;黑;粉"
              disabled
              style="width: 100px; margin-right: 20px"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="attribute"
            v-for="(attribute, index) in attributeOptions"
            :key="index"
          >
            <el-input
              placeholder="属性名"
              style="width: 100px; margin-right: 20px"
              v-model="attribute.name"
            ></el-input>
            <el-input
              placeholder="属性值"
              style="width: 100px; margin-right: 20px"
              v-model="attribute.value"
            ></el-input>
            <el-button
              style="margin-right: 20px"
              @click="removeDomain(index)"
              type="primary"
              icon="el-icon-delete"
            ></el-button>
          </el-form-item>
        </el-card>

        <el-form-item label="商品相册">
          <multi-upload v-model="editForm.pic"></multi-upload>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button style="width=100px" size="medium " @click="handleLast"
            >上一步，填写商品详情</el-button
          >
          <el-button
            type="primary"
            style="width=100px"
            size="medium "
            @click="handleNext"
            >下一步，去完成提交</el-button
          >
        </el-form-item>
      </div>

      <div class="div-step" v-show="activeIndex == 4" style="width: 500px">
        <span>商品提交成功！</span>
        <el-form-item style="text-align: center">
          <el-button
            type="primary"
            style="width=100px"
            size="medium "
            @click="handleLast"
            >上一步，填写商品属性</el-button
          >
          <el-button
            type="primary"
            style="width=100px"
            size="medium "
            @click="handleNext"
            >下一步，去完成</el-button
          >
        </el-form-item>
      </div>

      <div
        class="div-step"
        v-show="activeIndex == 3"
        style="width: 500px; text-align: center"
      >
        <span>{{ msg }}</span>
      </div>
    </el-form>
  </el-card>
</template>
<script>
import MultiUpload from "@/components/Upload/multiUpload.vue";
export default {
  name: "addGoods",
  components: { MultiUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      msg: "",
      //等待
      loading: false,

      //步骤条当前激活的索引
      activeIndex: 0,
      // 添加商品的表单数据对象
      editForm: {},
      // 添加商品表单的验证规则对象
      editFormRules: {},

      ProductCategoryId: null,

      //选中商品分类
      selectProductCateValue: [],
      productCateOptions: [],
      
      defaultParams: {
        label: "name",
        value: "id",
        children: "childrenCategoryList",
      },

      //品牌分类
      brandOptions: [],

      //商品属性
      attributeOptions: [],

      value: "",
    };
  },
  created() {
    if (this.isEdit) {
      this.getBrand()
      this.getUpdateProductInfo()
      this.getProductCate()
      
      
    }else{
      this.getBrand();
      this.getProductCate();
    }

    

    //编辑:初始化请求商品数据、商品品牌数据、商品分类数据
    // if(this.isEdit){

    //   // this.$axios.then(res=>{

    //   // })
    // }
    // //添加:初始化请求商品品牌数据、商品分类数据
    // else{
    //   this.getBrand
    //   this.getProductCate
    //
    // }
  },
  computed:{
  },
  methods: {
    getUpdateProductInfo() {
      this.$axios.get("/pms/goods/info/" + this.$route.query.id).then((res) => {
        this.editForm = res.data.data;
        if(res.data.data.productAttributeValues != null){
          this.attributeOptions = res.data.data.productAttributeValues;
        }
        
        
        this.$message({
          message: res.data.msg,
          type: "success",
          duration: 1000,
        });
      });
    },

    getProductCategoryId() {
      
      if (this.selectProductCateValue.length != 0) {
        
        this.productCategoryId = this.selectProductCateValue[1];
        
        this.$set(this.editForm, "productCategoryId", this.productCategoryId);
        this.$set(this.editForm, "productParentCategoryId", this.selectProductCateValue[0]);
      }
    },

    //编辑界面，获取当前分类的父级分类id
    getUpdateProductCate() {
      for (var i = 0, len = this.productCateOptions.length; i < len; i++) {
         
          for(var j = 0,lens = this.productCateOptions[i].childrenCategoryList.length;j<lens;j++){
             
            if(this.productCateOptions[i].childrenCategoryList[j].id == this.editForm.productCategoryId){

              
              this.selectProductCateValue[0]=this.productCateOptions[i].id
              this.selectProductCateValue[1]=this.editForm.productCategoryId
              break
            }
          }
        }
    },

    getProductCate() {
      this.$axios.get("/pms/cate/allList").then((res) => {
        this.productCateOptions = res.data.data
        this.getUpdateProductCate()
      });
    },

    //获取商品品牌数据
    getBrand() {
      this.$axios.get("/pms/brand/list").then((res) => {
        this.brandOptions = res.data.data;
      });
    },

    //属性删除
    removeDomain(index) {
      this.attributeOptions.splice(index, 1);
    },
    //属性添加
    addDomain() {
      this.attributeOptions.push({ value: "", name: "" });
    },

    //步骤条跳转下一级
    handleNext() {
      var tem = this.activeIndex + 1;
      if (tem == 3) {
        this.$confirm("是否要提交该产品", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.loading = true;
          this.$set(
            this.editForm,
            "productAttributeValues",
            this.attributeOptions
          );
          // console.log(this.editForm)
          this.$axios.post(
              "/pms/goods/" + (this.editForm.id ? "update" : "save"),
              this.editForm
            )
            .then((res) => {
              this.activeIndex += 1;
              this.msg = res.data.msg;
              this.loading = false;
              this.editForm={};
              let timer = setTimeout(() => {
                //需要定时执行的代码
                if (this.isEdit) {
                  this.$router.go(-1);
                } else {
                  location.reload();
                }
              }, 2000);
            });
        });
      } else {
        this.activeIndex += 1;
      }
    },

    //步骤条跳转上一级
    handleLast() {
      this.activeIndex -= 1;
    },
    // openFullScreen1() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.loading = false;
    //     this.msg = "提交成功";
    //   }, 1000);
    // },
  },
};
</script>
<style>
.el-steps {
  width: 85%;
  margin-bottom: 5%;
}
.el-step__title {
  font-size: 13px;
}
.div-step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}
.box-card {
  width: 60%;
  margin: auto;
  text-align: left;
}
/* .editForms{
  display: flex;
  margin: auto;
  flex-direction:column;
  justify-content:center ;
} */
</style>
