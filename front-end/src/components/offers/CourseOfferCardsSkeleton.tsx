export const CourseOfferCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col rounded-lg border border-gray-300 bg-white shadow-lg">
      {/* >>>>>>>>>> Header <<<<<<<<< */}
      <div className="flex flex-row items-center gap-2 rounded-t-lg bg-gray-200 px-6 py-2">
        <div className="h-5 w-1/2 rounded bg-gray-400"></div>
      </div>

      <div className="flex flex-1 flex-col bg-gray-300 p-6">
        {/* >>>>>>>>>> Curso <<<<<<<<<<<<< */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col">
            {/* >>>>>>>>>> "De R$..." <<<<<<<<< */}
            <div className="h-4 w-3/4 rounded bg-gray-400"></div>

            {/* >>>>>>>>>> "18x R$ 169,95" <<<<<<<<<< */}
            <div className="flex items-end mt-1">
              <div className="h-5 w-8 rounded bg-gray-400"></div>
              <div className="h-10 w-1/2 mx-2 rounded bg-gray-400"></div>
            </div>

            {/* >>>>>>>> "à vista" <<<<<<< */}
            <div className="h-4 w-1/3 mt-1 rounded bg-gray-400"></div>
          </div>
          <div className="flex-1"></div>
        </div>

        {/* >>>>>>>>> Button <<<<<<< */}
        <div className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-gray-400 px-6"></div>
      </div>

      {/* >>>>>>> Footer <<<<<<<<< */}
      <div className="flex flex-col gap-1 rounded-b-lg bg-white p-4">
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-3/4 mt-1 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};
