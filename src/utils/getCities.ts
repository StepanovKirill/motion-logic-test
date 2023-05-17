const getCities = () =>
  fetch(
    'https://raw.githubusercontent.com/pensnarik/russian-cities/master/russian-cities.json',
  ).then((res) => res.json());

export default getCities;
