# dale
Dale Slack Bot

# Setup
1. `cd` to the directory you would like to add Dale
2. `heroku login` user: chicago.prestige.world.wide@gmail.com password: ask
3. `heroku git:clone -a nameless-mountain-4460`
4. Set up git remote to PWW github dale repo, and your personal github fork
5. `npm install`
6. Add `SLACKBOT_TOKEN` environment variable on your system (log into Heroku, access nameless-mountain-4460, access settings, and view Config Variables)

# Contributing
1. Make modifications
2. Create a PR to PWW github dale repo
3. Merge PR
4. `git checkout master`
5. `git pull <pww-github-dale-repo> master`
9. `git push heroku master`

# Dale scripts
* Create new `.js` script under `dale/`
* Pass your `.js` script into a local variable in `dale/main.js` using `require('./<your-script>.js')`
* If your script requires access to the SlackBot instance, pass the `slack` instance into your script's local variable in `dale/main.js`

# Dale template script
`dale/template.js`
```javascript
// If necessary to define a class, begin with that, otherwise skip to module.exports
var TemplateClass;

TemplateClass = (function() {
  // In the constructor, accept the slack instance and (optional) set up cache data
  function TemplateClass(robot1) {
    this.robot = robot1;
    this.cache = {
      persistDatum: {}
    };

    // If necessary to seed the class with data from persist, set an open
    // event listener on the slack instance
    this.robot.on('open', (function(_this) {
       return function() {
         var base;
         (base = _this.robot.data.Template).persistDatum || (base.persistDatum = {});
         return _this.cache.scores = _this.robot.data.Template.persistDatum || {};
       };
    })(this));
  }

  // Define whatever necessary prototype functions are necessary
  TemplateClass.prototype.getDatum = function(datum) {
    var base;
    (base = this.cache.persistDatum)[datum] || (base[datum] = 0);
    return datum;
  };

  // Be sure to return your class prototype from this function call
  return TemplateClass;

})();

// The module.exports is where binding with the slack instance occurs
module.exports = function(robot) {
  // If a class was defined, instantiate.  The instance can now be used throughout
  var templateClass;
  templateClass = new TemplateClass(robot);

  // Define event handlers on the slack instance that was passed into this module
  robot.on('message', function(message){
    // Default message handling
    var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
    channel = robot.getChannelGroupOrDMByID(message.channel);
    user = robot.getUserByID(message.user);
    response = '';
    type = message.type, ts = message.ts, text = message.text;
    channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';

    channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
    userName = (user != null ? user.name : void 0) != null ? user.name : "UNKNOWN_USER";
    console.log("TemplateClass received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");
    if (type === 'message' && (text != null) && (channel != null)) {
      return channel.send("This message will be sent to chat");
    }
  });
};
```
