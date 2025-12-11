import { AbiCoder } from "ethers";
import { toast } from "sonner";

export const decodeError = (err: any) => {
  const data =
    err.data ||
    err.error?.data ||
    err.info?.error?.data ||
    err.info?.error?.data?.originalError?.data;

  if (!data || typeof data !== "string" || !data.startsWith("0x")) {
    console.log("No revert data available");
    return;
  }

  const ERROR_SELECTOR = "0x08c379a0";

  if (data.startsWith(ERROR_SELECTOR)) {
    try {
      const abiCoder = AbiCoder.defaultAbiCoder();
      const encoded = "0x" + data.slice(10);
      const [message] = abiCoder.decode(["string"], encoded);
      toast.error(message, { action: { label: "close", onClick: () => {} } });
      return;
    } catch {
      toast.error("Failed to decode revert", {
        action: { label: "close", onClick: () => {} },
      });
      return;
    }
  }

  toast.error("Unknown error format", {
    action: { label: "close", onClick: () => {} },
  });
  return;
};
