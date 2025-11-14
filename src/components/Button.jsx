export default function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`button__button_wrapper ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
