import { useState, type PropsWithChildren } from "react";
import { Spinner } from "./Icons";
import { cn } from "./utils";

interface NewSubmitProps {
  onClick: () => Promise<any> | any;
}

export default function (props: NewSubmitProps & PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await props.onClick();
        setLoading(false);
      }}
      className={cn(
        "flex justify-center items-center",
        "w-full rounded bg-[#46c900] p-4 text-white text-lg font-semibold hover:opacity-75",
        loading && "cursor-not-allowed pointer-events-none opacity-75",
      )}
    >
      {loading ? <Spinner className="text-green-300" /> : props.children}
    </button>
  );
}
