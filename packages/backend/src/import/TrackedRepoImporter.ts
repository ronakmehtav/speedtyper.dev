import { githubAPI } from "connectors/github/api";
import { ITrackedRepo } from "data/tracked-repo/model";
import { RepoSyncer } from "data/tracked-repo/syncRepo";
import { upsertTrackedRepo } from "data/tracked-repo/upsertTrackedRepo";
import { Document } from "mongoose";

export interface repoInput {
  slug: string;
}

export interface repository {
  slug: string;
}

export interface TrackedRepoSlugsReader {
  readSlugs(): AsyncGenerator<repoInput, void, unknown>;
}

export interface TrackedRepoSyncer {
  sync(
    repo: ITrackedRepo
  ): Promise<ITrackedRepo & Document<any, any, ITrackedRepo>>;
}

export class TrackedRepoImporter {
  constructor(
    private reader: TrackedRepoSlugsReader,
    private syncer: TrackedRepoSyncer
  ) {}
  async *import() {
    for await (const repoInput of this.reader.readSlugs()) {
      const repo = await upsertTrackedRepo(repoInput.slug);
      const syncedRepo = await this.syncer.sync(repo);
      yield syncedRepo;
    }
  }
}
