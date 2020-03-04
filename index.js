require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
//Full Emote list in order: Psychic, Dragon, Water, Metal, Grass, Fire, Fighting, Fairy, Lightning, Dark, Colorless
const emotes = ["<:pc:604110580625834030>", "<:dn:604110579925516288>", "<:wr:604110345987948571>", "<:ml:604110345929228289>", "<:gs:604110345509797908>", "<:fe:604110343236747265>", "<:fg:604110342611664958>", "<:fy:604110342334709800>", "<:lg:604110339751018507>", "<:dk:604110338417491978>", "<:cl:604110337741946911>"]
const nullType = "<:none:680614434594750486>"
const roles = ["604121811453476885", "604122333195796481", "604122461709140040", "604122513160667136", "604122580244365405", "604122642181521418", "604122777221464107", "604122855625457698", "604122930871402497", "604122993328914437", "604123039373721609"]
const special = '****************************************************************************'
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	//Randomly generates one of the 11 types, from the emote array above
	if (msg.content === '.rolltype') {
		num = Math.ceil(Math.random() * 11)
		client.channels.get(msg.channel.id).send(emotes[num-1])
	}
	if(msg.content.includes('.rolltype')){
		var s = '' // Empty starting text
		var param = msg.content.split(' ')[1] //Grabs the end of the item to determine what to do next 
		if(!isNaN(param)) {
			var num = parseInt(param)
			if(num==0){
           			 client.channels.get(msg.channel.id).send(nullType)
       			 }
			else if(num<12){
				var arr = emotes.slice(0) //Arr is a copy of emotes
				for(var i=0; i<num; i++) {
					var n=Math.floor(Math.random() * Math.floor(11-i)) //Will grab a random index from the list with no out of bounds errors
					if(i==0) {
						s = s + arr[n] //Adds the type to the string as an emote
					}
					else {
						s = s + ' ' + arr[n] //Adds the type to the string as an emote
					}
					arr.splice(n,1) //removes the type aquired in the array
				}
				client.channels.get(msg.channel.id).send(s) //Sends message from bot
				//msg.reply(s)
			}

		}
		
	}
	//.iam checks for the role type, before giving the user who uses the command that role
	if (msg.content == '.iam he/him') {
		msg.reply( "is now Role 'he/him'.")
		msg.member.addRole("678825637112184843")
	}
	if (msg.content == '.iam they/them') {
		msg.reply( "is now Role 'they/them'.")
		msg.member.addRole("678825686160375860")
	}
  if (msg.content == '.iam she/her') {
    msg.reply( "is now Role 'she/her'.")
	msg.member.addRole("678825714484641832")
  }
  if (msg.content== '.iam any/all') {
	  msg.reply( "is now Role 'any/all'.")
	  msg.member.addRole("678825751390191616")
  }
  if (msg.content== '.iam trainer' || msg.content === '.iam Trainer') {
	  msg.reply( "is now Role 'Trainer'.")
	  msg.member.addRole("604123503675047936")
  }
  //Checks if the user has the role they are attempting to remove, before removing it from them
  if (msg.content== '.iamnot he/him') {
  if(msg.member.roles.get('678825637112184843')){
    msg.reply( "is no longer Role 'he/him'.")
	msg.member.removeRole("678825637112184843")
	}
  }
  if (msg.content== '.iamnot they/them') {
   if(msg.member.roles.get('678825686160375860')){
    msg.reply( "is no longer Role 'they/them'.")
	msg.member.removeRole("678825686160375860")
	}
  }
  if (msg.content== '.iamnot she/her') {
  if(msg.member.roles.get('678825714484641832')){
    msg.reply( "is no longer Role 'she/her'.")
	msg.member.removeRole("678825714484641832")
	}
  }
  if (msg.content== '.iamnot any/all') {
    if(msg.member.roles.get('678825751390191616')){
	  msg.reply( "is no longer Role 'any/all'.")
	  msg.member.removeRole("678825751390191616")
	  }
  }
  if (msg.content== '.iamnot trainer' || msg.content === '.iamnot Trainer') {
      if(msg.member.roles.get('604123503675047936')){
	  msg.reply( "is no longer Role 'Trainer'.")
	  msg.member.removeRole("604123503675047936")
	  }
  }
  //Rolls a x dice with y sides, where x is n, and y is d (.roll xdn)
 if(msg.content.includes('.roll ')) {
      var str = msg.content.split('.roll ')[1]
      if(str.length>1){
          str = str.split(' ')[0]
      }
      var n = parseInt(str.split('d')[0])
      var d = parseInt(str.split('d')[1])
	  //Checks to make sure n and d are not negative before rolling
      if(n>0 && d>0){
          var num
          var total = 0
          var s = '['
		  //rolls a d-sided die, n times, adding to the total, and to the string s, where each value is broken up by brackets, for the final output
          for(var i=1;i<=n;i++){
              num = Math.floor(Math.random() * Math.floor(d))+1
              if(i==n){
                  s+=num +']'
              }
              else{
                  s+=num+'] ['
              }
              total+=num
          }
          msg.reply(s + ' = ' + total)
      }
  }
  //Posts the image saved if 'wooow' is written, either by itself (the first case in the if), or within the rest of a post
  if(msg.content.toLowerCase().includes('wooow') || msg.content.toLowerCase().includes(' wooow') || msg.content.toLowerCase().includes('wooow ') || msg.content.toLowerCase().includes(' wooow ') || msg.content.toLowerCase().includes(':o')) {
      msg.reply('https://cdn.discordapp.com/attachments/680140875631820866/680141029071912985/Screen_Shot_2018-10-25_at_11.png')
  }
  //prints all the commands used by both bots in the server, and brief explanations
  if(msg.content.toLowerCase()==('.help')){
	  s = "\```Commands: \n\n.iam  : use with roles, both pronouns (he/him, she/her, they/them, any/all) and server specific ones (Trainer) \n\n.iamnot  : same as .iam, just to remove the roles you have.rolltype. : rolls one of the 11 types, for a nice decision maker for a new deck, or just for fun\n\n.rolltype x : x is a number between 1 and 11; rolls that many random types, without repeats\n\n.roll XdY : d is required; X and Y are integers, rolls X number of dY’s, and outputs each roll, as well as the total\n\n.listroles : Will give a full list of the roles on the server, and a short explanation of each\n\n" + special + "\nCool Porygon: Our other bot, interfaces with PokemonTCG.io to give a database of cards for easy reference.\n\n!search cardname : searches for any cards containing the text given. If there are multiple cards with the same name, a list is given, which gives you the set and card number\n\n!show setnum-cardnum : searches and gives the specific card based on set and card number. For example; !show sm5-7 shows the 7th card in Ultra Prism, the 5th set of the Sun Moon Block\n" + special + "\nIf you have any questions, find a bug, or want to leave suggestions to change or add to the Bot, feel free to leave them in Requests, @ the staff (Frontier Brain), or dm me (Canadia013)\```"
	  //Rather than replying to the user, just finds the same channel the command was written in, and posts it in that channel
	  client.channels.get(msg.channel.id).send(s)
  }
  //.passRole [elemental emote@username] uses the elemental emotes from the server and a user's name to transfer the specific elemental role from the holder to the recipient
  if(msg.content.includes('.passRole ')) {
	  //str is the emote used, name is the username of the recipient of the role
      var str = msg.content.split('.passRole ')[1]
      var name = str.split('@')[1]
      name=name.split('>')[0]
      name=name.split('!')[1]
      str = str.split('@')[0]
      str = str.split(' ')[0]
      str = str.substring(0,str.length-1)
      if(str.substring(str.length-1, str.length)!= '>'){
          str+='>'
      }
      var num
      var u = msg.guild.members.get(name) //Works; grabs user
      //Checks all of the constant array emotes, to see if the emote in the command matches
	  for(var i=0;i<emotes.length;i++){
          if(str == emotes[i]){
              num = i
          }
      }
	  //Checks if the user attempting to use this command has the role they are trying to transfer
      if(msg.member.roles.get(roles[num])){
          msg.reply(u + " has obtained the role of " + emotes[num] + " Master!")
          msg.member.removeRole(roles[num])
          u.addRole(roles[num])
          }
          else{
              msg.reply("You do not have permission to use this command")
              }
  }
  //Lists and gives a brief discription of each of the roles in the server
 if(msg.content.toLowerCase()==('.listroles')){
	  var s = "\```Self-Assignable Roles: \n\nGender: he/him, she/her,they/them, any/all\n" + special + "\nServer Specific Roles: These have some function in the server, explained below \n\nTrainer- This means you are participating in The Card Masters System\n" + special + "\nSpecial Roles: These have functions, but are not self-assignable, they must be given by a staff member, or by the current holder\n\nMasters- These are the best trainers of their mastered type, holder of the title, until they are challenged and have it taken away, or forfiet it to get a challenge another master for their title\n\nFrontier Brain- These are your staff members; if you need some server help, or have a question, they are knowledgeable, and can usually help, or get someone who can\```"
	  client.channels.get(msg.channel.id).send(s)
  }
})
//On Server join, welcomes the new user in the specific channel (greetings)
client.on('guildMemberAdd', member => {
  client.channels.get("604109732181049346").send("Welcome to Card Cove, Trainer " + member.toString() + "! Cards in hand, you venture forth to battle and make friends in this one of a kind community! Everyone say hi!") //Sends message in channel greetings anytime someone new joins the server
  //member.addRole("604123503675047936") //Gives role Trainer to newcomer to the channel
  })
//On Server exit, notifies everyone that that user has left, also in greetings  
client.on('guildMemberRemove', (member, event) => {
  client.channels.get("604109732181049346").send("Sorry to see you go, " + member.toString() + ". :C")
});
client.on('error', console.error);

//Pulls bot token from another file (.env), that gives my bot access to this code
client.login(process.env.BOT_TOKEN)
