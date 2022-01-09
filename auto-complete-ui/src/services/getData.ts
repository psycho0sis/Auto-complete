const getData = async (): Promise<string[]> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/psycho0sis/autocomplete-tests/master/cities.json"
  );
  const data: string[] = await response.json();

  return data;
};

const data = await getData();
export default data;
