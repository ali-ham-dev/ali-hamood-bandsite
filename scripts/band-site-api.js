class BandSiteApi {
    baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    commentsUrn = '/comments';
    showDatesUrn = '/showdates';
    likeUrn = '/like';
    
    constructor(apiKey) {
        this.apiKey = apiKey;

        this.commentsUrl = this.baseUrl + this.commentsUrn + apiKey;
        this.showDatesUrl = this.baseUrl + this.showDatesUrn + apiKey;
    }

    async getComments() {
        let commentsResponse;

        try {
            commentsResponse = await axios.get(this.commentsUrl);
        }
        catch(error) {
            console.log(error.message);
        }

        return commentsResponse.data.sort((a,b) => b.timestamp - a.timestamp);
    }

    async postComment(comment) {
        try {
            await axios.post(this.commentsUrl, comment, {
                headers: {'Content-Type': 'application/json'}
            });
        }
        catch(error) {
            console.log(error.message);
        }
    }

    async getShows() {
        let showsResponse;

        try {
            showsResponse = await axios.get(this.showDatesUrl);
        }
        catch(error) {
            console.log(error.message);
        }

        return showsResponse.data;
    }

    async likeComment(commentId) {
        try {
            await axios.put(this.baseUrl + 
                this.commentsUrn + 
                '/' + 
                commentId + 
                this.likeUrn + 
                this.apiKey);
        }
        catch(error) {
            console.log(error.message);
        }
    }

    async deleteComment(commentId) {
        try {
            await axios.delete(this.baseUrl + 
                this.commentsUrn + 
                '/' + 
                commentId + 
                this.apiKey);
        }
        catch(error) {
            console.log(error.message);
        }
    }
}