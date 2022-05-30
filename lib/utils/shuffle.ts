// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T = any>(array: T[]) => {
  const copy = [...array];

  let currentIndex = copy.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex], copy[currentIndex]];
  }

  return copy;
};

export default shuffle;