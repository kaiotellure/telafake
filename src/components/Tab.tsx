import type { FC } from "react"
import { BadgeCorrect } from "./Icons";
import { cn } from "./utils";

interface TabOptionProps {
    name: string, selected?: boolean,
    Icon: FC, View: FC,

    onClick?: () => void,
}

function TabOption({ name, selected, Icon, onClick }: TabOptionProps) {
    return (
        <div onClick={onClick} className={cn(
            "relative w-full px-4 py-4 flex items-center justify-center",
            "cursor-pointer hover:border shadow rounded border",
            "border-zinc-200 hover:border-black",

            selected && "border-blue-500 hover:border-blue-500 text-blue-500"
        )}>
            <Icon />
            {selected && <BadgeCorrect />}
            <span className="leading-none">{name}</span>
        </div>
    )
}

interface TabProps {
    options: TabOptionProps[];
    selected: number, setSelected: React.Dispatch<React.SetStateAction<number>>;
    report: (field: string, value: string) => void;
}

export default function Tab({ options, selected, setSelected, report }: TabProps) {
    const current = options[selected];

    return <div className="w-full">
        <div className="flex gap-2">
            {options.map((option, i) => (
                <TabOption {...option}
                    onClick={() => {setSelected(i); report("tab", i.toString())}}
                    selected={selected == i}
                />
            ))}
        </div>
        <div className="mt-4 p-4">
            <current.View />
        </div>
    </div>
}
