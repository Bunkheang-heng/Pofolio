export const strategies = [
  {
    id: "trend-following",
    name: "Trend-following",
    fullName: "Direction & momentum",
    description:
      "A directional approach built around sustained price movement. Trend-following studies the prevailing trend, the structure of pullbacks, and signs that the direction is changing. The focus is on following an established move through a consistent set of rules.",
    development:
      "Translate trend direction, pullback conditions, and exit criteria into explicit rules for strategy testing and automation.",
    tags: ["Trend structure", "Momentum", "Pullbacks"],
    diagramLabel: "TREND → PULLBACK → CONTINUATION",
  },
  {
    id: "ict",
    name: "ICT",
    fullName: "Inner Circle Trader",
    description:
      "A price-action framework associated with the Inner Circle Trader teachings. It brings together liquidity, market structure, displacement, fair value gaps, and time-of-day context to organize how a trader reads a setup.",
    development:
      "Define observable conditions for liquidity sweeps, displacement, and fair value gaps so an idea can be expressed in an indicator or a testable strategy.",
    tags: ["Liquidity", "Displacement", "Fair value gaps"],
    diagramLabel: "LIQUIDITY → DISPLACEMENT → FVG",
  },
  {
    id: "smc",
    name: "SMC",
    fullName: "Smart Money Concepts",
    description:
      "A framework for interpreting price through market structure, liquidity, and areas such as order blocks. Breaks of structure and changes of character help describe whether a price move is continuing or shifting. These concepts form a way to organize chart observations.",
    development:
      "Turn swing structure, BOS, CHoCH, and order-block definitions into consistent chart logic, with clear conditions for when a zone is no longer valid.",
    tags: ["BOS & CHoCH", "Order blocks", "Market structure"],
    diagramLabel: "STRUCTURE → BREAK → REACTION",
  },
  {
    id: "supply-demand",
    name: "Supply & Demand",
    fullName: "Zones & price reactions",
    description:
      "A zone-based approach that studies areas from which price previously moved away strongly. Supply and demand zones provide a reference for observing future reactions, the quality of a departure, and how a zone behaves when price returns.",
    development:
      "Specify how zones are drawn, how retests are tracked, and what invalidates an area, making the same criteria available to indicators and automated systems.",
    tags: ["Price zones", "Departure", "Retests"],
    diagramLabel: "BASE → DEPARTURE → RETURN",
  },
  {
    id: "msnr",
    name: "MSNR",
    fullName: "Malaysian Support & Resistance",
    description:
      "A support-and-resistance approach that emphasizes levels derived from candle bodies, opens, and closes. It studies how price reacts around those levels and how a former support area can become resistance, or resistance can become support.",
    development:
      "Make level selection, price reactions, and support-to-resistance flips explicit enough to visualize and evaluate consistently.",
    tags: ["Candle-body levels", "Support & resistance", "Role reversal"],
    diagramLabel: "LEVEL → BREAK → ROLE REVERSAL",
  },
  {
    id: "bbma",
    name: "BBMA",
    fullName: "Bollinger Bands & Moving Averages",
    description:
      "An approach that combines Bollinger Bands with moving averages to study volatility, directional context, and the position of price within a move. The relationship between the bands, averages, and candles provides a structure for interpreting momentum and re-entry conditions.",
    development:
      "Express band relationships, moving-average conditions, and setup sequences as configurable indicator logic and strategy rules.",
    tags: ["Bollinger Bands", "Moving averages", "Volatility"],
    diagramLabel: "BANDS + AVERAGES + PRICE",
  },
  {
    id: "rbo",
    name: "RBO",
    fullName: "Range Breakout",
    description:
      "A breakout approach centered on a clearly defined trading range. It studies the range boundaries, the move beyond those boundaries, and whether price follows through or returns inside the range. Defining the range and the breakout condition is central to making the approach repeatable.",
    development:
      "Specify the range window, breakout confirmation, optional retest conditions, and invalidation rules before turning the setup into an EA or indicator.",
    tags: ["Consolidation", "Range boundaries", "Breakout confirmation"],
    diagramLabel: "RANGE → BREAKOUT → FOLLOW-THROUGH",
  },
];

export const developmentServices = [
  {
    id: "ea",
    number: "01",
    title: "EA developer",
    subtitle: "Expert Advisors & automation",
    description:
      "I develop Expert Advisors that translate defined trading strategies into automated logic. The work connects a strategy’s conditions, execution rules, and risk controls in a structured system.",
    tags: ["Automation", "Execution logic", "Risk controls"],
  },
  {
    id: "indicator",
    number: "02",
    title: "Indicator developer",
    subtitle: "Custom tools for the chart",
    description:
      "I develop custom indicators that make trading concepts visible on the chart. My focus is on turning strategy conditions, market structure, and key levels into clear, usable visual tools.",
    tags: ["Chart tools", "Custom conditions", "Visual analysis"],
  },
  {
    id: "strategy",
    number: "03",
    title: "Strategy developer",
    subtitle: "From an idea to testable rules",
    description:
      "I develop and refine trading strategies by translating ideas into defined conditions. That means organizing setup logic, validation, and risk rules so the approach can be tested, reviewed, and improved.",
    tags: ["Rule design", "Backtesting", "Refinement"],
  },
  {
    id: "trading-tool",
    number: "04",
    title: "Trading tool developer",
    subtitle: "Practical tools for the trading workflow",
    description:
      "I develop custom trading tools that support analysis, planning, and trade management. My focus is on turning everyday trading needs into practical utilities that make the workflow clearer and more organized.",
    tags: ["Trading utilities", "Workflow tools", "Trade management"],
  },
];
