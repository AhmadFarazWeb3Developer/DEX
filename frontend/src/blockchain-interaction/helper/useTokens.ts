import { useState } from "react";
import { TokenType } from "../../types/TokenType";
import useReadInstances from "./useReadInstances";
import { toast } from "sonner";

const useTokens = () => {
  const { readInstances } = useReadInstances();
  const [isLoading, setIsLoading] = useState(false);

  const allTokens = async () => {
    try {
      setIsLoading(true);
      const tokens: TokenType[] = [];
      const allInstances = await readInstances();
      if (!allInstances) {
        throw new Error("Failed to load contract instances");
      }
      const { ...instances } = allInstances;
      const intancesArray = Object.values(instances);

      for (let i = 3; i < intancesArray.length; i++) {
        tokens.push({
          name: await intancesArray[i].name(),
          symbol: await intancesArray[i].symbol(),
          totalSupply: await intancesArray[i].totalSupply(),
          address: intancesArray[i].target.toString(),
          icon: "",
        });
      }

      return { tokens };
    } catch (error: any) {
      toast.error(error.message ?? "Failed to load tokens");
      setIsLoading(false);
      return { tokens: [] };
    } finally {
      setIsLoading(false);
    }
  };

  return { allTokens, isLoading };
};

export default useTokens;
