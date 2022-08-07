const { ethers } = require("hardhat");

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  const hello_world = await HelloWorld.deploy("Hello World from kamakura!");
  console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch((ettor) => {
    console.error(error);
    process.exit(1);
  });
