type ExportsValue = string | ExportsObject;
export type ExportsObject = { [key: string]: ExportsValue };

function isExportsObject(obj: ExportsValue): obj is ExportsObject {
  return typeof obj !== "string";
}

export function recursivelyFindRuntime(
  obj: ExportsValue,
  runtimeKey: string
): boolean {
  if (!isExportsObject(obj)) {
    return false;
  }

  if (obj[runtimeKey]) {
    return true;
  }

  for (const key in obj) {
    if (recursivelyFindRuntime(obj[key], runtimeKey)) {
      return true;
    }
  }

  return false;
}
