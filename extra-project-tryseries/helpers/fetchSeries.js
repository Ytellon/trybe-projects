const fetchSeries = async () => {
  const url = 'https://api.tvmaze.com/shows';
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

console.log(fetchSeries());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchSeries,
  };
}