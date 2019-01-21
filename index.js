const Twit = require('twit')
const rp = require('request-promise');
_ = require('lodash')

tweet_count = 0;

const imageBase64 = "data:image/jpeg;base64,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"

const i2b = require("imageurl-base64");

function getProfileBase64(url) {
    return new Promise((resolve, reject) => {
        i2b(url, function (err, data) {
            if (!err) {
                resolve(data.dataUri)
            } else {
                resolve(imageBase64)
            }
        });
    })
}



const T = new Twit({
    consumer_key: 'vizBLoVyy7jCO6YodnZfPQ9uw',
    consumer_secret: 'cGqyg85zFBJNsQzSNPq1gRKGWoiF0tswk7cZVIYcx0QCK8hw6v',
    access_token: '145848213-IC11OPslrRVXRXQCE9v0YLJW1Yle5oLzlFANA5T6',
    access_token_secret: 'ztMup6vGkUg7rqtwOejl9zKq2uKwMJ9QabwqMheTDsz5j',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})

const isTweet = _.conforms({
    user: _.isObject,
    id_str: _.isString,
    text: _.isString,
})

var stream = T.stream('statuses/filter', {
    track: '#upright4nigeria',
    language: 'en'
})

stream.on('tweet', function (tweet) {

    if (typeof (tweet.retweeted_status) !== "undefined") {
        tweet = tweet.retweeted_status;
    }
    console.log(tweet)
    getProfileBase64(tweet.user.profile_background_image_url)
        .then(image => {
            post_d = {
                title: `${tweet.text.substring(0, 15)} ...`,
                body: (typeof (tweet.extended_tweet) !== "undefined") ? tweet.extended_tweet.full_text : tweet.text,
                links: null,
                long: 0,
                lat: 0,
                hasImg: true,
                img: image,
                anonymous: true,
                isVideo: false,
                from_twitter: true
            };

            const options = {
                method: 'POST',
                //uri: 'https://reportapp-dirisu.herokuapp.com/post/createpost',
                uri: 'https://www.uprightaip.cloud/post/createpost',
                body: post_d,
                json: true // Automatically stringifies the body to JSON
            };

            return rp(options)

        }).then((parsedBody) => {
            console.log(post_d.body)
        })
        .catch(function (err) {
            console.error(error)
        });

    //console.log(tweet)
    //console.log(typeof (tweet.extended_tweet))
    /*     post_d = {
             title: tweet.text.substring(0, 10),
             body: tweet.text,
             long: 0,
             lat: 0,
             img: null,
             anonymous: true
         }
     */


})