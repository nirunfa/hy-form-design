// 导入单个组件
import HyFormDesign from "./components/HyFormDesign/index";
// import HyFormPreview from "./HyFormPreview/index";
import HyFormBuild from "./components/HyFormBuild/index";
import HyFormItem from "./components/HyFormItem/index";
const components = [HyFormDesign, HyFormBuild, HyFormItem];

const install = function(Vue) {
  // use ant组件
  if (install.installed) return;
  install.installed = true;

  components.map(component => {
    Vue.component(component.name, component);
  });
};

export { HyFormDesign, HyFormBuild, HyFormItem };

// 这里默认导出全部组件
export default {
  install,
  HyFormDesign,
  // HyFormPreview,
  HyFormBuild,
  HyFormItem
};
