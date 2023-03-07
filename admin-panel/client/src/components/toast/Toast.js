import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
function Notifications({
  show,
  onClose,
  title,
  content,
  bg,
  position,
  autohide,
  delay,
}) {
  return (
    <ToastContainer
      style={{ position: "fixed" }}
      position={position}
      className="p-3"
    >
      <Toast
        onClose={onClose}
        show={show}
        bg={bg.toLowerCase()}
        autohide={autohide}
        animation
        delay={1000}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
          {/* <small>{}</small> */}
        </Toast.Header>
        <Toast.Body style={{ color: "white" }} className={bg}>
          {content}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notifications;
