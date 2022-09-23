# Test Result 
Contract|Action|GasUsed|StorageCollateral|hash
-|-|-|-|-
erc721|mint|40130|192|0x6404728dfe403830905a4906c291e7c4428cc837f17647e665247d07afef34fe
erc721|transferFrom -> poor user|52212|0|0x18492f3f0568f509e2d5acc2d2f7493488a91d34176370fbe4125a0695c30db0
erc721|transferFrom -> rich user|52276|0|0x9b30889a1d1d62c512238c8caa41ab5bc84e58f5d077969074c01e575fd508e9
erc721|safeTransferFrom -> poor user|53345|0|0xd0c35036600891b998a1360f1e935e704bfd07416e59f502f68ccd1257dcb72d
erc721|safeTransferFrom -> rich user|53345|0|0x6bfd55f13771c1576419d1780d6409d4ee10a5ec11efe474d6a9e93ae0ce6f23
erc721Enum|mint|66605|256|0x66d4cc6ff1362eebbc366fe24784455fd8d7b3b10e0aa48089b441f2819e7120
erc721Enum|transferFrom -> poor user|74285|0|0x7ebde6772824ab866d8cc81f12d7e11ebc5c2efea6db16f238d6e490ae886892
erc721Enum|transferFrom -> rich user|74349|0|0x05473a92884f06e6a271b89b1436d17642535abb8efd30be2df453a198cd9c65
erc721Enum|safeTransferFrom -> poor user|75330|0|0xae8b756fc6596652cf31d31b77fd52c875308a5907ad8a829e3fdbdcdfa06eac
erc721Enum|safeTransferFrom -> rich user|75330|0|0xb885c8a630720554d43e662d031a420a34b5565ac990335259bb375262503052
erc1155|mint|37212|128|0x02f43fa19f96c17e59d8637499aeff31d9250929288bf654ec868fd4e6b807ca
erc1155|safeTransferFrom -> poor user|42094|64|0xc759e6363e15d4244bf30242cad2d89b86811c9e596a085ed9e4ed99265a08b8
erc1155|safeTransferFrom -> owned t0 token|42094|0|0xf36f826b4b15c837e8b598154a1042381ad7b8f90d566e04687f7ba9f2d47fdb
erc1155|safeTransferFrom -> owned t0 and send t1|42158|64|0x8f3f168ab510fe81a754255582897edea36b3184519b0a5e9fc2f99ab77efd0d
erc1155Enum|mint|76249|448|0xbe15ec188c0d3c1d52a5ea87ecfd004ebaa3b1c3a60298912f7f8eeed2e71bd9
erc1155Enum|safeTransferFrom -> poor user|59818|192|0xd3bea02d53b22f90e2c7a772875d57721a8758c4e722e4f6d487f9fbf55a3402
erc1155Enum|safeTransferFrom -> owned t0 token|43590|0|0x31c72c47641322054f395781f1356cffa38a54092049944224b9191f6e83b028
erc1155Enum|safeTransferFrom -> owned t0 and send t1|59882|192|0x857dfad3238e168561acb885d163e0e17beafcd3fc095f29897c6bfdc31cd2eb

Note:
1. "poor user" represents the user has no NFT of that contract
2. "rich user" represents the user have at least one NFT of that contract