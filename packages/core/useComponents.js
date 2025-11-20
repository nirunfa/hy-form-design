/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import { pluginManager } from "../utils/index";

pluginManager.addComponent("input", () => import("ant-design-vue/lib/input"));

pluginManager.addComponent("textarea", () =>
  import("ant-design-vue/lib/input/TextArea")
);
pluginManager.addComponent("number", () =>
  import("ant-design-vue/lib/input-number")
);
pluginManager.addComponent("select", () => import("ant-design-vue/lib/select"));
pluginManager.addComponent("checkbox", () =>
  import("ant-design-vue/lib/checkbox/Group")
);
pluginManager.addComponent("checkboxItem", () =>
  import("ant-design-vue/lib/checkbox/Checkbox")
);
pluginManager.addComponent("radio", () =>
  import("ant-design-vue/lib/radio/Group")
);

pluginManager.addComponent("radioItem", () =>
  import("ant-design-vue/lib/radio/Radio")
);

pluginManager.addComponent("radioButton", () =>
  import("ant-design-vue/lib/radio/RadioButton")
);
pluginManager.addComponent(
  "switch",
  () => import("ant-design-vue/lib/switch"),
  "checked"
);

pluginManager.addComponent("rate", () => import("ant-design-vue/lib/rate"));
pluginManager.addComponent("aSlider", () =>
  import("ant-design-vue/lib/slider")
);
pluginManager.addComponent("treeSelect", () =>
  import("ant-design-vue/lib/tree-select")
);
pluginManager.addComponent("cascader", () =>
  import("ant-design-vue/lib/cascader")
);

pluginManager.addComponent("alert", () => import("ant-design-vue/lib/alert"));
pluginManager.addComponent("aButton", () =>
  import("ant-design-vue/lib/button")
);

pluginManager.addComponent("button", () =>
  import("../components/KButton/index")
);
pluginManager.addComponent("divider", () =>
  import("../components/KDivider/index")
);
pluginManager.addComponent("html", () => import("../components/KHtml/index"));
pluginManager.addComponent("slider", () =>
  import("../components/KSlider/index")
);
pluginManager.addComponent("text", () => import("../components/KText/index"));

pluginManager.addComponent("date", () =>
  import("../components/KDatePicker/index")
);
pluginManager.addComponent("time", () =>
  import("../components/KTimePicker/index")
);
pluginManager.addComponent("uploadFile", () =>
  import("../components/UploadFile/index")
);
pluginManager.addComponent("uploadImg", () =>
  import("../components/UploadImg/index")
);
pluginManager.addComponent("batch", () => import("../components/KBatch/index"));
pluginManager.addComponent("selectInputList", () =>
  import("../components/KSelectInputList/index")
);
pluginManager.addComponent("editor", () =>
  import("../components/KEditor/index")
);

pluginManager.addComponent("timePicker", () =>
  import("ant-design-vue/lib/time-picker")
);
pluginManager.addComponent("datePicker", () =>
  import("ant-design-vue/lib/date-picker")
);

pluginManager.addComponent("rangePicker", async () => {
  const datePicker = await import("ant-design-vue/lib/date-picker");
  return datePicker.default["RangePicker"];
});
pluginManager.addComponent("monthPicker", async () => {
  const datePicker = await import("ant-design-vue/lib/date-picker");
  return datePicker.default["MonthPicker"];
});

pluginManager.addComponent("upload", () => import("ant-design-vue/lib/upload"));
pluginManager.addComponent("uploadDragger", () =>
  import("ant-design-vue/lib/upload/Dragger")
);

pluginManager.addComponent(
  "colorPicker",
  async () => (await import("vcolorpicker"))["default"]["colorPicker"]
);
pluginManager.addComponent(
  "codemirror",
  () => import("../components/KCodeMirror/index")
);

/**
 * 注册Antd组件
 * @param {*} App
 */
export function useAntd(App) {
  //使用 import()方式动态导入ant-design-vue组件
  App.use(() => import("ant-design-vue/lib/config-provider"));
  App.use(() => import("ant-design-vue/lib/tooltip"));
  App.use(() => import("ant-design-vue/lib/empty"));
  App.use(() => import("ant-design-vue/lib/form-model"));
  App.use(() => import("ant-design-vue/lib/collapse"));
  App.use(() => import("ant-design-vue/lib/layout"));
  App.use(() => import("ant-design-vue/lib/card"));
  App.use(() => import("ant-design-vue/lib/form"));
  App.use(() => import("ant-design-vue/lib/row"));
  App.use(() => import("ant-design-vue/lib/col"));
  App.use(() => import("ant-design-vue/lib/modal"));
  App.use(() => import("ant-design-vue/lib/table"));
  App.use(() => import("ant-design-vue/lib/tabs"));
  App.use(() => import("ant-design-vue/lib/icon"));
}
