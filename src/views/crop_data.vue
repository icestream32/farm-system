<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="title-mo">
          <i class="el-icon-lx-cascades"></i> 农田实测数据管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.cropType" placeholder="作物类型" class="handle-input mr10"></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        <!-- 此处需新增添加功能 -->
        <el-button type="primary" :icon="Plus" @click="menuHandle(form, 'add')">添加</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          header-cell-class-name="table-header">
        <el-table-column type="index" label="序号" width="70" align="center"/>
        <el-table-column prop="cropType" label="作物类型" align="center"/>
        <el-table-column prop="longitude" label="采样经度" align="center"/>
        <el-table-column prop="latitude" label="采样纬度" align="center"/>
        <el-table-column prop="date" label="采集时间" sortable align="center"/>
        <el-table-column prop="data" label="实测数据" width="180" align="center"/>
        <el-table-column prop="userId" label="所属用户" align="center"/>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="menuHandle(scope.row, 'edit')">编辑
            </el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 弹出框 -->
      <el-dialog :title="classData.type === 'add' ? '添加' : '编辑'" v-model="editVisible" width="30%">
        <el-form label-width="70px">
          <el-form-item label="作物类型">
            <el-input v-model="form.cropType"></el-input>
          </el-form-item>
          <el-form-item label="采样经度">
            <el-input v-model="form.longitude"></el-input>
          </el-form-item>
          <el-form-item label="采样纬度">
            <el-input v-model="form.latitude"></el-input>
          </el-form-item>
          <el-form-item label="采集时间">
            <el-input v-model="form.date"></el-input>
          </el-form-item>
          <el-form-item label="实测数据">
            <el-input v-model="form.data"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit(form)">确 定</el-button>
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

<script setup lang="ts" name="crop_data">
import {ref, reactive} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {Search, Plus} from '@element-plus/icons-vue';
import {addCropData, deleteCropData, editCropData, getCropDataList} from '../api/crop_data';
import e from "express";

interface TableItem {
  id: Number;
  cropType: String;
  longitude: String;
  latitude: String;
  userId: Number;
  date: String;
  data: String;
}

const query = reactive({
  id: "",
  cropType: "",
  longitude: "",
  latitude: "",
  date: "",
  data: "",
  userId: "",
  pageIndex: 1,
  pageSize: 10,
});

let tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  getCropDataList({page: query.pageIndex, pageSize: query.pageSize, name: query.cropType}).then(res => {
    tableData.value = res.data.records;
    pageTotal.value = res.data.total || 50;
  });
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
  console.log(index);
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        deleteCropData(index).then(res => {
          ElMessage.success('删除成功');
          getData()
        })
      })
      .catch(() => {
      });
};

// 表格编辑或添加时弹窗和保存
const classData = reactive({
  type: '',
  index: ''
})
const editVisible = ref(false);
let form = reactive({
  id: '',
  cropType: '',
  longitude: '',
  latitude: '',
  date: '',
  data: ''
});

const menuHandle = (row: any, type: string) => {
  classData.type = type
  if (type === 'edit') {
    form.id = row.id
    form.cropType = row.cropType
    form.longitude = row.longitude
    form.latitude = row.latitude
    form.date = row.date
    form.data = row.data
  } else {
    form.id = ''
    form.cropType = ''
    form.longitude = ''
    form.latitude = ''
    form.date = ''
    form.data = ''
  }
  editVisible.value = true;
};

const  saveEdit = (form: any) => {
  editVisible.value = false;
  // 判断是添加还是修改
  if (classData.type === 'add') {
    addCropData(form).then(res => {
      ElMessage.success("添加成功！")
    })
  } else {
    editCropData(form).then(res => {
      ElMessage.success("修改成功！");
    })
  }
  getData()
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
