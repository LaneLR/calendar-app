
export default function ModalButton({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`button__modal-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
