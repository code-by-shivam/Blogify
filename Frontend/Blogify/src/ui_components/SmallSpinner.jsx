import ClipLoader from "react-spinners/ClipLoader";

const cssOverride = {
  display: "block",
  borderColor: "white",
};

const SmallSpinner = () => {
  return (
    <ClipLoader
      cssOverride={cssOverride}
      size={30}
      color="#ffffff"
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default SmallSpinner;
