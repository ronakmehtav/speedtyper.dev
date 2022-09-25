
export interface TrackedRepoSlugsUpserter {
  upsert(): Promise<any[]>;
}

export interface TrackedRepoSlugsSyncer {
  populate(repos: any[]): Promise<any[]>;
}


export interface ChallengeImporter {
  Read(): void;
}

function readTrackedRepositorySlugs() {
  return [];
}

function saveTrackedRepositories(slugs: never[]) {
  return slugs;
}

function syncTrackedRepositories(trackedRepositories: never[]) {
  return trackedRepositories;
}

export function importTrackedRepositories() {
  const slugs = readTrackedRepositorySlugs();
  const trackedRepositories = saveTrackedRepositories(slugs);
  syncTrackedRepositories(trackedRepositories);
}

export function importChallenges() {
  // 1. Fetch slugs
  // 2. Save repositories
  // 3.
}

export async function upsertTrackedRepo(slug: any) {
  return slug;
}

export async function syncRepo(repo: any) {
  return repo;
}

export function syncRepository() {
  return;
}
