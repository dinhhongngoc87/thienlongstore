import React, { Component } from "react";
import styles from  "./InputNumber.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)
class InputNumber extends Component {
  state = {
    value: 0,
  };

  decrease = () => {
    this.setState({ value: this.state.value - 1 });
  };

  increase = () => {
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    return (
      <div className={cx("def-number-input number-input")}>
        <button onClick={this.decrease}  className={cx("minus")}>-</button>
        <input
          className={cx("quantity")}
          name="quantity"
          value={this.state.value}
          onChange={() => console.log("change")}
          type="number"
        />
        <button onClick={this.increase} className={cx("plus")}>+</button>
      </div>
    );
  }
}

export default InputNumber;