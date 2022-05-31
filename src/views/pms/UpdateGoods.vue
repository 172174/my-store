<template>
  <AddGoods :isEdit="true"></AddGoods>
</template>

<script>
import addGoods from "./addGoods.vue"
import AddGoods from "./addGoods.vue" 
export default {
  name: 'UpdateGoods',
  comments:{addGoods},
  data() { 
    return {

    }
  },
  components:{
    AddGoods
},
  methods:{

  },
  mounted() {

  },
 }
</script>

<style scoped>
</style>