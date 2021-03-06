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
            database.users.push(req.body);
            res.status(201);
            res.send("OK");
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
	const { tweet } = req.body;
    const user = req.header('User');
    if(tweet)
    {
        if(user)
        {
            const tweetBody = {
                username: user,
                tweet
            }
            database.tweets.push(tweetBody);
            res.status(201);
            res.send("OK");
        }
        else
        {
            res.status(400);
            res.send("Não foi possível obter as informações do usuário"); 
        }
    }
    else
    {
        res.status(400);
        res.send("Todos os campos são obrigatórios!");
    }
});

app.get('/tweets', (req, res)=> {
    const per_page = 10;
    const { page } = req.query;
    const total_items = database.tweets.length;
    const offset = total_items - (page * per_page);
    let paginatedTweets;
    if(offset < 10)
    {
        if(offset < 0)
        {
            res.status(200);
            res.send("Você está em dia");
        }
        else
        {
            paginatedTweets = database.tweets.slice(0, offset).reverse();
        }
    }
    else
	paginatedTweets = database.tweets.slice(offset).slice(0, per_page).reverse();
    const tweetsToReturn = [];

    paginatedTweets.forEach(t => {
        const avatar = database.users.find(u=> u.username === t.username).avatar;
        tweetsToReturn.push({
            ...t,
            avatar: avatar
        });
    });

    res.send(tweetsToReturn);
});

app.get('/tweets/:USERNAME', (req, res)=> {
    const user = req.params.USERNAME;
	const allTweetsFromUser = database.tweets.filter(t => t.username === user).reverse();
    const tweetsToReturn = [];
    allTweetsFromUser.forEach(t => {
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

for(let i = 0; i <= 50; i++)
{
    database.tweets.push({
        username: "bobesponja",
        tweet: `${i}`
    })
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