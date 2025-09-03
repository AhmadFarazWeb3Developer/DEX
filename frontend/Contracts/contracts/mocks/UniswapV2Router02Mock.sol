// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

interface IUniswapV2Factory {
    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair);
    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address pair);
}

interface IUniswapV2Pair {
    function mint(address to) external returns (uint liquidity);
    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external;

    function burn(address to) external returns (uint amount0, uint amount1);

    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint value
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint);
}

// contract .....................................

contract UniswapV2Router02Mock {
    address public factory;
    address public WETH;

    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }

    // Add liquidity to a real pair
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint, // amountAMin
        uint, // amountBMin
        address to,
        uint // deadline
    ) external returns (uint amountA, uint amountB, uint liquidity) {
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        if (pair == address(0)) {
            pair = IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }

        // Transfer tokens to pair
        IERC20(tokenA).transferFrom(msg.sender, pair, amountADesired);
        IERC20(tokenB).transferFrom(msg.sender, pair, amountBDesired);

        // Mint LP tokens
        liquidity = IUniswapV2Pair(pair).mint(to);

        return (amountADesired, amountBDesired, liquidity);
    }

    // Swap tokens using a real pair (simplified for single-hop path)
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint // deadline
    ) external returns (uint[] memory) {
        require(path.length == 2, "RouterMock: only single-hop supported");

        address input = path[0];
        address output = path[1];
        address pair = IUniswapV2Factory(factory).getPair(input, output);

        // Transfer input token to pair
        IERC20(input).transferFrom(msg.sender, pair, amountIn);

        // Get reserves
        (uint112 reserve0, uint112 reserve1, ) = IUniswapV2Pair(pair)
            .getReserves();
        uint amountOut;
        if (input < output) {
            amountOut = getAmountOut(amountIn, reserve0, reserve1);
            IUniswapV2Pair(pair).swap(0, amountOut, to, new bytes(0));
        } else {
            amountOut = getAmountOut(amountIn, reserve1, reserve0);
            IUniswapV2Pair(pair).swap(amountOut, 0, to, new bytes(0));
        }

        uint256[] memory amounts = new uint[](2);
        amounts[0] = amountIn;
        amounts[1] = amountOut;

        require(
            amountOut >= amountOutMin,
            "RouterMock: INSUFFICIENT_OUTPUT_AMOUNT"
        );
    }

    // Remove liquidity from a real pair
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint, // amountAMin
        uint, // amountBMin
        address to,
        uint // deadline
    ) external returns (uint amountA, uint amountB) {
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "RouterMock: PAIR_NOT_FOUND");

        // Transfer LP tokens from user to the pair
        IERC20(pair).transferFrom(msg.sender, pair, liquidity);

        // Burn LP tokens -> this sends back tokenA and tokenB
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);

        // Sort output amounts depending on token ordering
        if (tokenA < tokenB) {
            (amountA, amountB) = (amount0, amount1);
        } else {
            (amountA, amountB) = (amount1, amount0);
        }

        return (amountA, amountB);
    }

    // Simple AMM formula
    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) internal pure returns (uint amountOut) {
        uint amountInWithFee = amountIn * 997; // 0.3% fee
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = reserveIn * 1000 + amountInWithFee;
        amountOut = numerator / denominator;
    }
}
