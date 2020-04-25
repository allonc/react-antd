import React, { useState, useEffect, useContext } from "react";
import { Form, Card, Input, Button, message, InputNumber } from "antd";
import { createApi, getDetail } from "../../../services/prosucts";
import { connect } from "react-redux";
import AppContext from "../../../useContext/store";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 4 },
};

function validatePrimeNumber(number) {
  if (number <= 1000 && number > 0) {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
  return {
    validateStatus: "error",
    errorMsg: "价格不能超过1000",
  };
}

function Edit(props) {
  console.log(props, "edit");
  const { add,addList } = useContext(AppContext);
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const [price, setPrice] = useState({
    value: 300,
  });
  const [listDetail, setDetail] = useState({
    detail: {},
    arr: [],
  });
  const onFinish = (values) => {
    let params = {
      realname: values.name,
      roles_name: "管理员",
      gender: 0,
      mobile: "19900000002",
    };
    createApi(params).then((res) => {
      console.log(res, "res");
      props.getInfo();
      message.success("保存成功!");
    });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onNumberChange = (value) => {
    setPrice({
      ...validatePrimeNumber(value),
      value,
    });
  };
  useEffect(() => {
    if (props.match.params.id) {
      (async () => {
        try {
          const res = await getDetail({ id: props.match.params.id });
          setDetail({ arr: res.data.product_albums, detail: res.data });
          form.setFieldsValue({ name: res.data.name });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);
  return (
    <div>
      <Card
        title="商品编辑"
        extra={<Button onClick={() => props.history.goBack()}>返回</Button>}
        style={{ padding: 24 }}
      >
        <Form
          {...layout}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            detail: listDetail,
          }}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "请输入商品名称!" }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[
              { required: true, message: "请输入商品价格!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value <= 1000 && value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject("商品价格不能大于1000!");
                },
              }),
            ]}
            validateStatus={price.validateStatus}
            help={price.errorMsg}
          >
            <InputNumber
              placeholder="请输入商品价格"
              value={price.value}
              onChange={onNumberChange}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <Button onClick={() => add()}>保存</Button>
        <Button onClick={() => addList({id:Date.now(),txt:'muhaha'})}>添加</Button>
      </div>
    </div>
  );
}

export default connect((state) => state.notice)(Edit);
