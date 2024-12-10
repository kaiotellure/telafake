import { useState, type PropsWithChildren } from "react";
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
        "w-full rounded bg-[#46c900] p-4 text-white text-lg font-semibold hover:opacity-75",
        loading ? "cursor-not-allowed pointer-events-none" : "",
      )}
    >
      {loading ? <div className="spin">Q</div> : props.children}
    </button>
  );
}
