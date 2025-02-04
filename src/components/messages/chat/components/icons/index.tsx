import ListIcons from "./list-icons";

type IconProps = {
    id: string;
    [x: string]: any;
};

export default function Icon(props: IconProps) {
    const { id, ...rest } = props;

    const currentSelectedIcon = (ListIcons as any)?.[id];
    return currentSelectedIcon ? currentSelectedIcon(rest) : null;
}
