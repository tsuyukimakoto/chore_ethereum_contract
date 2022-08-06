const MemoContract = artifacts.require("Memo.sol");

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(MemoContract, "Memo");
};
