import cx from "classnames";
import Link from "next/link";
import styles from "./button.module.scss";

type ButtonProps = {
  renderAs?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  primary?: boolean;
  block?: boolean,
};

export const Button = ({
  renderAs = "button",
  href,
  type = "button",
  children,
  onClick,
  className,
  primary,
  block
}: ButtonProps) => {

  const classes = cx(styles.btn, className, {
    [styles.btnPrimary]: primary,
    'w-full': block
  });

  if (renderAs === "a") {
    return (
      <Link href={href || "/"}>
        <a  className={classes}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
