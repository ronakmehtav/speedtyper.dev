import { GithubRepository } from "connectors/github/schema/repository";
import { GithubTree } from "connectors/github/schema/tree";
import { TrackedRepoDoesNotExist } from "./errors";
import { ITrackedRepo, TrackedRepo } from "./model";

export interface RepoDataFetcher {
  fetchRepository(slug: string): Promise<GithubRepository>;
  fetchGitTree(name: string, sha: string): Promise<GithubTree>;
}

export class RepoSyncer {
  constructor(private fetcher: RepoDataFetcher) {}

  async sync(repo: ITrackedRepo) {
    const repoData = await this.fetcher.fetchRepository(repo.slug);

    const info = {
      htmlUrl: repoData.html_url,
      stars: repoData.stargazers_count,
      licenseName: repoData.license.name,
    };

    const syncedRepo = await TrackedRepo.findOneAndUpdate(
      { slug: repo.slug },
      {
        info,
      },
      { new: true }
    );

    if (!syncedRepo) {
      throw new TrackedRepoDoesNotExist(repo.slug);
    }

    return syncedRepo;
  }
}
