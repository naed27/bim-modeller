import { RefObject } from "react";
import type { Vector3 } from "three";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import { InputFieldLayoutProps } from "@/components/field-layouts/input-field-layout";

export type ThreeMarker = {
  id?: string
  description?: string
  objectVector3Coordinates: Vector3
}

export type Override<T, U> = Omit<T, keyof U> & U;

export type PageProps =
  | {
      params?: Promise<{ id?: string }>;
    }
  | undefined
  | null;

export type AnyOtherProps = { [key: string]: any };

export type ItemRowButton = {
  id: string;
  name: string;
  icon?: typeof faIcons;
  requiredPermissions?: string[];
  requiredValues?: { [key: string]: any[] };
};

export type ItemRowSwitch = {
  id: string;
  name: string;
  requiredPermissions?: string[];
  requiredValues?: { [key: string]: any[] };
};

export type BadgeOption = {
  value: any;
  label: string;
  color?: string;
  use_value_if_any_is_hit?: {
    keywords: string[];
    accessorKey: string;
  }[];
};

export type InputFieldBaseProps = {
  value?: any;
  hide?: boolean;
  error?: string;
  prefix?: string;
  isMulti?: boolean;
  required?: boolean;
  className?: string;
  onBlur?: () => any;
  dontSort?: boolean;
  showCount?: number;
  createText?: string;
  placeholder?: string;
  allowCreate?: boolean;
  stringValue?: boolean;
  isSearchable?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  customRef?: RefObject<any>;
  onKeyDown?: (e: any) => any;
  style?: React.CSSProperties;
  containerRef?: RefObject<any>;
  onFocus?: (...args: any) => void;
  onChange?: (...args: any) => any;
  onCreateNew?: (newValue: string) => any;
  disabled?: boolean | ((args: any) => boolean);
} & InputFieldLayoutProps;

export type TextFieldSpecialProps = {
  value?: string | null;
  inputType?: "text" | "email" | "password" | "number" | "tel";
  disabled?: boolean;
  helper?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
