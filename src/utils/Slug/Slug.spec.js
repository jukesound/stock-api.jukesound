import Slug from "utils/Slug/Slug";

describe("_canBuildSlug()", () => {
  describe("Build", () => {
    it("Change name", () => {
      const mockPayload = {
        "name": "My new title"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change name already slugged", () => {
      const mockPayload = {
        "name": "my-new-title-already-slugged"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change slug", () => {
      const mockPayload = {
        "slug": "My new slug"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change slug + name", () => {
      const mockPayload = {
        "name": "My new name",
        "slug": "My new slug"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change slug + name with name already slugged", () => {
      const mockPayload = {
        "name": "my-new-name-already-slugged",
        "slug": "my new slug"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(true);
    });
  });

  describe("Don't build", () => {
    it("Don't change name or slug", () => {
      const mockPayload = {
        "quantity": 1
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(false);
    });
    it("Change slug already slugged", () => {
      const mockPayload = {
        "slug": "my-new-slug-already-slugged"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(false);
    });
    it("Change slug + name with slug already slugged", () => {
      const mockPayload = {
        "name": "My new name",
        "slug": "my-new-slug-already-slugged"
      };

      expect(Slug._canBuildSlug(mockPayload)).toBe(false);
    });
  });
});

describe("_buildSlug()", () => {
  it("change name", () => {
    const mockPayload = {
      "name": "My new title"
    };
    const expectReturn = {
      "slug": "my-new-title"
    };

    expect(Slug._buildSlug(mockPayload)).toEqual(expectReturn);
  });
  it("change slug", () => {
    const mockPayload = {
      "slug": "My new slug"
    };
    const expectReturn = {
      "slug": "my-new-slug"
    };

    expect(Slug._buildSlug(mockPayload)).toEqual(expectReturn);
  });
  it("change name + slug", () => {
    const mockPayload = {
      "name": "My new title",
      "slug": "My new slug"
    };
    const expectReturn = {
      "slug": "my-new-slug"
    };

    expect(Slug._buildSlug(mockPayload)).toEqual(expectReturn);
  });
});

describe("addSlug()", () => {
  it("change name + quantity", () => {
    const mockPayload = {
      "name": "My new titlé",
      "quantity": 3,
    };
    const expectReturn = {
      ...mockPayload,
      "slug": "my-new-title",
    };

    expect(Slug.addSlug(mockPayload)).toEqual(expectReturn);
  });
  it("change only name", () => {
    const mockPayload = {
      "quantity": 3,
    };
    const expectReturn = {
      ...mockPayload
    };

    expect(Slug.addSlug(mockPayload)).toEqual(expectReturn);
  });
});
