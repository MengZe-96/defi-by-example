const BN = require("bn.js");
// const { sendEther } = require("./util");
// const { DAI, WBTC, WBTC_WHALE } = require("./config");
const { USDC, WETH, USDC_WHALE } = require("./config");

const IERC20 = artifacts.require("IERC20");
const TestUniswap = artifacts.require("TestUniswap");

// dy = y * 0.997 * dx / (x + 0.997 * dx)

contract("TestUniswap", (accounts) => {
  // const WHALE = WBTC_WHALE;
  const AMOUNT_IN = 100000000; //100 USDC
  const AMOUNT_OUT_MIN = 1;
  // const TOKEN_IN = WBTC;
  // const TOKEN_OUT = DAI;
  const TO = accounts[0];
  //-------------------------------------------
  const WHALE = USDC_WHALE;
  // const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN(1000000)); // 1,000,000 DAI
  const TOKEN_IN = USDC;
  const TOKEN_OUT = WETH;
  it("should swap", async () => {
    const tokenIn = await IERC20.at(TOKEN_IN);
    const tokenOut = await IERC20.at(TOKEN_OUT);
    const testUniswap = await TestUniswap.new();

    await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });
    await testUniswap.swap(
          tokenIn.address,
          tokenOut.address,
          AMOUNT_IN,
          AMOUNT_OUT_MIN,
          TO,
          {
            from: WHALE,
          }
        );

        console.log(`out ${await tokenOut.balanceOf(TO)}`);
        console.log(`out ${await TO}`);
      });
  //-------------------------------------------


  // let testUniswap;
  // let tokenIn;
  // let tokenOut;
  // beforeEach(async () => {
  //   tokenIn = await IERC20.at(TOKEN_IN);
  //   tokenOut = await IERC20.at(TOKEN_OUT);
  //   testUniswap = await TestUniswap.new();

  //   // make sure WHALE has enough ETH to send tx
  //   // await sendEther(web3, accounts[0], WHALE, 1);
  //   await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });
  // });

  // it("should pass", async () => {
  //   await testUniswap.swap(
  //     tokenIn.address,
  //     tokenOut.address,
  //     AMOUNT_IN,
  //     AMOUNT_OUT_MIN,
  //     TO,
  //     {
  //       from: WHALE,
  //     }
  //   );

  //   console.log(`in ${AMOUNT_IN}`);
  //   console.log(`out ${await tokenOut.balanceOf(TO)}`);
  // });
});
