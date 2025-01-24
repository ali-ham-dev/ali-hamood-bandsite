class BandSiteApi {
    baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    commentsUrn = '/comments';
    showDatesUrn = '/showdates';
    
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

    postComment(comment) {

    }

    getShows() {
        shows = [{}, {}, {}];
        return shows;
    }
}