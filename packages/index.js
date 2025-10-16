// 导入样式
import "../styles/form-design.less";
// 导入antD样式
import "./core/antdStyle";
import Vue from "vue";

// 导出本地iconfont
import "../static/icons/iconfont";
import { pluginManager, nodeSchema } from "./utils/index";
// 导入ant组件
import { useAntd } from "./core/useComponents";

// 导入单个组件
import HyFormDesign from "./components/HyFormDesign/index";
import HyFormPreview from "./components/HyFormPreview/index";
import HyFormBuild from "./components/HyFormBuild/index";
import HyFormItem from "./components/HyFormItem/index";
import { setFormDesignConfig, setFormBuildConfig } from "./mini";
useAntd(Vue);
const components = [HyFormDesign, HyFormBuild, HyFormItem, HyFormPreview];

const install = function(Vue) {
  // use ant组件
  if (install.installed) return;
  install.installed = true;

  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  setConfig: setFormDesignConfig,
  setFormDesignConfig: setFormDesignConfig,
  setFormBuildConfig: setFormBuildConfig,
  pluginManager,
  nodeSchema
};

export {
  install,
  HyFormDesign,
  HyFormBuild,
  HyFormItem,
  HyFormPreview,
  setFormDesignConfig,
  setFormBuildConfig,
  pluginManager,
  nodeSchema
};
