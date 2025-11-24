/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import { pluginManager } from "../utils/index";

import {
  ConfigProvider,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Radio,
  Rate,
  Slider,
  Switch,
  TreeSelect,
  Cascader,
  Alert,
  Button,
  Upload,
  TimePicker,
  DatePicker,
  Layout,
  Card,
  Empty,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Tooltip,
  FormModel,
  Collapse
} from "ant-design-vue";

pluginManager.addComponent("input", Input);

pluginManager.addComponent("textarea", () =>
  import("ant-design-vue/lib/input/TextArea")
);
pluginManager.addComponent("number", InputNumber);
pluginManager.addComponent("select", Select);
pluginManager.addComponent("checkbox", Checkbox.Group);
pluginManager.addComponent("checkboxItem", Checkbox);
pluginManager.addComponent("radio", Radio.Group);
pluginManager.addComponent("radioItem", Radio);
pluginManager.addComponent("radioButton", Radio.Button);

pluginManager.addComponent("radioItem", Radio);

pluginManager.addComponent("radioButton", Radio.Button);
pluginManager.addComponent("switch", Switch, "checked");

pluginManager.addComponent("rate", Rate);
pluginManager.addComponent("aSlider", Slider);
pluginManager.addComponent("treeSelect", TreeSelect);
pluginManager.addComponent("cascader", Cascader);

pluginManager.addComponent("alert", Alert);
pluginManager.addComponent("aButton", Button);

pluginManager.addComponent("timePicker", TimePicker);
pluginManager.addComponent("datePicker", DatePicker);

pluginManager.addComponent("rangePicker", DatePicker.RangePicker);
pluginManager.addComponent("monthPicker", DatePicker.MonthPicker);

pluginManager.addComponent("upload", Upload);
pluginManager.addComponent("uploadDragger", Upload.Dragger);

import KDivider from "../components/KDivider/index";
import KHtml from "../components/KHtml/index";
import KText from "../components/KText/index";
import KEditor from "../components/KEditor/index";
import KCodeMirror from "../components/KCodeMirror/index";

pluginManager.addComponent("button", ()=>import("../components/KButton/index"));
pluginManager.addComponent("divider", KDivider);
pluginManager.addComponent("html", KHtml);
pluginManager.addComponent("slider", ()=>import("../components/KSlider/index"));
pluginManager.addComponent("text", KText);

pluginManager.addComponent("date", ()=>import("../components/KDatePicker/index"));
pluginManager.addComponent("time", ()=>import("../components/KTimePicker/index"));
pluginManager.addComponent("uploadFile", ()=>import("../components/UploadFile/index"));
pluginManager.addComponent("uploadImg", ()=>import("../components/UploadImg/index"));
pluginManager.addComponent("batch", ()=>import("../components/KBatch/index"));
pluginManager.addComponent("selectInputList", ()=>import("../components/KSelectInputList/index"));
pluginManager.addComponent("editor", KEditor);
pluginManager.addComponent("codemirror", KCodeMirror);

import colorPicker from "vcolorpicker";
pluginManager.addComponent("colorPicker", colorPicker.colorPicker);

/**
 * 注册Antd组件
 * @param {*} App
 */
export async function useAntd(App) {
  App.use(ConfigProvider);
  App.use(Tooltip);
  App.use(Empty);
  App.use(FormModel);
  App.use(Collapse);
  App.use(Layout);
  App.use(Card);
  App.use(Form);
  App.use(Row);
  App.use(Col);
  App.use(Modal);
  App.use(Table);
  App.use(Tabs);
  App.use(Icon);
}
