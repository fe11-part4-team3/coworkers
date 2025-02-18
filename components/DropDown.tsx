import Link from 'next/link';
import { Ref } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type DropDownItem =
  | { text: string; href: string; onClick?: never }
  | { text: string; href?: never; onClick: () => void };

export interface DropDownProps {
  ref?: Ref<HTMLDivElement>;
  trigger: React.ReactNode;
  items: DropDownItem[];
  width?: string;
}

/**
 * @description DropDown 컴포넌트
 * @param {Ref<HTMLDivElement>} props.ref 드롭다운 컨텐츠의 ref
 * @param {React.ReactNode} props.trigger - 드롭다운 트리거
 * @param {DropDownItem[]} props.items - 드롭다운 아이템
 * @param {string} props.width - 드롭다운 너비
 * @component
 * @example
 * return (
 *  <DropDown
 *   trigger={<button>Open Menu</button>}
 *  items={[
 *   { text: 'Item 1', href: '/item1' },
 *   { text: 'Item 2', href: '/item2' },
 *   { text: 'Item 3', onClick: () => alert('Item 3 clicked') },
 *   ]}
 *   width="w-pr-100"
 *   />
 *
 * @example
 * ```ts
 *  const ref = useRef<HTMLDivElement>(null);
 *
 * // 드롭 다운 클릭 시 즉시 반환
 *  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
 *    if (ref.current?.contains(event.target as Node)) return;
 *    ...
 *  };
 *  ...
 * return <DropDown ref={ref} ... />
 * ```
 */
export default function DropDown({
  ref,
  trigger,
  items,
  width,
}: DropDownProps) {
  const dropDownItemStyled = 'py-pr-14 mo:py-pr-12 dropdown-item text-14';

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          ref={ref}
          role="menu"
          className={`mt-pr-8 w-auto overflow-hidden rounded-xl border bg-b-secondary p-0 text-center text-14 text-t-default ${width}`}
          align="end"
        >
          {items.length !== 0 &&
            items.map((item) => (
              <DropdownMenuItem
                key={item.text}
                className="p-0 text-t-primary focus:outline-none"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`block ${dropDownItemStyled}`}
                  >
                    {item.text}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={dropDownItemStyled}
                  >
                    {item.text}
                  </button>
                )}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
