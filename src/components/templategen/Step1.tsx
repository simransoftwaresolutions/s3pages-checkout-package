

export default function Step1({ setStep }: any) {
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
    <div className="container-lg d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <div className="p-5 rounded-3 shadow bg-white" style={{ width: "500px" }}>
        <div className="text-center mb-4">
          {/* <BusinessCenterIcon className="text-primary fs-3" /> */}
          <i className="fas fa-briefcase text-primary fs-3"></i>
          <h6 className="mt-2">What type of business are you building?</h6>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Coaching, Photography, Landscaping..."
          />
        </div>
        <div className="mb-3">
          <button
            className="btn btn-warning text-secondary w-100"
            style={{ borderRadius: "50px" }}
            onClick={() => setStep("step2")}
          >
            Next <i className="fa-solid fa-arrow-right"></i>
          </button>
          
        </div>
        <div className="text-center">
          <p className="mb-0">Not sure? <span className="text-primary">See some suggestions</span></p>
        </div>
      </div>
    </div>
  </div>
  
  );
}
