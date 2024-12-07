import { useEffect, useMemo, useState } from "react";
import { cn } from "./utils";
import { IconError } from "./Icons";

interface NewSelectProps {
  id: string;
  name: string;
  max?: number;
  initialValue?: string | number;

  report: (field: string, value: string) => void;
  mask?: (value: string) => string;
  validate?: (value: string) => boolean;

  options: { name: string | number; value: string | number }[];

  badge?: JSX.Element;
  badgeTooltip?: string;
}

export default function NewSelect(props: NewSelectProps) {
  const [focused, setFocused] = useState(false);

  const [selectValue, setSelectValue] = useState(props.initialValue || "");
  useEffect(() => props.report(props.id, selectValue.toString()), []);

  const [hoveringBadge, setHoveringBadge] = useState(false);

  const shouldHang =
    /* the label should stay lifted when:
        1. the input is being focused
        2. the input is not empty */
    focused || selectValue.toString().length > 0;

  const valid = selectValue.toString().length > 0;
  const empty = selectValue.toString() == "";

  function updateSelectValue(raw: string) {
    setSelectValue(raw);
    props.report(props.id, raw);
  }

  return (
    <div
      className={cn(
        "bg-white cursor-text rounded border w-full h-fit px-2 py-1 flex items-center",
        focused ? "border-blue-500" : valid || empty ? "" : "border-red-500"
      )}
    >
      <div className="relative flex flex-col justify-center duration-200 w-full">
        <label
          className={cn(
            "absolute leading-none duration-200 pointer-events-none",
            shouldHang ? "top-0 left-0 text-xs" : `top-1/2 -translate-y-1/2`,
            focused
              ? "text-blue-500"
              : valid || empty
                ? "text-zinc-500"
                : "text-red-500"
          )}
        >
          {props.name}
        </label>

        <div className="flex gap-2 justify-center items-center w-full">
          <select
            value={selectValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => updateSelectValue(e.target.value)}
            className={cn(
              "w-full h-full py-2 bg-transparent text-gray-800",
              shouldHang ? "pt-4 pb-0" : ""
            )}
          >
            {!props.initialValue && <option key="default" value=""></option>}
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* the badge/warning zone */}
      <div
        onMouseEnter={() => setHoveringBadge(true)}
        onMouseLeave={() => setHoveringBadge(false)}
        onTouchStart={() => setHoveringBadge(true)}
        onTouchEnd={() => setHoveringBadge(false)}
        className="cursor-default relative h-fit flex justify-center items-center"
      >
        {props.badgeTooltip && hoveringBadge && (
          <div className="text-center w-max max-w-60 text-sm right-0 -top-2 -translate-y-full px-2 py-1 text-white bg-zinc-800 rounded-md absolute">
            {props.badgeTooltip}
          </div>
        )}
        {props.badge && props.badge}
      </div>
    </div>
  );
}
