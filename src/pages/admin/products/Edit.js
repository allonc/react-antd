import React, { useState } from "react";
import { Form, Card, Input, Button, message, InputNumber } from "antd";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 }
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 4 }
};

function validatePrimeNumber(number) {
  if (number <= 1000) {
    return {
      validateStatus: "success",
      errorMsg: null
    };
  }
  return {
    validateStatus: "error",
    errorMsg: "价格不能超过1000"
  };
}

function Edit() {
  const [price, setPrice] = useState({
    value: 300
  });
  const onFinish = values => {
    console.log("Success:", values);
    message.success("保存成功!");
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const onNumberChange = value => {
    setPrice({
      ...validatePrimeNumber(value),
      value
    });
  };
  return (
    <Card title="商品编辑">
      <Form {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          rules={[{ required: true, message: "请输入商品价格!" },
        ({ getFieldValue }) => ({
            validator(rule,value) {
                if(value<=1000) {
                    return Promise.resolve();
                }
                return Promise.reject('商品价格不能大于1000!');
            }
        })]}
          validateStatus={price.validateStatus}
          help={price.errorMsg}
        >
          <InputNumber placeholder="请输入商品价格" value={price.value} onChange={onNumberChange} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
