import axios from 'axios';

const searchEndpoint = "https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=KEY_WORD";

const SearchApi = (keyword) => {
    return axios.get(searchEndpoint.replace('KEY_WORD', keyword));
};
export default SearchApi;