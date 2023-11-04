<script lang="ts" setup>
import { toggleDark } from "~/composables";
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">Know your wisdom</el-menu-item>
    <el-menu-item index="2">ChatGPT 4.0</el-menu-item>
    <el-menu-item index="3">Passphrase</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>

<!--    add advatar to the left corner-->
    <el-menu-item index="5">Posts</el-menu-item>

  </el-menu>

</template>
