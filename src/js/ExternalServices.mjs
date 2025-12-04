export default class ExternalServices {
  constructor() {
    // category and path removed - category will be passed when needed
  }
  async getData(category) {
    const response = await fetch(`/json/${category}.json`);

    if (!response.ok) {
      throw new Error(
        `Error loading ${category}: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  }
  async findProductById(id) {
    const categories = ["tents", "backpacks", "sleeping-bags"];

    for (const cat of categories) {
      const response = await fetch(`/json/${cat}.json`);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const found = data.find((item) => item.Id === id);
      if (found) return found;
    }

    return null;
  }
}
