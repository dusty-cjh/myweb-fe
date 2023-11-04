<template>
  <el-divider></el-divider>

  <el-text type="primary" size="large" style="font-weight: bold; margin-bottom: 80px">博客列表</el-text>

  <div v-for="blog in blogDataList">
    {{ blog.title }}
  </div>

  <el-row
      v-for="(o, index) in blogDataList"
      :key="o"
      :span="24"
      :xs="{ span: 24 }"
      class="py-5 text-left"
  >
    <el-col :span="24" class="px-5 mx-5 py-3">{{ o.title }}</el-col>
    <el-col :span="24" class="px-5 mx-5">{{ o.meta.first_published_at }}</el-col>
    <el-col :span="24" class="px-5 mx-5">
      <el-button type="primary" size="small" @click="blogDetail(index)">阅读更多</el-button>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import {blogList} from "~/composables";
import {ElMessage} from "element-plus";

const blogDataList = []
let blogOffset = 0
let blogLimit = 10

const blogDetail = (index) => {
  let blog = blogDataList[index]
  window.open(blog.meta.html_url)
}

</script>

<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import {blogList} from "~/composables";

blogList(blogOffset, blogLimit).then(blogs => {
  //  update blog page
  blogOffset += blogs.length

  //  assign data to blogDataList
  blogDataList.push(...blogs)
}).catch(err => {
  console.log('get blog list error', err)
  ElMessage.error('获取博客列表失败')
})

</script>
