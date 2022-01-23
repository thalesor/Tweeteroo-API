import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.options('*', cors());
app.use(cors());

app.post('/sign-up', (req, res)=> {
	const { username, avatar } = req.body;
    if(username && avatar)
    {
        if(isValidImage(avatar))
        {
            const user = {
                username,
                avatar
            };
            database.users.push(user);
            res.send("Ok");
        }
        else
        {
            res.status(400);
            res.send("O endereço da imagem não é válido!");   
        }
    }
    else
    {
        res.status(400);
        res.send("Todos os campos são obrigatórios!");
    }
});

app.post('/tweets', (req, res)=> {
	const { username, tweet } = req.body;
    if(username && tweet)
    {
        const tweetBody = {
            username,
            tweet
        }
        database.tweets.push(tweetBody);
        res.send("Ok");
    }
    else
    {
        res.status(400);
        res.send("Todos os campos são obrigatórios!");
    }
});

app.get('/tweets', (req, res)=> {
	const lastTweets = database.tweets.slice(-10).reverse();
    const tweetsToReturn = [];
    lastTweets.forEach(t => {
        const avatar = database.users.find(u=> u.username === t.username).avatar;
        tweetsToReturn.push({
            ...t,
            avatar: avatar
        });
    })
    res.send(tweetsToReturn);
});

const database = {
    users: [
    {
        username: "bobesponja",
        avatar: "https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        username: "patrick",
        avatar: "https://i.pinimg.com/736x/37/aa/f2/37aaf27bee442dfe2fb88455775cf862--patrick-obrian-spongebob-squarepants.jpg"
    },
    {
        username: "molusco",
        avatar: "https://pbs.twimg.com/profile_images/409413126/lulamolusco2_400x400.jpg"
    }],
    tweets: [
        {
            username: "bobesponja",
            tweet: "Eu gosto de encher o saco das pessoas que eu amo"
        }
        ,
        {
            username: "bobesponja",
            tweet: "Eu amo o hub"
        }
        ,
        {
            username: "patrick",
            tweet: "Sei lá, acho que minha vida tá coisada"
        }
        ,
        {
            username: "molusco",
            tweet: "Acredite na fantasia que vc quiser mas faça isso longe de mim"
        }
    ]
}

function isValidImage(url)
{
    if (typeof url !== 'string') {
        return false;
      }
      return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
}

app.listen('5000', () => {
	console.log('Server is ready to rock 😆');
});