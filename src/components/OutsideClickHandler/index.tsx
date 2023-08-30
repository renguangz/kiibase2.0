import { MutableRefObject, useEffect } from 'react';

interface OutsideClickHandlerProps {
  children: JSX.Element;
  onOutsideClick: () => void;
  wrapperRef: MutableRefObject<HTMLDivElement>;
}

export function OutsideClickHandler({ children, onOutsideClick, wrapperRef }: OutsideClickHandlerProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return <div>{children}</div>;
}
