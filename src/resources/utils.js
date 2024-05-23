function getRandomId() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  // return id of format 'aaaa'-'aaaa'
  return `${s4()}-${s4()}`;
}

export {
  getRandomId,
};
