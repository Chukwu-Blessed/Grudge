const pagination = (page = 1, total, slice) => {
  return Math.ceil(total / slice);
};

const pagination_ = (page, total, slice) => {
  let items = [];
  for (let index = 0; index < total; index++) {
    items.push(index + 1);
  }
  let pimp = [];
  for (let index = slice * (page - 1); index < slice * page; index++) {
    pimp.push(index + 1);
  }
  return pimp;
};

describe("MyJSUtilities", () => {
  describe(">Internal Checks", () => {
    it("check on the pagination algorithm", () => {
      expect(pagination(null, 51, 10)).toBe(6);
    }); 
    it("check on the pagination algorithm PT 2", () => {
      expect(pagination_(1, 51, 10)).toStrictEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]);
    });
  });
});
