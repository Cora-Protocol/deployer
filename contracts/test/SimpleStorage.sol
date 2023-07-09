// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SimpleStorage {

    uint256 private number;

    function set(uint256 num) public {
        number = num;
    }

    function get() public view returns (uint256){
        return number;
    }
}