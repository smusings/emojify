var emoji = require('node-emoji')

module.exports = {
    emojify: function(payload) {
        return emojify(payload)
    }
}

function numberToString(number) {
    switch(number) {
        case "1":
            return "one"
        case "2":
            return "two"
        case "3":
            return "three"
        case "4":
            return "four"
        case "5":
            return "five"
        case "6":
            return "six"
        case "7":
            return "seven"
        case "8":
            return "eight"
        case "9":
            return "nine"
        default:
            return "zero"
    }
}

function fixPunctuation(payload) {
    return payload
            .replace('.', ' . ')
            .replace(',', ' , ')
            .replace(':', ' : ')
            .replace(';', ' ; ')
            .replace('!', ' ! ')
            .replace('?', ' ? ')
            .replace('\'', ' \' ')
            .replace('\"', ' \" ');
}


function emojify(payload) {
    var result = []
    var post = "";
    var parts = fixPunctuation(payload).toLowerCase().split(/[\s]+/g);
    for(var i = 0; i < parts.length; i++) {
        var word = parts[i]
        var emojified;



        if(emoji.hasEmoji(word)) {
            emojified = emoji.get(word)
        } else {
            var characters = word.split('')
            emojified = ""

            for(var j = 0; j < characters.length; j++) {
                var character = characters[j]
                if (character.match(/^[.,:!?\'\"]/)) {
                    emojified = emojified + character + " ";
                }
                else if(emoji.hasEmoji(character)) {
                    emojified = emojified+emoji.get(character) + " ";
                } else {
                    emojified = emojified+emoji.get('regional_indicator_'+character) + " ";
                }
            }
        }
        if(post.length + emojified.length > 2000) {
            result.push(post);
            post = emojified;

        } else {
            post = post + " " + emojified;
        }
    }
    result.push(post);
    return result
}