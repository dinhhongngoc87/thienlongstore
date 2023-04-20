import Button from "../../button/Button";

import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
function MenuItem({ data, onClick }) {
  console.log("MENU ITEM +> ", data);
  const classes = cx("menu-item", {
    separate: data?.separate,
  });
  return (
    <Button
      className={classes}
      leftIcon={data?.icon}
      to={data?.to}
      onClick={onClick}
    >
      {data?.title}
    </Button>
  );
}

export default MenuItem;
