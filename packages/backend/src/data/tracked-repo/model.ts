import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

export interface IRepoInfo {
  htmlUrl: string;
  stars: number;
  licenseName: string;
  // TODO: consider if licenseUrl is required.
  // How do we extract it from the GitTree?
  licenseUrl?: string;
}

export interface ITrackedRepo {
  _id: Types.ObjectId;
  slug: string;
  info?: IRepoInfo;
}

const repoInfoSchema = new Schema<IRepoInfo>(
  {
    htmlUrl: { type: String, required: true },
    licenseName: { type: String, required: true },
    licenseUrl: { type: String, required: true },
    stars: { type: Number, required: true },
  },
  { _id: false }
);

const repoSchema = new Schema<ITrackedRepo>({
  slug: { type: String, required: true },
  info: { type: repoInfoSchema, required: false },
});

export const TrackedRepo = mongoose.model<ITrackedRepo>(
  "tracked-repositories",
  repoSchema
);
