const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { sign } = require("crypto");
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const helloworldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);
