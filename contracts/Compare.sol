// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@confluxfans/contracts/token/CRC721/extensions/CRC721Enumerable.sol";
import "@confluxfans/contracts/token/CRC1155/extensions/CRC1155Enumerable.sol";

contract MYERC721 is ERC721 {
    uint256 lastTokenId;

    constructor() ERC721("ERC721", "ERC721") {}

    function mint() public {
        _mint(msg.sender, lastTokenId++);
    }
}

contract MYERC1155 is ERC1155 {
    uint256 lastTokenId;

    constructor() ERC1155("http://erc1155/{id}.json") {}

    function mint(uint amount) public {
        _mint(msg.sender, lastTokenId++, amount, "");
    }
}

contract MYERC721Enumberable is CRC721Enumerable {
    uint256 lastTokenId;

    constructor() ERC721("ERC721 enumerable", "ERC721ENUM") {}

    function mint() public {
        _mint(msg.sender, lastTokenId++);
    }
}

contract MYERC1155Enumberable is CRC1155Enumerable {
    uint256 lastTokenId;

    constructor() ERC1155("http://erc1155_enum/{id}.json") {}

    function mint(uint amount) public {
        _mint(msg.sender, lastTokenId++, amount, "");
    }
}
