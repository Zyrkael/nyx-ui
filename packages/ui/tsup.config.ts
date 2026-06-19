import { createTsupConfig } from "../../tsup.base";

export default createTsupConfig({
  dts: true,
  entry: {
    index: "src/index.ts",
    "lib/utils": "src/lib/utils.ts",
    "components/button": "src/components/button.tsx"
  }
});
