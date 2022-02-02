import React, { useEffect, useRef, useState } from "react";
import cx from 'classnames';

interface TableActionProps {
  children: ({ close }: {
    close: () => void;
  }) => React.ReactNode;
}
export const TableAction = ({
  children
}: TableActionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleMouseClick = (e: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleMouseClick);

    return () => {
      document.removeEventListener('click', handleMouseClick)
    }
  }, []);

  return (
    <div ref={divRef} className={cx('dropdown', { show: isExpanded })}>
      <a className="btn btn-action" href="#" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false" onClick={handleClick}>
        <i className="fas fa-ellipsis-h"></i>
      </a>
      <div className={cx('drp-select dropdown-menu', { show: isExpanded })}>
        {children({ close: () => setIsExpanded(false)})}
      </div>
    </div>
  );
}