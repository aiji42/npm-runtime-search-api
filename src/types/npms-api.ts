export interface NpmsSearchResult {
  total: number;
  results: NpmsSearchResultItem[];
}

interface NpmsSearchResultItem {
  package: NpmsPackage;
  score: NpmsScore;
  searchScore: number;
  flags?: NpmsFlags;
}

interface NpmsPackage {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  author: {
    name: string;
    email?: string;
    url?: string;
  };
  publisher: {
    username: string;
    email: string;
  };
  maintainers: Array<{
    username: string;
    email: string;
  }>;
}

interface NpmsScore {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
}

interface NpmsFlags {
  unstable?: boolean;
  deprecated?: string;
  insecure?: number;
  outdated?: number;
}
