const item = {
  id: 1234,
  name: 'sony wf1000xm3',
  category: 'earphones',
};

const { id, ...rest } = item;

console.log(id);
// 1234

console.log(rest);
// { name: "sony wf1000xm3", category: 'earphones' }
