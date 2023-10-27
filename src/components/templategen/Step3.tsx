export default function Step3({ setStep }: any) {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
  ];
  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <div
        className="container-lg d-flex justify-content-center align-items-center"
        style={{ height: "89vh" }}
      >
        <div
          className="p-5 rounded-3 shadow bg-white"
          style={{
            width: "500px",
            position: "relative",
            borderRadius: "20px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.07), 0px 2px 4px rgba(0, 0, 0, 0.07), 0px 4px 8px rgba(0, 0, 0, 0.07), 0px 8px 16px rgba(0, 0, 0, 0.07), 0px 16px 32px rgba(0, 0, 0, 0.07), 0px 32px 64px rgba(0, 0, 0, 0.07)",
          }}
        >
          <div className="text-center mb-4">
            <i className="fa-solid fa-user-tie text-primary fs-3"></i>
            <h6 className="mt-2">What is the name of your business?</h6>
          </div>
          <button
            className="btn btn-secondary btn-sm mb-3"
            onClick={() => setStep("step2")}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Coaching, Photography, Landscaping..."
            />
          </div>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <button
              className="btn btn-warning text-secondary w-100"
              onClick={() => setStep("step3")}
              style={{ borderRadius: "50px" }}
            >
              Generate Website
            </button>
          </div>
          <div className="text-center">
            <p className="mb-0">
              Not sure?{" "}
              <span className="text-primary">See some suggestions</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
