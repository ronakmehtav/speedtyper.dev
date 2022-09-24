import { TrackedRepo } from "../model";
import { upsertTrackedRepo } from "../upsertTrackedRepo";

describe("upsertTrackedRepo", () => {
  const slug = "asdf/asdf";
  describe("when no repo exists", () => {
    it("create a new repo", async () => {
      await upsertTrackedRepo(slug);

      const allRepos = await TrackedRepo.find({});
      expect(allRepos.length).toBe(1);
    });

    it("returns a repo with the expected slug", async () => {
      const repo = await upsertTrackedRepo(slug);
      expect(repo.slug).toBe(slug);
    });

    it("returns a repo with undefined info", async () => {
      const repo = await upsertTrackedRepo(slug);
      expect(repo.info).toBeUndefined();
    });
  });

  describe("when a repo already exists", () => {
    const repoInfo = {
      htmlUrl: "string",
      stars: 9,
      licenseName: "string",
      licenseUrl: "string",
    };

    beforeEach(async () => {
      const repo = await upsertTrackedRepo(slug);
      repo.info = repoInfo;
      await repo.save();
    });

    it("does not create another repo", async () => {
      await upsertTrackedRepo(slug);
      const allRepos = await TrackedRepo.find({});
      expect(allRepos.length).toBe(1);
    });

    it("does not replace existing info", async () => {
      await upsertTrackedRepo(slug);

      const repo = await TrackedRepo.findOne({
        slug,
      });

      expect(repo?.toJSON()?.info).toEqual(repoInfo);
    });
  });
});
