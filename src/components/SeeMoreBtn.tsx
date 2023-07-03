import React from "react";

type Props = {
  expanded: boolean;
};

const SeeMoreBtn: React.FC<Props> = ({ expanded }) => {
  return (
    <div className="bg-black text-white hover:bg-white cursor-pointer hover:text-black p-4 rounded-xl h-full">
      {expanded ? (
        <div className="items-center flex flex-col justify-center h-full">
          <h2 className="text-lg text-center">See</h2>
          <h2 className="text-lg text-center">Less</h2>
        </div>
      ) : (
        <div className="items-center flex flex-col justify-center h-full">
          <h2 className="text-lg text-center">See More</h2>
        </div>
      )}
    </div>
  );
};

export default SeeMoreBtn;
