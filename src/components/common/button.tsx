import React from "react";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { iconLibrary } from "@/app/_assets/icon/icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  iconName?: string;
  iconClassName?: string;
  iconPosition?: string;
  color?: string;
}

const BtnIcon: React.FC<ButtonProps> = ({
  className,
  children,
  iconName,
  iconClassName,
  iconPosition,
  color,
  ...props
}) => {
  const IconComponent: IconType | undefined = iconName ? iconLibrary[iconName] : undefined;

  return (
    <button className={cn("flex gap-1 align-middle", className)} {...props}>
      {(IconComponent && iconPosition == 'left') && <IconComponent className={iconClassName ? iconClassName : "size-5"} color={color} />}
      {children}
      {(IconComponent && iconPosition == 'right') && <IconComponent className={iconClassName ? iconClassName : "size-5"} color={color} />}
    </button>
  )
};

const BtnSubmit: React.FC<ButtonProps> = ({
  className,
  children,
  type,
  ...props
}) => {
  return (
    <button type={type} {...props}
      className={cn("btn-submit-form pt-[13px] pb-[16px] px-[16px] rounded-lg", className)}>
      {children}
    </button>
  )
};


export {
  BtnIcon,
  BtnSubmit
};