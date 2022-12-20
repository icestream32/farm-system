<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="title-mo">
          <i class="el-icon-lx-cascades"></i> 作物面积数据管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.cropType" placeholder="作物类型" class="handle-input mr10"></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        <!-- 此处需新增添加功能 -->
        <el-button type="primary" :icon="Plus">添加</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header">
        <el-table-column type="index" label="序号" width="70" align="center"/>
        <el-table-column prop="cropType" label="作物类型" align="center"/>
        <el-table-column prop="cropRange" label="作物范围" align="center"/>
        <el-table-column prop="area" label="作物面积" align="center"/>
        <el-table-column prop="startTime" label="开始时间" align="center"/>
        <el-table-column prop="endTime" label="结束时间" align="center"/>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" v-model="editVisible" width="30%">
        <el-form label-width="70px">
          <el-form-item label="作物类型">
            <el-input v-model="form.cropType"></el-input>
          </el-form-item>
          <el-form-item label="作物范围">
            <el-input v-model="form.cropRange"></el-input>
          </el-form-item>
          <el-form-item label="作物面积">
            <el-input v-model="form.cropArea"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-input v-model="form.startTime"></el-input>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.endTime"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit"
                    >确 定</el-button
                    >
                </span>
        </template>
      </el-dialog>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="crop_area">
import {ref, reactive} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {Delete, Edit, Search, Plus} from '@element-plus/icons-vue';
import {fetchData} from '../api/index';
import {getCropAreaList} from "../api/crop_area";

interface TableItem {
  id: number;
  cropType: String;
  cropRange: String;
  area: String;
  startTime: String;
  endTime: String;
}

const query = reactive({
  id: "",
  cropType: "",
  cropRange: "",
  area: "",
  startTime: "",
  endTime: "",
  pageIndex: 1,
  pageSize: 10,
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  getCropAreaList({page : query.pageIndex, pageSize : query.pageSize, name : query.cropType})
      .then(res => {
        tableData.value = res.data.records;
        pageTotal.value = res.data.total || 50;
      }).catch(err => {
    console.log(err.message);
  })
};
getData();

// 查询操作
const handleSearch = () => {
  query.pageIndex = 1;
  getData();
};
// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

// 删除操作
const handleDelete = (index: number) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        ElMessage.success('删除成功');
        tableData.value.splice(index, 1);
      })
      .catch(() => {
      });
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  cropType: "",
  cropRange: "",
  cropArea: "",
  startTime: "",
  endTime: "",
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;

  // 此处有代码需要编辑

  editVisible.value = true;
};
const saveEdit = () => {
  editVisible.value = false;
  ElMessage.success(`修改第 ${idx + 1} 行成功`);

// 此处有代码需要编辑

};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
