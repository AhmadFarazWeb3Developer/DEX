import { toast } from "sonner";

const useAllPools = () => {
  const allPools = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/pair/get-all-pairs"
      );

      const pairs: [] = await response.json();
      console.log(pairs);

      if (!pairs) {
        return undefined;
      }

      return { pairs };
    } catch (error: any) {
      toast.error(error, {
        action: { label: "Close", onClick: () => {} },
      });
      return;
    } finally {
    }
  };

  return { allPools };
};

export default useAllPools;
