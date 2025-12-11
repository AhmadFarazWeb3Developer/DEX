import { TokenType } from "../../types/TokenType";
import useReadInstances from "./useReadInstances";

const useTokens = () => {
  const { readInstances } = useReadInstances();

  const allTokens = async () => {
    const tokens: TokenType[] = [];
    const allInstances = await readInstances();
    if (!allInstances) throw new Error("Failed to load contract instances");
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
  };

  return { allTokens };
};

export default useTokens;
