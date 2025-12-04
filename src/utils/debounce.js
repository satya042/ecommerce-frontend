export const debounce = (fn, delay = 300) => {
  let id;
  return (...args) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
};


