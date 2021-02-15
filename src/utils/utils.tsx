import SocialIcon from "@material-ui/icons/PeopleAlt";
import KitchenIcon from "@material-ui/icons/EmojiFoodBeverage";
import EventIcon from "@material-ui/icons/EmojiEvents";
import EquipmentIcon from "@material-ui/icons/Devices";
import RandomIcon from "@material-ui/icons/Forum";
import { SvgIconProps } from "@material-ui/core";

type IconsType = {
  Social: React.ComponentType<SvgIconProps>;
  Kitchen: React.ComponentType<SvgIconProps>;
  Event: React.ComponentType<SvgIconProps>;
  Equipment: React.ComponentType<SvgIconProps>;
  Random: React.ComponentType<SvgIconProps>;
};

const icons: IconsType = {
  Social: SocialIcon,
  Kitchen: KitchenIcon,
  Event: EventIcon,
  Equipment: EquipmentIcon,
  Random: RandomIcon,
};

export const humanizeTime = (timeStamp: number) => {
  let todoDate = "";
  const date = new Date(timeStamp);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  const currentTime = Date.now();
  const hours_24 = 86400000;
  const hour_1 = 3600000;

  function formatTime(time: string) {
    const formatted = time.length < 2 ? "0" + time : time;
    return formatted;
  }

  if (currentTime - timeStamp < hours_24) {
    if (currentTime - timeStamp < hour_1) {
      todoDate = "less than 1 hour ago";
      return todoDate;
    }
    const lessThan24Hours = currentTime - timeStamp;
    const time = new Date(lessThan24Hours).getHours();
    todoDate = `${time} hours ago`;
    return todoDate;
  }

  todoDate = `${year}-${formatTime(month)}-${formatTime(day)}  ${formatTime(
    hours
  )}:${formatTime(minutes)}`;
  return todoDate;
};

export const getIcon = (key: string | undefined, fontSize: number) => {
  if (!key) {
    return;
  }

  switch (key) {
    case "Social":
      return <icons.Social style={{ fontSize: fontSize }} />;
    case "Kitchen":
      return <icons.Kitchen style={{ fontSize: fontSize }} />;
    case "Event":
      return <icons.Event style={{ fontSize: fontSize }} />;
    case "Equipment":
      return <icons.Equipment style={{ fontSize: fontSize }} />;
    case "Random":
      return <icons.Random style={{ fontSize: fontSize }} />;
  }
};

export const formatText = (text: string, textType: string) => {
  let maxIndex = 0;
  switch (textType) {
    case "title":
      maxIndex = 35;
      break;
    case "description":
      maxIndex = 50;
      break;
    case "author":
      maxIndex = 15;
      break;
    case "username":
      maxIndex = 10;
      break;
    default:
      console.error("FAILED TO FORMAT TEXT");
      break;
  }

  if (text.length < maxIndex) {
    return text;
  }

  return text.substring(0, maxIndex) + "...";
};
