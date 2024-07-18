import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface IconButtonProps {
    Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    onClick: () => void
}

const IconButton = ({ Icon, onClick }: IconButtonProps) => {
    return (
        <span className="cursor-pointer flex items-center space-x-2" onClick={onClick}>
            <Icon size={22} />
        </span>
    );
}

export default IconButton;