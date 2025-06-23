import { IconType } from "react-icons";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoChevronBack,
  IoChevronDown
} from "react-icons/io5";

import {
  PiPencilSimpleLine
} from "react-icons/pi";

import {
  BsThreeDots,
  BsPlusLg
} from "react-icons/bs";

export const iconLibrary: Record<string, IconType> = {
  eyeOn: IoEyeOutline,
  eyeOff: IoEyeOffOutline,
  pencilEdit: PiPencilSimpleLine,
  threeDot: BsThreeDots,
  chevronLeft: IoChevronBack,
  chevronDown: IoChevronDown,
  plus: BsPlusLg
}