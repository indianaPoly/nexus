import axios from "axios";

interface PriceCache {
  timestamp: number;
  price: number;
}

export const getETHUSDPrice = async () => {
  const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;
  const PRICE_VOLATILITY_THRESHOLD = 0.05;

  try {
    const cachedPrice = localStorage.getItem("ethPriceCache");
    const currentTime = Date.now();

    if (cachedPrice) {
      const { timestamp, price: cachedValue } = JSON.parse(
        cachedPrice
      ) as PriceCache;

      if (currentTime - timestamp < CACHE_EXPIRATION_TIME) {
        return cachedValue;
      }
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const newPrice = response.data.ethereum.usd;

    if (cachedPrice) {
      const { price: previousPrice } = JSON.parse(cachedPrice) as PriceCache;
      const priceDiff = Math.abs(newPrice - previousPrice) / previousPrice;

      // 5% 이상 변동 시 이전 가격 유지
      if (priceDiff > PRICE_VOLATILITY_THRESHOLD) {
        return previousPrice;
      }
    }

    localStorage.setItem(
      "ethPriceCache",
      JSON.stringify({
        timestamp: currentTime,
        price: newPrice,
      })
    );
  } catch (error) {
    console.error("ETH 가격 불러오기 실패:", error);

    // 실패 시 기존 캐시 값 사용
    const cachedPrice = localStorage.getItem("ethPriceCache");
    return cachedPrice ? JSON.parse(cachedPrice).price : null;
  }
};
