import React from "react";
import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex  z-50 justify-center items-center  bg-white">
      <Grid
        visible={true}
        height="80"
        width="80"
        color="#FB5722"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default Loader;
