
G6.registerNode(
  'nodeName',
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中图形对象的容器
     * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
     * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) {},
    /**
     * 响应节点的状态变化。
     * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
     */
    getAnchorPoints(cfg) {},
  },
  // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
  // 当不指定该参数则代表不继承任何内置节点类型
  extendedNodeName,
);