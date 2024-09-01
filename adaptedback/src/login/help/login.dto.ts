export type ResourceData = {
  [k: string]: unknown;
};

export class Resource {
  constructor(
    data: ResourceData,
    // public readonly meta: Metadata = new Metadata(),
  ) {
    Object.assign(this, data);
  }
}

export class Metadata {
  constructor(
    public readonly total: number = 0,
    // public readonly page: number = 0,
    public readonly count: number = 0,
  ) {}
}

export class ArrayResource {
  constructor(
    data: ResourceData,
    public readonly meta: Metadata,
  ) {
    Object.assign(this, data);
  }
}
