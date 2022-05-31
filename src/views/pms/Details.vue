<template>
  <el-card class="box-card" shadow="never">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品信息" name="first">
        <el-col :span="7">
        
          <div class="image">
            <el-image
              style="width: 80%; height: 400px;"
              :src="goodInfos.pic == null ? url : goodInfos.pic"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
          <span >{{goodInfos.name}}</span>
        </el-col>
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="9"
          ><div class="grid-content">
            <el-descriptions
              class="margin-top"
              title="基本信息"
              direction="vertical"
              :column="4"
              size="medium "
              border
            >
            
              <el-descriptions-item>
                <template slot="label">
                  商品名称
                </template>
                {{goodInfos.name}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  商品ID
                </template>
                {{goodInfos.id}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  货号
                </template>
                {{goodInfos.productSn}}
              </el-descriptions-item>

             <el-descriptions-item>
                <template slot="label">
                  排序
                </template>
                {{goodInfos.sort}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  商品类别
                </template>
                {{goodInfos.productCategoryName}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  商品品牌
                </template>
                {{goodInfos.brandName}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  价格
                </template>
                {{goodInfos.price}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  促销价格
                </template>
                {{goodInfos.promotionPrice == null?"暂无": goodInfos.promotionPrice}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  库存
                </template>
                {{goodInfos.stock}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  销量
                </template>
                {{goodInfos.sale}}
              </el-descriptions-item>

               

              <el-descriptions-item>
                <template slot="label">
                  是否上架
                </template>
                {{goodInfos.publishStatus == 1?"是":"否"}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  是否推荐
                </template>
                {{goodInfos.recommandStatus == 1?"是":"否"}}
              </el-descriptions-item>

             <el-descriptions-item>
                <template slot="label">
                  是否新品
                </template>
                {{goodInfos.newStatus == 1?"是":"否"}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  是否促销
                </template>
                {{goodInfos.promotionType == 1? "是":"否"}}
              </el-descriptions-item>


              <el-descriptions-item>
                <template slot="label">
                  创建时间
                </template>
                {{goodInfos.created == null ? "暂无" : goodInfos.created}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template slot="label">
                  更新时间
                </template>
                {{goodInfos.updated == null ? "暂无" : goodInfos.updated}}
              </el-descriptions-item>
            </el-descriptions>
          </div></el-col
        >
        <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>
        <el-col :span="6"
          ><div class="grid-content">
              <el-descriptions
              class="margin-top"
              title="规格信息"
              direction="vertical"
              :column="2"
              size="medium "
              border
            >
            
              <el-descriptions-item v-for="Values in goodInfos.productAttributeValues" :key="Values.id">
                <template slot="label">
                  {{Values.name}}
                </template>
                {{Values.value}}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          </el-col>
      </el-tab-pane>
      <!--  -->
      <el-tab-pane label="后续扩展" disabled name="second">待开发</el-tab-pane>
      <!--  -->
      <el-tab-pane label="后续扩展" disabled name="third">待开发</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      activeName: "first",
      goodInfos:{},
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      pic:null
      ,
      picList:[]
    };
  },
  created(){
      this.getProductInfo()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getProductInfo() {
      this.$axios.get("/pms/goods/info/" + this.$route.query.id).then((res) => {
        this.goodInfos = res.data.data;  
        if(this.goodInfos.pic != null){
            this.srcList.push(this.goodInfos.pic)
        }
        this.$message({
          message: res.data.msg,
          type: "success",
          duration: 1000,
        });
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.image {
  border: 1px;
}
.grid-content {
  display: flex;
  flex-direction: column;
}
.margin-top{
    width: 100%;
}
</style>