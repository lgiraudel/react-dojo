var express = require('express');
var env = require('node-env-file');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

if (!process.env.USERNAME || !process.env.PASSWORD) {
    env(__dirname + '/.env');
}

var user = process.env.USERNAME || '';
var password = process.env.PASSWORD || '';
var port = process.env.PORT || 8080;

var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function () {
    console.log('Server started: http://localhost:' + port + '/');
});

app.get('/stories', function (req, res) {
    var url = 'https://purch1.atlassian.net/rest/api/2/search';

    var fieldsInfoMappingForOutput = {
        'nb-points': function (story) {
            return story.fields.customfield_10004;
        },
        'status': function (story) {
            return story.fields.status.name;
        },
        'creator': function (story) {
            return story.fields.creator.displayName;
        },
        'labels': function (story) {
            return story.fields.labels;
        }
    };

    request({
        url: url,
        qs: {
            jql: 'Sprint = "' + req.query.sprint + '" and type != "Sub-Task" and ("labels" = teagre or project = Grenoble)'
        },
        auth: {
            user: user,
            password: password
        }
    }, function (err, response, body) {
        if (err) throw err;

        res.type('json');
        if (response.statusCode === 200) {
            var json = JSON.parse(body);

            var output = json.issues.reduce(function (prev, next) {
                var story = {key: next.key};
                story[req.query.field] = fieldsInfoMappingForOutput[req.query.field](next);
                prev.push(story);
                return prev;
            }, []);

            //var output = json;

            res.write(JSON.stringify(output));
        }
        res.status(response.statusCode);
        res.end();
    })
})