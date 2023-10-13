import loading from "../assets/loading.gif";

const Spinner = () => {
  return (
    <div className="container">
      <div
        className="row align-items-center"
        style={{minHeight: '100vh'}}
      >
        <div className="col-md-12">
          <div className="text-center">
            <img className="my-3" src={loading} alt="loading" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Spinner;
