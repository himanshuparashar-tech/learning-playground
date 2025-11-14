export const SearchFilter = ( data, searchText, key = "question" ) => {

  if (!searchText) {
    return data; // If no search text, return all data
  }

  return data.filter(item => {
    const value = String(item[key] || "").toLowerCase();
    return value.includes(searchText.toLowerCase());
  })
}