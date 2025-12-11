import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "#0B1E13",
          "--normal-text": "#E6E6E6",
          "--normal-border": "#00C084",
          "--success-bg": "#00C084", // green success
          "--success-text": "#0B1E13",
          "--error-bg": "#FF4C4C", // red error
          "--error-text": "#FFFFFF",
          "--warning-bg": "#FFC700", // yellow warning
          "--warning-text": "#0B1E13",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
