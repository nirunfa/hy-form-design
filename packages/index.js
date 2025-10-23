import Vue from "vue";

// 导入ant组件
import { useAntd } from "./core/useComponents";

import * as all from "./mini";
useAntd(Vue);

export default all.default;
export const HyFormBuild = all.HyFormBuild;
export const HyFormDesign = all.HyFormDesign;
export const HyFormItem = all.HyFormItem;
export const HyFormPreview = all.HyFormPreview;
export const nodeSchema = all.nodeSchema;
export const pluginManager = all.pluginManager;
