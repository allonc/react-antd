import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../../useContext/store";
import "./index.less";
import { Card } from "antd";
import { mainApi } from "../../../services/dashboard";

function Index(props) {
  const [main, setMain] = useState({});
  const context = useContext(AppContext);
  const { book } = context;
  console.log(context, "context");
  useEffect(() => {
    (async () => {
      try {
        const res = await mainApi();
        console.log(res.data);
        const main = res.data;
        main.todayAmount = Number(main.todayAmount).toFixed(2);
        main.orderTodayTotal = Number(main.orderTodayTotal).toFixed(2);
        setMain(main);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  /**
   * 因为 async 的本质是返回一个 Promise，而 useEffect 唯一接收的返回值是个函数。
   */
  //   useEffect(async() => {
  //       try {
  //         const res = await mainApi();
  //         console.log(res.data);
  //         const main = res.data;
  //         main.todayAmount = Number(main.todayAmount).toFixed(2);
  //         main.orderTodayTotal = Number(main.orderTodayTotal).toFixed(2);
  //         setMain(main);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //   }, []);
  return (
    <div>
      <div className="dashboard">
        <Card
          title="今日进账"
          style={{ width: 450, marginRight: 50 }}
          headStyle={{ background: "#fafafa" }}
        >
          <div className="amount">￥{main.todayAmount}</div>
        </Card>
        <Card
          title="今日订单"
          style={{ width: 450, marginRight: 50 }}
          headStyle={{ background: "#fafafa" }}
        >
          <div className="amount">￥{main.orderTodayTotal}</div>
        </Card>
        <Card
          title="商品订单实时情况"
          style={{ width: 550 }}
          headStyle={{ background: "#fafafa" }}
        >
          <div className="price">
            <div>
              <p className="label">已支付</p>
              <p className="count">￥{main.sumPrice}</p>
            </div>
            <div>
              <p className="label">取消订单</p>
              <p className="count">{main.cancelCount}</p>
            </div>
          </div>
        </Card>
      </div>
      <div>
        {book.count}
        {book.list.map((item) => (
          <span key={item.id}>{item.txt}</span>
        ))}
      </div>
    </div>
  );
}

export default Index;
