import { githubAPI } from "connectors/github/api";
import { RepoSyncer } from "data/tracked-repo/syncRepo";
import {
  TrackedRepoImporter,
  TrackedRepoSlugsReader,
} from "./TrackedRepoImporter";

export async function runImportTrackedRepos() {
  const stubRepoSlugsReader: TrackedRepoSlugsReader = {
    async *readSlugs() {
      yield {
        slug: "codicocodes/speedtyper.dev",
      };
    },
  };

  const syncer = new RepoSyncer(githubAPI);

  const importer = new TrackedRepoImporter(stubRepoSlugsReader, syncer);
  for await (const _ of importer.import()) {
  }
}
