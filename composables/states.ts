export const useCounter = () => useState<number>("counter", () => 0);
export const useLayout = () =>
  useState<"default" | "custom">("layout", () => "default");
