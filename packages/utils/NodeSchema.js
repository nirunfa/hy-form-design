/**
 * 节点管理
 */
import { pluginManager } from "./index";
import { defaultSchemaList } from "../components/HyFormDesign/config/formItemsConfig";
class NodeSchema {
  schemaList = [];
  schemaGroup = [
    {
      id: "basic",
      title: "基础组件",
      list: [
        "input",
        "textarea",
        "number",
        "select",
        "checkbox",
        "radio",
        "date",
        "time",
        "rate",
        "slider",
        "uploadFile",
        "uploadImg",
        "cascader",
        "treeSelect",
        "batch",
        "selectInputList",
        "editor",
        "switch",
        "button",
        "alert",
        "text",
        "html"
      ]
    },
    {
      id: "layout",
      title: "布局组件",
      list: ["divider", "card", "tabs", "grid", "table"]
    }
  ];
  designSchemaGroup = [];

  /**
   * 添加节点结构数据
   * @param {*} schemas []
   * @returns
   */
  addSchemas(schemas) {
    const s = schemas
      .filter(ss => this.schemaList.findIndex(sl => sl.type === ss.type) === -1)
      .map(item => {
        // 存在component组件则添加到插件管理器中
        item.component && pluginManager.addComponent(item.type, item.component);
        item.optionsComponent && pluginManager.addComponent(item.optionsComponent.name, item.optionsComponent.component);
        // 删除schemas中的component属性
        delete item.component;
        item.optionsComponent && delete item.optionsComponent.component;
        return item;
      });

    return this.schemaList.push(...s);
  }

  /**
   * 获取所有node schema
   * @returns
   */
  getSchemaList() {
    return this.schemaList;
  }

  /**
   * 通过type查询node schema
   * @returns
   */
  getSchemaByType(type) {
    const schemaList = this.schemaList;
    for (const i in schemaList) {
      if (schemaList[i].type === type) {
        return schemaList[i];
      }
    }
    return null;
  }

  /**
   * 设置分组,这个操作将会覆盖原来的数据
   * @param {*} schemaGroup
   * @returns
   */
  setSchemaGroup(schemaGroup) {
    this.schemaGroup = schemaGroup;
  }

  /**
   * 添加分组
   * @param {*} schemaGroupItem
   * @param mixed id
   * @returns
   */
  addSchemaGroup(schemaGroupItem, id = false) {
    if (
      typeof schemaGroupItem?.id === "undefined" ||
      schemaGroupItem?.id.toString().trim().length === 0
    ) {
      schemaGroupItem.id = id || new Date().getTime();
    }

    if (id !== false) {
      const index = this.hasSchemaGroupById(id, false);
      if (index === -1) {
        id = false;
      } else {
        this.schemaGroup[index]["title"] = schemaGroupItem.title;
        schemaGroupItem.list.forEach(element => {
          if (!this.schemaGroup[index]["list"].includes(element)) {
            this.schemaGroup[index]["list"].push(element);
          }
        });
      }
    }
    if (id === false) {
      this.schemaGroup.push(schemaGroupItem);
    }
    this.designSchemaGroup.length = 0;
    this.designSchemaGroup.push(...this.getSchemaByGroup());
  }

  /**
   * 根据 Id 判断是否存在
   * @param {*} id
   * @param boolean returnBool
   * @returns boolean|numeric
   */
  hasSchemaGroupById(id, returnBool = true) {
    const findIndex = this.schemaGroup.findIndex(
      sg => sg.id.toString() === id.toString()
    );
    if (returnBool) {
      return findIndex !== -1;
    }
    return findIndex;
  }

  /**
   * 添加计算schemaGroup 值
   * @param {*} schemaGroup
   */
  addComputed(schemaGroup) {
    this.designSchemaGroup = schemaGroup;
    schemaGroup.push(...this.getSchemaByGroup());
  }

  /**
   * 按照分组获取schemaGroupList
   * @returns schemaGroupList
   */
  getSchemaByGroup() {
    const schemaGroupList = this.schemaGroup.map(item => {
      const list = this.schemaList.filter(v => {
        return item.list.includes(v.type);
      });
      return {
        ...item,
        list
      };
    });
    return schemaGroupList;
  }
}

export const nodeSchema = new NodeSchema();
nodeSchema.addSchemas(defaultSchemaList);
