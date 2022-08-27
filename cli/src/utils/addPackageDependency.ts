import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import {
  dependencyVersionMap,
  AvailableDependencies,
} from "~/installers/index.js";
import sortPackageJson from "sort-package-json";

export const addPackageDependency = (opts: {
  dependencies: AvailableDependencies[];
  devMode: boolean;
  projectDir: string;
}) => {
  const { dependencies, devMode, projectDir } = opts;

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json"),
  ) as PackageJson;

  dependencies.forEach((pkgName) => {
    const version = dependencyVersionMap[pkgName];

    if (devMode) {
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pkgJson.devDependencies![pkgName] = version;
    } else {
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      pkgJson.dependencies![pkgName] = version;
    }
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, "package.json"), sortedPkgJson, {
    spaces: 2,
  });
};
