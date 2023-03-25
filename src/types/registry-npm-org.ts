export interface NpmPackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  types?: string;
  scripts?: {
    [key: string]: string;
  };
  repository?: {
    type: string;
    url: string;
  };
  keywords?: string[];
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  license?: string;
  bugs?: {
    url: string;
  };
  homepage?: string;
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  peerDependencies?: {
    [key: string]: string;
  };
  optionalDependencies?: {
    [key: string]: string;
  };
  engines?: {
    [key: string]: string;
  };
  exports?: {
    [key: string]: string;
  };
  [key: string]: any;
}
