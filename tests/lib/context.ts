export const context = (title: string, fn: () => void) => {
  describe(title, () => {
    fn();
  });
};
