import itemsModel from "models/items.model"

describe('canBuildSlug', () => {
  describe('Build', () => {
    it("Change name", () => {
      const mockPayload = {
        "name": "My new title"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change name already slugged", () => {
      const mockPayload = {
        "name": "my-new-title-already-slugged"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change slug", () => {
      const mockPayload = {
        "slug": "My new slug"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change slug + name", () => {
      const mockPayload = {
        "name": "My new name",
        "slug": "My new slug"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(true);
    });
    it("Change slug + name with name already slugged", () => {
      const mockPayload = {
        "name": "my-new-name-already-slugged",
        "slug": "my new slug"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(true);
    });
  });

  describe("Don't build", () => {
    it("Don't change name or slug", () => {
      const mockPayload = {
        "quantity": 1
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(false);
    });
    it("Change slug already slugged", () => {
      const mockPayload = {
        "slug": "my-new-slug-already-slugged"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(false);
    });
    it("Change slug + name with slug already slugged", () => {
      const mockPayload = {
        "name": "My new name",
        "slug": "my-new-slug-already-slugged"
      };

      expect(itemsModel.canBuildSlug(mockPayload)).toBe(false);
    });
  });
});
