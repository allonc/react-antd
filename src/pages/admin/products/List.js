import React, { useState, useEffect } from "react";
import { Card, Table, Button, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import { listApi, delOne } from "../../../services/prosucts";
import { loadProduct } from "../../../store/actions/product";
function List(props) {
  console.log(props, "list");
  const columns = [
    {
      title: "商品编号",
      key: "id",
      dataIndex: "businesse_id",
      width: 200,
      align: "center",
    },
    {
      title: "名称",
      dataIndex: "template_name",
      key: "name",
    },
    {
      title: "快递公司",
      dataIndex: "deliverie_name",
      key: "max_factory_price",
    },
    {
      title: "邮费",
      dataIndex: "accept_data",
      key: "accept_data",
      render: (txt, record) =>
        record.accept_data.length > 0 ? "全国包邮" : "不包邮",
    },
    {
      title: "操作",
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                props.history.push(`/admin/products/edit/${record.id}`);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除此商品？"
              onCancel={() => console.log("取消")}
              onConfirm={() => {
                delOne({ template_id: record.id })
                  .then((res) => {
                    // listApi().then((res) => {
                    //   setList(res.data.data);
                    // });
                    props.dispatch(
                      loadProduct()
                    );
                  })
                  .catch((err) => {
                    message.error(err.message);
                    console.log(err, "err");
                  });
              }}
            >
              <Button style={{ margin: "0 1rem" }} type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // const [listData, setList] = useState();
  // const [total, setTotal] = useState(0);
  
  useEffect(() => {
    // (async () => {
    //   try {
    //     let params = { page: 1, limit: 15 };
    //     const res = await listApi(params);
    //     setList(res.data.data);
    //     setTotal(res.data.total);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();
    let params = { page: 1, limit: 15 };
    props.dispatch(
      loadProduct(params)
    );
  }, []);
  const pageChange = (page) => {
    let params = { page, limit: 15 };
    // listApi(params).then((res) => {
    //   setList(res.data.data);
    //   props.notice.showHigh();
    // });
    props.dispatch(
      loadProduct(params)
    );
    props.notice.showHigh();
  };
  const paginationProps = {
    showTotal: () => `共${props.product.total}条`,
    pageSize: 15,
    total:props.product.total,
    onChange: pageChange,
  };

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <Card
        title="商品列表"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => props.history.push("/admin/products/edit")}
          >
            新增
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={props.product.list}
          bordered
          rowKey="id"
          pagination={paginationProps}
        />
      </Card>
    </div>
  );
}

export default connect((state) => state)(List);
