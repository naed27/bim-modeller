import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { capitalizeFirstLetter } from "@/helpers/format-helpers";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

type SmartIconProps = {
  iconCode?: string;
} & Omit<FontAwesomeIconProps, "icon">;

const SmartIcon: React.FC<SmartIconProps> = ({
  style,
  iconCode,
  className,
  ...props
}) => {
  if (!iconCode) return null;
  if (typeof iconCode !== "string") return null;

  const codeWords = iconCode
    ?.split(/[_-\s]/)
    ?.filter(
      (word) =>
        word?.toLowerCase() !== "fas" &&
        word?.toLowerCase() !== "fa" &&
        word?.toLowerCase() !== "far" &&
        word?.toLowerCase() !== "fab"
    )
    ?.map((word) => capitalizeFirstLetter(word?.toLowerCase()))
    ?.join("");

  return (
    <FontAwesomeIcon
      {...props}
      style={style}
      className={className}
      icon={
        fas?.[`fa${codeWords}`] ||
        fab?.[`fa${codeWords}`] ||
        far?.[`fa${codeWords}`]
      }
    />
  );
};

export default SmartIcon;
