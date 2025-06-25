export function BlogSkeleton() {
  return (
    <div>
      <TextSkeleton />
    </div>
  );
}

function TextSkeleton() {
  return (
    <div>
      <div className="border-b-2 border-slate-200 pb-4 mb-8 animate-pulse">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <div className="font-light pl-1 flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          </div>
          <div className="font-thin text-[10px] pl-4 flex justify-center flex-col text-slate-500">
            &#9679;
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <div className="text-md font-thin pt-6">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        </div>
        <div className="text-sm font-thin text-slate-500 pt-4">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
      </div>
    </div>
  );
}
