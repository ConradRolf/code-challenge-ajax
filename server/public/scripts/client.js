console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', postJokes)
    getJokes();
}

function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokes',
    }).then(function(response){
        console.log('got some jokes ready from the server')
        $('#outputJokes').empty();
        for(let joke of response){
            let completeJoke = `From: ${joke.whoseJoke}, ${joke.jokeQuestion} ${joke.punchLine}`
            $('#outputJokes').append(`
            <li>${completeJoke}</li>
        `)}
    }).catch(function (error) {
        console.log('GET /jokes call failed');
        console.log('error:', error);
})
}

function postJokes(event){
    event.preventDefault();
    let joke = {
    whoseJoke: $('#whoseJokeIn').val(),
    jokeQuestion: $('#questionIn').val(),
    punchLine: $('#punchlineIn').val()
    }
    $('#whoseJokeIn').val('')
    $('#questionIn').val('')
    $('#punchlineIn').val('')

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: joke
    }).then(function(response){
        getJokes();
        console.log('posted some jokes from the DoM')
    }).catch(function (error) {
            console.log('POST /jokes call failed');
            console.log('error:', error);
    })
}