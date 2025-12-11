// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract UsdtMock is ERC20, ERC20Detailed {
    constructor(
        uint256 _initalSupply
    ) public ERC20Detailed("UsdtMock", "USDT", 18) {
        _mint(address(this), _initalSupply);
    }

    function transferTokens(address _to, uint256 _amount) public {
        _transfer(address(this), _to, _amount);
    }
}
