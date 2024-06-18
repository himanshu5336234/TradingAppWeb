export const groupByPrice1 = (levels: number[][]): number[][] => {
  const groupedLevels: any = {};
  for (const [price, quantity] of levels) {
    if (groupedLevels[price]) {
      groupedLevels[price] += quantity;
    } else {
      groupedLevels[price] = quantity;
    }
  }
  const result = Object.entries(groupedLevels).map(([price, quantity]) => [parseFloat(price), quantity]);
  const sortedResult = result.sort((a, b) => b[0] - a[0]);
  return sortedResult;
};
export const addTotalSums = (orders: number[][]): number[][] => {
  let sum = 0;
  return orders.map((item) => {
    sum += Number(item[1]);
    item[2] = sum;
    return item;
  });
};
export const addTotalSumsAsk = (orders: number[][]): number[][] => {
  let sum = 0;
  for (let item = orders.length - 1; item >= 0; item--) {
    sum += Number(orders[item][1]); // Accessing the size from each order
    orders[item][2] = sum; // Assigning the cumulative sum to the third index of the order
  }
  return orders.reverse();
};

export const findAndDelete = (currentLevels: number[][], orders: number[][], type: string): number[][] => {
  const index =
    type === "BIDS"
      ? currentLevels.findIndex((item) => Number(item[0]) <= Number(orders[orders.length - 1][0]))
      : currentLevels.findIndex((item) => Number(item[0]) >= Number(orders[orders.length - 1][0]));
  return orders.concat(currentLevels.slice(index + 1));
};

export const getMaxTotalSum = (orders: number[][]): number => {
  const totalSums: number[] = orders.map((order) => order[2]);
  return Math.max.apply(Math, totalSums);
};

const removePriceLevel = (price: number, levels: number[][]): number[][] => levels.filter((level) => level[0] !== price);

const updatePriceLevel = (updatedLevel: number[], levels: number[][]): number[][] => {
  return levels.map((level) => {
    if (level[0] === updatedLevel[0]) {
      level = updatedLevel;
    }
    return level;
  });
};

const levelExists = (deltaLevelPrice: number, currentLevels: number[][]): boolean => currentLevels.some((level) => level[0] === deltaLevelPrice);

export const applyDeltas = (currentLevels: number[][], orders: number[][]): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = Number(deltaLevel[1]);

    // If new size is zero - delete the price level

    if (deltaLevelSize === 0) {
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      // If the price level exists and the size is not zero, update it
      if (levelExists(deltaLevelPrice, currentLevels)) {
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      }
    }
  });

  return updatedLevels;
};
export const addPriceLevel = (deltaLevel: number[], levels: number[][]): number[][] => {
  return [...levels, deltaLevel];
};
export const roundToNearest = (value: number, interval: number) => {
  return Math.floor(value / interval) * interval;
};
export const groupByPrice = (levels: number[][]): number[][] => {
  return levels
    .map((level, idx) => {
      const nextLevel = levels[idx + 1];
      const prevLevel = levels[idx - 1];

      if (nextLevel && level[0] === nextLevel[0]) {
        return [level[0], level[1] + nextLevel[1]];
      } else if (prevLevel && level[0] === prevLevel[0]) {
        return [];
      } else {
        return level;
      }
    })
    .filter((level) => level.length > 0);
};
export const groupByTicketSize = (levels: number[][], ticketSize: number): number[][] => {
  return groupByPrice(levels.map((level) => [roundToNearest(level[0], ticketSize), level[1]]));
};
