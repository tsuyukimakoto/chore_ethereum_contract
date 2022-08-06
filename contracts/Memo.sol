// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Memo {
  string public message;
  constructor(string memory initMessage) {
    message = initMessage;
  }
  function update(string memory newMessage) public {
    message = newMessage;
  }
}