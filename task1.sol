pragma solidity ^0.8.0;

contract task1
{

    struct Data
    {
        uint256 id;
        string name;
    }
    mapping (uint256=>Data) public data;


    function addData(uint256 _id, string memory _name) public
    {
        data[_id]=Data(_id, _name);
    } 

    function getData(uint256 _id) public view returns (string memory)
    {
        Data memory rdata= data[_id];
        return (rdata.name);
    }



}