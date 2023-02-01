import { useSidebar } from ".";
import { renderHook } from "@testing-library/react";

describe("useSidebar", () => {
  describe("data", () => {
    it('should return mock data', () => {
      const { result } = renderHook(useSidebar);
      expect(result.current).toHaveProperty("data");
    })
  })
});
