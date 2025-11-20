<template>
  <a-modal
    title="预览"
    :visible="visible"
    @ok="handleGetData"
    @cancel="handleCancel"
    okText="获取数据"
    cancelText="关闭"
    style="top:20px;"
    :destroyOnClose="true"
    :centered="true"
    :dialogStyle="dialogStyle"
    :bodyStyle="bodyStyle"
    wrapClassName="hy-form-modal"
    :width="`${previewWidth}px`"
  >
    <hy-form-build
      :value="jsonData"
      @change="handleChange"
      @submit="handleSubmit"
      ref="HyFormBuild"
    />
    <jsonModel ref="jsonModel" />
  </a-modal>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 */
import jsonModel from "../HyFormDesign/module/jsonModal.vue";
import { dialogStyle, bodyStyle } from "../../config/modal.js";
export default {
  name: "HyFormPreview",
  data() {
    return {
      visible: false,
      previewWidth: 850,
      jsonData: {},
      dialogStyle,
      bodyStyle
    };
  },
  components: {
    jsonModel
  },
  methods: {
    /**
     * 按钮触发提交
     * @param {*} p
     */
    handleSubmit(p) {
      p()
        .then(res => {
          console.log(res, "获取数据成功");
          this.$refs.jsonModel.jsonData = res;
          this.$refs.jsonModel.visible = true;
        })
        .catch(err => {
          console.error(err, "获取数据失败");
        });
    },
    /**
     * 手动验证获取表单数据
     */
    async handleGetData() {
      this.$refs.HyFormBuild.getData()
        .then(res => {
          console.log(res, "获取数据成功");
          this.$refs.jsonModel.jsonData = res;
          this.$refs.jsonModel.visible = true;
        })
        .catch(err => {
          console.log(err, "获取数据失败");
        });
    },
    /**
     * 监听表单change 事件
     * @param {*} value
     * @param {*} key
     */
    handleChange(value, key) {
      console.log(value, key);
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
