import { formatValue, generateSpacingStyles, generateComponentStyles } from '../src/utils/spacing';

console.log("=========================================");
console.log("🧪 TESTING HYBRID SPACING ENGINE FORMATTER");
console.log("=========================================");

// Test Cases for formatValue
const tests = [
  { value: "24", unit: "px", expected: "24px" },
  { value: "1.5", unit: "rem", expected: "1.5rem" },
  { value: "-4", unit: "px", expected: "-4px" },
  { value: "2rem", unit: "px", expected: "2rem" },
  { value: "10%", unit: "rem", expected: "10%" },
  { value: "auto", unit: "px", expected: "auto" },
  { value: "calc(100% - 20px)", unit: "px", expected: "calc(100% - 20px)" },
  { value: null, unit: "px", expected: "" },
  { value: undefined, unit: "px", expected: "" },
];

let failed = false;

tests.forEach((t, i) => {
  const result = formatValue(t.value, t.unit);
  const passed = result === t.expected;
  console.log(`Test ${i + 1}: formatValue(${JSON.stringify(t.value)}, "${t.unit}") => ${JSON.stringify(result)} | ${passed ? "✅ PASSED" : "❌ FAILED (Expected: " + JSON.stringify(t.expected) + ")"}`);
  if (!passed) failed = true;
});

// Test component styles generation
const sampleBlok = {
  spacingUnit: 'rem',
  paddingTopMobile: '2',
  paddingBottomMobile: '24px', // custom
  titleColor: '#FF5733',
  titleSizeDesktop: '4', // should become 4rem
  imageWidth: '300px',
  imageBorderRadius: '16' // should become 16px default for images
};

console.log("\n=========================================");
console.log("🎨 GENERATING STYLES FOR SAMPLE BLOK");
console.log("=========================================");
const generatedStyles = generateComponentStyles(sampleBlok, 'test-class');
console.log(generatedStyles);

if (generatedStyles.includes('padding-top: 2rem !important;') && 
    generatedStyles.includes('padding-bottom: 24px !important;') &&
    generatedStyles.includes('color: #FF5733 !important;') &&
    generatedStyles.includes('font-size: 4rem !important;') &&
    generatedStyles.includes('width: 300px !important;') &&
    generatedStyles.includes('border-radius: 16px !important;')) {
  console.log("\n✅ Component styles generated successfully with hybrid values!");
} else {
  console.log("\n❌ Component styles validation FAILED!");
  failed = true;
}

if (failed) {
  process.exit(1);
} else {
  console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
}
