function FormHeader({ title, styleProp }) {
  return (
    <h1 className="form-header" style={styleProp}>
      {title}
    </h1>
  );
}
export default FormHeader;
