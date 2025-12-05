import Link from "next/link";
import Button from "./Button";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-style">
      <div className="modal-style__container">
        <div className="modal-style__inner-text">{children}</div>
        <div className="modal-style__button-container">
          <div className="modal-style__login-button">
            <Link href={"/login"}>
              <Button className="button__button-wrapper-2">Login</Button>
            </Link>
          </div>
          <div className="modal-style__close-button">
            <Button className="button__button-wrapper" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
