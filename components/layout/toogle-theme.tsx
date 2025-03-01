import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="w-full justify-start px-2.5"
    >
      <div className="flex gap-2 dark:hidden">
        <Moon className="size-5" />
      </div>

      <div className="dark:flex gap-2 hidden">
        <Sun className="size-5" />
      </div>

    </Button>
  );
};
