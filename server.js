import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.options('*', cors());
app.use(cors());

app.post('/sign-up', (req, res)=> {
	const { username, avatar } = req.body;
    const user = {
        username,
        avatar
    };
    database.users.push(user);
    res.send("Ok");
});

app.post('/tweets', (req, res)=> {
	const { username, tweet } = req.body;
    const tweetBody = {
        username,
        tweet
    };
    database.tweets.push(tweetBody);
    res.send("Ok");
});

app.get('/tweets', (req, res)=> {
	const lastTweets = database.tweets.slice(-10);
    res.send(lastTweets.reverse());
});

const database = {
    users: [],
    tweets: [
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 2"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 3"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 4"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 5"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 6"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 7"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 8"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 9"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 10"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 11"
        },
        {
            username: "bobesponja",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj",
            tweet: "eu amo o hub 12"
        },
    ]
}

app.listen('5000', () => {
	console.log('Server is ready to rock 😆');
});