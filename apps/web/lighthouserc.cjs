// EXN-M01-WO-005: Lighthouse CI on generated local static pages only. No external upload.
const budget = require("./performance-budgets.json");
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["http://localhost/", "http://localhost/builds/"],
      numberOfRuns: 2,
      settings: { throttlingMethod: "simulate", emulatedFormFactor: "mobile", chromeFlags: "--no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: budget.lighthouse.minimumPerformanceScore }],
        "categories:accessibility": ["error", { minScore: budget.lighthouse.minimumAccessibilityScore }],
        "largest-contentful-paint": ["error", { maxNumericValue: budget.lighthouse.maximumLargestContentfulPaintMs }],
        "cumulative-layout-shift": ["error", { maxNumericValue: budget.lighthouse.maximumCumulativeLayoutShift }],
        "total-blocking-time": ["error", { maxNumericValue: budget.lighthouse.maximumTotalBlockingTimeMs }],
      },
    },
    upload: { target: "filesystem", outputDir: "./lhci-reports" },
  },
};
