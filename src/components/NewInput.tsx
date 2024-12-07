import { useRef, useState } from "react";
import { IconError } from "./Icons";
import { cn } from "./utils";

interface NewInputProps {
  id: string;
  name: string;
  max?: number;
  report: (field: string, value: string) => void;
}

export default function NewInput(props: NewInputProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [focused, setFocused] = useState(false);
  const [hoveringBadge, setHoveringBadge] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const shouldHang = focused || inputValue.length > 0 || !selectRef.current;

  return (
    <div className="cursor-text rounded border h-fit px-2 py-1 flex items-center">
      <div
        className={cn(
          "relative flex flex-col justify-center duration-200",
          shouldHang ? "pt-4" : "py-2"
        )}
      >
        <label
          className={cn(
            "absolute leading-none bg-red-500 duration-200",
            shouldHang ? "top-0 left-0 text-xs" : `top-1/2 -translate-y-1/2`
          )}
          style={
            shouldHang
              ? {}
              : { left: (selectRef.current?.offsetWidth || 0) + 8 }
          }
        >
          {props.name}
        </label>

        <div className="flex gap-2 justify-center items-center bg-red-500">
          <select
            ref={selectRef}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="h-full px-2 bg-blue-500"
          >
            <option value="brazil">🇧🇷 +55</option>
            <option value="usa">🇺🇸 +1</option>
          </select>

          <input
            type="text"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-full bg-blue-500 outline-none"
          />
        </div>
      </div>

      {/* the badge/warning zone */}
      <div
        onMouseEnter={() => setHoveringBadge(true)}
        onMouseLeave={() => setHoveringBadge(false)}
        className="relative h-fit flex justify-center items-center bg-red-400"
      >
        {hoveringBadge && (
          <div className="top-0 -translate-y-full p-1 text-white bg-black rounded absolute">
            hey
          </div>
        )}
        <IconError className="" />
      </div>
    </div>
  );
}
