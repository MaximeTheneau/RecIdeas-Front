const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Erreur lors de la requête à ${url}: ${response.status} ${response.statusText}`);

    throw new Error('Une erreur est survenue');
  }
  const data = await response.json();
  return data;
};

export default fetcher;
