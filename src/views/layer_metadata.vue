<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="title-mo">
          <i class="el-icon-lx-cascades"></i> 图层元数据管理
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
        <el-table-column
            prop="id"
            label="数据ID"
            width="70"
            align="center"
        ></el-table-column>
        <el-table-column prop="cropType" label="作物类型" align="center"></el-table-column>
        <el-table-column label="监测参数">
          <template #default="scope" align="center">{{scope.row.param }}</template>
        </el-table-column>
        <el-table-column label="监测范围">
          <template #default="scope" align="center">{{scope.row.area }}</template>
        </el-table-column>
        <el-table-column prop="metaDate" label="图层时间" align="center"></el-table-column>
        <el-table-column prop="metaPath" label="图层路径" width="150" align="center"></el-table-column>
        <el-table-column prop="metaName" label="图层名称" align="center"></el-table-column>
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
      <el-dialog title="修改" v-model="editVisible" width="30%">
        <el-form label-width="70px">
          <el-form-item label="作物类型">
            <el-input v-model="form.cropType"></el-input>
          </el-form-item>
          <el-form-item label="监测参数">
            <el-input v-model="form.param"></el-input>
          </el-form-item>
          <el-form-item label="监测范围">
            <el-input v-model="form.area"></el-input>
          </el-form-item>
          <el-form-item label="图层时间">
            <el-input v-model="form.metaDate"></el-input>
          </el-form-item>
          <el-form-item label="图层路径">
            <el-input v-model="form.metaPath"></el-input>
          </el-form-item>
          <el-form-item label="图层名称">
            <el-input v-model="form.metaName"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
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

<script setup lang="ts" name="layer_metadata">
import {ref, reactive} from 'vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import {Search, Plus} from '@element-plus/icons-vue';
import {fetchData} from '../api/index';

interface TableItem {
  id: number;
  cropType: String;
  param: String;
  area: String;
  metaDate: String;
  metaPath: String;
  metaName: String;
}

const query = reactive({
  id: "",
  cropType: "",
  param: "",
  area: "",
  metaDate: "",
  metaPath: "",
  metaName:"",
  pageIndex: 1,
  pageSize: 10,
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
  fetchData().then(res => {
    tableData.value = res.data.list;
    pageTotal.value = res.data.pageTotal || 50;
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
  param: "",
  area: "",
  metaDate: "",
  metaPath: "",
  metaName:"",
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;

  // 此处有代码需要修改

  editVisible.value = true;
};
const saveEdit = () => {
  editVisible.value = false;
  ElMessage.success(`修改第 ${idx + 1} 行成功`);

  /*这里还有代码要填*/

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
