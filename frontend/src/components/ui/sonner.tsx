import {
  CircleCheckIcon,
  ClosedCaption,
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
      richColors={false}
      className="custom-toaster"
      icons={{
        success: <CircleCheckIcon className="w-5 h-5 text-emerald-400" />,
        info: <InfoIcon className="w-5 h-5 text-emerald-300" />,
        warning: <TriangleAlertIcon className="w-5 h-5 text-yellow-400" />,
        error: <OctagonXIcon className="w-5 h-5 text-red-400" />,
        loading: (
          <Loader2Icon className="w-5 h-5 animate-spin text-emerald-300" />
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
