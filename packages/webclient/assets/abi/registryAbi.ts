export const abi = [
  {
    inputs: [
      { internalType: "uint256", name: "_nonce", type: "uint256" },
      { internalType: "string", name: "_name", type: "string" },
      {
        components: [
          { internalType: "uint256", name: "protocol", type: "uint256" },
          { internalType: "string", name: "pointer", type: "string" },
        ],
        internalType: "struct Metadata",
        name: "_metadata",
        type: "tuple",
      },
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address[]", name: "_members", type: "address[]" },
    ],
    name: "createProfile",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
