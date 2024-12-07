import { useEffect, type FC } from "react";
import { BadgeCorrect } from "./Icons";
import { cn } from "./utils";

interface TabOptionProps {
  name: string;
  selected?: boolean;
  Icon: FC;
  View: FC;

  onClick?: () => void;
}

function TabOption({ name, selected, Icon, onClick }: TabOptionProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-full px-4 py-4 flex items-center justify-center",
        "cursor-pointer hover:border shadow rounded border",
        "border-zinc-200 hover:border-black",

        selected && "border-blue-500 hover:border-blue-500 text-blue-500"
      )}
    >
      <Icon />
      {selected && <BadgeCorrect />}
      <span className="leading-none">{name}</span>
    </div>
  );
}

interface TabProps {
  options: TabOptionProps[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  report: (field: string, value: any) => void;
}

export default function Tab(props: TabProps) {
  const current = props.options[props.selected];
  useEffect(() => props.report("tab", props.selected), []);

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {props.options.map((option, i) => (
          <TabOption
            key={option.name}
            {...option}
            onClick={() => {
              props.setSelected(i);
              props.report("tab", i);
            }}
            selected={props.selected == i}
          />
        ))}
      </div>
      <div className="mt-4">
        <current.View />
      </div>
    </div>
  );
}
