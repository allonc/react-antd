import React from "react";
import { Card, Table, Button, Popconfirm } from "antd";

const data = [
  {
    key: "1",
    name: "只狼:影逝二度",
    price: 398,
    id: 1
  },
  {
    key: "2",
    name: "怪物猎人:冰原",
    price: 598,
    id: 2
  },
  {
    key: "3",
    name: "赛尔达传说",
    price: 299,
    id: 3
  },
  {
    key: "4",
    name: "最终幻想",
    price: 429,
    id: 4
  }
];

function List(props) {
  const columns = [
    {
      title: "商品编号",
      key: "id",
      width: 200,
      align: "center",
      render: (txt, record, index) => index + 1
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "操作",
      render: (txt, record, index) => {
        return (
          <div>
            <Button type="primary" size="small">
              修改
            </Button>
            <Popconfirm
              title="确定删除此商品？"
              onCancel={() => console.log("取消")}
              onConfirm={() => console.log('确定')}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      }
    }
  ];
  return (
    <Card
      title="商品列表"
      extra={
        <Button type="primary" size="small" onClick={() => props.history.push('/admin/products/edit')}>
          新增
        </Button>
      }
    >
      <Table columns={columns} dataSource={data} bordered />
    </Card>
  );
}

export default List;
