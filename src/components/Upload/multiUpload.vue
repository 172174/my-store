<template>
   
  <div>
    <el-upload
      :action="objdata.host"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="getUploadData"
      :data="objdata"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>

import { Upload } from 'element-ui';

export default {
  name: "multiUpload",
  props: {
    //图片属性数组
    value: Array,
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 5,
    },
  },
  data() {
      return {
        ossUploadUrl:'https://xinyiran-mall.oss-cn-chengdu.aliyuncs.com',
        objdata:{
          OSSAccessKeyId:'',
          policy:'',
          key:'',
          Signature:'',
          dir:'',
          host:'',
        },
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    // created(){
    //    this.$axios.get("/oss/policy").then(res =>{ 
    //         this.objdata.OSSAccessKeyId = res.data.data.accessid
    //         this.objdata.policy = res.data.data.policy
    //         this.objdata.Signature = res.data.data.signature
    //         this.objdata.host = res.data.data.host
    //         this.objdata.dir = res.data.data.dir
    //         this.objdata.key = res.data.data.dir+"${filename}"  
    //     })
        
    // },
    methods: {

      getUploadData(){
        let _self = this
        return new Promise((resolve,reject)=>{
          this.$axios.get("/oss/policy").then(res =>{
            _self.objdata.OSSAccessKeyId = res.data.data.accessid
            _self.objdata.policy = res.data.data.policy
            _self.objdata.Signature = res.data.data.signature
            _self.objdata.host = res.data.data.host
            _self.objdata.dir = res.data.data.dir
            _self.objdata.key = res.data.data.dir+"${filename}" 
            resolve(true)
        })
        .catch(function(error){
            reject(false)
        })
        }) 
      },
      
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        
        this.dialogVisible = true;
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleSuccess(res, file){
        let url = this.objdata.host + '/' + this.objdata.dir  + file.name;
        this.emitInput(url);
      }
    }
};
</script>
<style>
</style>


