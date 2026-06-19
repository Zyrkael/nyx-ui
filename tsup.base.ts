import { defineConfig, type Options } from "tsup";

type TsupAliasMap = Record<string, string>;

type CreateTsupConfigOptions = Options & {
  alias?: TsupAliasMap;
};

export const tsupBaseOptions: Options = {
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  minify: false,
  outDir: "dist",
  skipNodeModulesBundle: true,
  sourcemap: true,
  splitting: false,
  target: "es2020",
  treeshake: true,
};

export const createPackageAliases = (
  aliases: TsupAliasMap = {},
): TsupAliasMap => ({
  "@": "./src",
  ...aliases,
});

export const createTsupConfig = (overrides: CreateTsupConfigOptions = {}) =>
  defineConfig((cliOptions) => {
    const alias = createPackageAliases(overrides.alias);

    return {
      ...tsupBaseOptions,
      ...overrides,
      ...cliOptions,
      esbuildOptions(options, context) {
        options.alias = {
          ...alias,
          ...options.alias,
        };

        overrides.esbuildOptions?.(options, context);
        cliOptions.esbuildOptions?.(options, context);
      },
    };
  });

export default createTsupConfig;
