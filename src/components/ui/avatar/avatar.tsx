import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  sm: { className: "size-8 text-caption", px: 32 },
  md: { className: "size-10 text-body-sm", px: 40 },
  lg: { className: "size-14 text-body-md", px: 56 },
} as const;

export type AvatarProps = Omit<ComponentProps<"span">, "children"> & {
  name: string;
  src?: string;
  size?: keyof typeof sizes;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const { className: sizeClass, px } = sizes[size];

  return (
    <span
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-sage-500 font-medium text-inverse-foreground ring-2 ring-background",
        sizeClass,
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={px}
          height={px}
          className="size-full object-cover"
        />
      ) : (
        <span role="img" aria-label={name}>
          {initials(name)}
        </span>
      )}
    </span>
  );
}

export type AvatarGroupProps = ComponentProps<"div"> & {
  people: { name: string; src?: string }[];
  size?: AvatarProps["size"];
  /** Ring color around each avatar; match it to the surface behind the group. */
  ringClassName?: string;
};

export function AvatarGroup({
  people,
  size = "md",
  ringClassName,
  className,
  ...props
}: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2", className)}
      {...props}
    >
      {people.map((person) => (
        <Avatar
          key={person.name}
          {...person}
          size={size}
          className={ringClassName}
        />
      ))}
    </div>
  );
}
