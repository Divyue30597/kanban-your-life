import { HTMLProps } from "react";

import styles from "./container.module.scss";

interface ContainerProps extends HTMLProps<HTMLDivElement> {}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
}
