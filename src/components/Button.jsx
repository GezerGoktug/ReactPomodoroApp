const Button = ({ children, id, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      id={id}
      className={`d-flex justify-content-center align-items-center border-0 bg-transparent ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
