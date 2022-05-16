const DATA_PATH = "data/romeo-and-juliet-word-list.json";

class WordList {

    static async loadList() {
        let response = await fetch(DATA_PATH),
        result = await response.json();
        return result;
    }

}

export default WordList;