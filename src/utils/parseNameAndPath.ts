/**
 *  Parses the appName and its path from the user input.
 * Returns an array of [appName, path] where appName is the name put in the package.json and
 *   path is the path to the directory where the app will be created.
 * Handles the case where the input includes a scoped package name
 * in which case that is being parsed as the name, but not included as the path
 * e.g. dir/@mono/app => ["@mono/app", "dir/app"]
 * e.g. dir/app => ["app", "dir/app"]
 **/
export const parseNameAndPath = (input: string) => {
  const paths = input.split("/");

  let appName = paths[paths.length - 1];

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  const path = paths.filter((p) => !p.startsWith("@")).join("/");

  return [appName, path] as const;
};
