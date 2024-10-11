import React, { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export default function Card({
  className,
  ...props
}: CardProps) {
  return (
    <div {...props} className={` w-full rounded overflow-hidden border border-gray-200 shadow bg-white  ${className}`}>
      {props.children}
    </div>
  );
}
