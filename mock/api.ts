export default {
  // 支持值为 Object 和 Array
  'GET /api/users': (req: any, res: any) => {
    res.json({ users: [1, 2] });
  },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
};
