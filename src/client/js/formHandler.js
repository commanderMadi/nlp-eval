function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);

    let requestBody = {
        formText: formText
    };

    fetch('/add', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(data => {
            document.getElementById('polarity').innerHTML =
                data.polarity;
            document.getElementById('subjectivity').innerHTML =
                data.subjectivity;
        });
}

export {
    handleSubmit
};