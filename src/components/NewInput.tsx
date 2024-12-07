import { useState } from "react";
import { IconError } from "./Icons";
import { cn } from "./utils";

interface NewInputProps {
  id: string;
  name: string;
  max?: number;

  report: (field: string, value: string) => void;

  select?: { name: string; value: string }[];
}

export default function NewInput(props: NewInputProps) {
  /* storing the select element using a state,
    because, i need it's size to display the label correctly. */
  const [select, setSelect] = useState<HTMLSelectElement | null>(null);

  const [focused, setFocused] = useState(false);
  const [hoveringBadge, setHoveringBadge] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const shouldHang =
    /* the label should stay lifted when:
        1. the input is being focused
        2. the input is not empty
        3. this input is supposed to have a select, but it didn't rendered yet. */
    focused || inputValue.length > 0 || (props.select && !select);

  return (
    <div className="cursor-text rounded border w-full h-fit px-2 py-1 flex items-center">
      <div
        className={cn(
          "relative flex flex-col justify-center duration-200 w-full",
          shouldHang ? "pt-4" : "py-2"
        )}
      >
        <label
          className={cn(
            "absolute leading-none bg-red-500 duration-200 pointer-events-none",
            shouldHang ? "top-0 left-0 text-xs" : `top-1/2 -translate-y-1/2`
          )}
          style={shouldHang ? {} : { left: (select?.offsetWidth || 0) + 8 }}
        >
          {props.name}
        </label>

        <div className="flex gap-2 justify-center items-center w-full bg-red-500">
          {props.select && (
            <select
              ref={(element) => setSelect(element)}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className="h-full px-2 bg-blue-500"
            >
              {props.select.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-full bg-blue-500 outline-none"
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
