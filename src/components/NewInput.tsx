import { useEffect, useMemo, useState } from "react";
import { cn } from "./utils";
import { IconError } from "./Icons";

interface NewInputProps {
  id: string;
  name: string;
  max?: number;
  initialValue?: string;

  report: (field: string, value: string) => void;
  mask?: (value: string) => string;
  validate?: (value: string) => boolean;

  select?: { name: string; value: string }[];

  badge?: JSX.Element;
  badgeTooltip?: string;
}

export default function NewInput(props: NewInputProps) {
  /* storing the select element using a state,
    because, i need it's size to display the label correctly. */
  const [select, setSelect] = useState<HTMLSelectElement | null>(null);

  const [focused, setFocused] = useState(false);
  const [hoveringBadge, setHoveringBadge] = useState(false);

  const initial = props.initialValue || "";
  const [inputValue, setInputValue] = useState(
    props.mask ? props.mask(initial) : initial
  );

  // todo: select value isn't being propagated or even being read.
  const [selectValue, setSelectValue] = useState("");

  // report the initial maskared value for up-tree receivers
  useEffect(() => props.report(props.id, inputValue), []);

  const shouldHang =
    /* the label should stay lifted when:
        1. the input is being focused
        2. the input is not empty
        3. this input is supposed to have a select, but it didn't rendered yet. */
    focused || inputValue.length > 0 || (props.select && !select);

  const valid = useMemo(
    () => (props.validate ? props.validate(inputValue) : true),
    [inputValue]
  );

  const empty = inputValue.length == 0;

  function updateInputValue(raw: string) {
    const masked = props.mask ? props.mask(raw) : raw;
    props.report(props.id, masked);
    setInputValue(masked);
  }

  return (
    <div
      className={cn(
        "bg-white cursor-text rounded border w-full h-fit px-2 py-1 flex items-center",
        focused ? "border-blue-500" : valid || empty ? "" : "border-red-500"
      )}
    >
      <div
        className={cn(
          "relative flex flex-col justify-center duration-200 w-full",
          shouldHang ? "pt-4" : "py-2"
        )}
      >
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
          style={shouldHang ? {} : { left: (select?.offsetWidth || 0) + 8 }}
        >
          {props.name}
        </label>

        <div className="flex gap-2 justify-center items-center w-full">
          {props.select && (
            <select
              ref={(element) => setSelect(element)}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className="h-full px-2 bg-transparent text-gray-500"
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
            onChange={(e) => updateInputValue(e.target.value)}
            className="w-full h-full outline-none bg-transparent text-gray-800"
          />
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
        {props.badge
          ? props.badge
          : !valid && !focused && !empty && <IconError className="" />}
      </div>
    </div>
  );
}
