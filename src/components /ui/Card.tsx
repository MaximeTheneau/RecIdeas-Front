import React, { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export default function Card({
  className,
  ...props
}: CardProps) {
  return (
    <div {...props} className={` w-full rounded overflow-hidden  bg-secondaryLight  ${className}`}>
      {props.children}
    </div>
  );
}
