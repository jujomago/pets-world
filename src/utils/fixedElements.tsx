import { RadioOption } from "@/components";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { MdQuestionMark } from "react-icons/md";

export const genderOptions: RadioOption[] = [
  {
    label: "Macho",
    value: "MALE",
    icon: <IoMdMale className="w-5 h-5" />,
    iconColor: "text-white-400",
  },
  {
    label: "Hembra",
    value: "FEMALE",
    icon: <IoMdFemale className="w-5 h-5" />,
    iconColor: "text-white-400",
  },
  {
    label: "No sé",
    value: "UNKNOWN",
    icon: <MdQuestionMark className="w-5 h-5" />,
    iconColor: "text-black-600",
  },
];
