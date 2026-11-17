export const strategies = [
  {
    id: "trend-following",
    name: "Trend-following",
    fullName: "Directional Structure & Momentum",
    category: "Market Structure",
    description:
      "A systematic directional framework exploiting momentum continuation. It tracks higher-timeframe orderflow, identifies structural pullbacks into dynamic value corridors (20/50 EMA), and triggers when lower-timeframe momentum realigns with the primary trend.",
    development:
      "Translate multi-timeframe trend alignment, dynamic EMA slope verification, pullback threshold criteria, and trailing ATR stop loss into automated execution logic.",
    tags: ["Multi-Timeframe", "EMA Corridors", "ATR Trailing", "Momentum"],
    diagramLabel: "HTF BIAS → DISCOUNT PULLBACK → MOMENTUM EXPANSION",
    timeframe: "H4 Bias → M15 / M5 Entry",
    riskReward: "1:2.8 — 1:4.5",
    winRate: "58% — 64%",
    primaryAssets: "XAUUSD, EURUSD, US30, NAS100",
    algoFeasibility: "98% · High EA Determinism",
    phases: [
      {
        step: "01",
        name: "HTF Structure Bias",
        action: "H4 market prints consecutive Higher Highs & Higher Lows cleanly above the 50 EMA baseline.",
        rule: "HTF Trend Bullish (Fast EMA > Slow EMA)",
      },
      {
        step: "02",
        name: "Discount Pullback",
        action: "Price conducts a controlled retracement into the dynamic 20/50 EMA value corridor without closing below.",
        rule: "Pullback into Dynamic Support Zone",
      },
      {
        step: "03",
        name: "Momentum Break & Trail",
        action: "M5 momentum shift triggers long order; stop placed beneath swing low with ATR-based dynamic trailing.",
        rule: "Entry on M5 Breakout · ATR Trailing Stop",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| Trend-Following Momentum EA Engine                               |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
input int    InpFastEMA   = 20;     // Fast EMA Period
input int    InpSlowEMA   = 50;     // Slow EMA Period
input double InpRiskRatio = 1.5;    // Risk per trade (% of equity)
input double InpATRTrail  = 2.0;    // ATR Trailing Multiplier

void OnTick() {
   double emaFast = iMA(_Symbol, _Period, InpFastEMA, 0, MODE_EMA, PRICE_CLOSE, 1);
   double emaSlow = iMA(_Symbol, _Period, InpSlowEMA, 0, MODE_EMA, PRICE_CLOSE, 1);
   double close1  = iClose(_Symbol, _Period, 1);
   double close2  = iClose(_Symbol, _Period, 2);
   
   // 1. HTF Trend & EMA dynamic discount pullback filter
   bool isBullishTrend = (emaFast > emaSlow) && (emaFast - emaSlow > 5 * _Point);
   bool isPullback     = (close2 <= emaFast) && (close1 > emaFast); // Re-crossing up
   
   if(isBullishTrend && isPullback && !HasOpenPosition()) {
      double sl = CalculateDynamicSwingLow(3) - (10 * _Point);
      double tp = close1 + (close1 - sl) * 2.8;
      ExecuteMarketOrder(ORDER_TYPE_BUY, sl, tp, InpRiskRatio);
   }
}`,
  },
  {
    id: "ict",
    name: "ICT",
    fullName: "Inner Circle Trader & Institutional Orderflow",
    category: "Institutional Orderflow",
    description:
      "Precision price-action methodology centered on interbank price delivery. It exploits institutional liquidity engineering: waiting for buy-side or sell-side stops to be swept, confirming displacement with an energetic break of structure, and entering on the return to a Fair Value Gap (FVG).",
    development:
      "Program algorithmic detectors for liquidity wick sweeps, body-displacement candles, multi-timeframe FVG imbalances, and Consequent Encroachment (50% midpoint) limit orders.",
    tags: ["Liquidity Engineering", "Fair Value Gaps", "Displacement", "Time & Price"],
    diagramLabel: "LIQUIDITY SWEEP → DISPLACEMENT → FVG OPTIMAL ENTRY",
    timeframe: "H1 / M15 Context → M5 / M1 Execution",
    riskReward: "1:3.0 — 1:6.0",
    winRate: "62% — 70%",
    primaryAssets: "XAUUSD, EURUSD, GBPUSD, NAS100",
    algoFeasibility: "92% · Precision Imbalance Logic",
    phases: [
      {
        step: "01",
        name: "Liquidity Grab (BSL/SSL)",
        action: "Price sweeps previous session high to trigger resting buy-stop orders into institutional sell liquidity.",
        rule: "BSL Swept + High Rejection Wick",
      },
      {
        step: "02",
        name: "Displacement & FVG",
        action: "Aggressive impulsive candle creates an unfilled 3-candle Fair Value Gap and shatters minor support.",
        rule: "Body Displacement > 2.5x ATR + Valid FVG",
      },
      {
        step: "03",
        name: "Optimal Trade Entry (OTE)",
        action: "Limit order filled at 50% FVG Consequent Encroachment; invalidation above sweep wick; TP at external SSL.",
        rule: "Entry at CE (50%) · SL Above Sweep · Min 1:3 R:R",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| ICT Liquidity Sweep & Fair Value Gap (FVG) Execution Engine       |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
input ENUM_TIMEFRAMES HTF_Period = PERIOD_H1;   // HTF Bias Timeframe
input double InpMinFvgPips       = 8.0;         // Minimum FVG Imbalance Size
input double InpTargetRR         = 3.5;         // Target Risk-to-Reward

void OnTick() {
   // 1. Detect Buy-Side Liquidity Sweep (BSL) on HTF
   double sessionHigh = GetSessionHigh(PERIOD_D1);
   if(iHigh(_Symbol, HTF_Period, 1) > sessionHigh && iClose(_Symbol, HTF_Period, 1) < sessionHigh) {
      
      // 2. Identify M5 Displacement & Fair Value Gap (Candle 3 Low > Candle 1 High)
      double candle1High = iHigh(_Symbol, PERIOD_M5, 3);
      double candle3Low  = iLow(_Symbol, PERIOD_M5, 1);
      
      if((candle3Low - candle1High) >= InpMinFvgPips * _Point) {
         // Consequent Encroachment (50% FVG Midpoint)
         double fvgCE = candle1High + (candle3Low - candle1High) * 0.5;
         double stopLoss = iHigh(_Symbol, PERIOD_M5, 2) + (5 * _Point);
         double takeProfit = fvgCE - (stopLoss - fvgCE) * InpTargetRR;
         
         PlaceLimitOrder(ORDER_TYPE_SELL_LIMIT, fvgCE, stopLoss, takeProfit);
      }
   }
}`,
  },
  {
    id: "smc",
    name: "SMC",
    fullName: "Smart Money Concepts & Order Blocks",
    category: "Institutional Orderflow",
    description:
      "A structured institutional model analyzing market structure shifts, structural breaks (BOS), changes of character (CHoCH), and unmitigated Order Blocks (OB). It identifies where banks and institutions accumulate orders before initiating major trend legs.",
    development:
      "Construct automated state machines tracking structural swing highs/lows, flagging genuine BOS vs. false sweeps, cataloging active Order Blocks, and tracking mitigation status.",
    tags: ["BOS & CHoCH", "Order Blocks", "Inducement", "Premium / Discount"],
    diagramLabel: "STRUCTURAL BOS → CHoCH SHIFT → ORDER BLOCK MITIGATION",
    timeframe: "H4 / H1 Structure → M15 / M5 Entry",
    riskReward: "1:3.5 — 1:5.5",
    winRate: "60% — 68%",
    primaryAssets: "EURUSD, GBPUSD, XAUUSD, BTCUSD",
    algoFeasibility: "94% · State-Machine Driven",
    phases: [
      {
        step: "01",
        name: "Change of Character (CHoCH)",
        action: "First major structural swing low broken with a decisive candle body close, signaling trend transition.",
        rule: "Body Close Below Swing Low (CHoCH Confirmed)",
      },
      {
        step: "02",
        name: "Order Block Inception",
        action: "Isolate the last opposing bullish candle before the explosive institutional downward impulse.",
        rule: "Unmitigated Bearish Order Block Cataloged",
      },
      {
        step: "03",
        name: "Mitigation & Expansion",
        action: "Price retraces into premium discount zone to mitigate the OB; tight limit execution targeting structural low.",
        rule: "Limit Entry at Distal OB · SL 4 Pips Beyond OB",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| Smart Money Concepts (SMC) Structure & Order Block EA            |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
struct OrderBlock {
   double topPrice;
   double bottomPrice;
   datetime candleTime;
   bool isMitigated;
};

void OnTick() {
   // 1. Evaluate Break of Structure (BOS) & Change of Character (CHoCH)
   if(DetectMarketStructureShift(MODE_BEARISH_CHOCH)) {
      // 2. Locate Unmitigated Bearish Order Block (Last Up-Candle before impulse)
      OrderBlock ob = LocateLastOpposingCandle();
      
      if(!ob.isMitigated && IsInPremiumZone(ob.topPrice)) {
         double entryPrice = ob.bottomPrice; // Entry at OB distal edge
         double stopLoss   = ob.topPrice + (4 * _Point);
         double takeProfit = entryPrice - (stopLoss - entryPrice) * 3.8;
         
         PlacePendingOrder(ORDER_TYPE_SELL_LIMIT, entryPrice, stopLoss, takeProfit);
      }
   }
}`,
  },
  {
    id: "supply-demand",
    name: "Supply & Demand",
    fullName: "Institutional Imbalance & Base Zones",
    category: "Price Action & Zones",
    description:
      "An auction-market framework identifying significant institutional imbalances between buyers and sellers. It isolates tight consolidation bases followed by explosive departures (RBR, DBD, RBD, DBR) to pinpoint resting unfilled orders for high-probability retest reactions.",
    development:
      "Develop custom indicators to measure departure speed (body-to-range ratio), rank zone freshness, and calculate risk profiles with automated invalidation triggers.",
    tags: ["Imbalance Bases", "Freshness Scoring", "Departure Velocity", "Retests"],
    diagramLabel: "TIGHT BASE → EXPLOSIVE DEPARTURE → FRESH RETEST REACTION",
    timeframe: "D1 / H4 S&D → H1 / M15 Retest",
    riskReward: "1:2.5 — 1:4.0",
    winRate: "63% — 69%",
    primaryAssets: "XAUUSD, Crude Oil, Majors, Indices",
    algoFeasibility: "96% · High Mathematical Rigor",
    phases: [
      {
        step: "01",
        name: "Base Accumulation",
        action: "Low-volatility consolidation base where institutional inventory accumulates with tight candle ranges.",
        rule: "Base Range < 1.0x ATR · Tight Compression",
      },
      {
        step: "02",
        name: "Explosive Departure",
        action: "High-volume marubozu candles erupt away from the base, leaving heavy one-sided order flow imbalance.",
        rule: "Departure Velocity >= 2.5x Base Height",
      },
      {
        step: "03",
        name: "Fresh Retest Reaction",
        action: "First arrival back into the pristine unmitigated base triggers institutional absorption and strong bounce.",
        rule: "Fresh Zone (Retests = 0) · Rejection Pin Trigger",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| Supply & Demand Zone Engine with Departure Velocity              |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
input double InpVelocityThreshold = 2.5; // Departure / Base ratio
input int    InpMaxZoneRetests    = 1;   // Fresh zones only

void EvaluateZones() {
   for(int i = 1; i <= 50; i++) {
      if(IsConsolidationBase(i)) {
         double baseHeight = iHigh(_Symbol, 0, i) - iLow(_Symbol, 0, i);
         double departure  = MathAbs(iClose(_Symbol, 0, i - 1) - iOpen(_Symbol, 0, i - 1));
         
         // Verify Institutional Imbalance Departure
         if((departure / baseHeight) >= InpVelocityThreshold) {
            RegisterZone(ZONE_DEMAND, iLow(_Symbol, 0, i), iHigh(_Symbol, 0, i), InpMaxZoneRetests);
         }
      }
   }
}`,
  },
  {
    id: "msnr",
    name: "MSNR",
    fullName: "Malaysian Support & Resistance",
    category: "Price Action & Zones",
    description:
      "A specialized price-action discipline honed in Southeast Asia focusing on precise horizontal levels formed by candlestick body opens and closes rather than wicks. It zeroes in on Support-becomes-Resistance (SR) and Resistance-becomes-Support (RS) role-reversals with tight rejection pins.",
    development:
      "Formulate algorithms to detect high-density horizontal body clusters, filter false wick penetrations, and trigger precision limit/stop entries on retests.",
    tags: ["Body Levels", "Role Reversal (SR/RS)", "Rejection Pins", "Key Flips"],
    diagramLabel: "STRONG LEVEL → DECISIVE BREAK → CLEAN ROLE REVERSAL",
    timeframe: "H4 Key Levels → M15 / M5 Retest",
    riskReward: "1:2.5 — 1:4.0",
    winRate: "65% — 72%",
    primaryAssets: "XAUUSD, GBPJPY, EURUSD, US30",
    algoFeasibility: "95% · Clean Candlestick Math",
    phases: [
      {
        step: "01",
        name: "Body Plane Alignment",
        action: "Identify horizontal level tested multiple times by candle body closes and opens with zero tolerance.",
        rule: "Minimum 3 Body Touches on H4 Plane",
      },
      {
        step: "02",
        name: "Decisive Role Break",
        action: "Price punches decisively through the level with high candle volume, flipping previous resistance to support.",
        rule: "Body Close 15+ Pips Beyond Level",
      },
      {
        step: "03",
        name: "Pinbar Reversal Retest",
        action: "Controlled pullback into the flipped level forms a long rejection wick; execute with tight invalidation.",
        rule: "Wick Rejection at Flip Line · Tight Stop Below Wick",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| Malaysian Support & Resistance (MSNR) Role Reversal Engine       |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
input int InpClusterTolerance = 6; // Points tolerance for candle body alignment

void DetectRoleReversal() {
   double keyResistanceLevel = FindBodyClusterLevel(CLUSTER_HIGH);
   
   // Check clean breakout followed by pinbar wick retest
   if(WasBroken(keyResistanceLevel)) {
      double currentLow  = iLow(_Symbol, 0, 1);
      double currentClose= iClose(_Symbol, 0, 1);
      
      // Pinbar rejection off newly flipped support
      bool isRejectionWick = (currentLow <= keyResistanceLevel) && 
                             (currentClose > keyResistanceLevel + (8 * _Point));
      if(isRejectionWick && !HasOpenTrade()) {
         ExecuteMarketOrder(ORDER_TYPE_BUY, keyResistanceLevel - (12 * _Point), 3.0);
      }
   }
}`,
  },
  {
    id: "bbma",
    name: "BBMA",
    fullName: "Bollinger Bands & Moving Averages",
    category: "Volatility & Systematic",
    description:
      "An advanced multi-indicator setup sequence popular in Southeast Asia combining Bollinger Bands (volatility & exhaustion) with Moving Averages (5/10 High/Low for dynamic entry corridors). It trades specific sequences: Extreme -> Market Hilang Volume (MHV) -> Candlestick Direction -> Re-entry.",
    development:
      "Encode the strict BBMA rule sequence into automated indicators and EAs: measuring band expansion/contraction, piercing conditions, and moving-average entry corridors.",
    tags: ["Bollinger Bands", "MA 5/10 Corridors", "Extreme & MHV", "Volatility Cycles"],
    diagramLabel: "BAND PIERCE (EXTREME) → LOSS OF MOMENTUM (MHV) → RE-ENTRY",
    timeframe: "H4 Trend Bias → H1 Setup → M15 Execution",
    riskReward: "1:2.0 — 1:3.5",
    winRate: "68% — 75%",
    primaryAssets: "GBPJPY, EURJPY, XAUUSD, Forex Majors",
    algoFeasibility: "97% · Indicator Mathematical Rules",
    phases: [
      {
        step: "01",
        name: "The Extreme",
        action: "Candlestick breaches outside the Upper or Lower Bollinger Band accompanied by MA5/10 piercing.",
        rule: "Candle Pierces Band Envelope (Exhaustion Flag)",
      },
      {
        step: "02",
        name: "MHV (Loss of Momentum)",
        action: "Retest attempts to form a higher high but fails to close outside the band, confirming momentum exhaustion.",
        rule: "Body Fails to Breach Outer Band (MHV State)",
      },
      {
        step: "03",
        name: "Re-Entry Corridor",
        action: "Pullback retests the dynamic MA 5/10 Low/High corridor inside the band; enter in direction of trend.",
        rule: "Touch of MA 5/10 Corridor · Target Opposite Band",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| BBMA Systematic Execution Engine (Extreme -> MHV -> Re-Entry)    |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
input int InpBBPeriod  = 20;
input double InpBBDev  = 2.0;
input int InpMA5Low    = 5;

void OnTick() {
   double upperBB = iBands(_Symbol, 0, InpBBPeriod, InpBBDev, 0, PRICE_CLOSE, MODE_UPPER, 1);
   double ma5Low  = iMA(_Symbol, 0, InpMA5Low, 0, MODE_LINEAR_WEIGHT, PRICE_LOW, 1);
   
   // Check Sequence: 1. Extreme (Candle broke Upper BB) -> 2. MHV -> 3. Re-Entry at MA5 Low
   if(SequenceTracker.HasExtreme && SequenceTracker.HasMHV) {
      if(iLow(_Symbol, 0, 1) <= ma5Low && iClose(_Symbol, 0, 1) > ma5Low) {
         // Valid Re-entry trigger
         ExecuteMarketOrder(ORDER_TYPE_BUY, iLow(_Symbol, 0, 2) - 10 * _Point, 2.5);
         SequenceTracker.Reset();
      }
   }
}`,
  },
  {
    id: "rbo",
    name: "RBO",
    fullName: "Range Breakout & Session Openings",
    category: "Volatility & Systematic",
    description:
      "A time-based breakout framework focused on predefined market consolidation sessions (such as the Asian session 00:00–08:00 GMT or pre-market indices). It monitors tight volatility compression, filters liquidity trap sweeps, and rides explosive expansion into the London or New York opens.",
    development:
      "Construct automated range-tracking EAs that capture session highs/lows, evaluate range pip width, place straddle orders or confirmation retest triggers with session-close expirations.",
    tags: ["Session Ranges", "Volatility Compression", "Liquidity Traps", "Expansion Impulses"],
    diagramLabel: "SESSION RANGE → TRAP SWEEP → IMPULSIVE EXPANSION BREAK",
    timeframe: "Asian Session (00:00-08:00) → London / NY Open (M15 / M5)",
    riskReward: "1:2.5 — 1:4.0",
    winRate: "60% — 66%",
    primaryAssets: "GBPUSD, EURUSD, XAUUSD, DAX40, US30",
    algoFeasibility: "99% · Fully Deterministic & Time-Gated",
    phases: [
      {
        step: "01",
        name: "Session Range Demarcation",
        action: "Define Asian session High and Low boundaries; verify compression range is within optimal pip threshold.",
        rule: "Time Window: 00:00 - 08:00 GMT · Range < 35 Pips",
      },
      {
        step: "02",
        name: "Liquidity Trap Sweep",
        action: "Pre-market wick pierces above Range High to trigger early breakout buy stops, then immediately closes back inside.",
        rule: "False Wick Beyond Boundary < 10 Mins (Trap)",
      },
      {
        step: "03",
        name: "London Expansion Breakout",
        action: "High-volume London open candle smashes through Range Low; execute with stop above range midline.",
        rule: "Impulse Candle Breakout · Stop at Range Midline",
      },
    ],
    codeSnippet: `//+------------------------------------------------------------------+
//| Range Breakout & Session Opening Engine                          |
//| Developer: Bun Kheang Heng (Ben10-Fx)                            |
//+------------------------------------------------------------------+
input string InpSessionStart = "00:00"; // Asian Range Open (GMT)
input string InpSessionEnd   = "08:00"; // Asian Range Close (GMT)
input int    InpMaxRangePips = 35;      // Compression limit

void OnSessionClose() {
   double rangeHigh = GetSessionHigh(InpSessionStart, InpSessionEnd);
   double rangeLow  = GetSessionLow(InpSessionStart, InpSessionEnd);
   double pipWidth  = (rangeHigh - rangeLow) / _Point / 10;
   
   if(pipWidth <= InpMaxRangePips) {
      // Place London Open Straddle Orders with tight OCO cancel
      PlaceStopOrder(ORDER_TYPE_BUY_STOP,  rangeHigh + (3 * _Point), rangeLow);
      PlaceStopOrder(ORDER_TYPE_SELL_STOP, rangeLow  - (3 * _Point), rangeHigh);
   }
}`,
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
