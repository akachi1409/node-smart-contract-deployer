// Solidity program to implement
// the above approach
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
  
contract initial 
{
    string public message = "Hello World";
  
    function setMessage(string memory _newMessage) public 
    {
        message = _newMessage;
    }

    function getMessage() public view returns (string memory){
        return message;
    }
}