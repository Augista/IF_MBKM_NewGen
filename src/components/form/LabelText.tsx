import { ReactNode } from "react";
import clsxm from "@/lib/clsxm";

export default function LabelText({
  children,
  labelTextClasname,
  required,
}: {
  children: ReactNode;
  labelTextClasname?: string;
  required?: boolean;
}) {
  return (
    <label>
      <p
        className={clsxm(
          "text-sm font-medium text-gray-900",
          labelTextClasname,
        )}
      >
        {children} {required && <span className="text-red-500">*</span>}
      </p>
    </label>
  );
}
