import { projectStatus } from "../utils/project-status.js";

export class ProjectRules {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public status: projectStatus
  ) {}
}
