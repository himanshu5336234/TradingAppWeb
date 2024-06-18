export const Layouts = {
  lg: [
    {
      w: 110,
      h: 5,
      x: 0,
      y: 0,
      i: "marketSegment",
      minH: 5,
      minW: 40
    },
    {
      w: 30,
      h: 50,
      minH: 30,
      x: 110,
      minW: 25,
      y: 0,
      i: "orderForm"
    },
    {
      w: 85,
      h: 45,
      x: 0,
      y: 5,
      minH: 30,
      i: "chart",
      minW: 45
    },
    {
      w: 25,
      h: 45,
      x: 85,
      y: 0,
      minH: 20,
      minW: 20,
      i: "orderBook"
    },

    {
      w: 140,
      h: 34,
      x: 0,
      y: 50,
      minH: 15,
      minW: 100,
      i: "userActivities"
    }
  ],
  md: [
    {
      w: 90,
      h: 5,
      x: 0,
      y: 0,
      i: "marketSegment",
      minH: 5
    },
    {
      w: 65,
      h: 45,
      x: 0,
      y: 5,
      i: "chart",
      minW: 45,
      minH: 30
    },
    {
      w: 25,
      h: 45,
      x: 65,
      y: 5,
      i: "orderBook",
      minH: 20,
      minW: 20
    },
    {
      w: 30,
      h: 50,
      x: 90,
      y: 0,
      i: "orderForm",
      minH: 30,
      minW: 25
    },
    {
      w: 120,
      h: 25,
      x: 0,
      y: 50,
      i: "userActivities",
      minH: 15,
      minW: 100
    }
  ],
  sm: [
    {
      w: 100,
      h: 5,
      x: 0,
      y: 0,
      i: "marketSegment",
      minH: 5
    },
    {
      w: 72,
      h: 32,
      x: 0,
      y: 5,
      i: "chart",
      minW: 45,
      minH: 30
    },
    {
      w: 72,
      h: 22,
      x: 0,
      y: 37,
      i: "orderBook",
      minH: 20,
      minW: 20
    },
    {
      w: 28,
      h: 54,
      x: 72,
      y: 5,
      i: "orderForm",
      minH: 30,
      minW: 25
    },
    {
      w: 100,
      h: 25,
      x: 0,
      y: 59,
      i: "userActivities",
      minH: 15,
      minW: 100
    }
  ],
  xs: [
    {
      w: 60,
      h: 5,
      x: 0,
      y: 0,
      i: "marketSegment",
      minH: 5
    },
    {
      w: 60,
      h: 32,
      x: 0,
      y: 5,
      i: "chart",
      minH: 30,
      minW: 45
    },
    {
      w: 60,
      h: 22,
      x: 0,
      y: 37,
      i: "orderBook",
      minH: 20,
      minW: 20
    },
    {
      w: 60,
      h: 7,
      x: 0,
      y: 85,
      i: "orderForm",
      minW: 25,
      minH: 30
    },
    {
      w: 60,
      h: 26,
      x: 0,
      y: 59,
      i: "userActivities",
      minH: 15,
      minW: 100
    }
  ]
};
export const addChartData = ({ currentLayout, compName, DefaultLayout }: { currentLayout: any; compName: string; DefaultLayout: any }) => {
  const newlayout = { ...currentLayout };
  for (const size in newlayout) {
    const l = DefaultLayout[size].filter((item: { i: string }) => item.i === compName);
    newlayout[size] = [...newlayout[size], ...l];
  }

  return newlayout;
};
export const removeChartData = (layouts: any, payload: string) => {
  const newlayout = { ...layouts };
  // Loop through each layout size (lg, md, sm, xs)
  for (const size in layouts) {
    // Filter out chart data from the current size layout
    newlayout[size] = newlayout[size].filter((item: { i: string }) => item.i !== payload);
  }

  return newlayout;
};
export const Components = ["marketSegment", "orderForm", "chart", "orderBook", "userActivities"];
