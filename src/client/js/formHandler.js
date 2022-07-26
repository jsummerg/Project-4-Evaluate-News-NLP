async function handleSubmit(e) {
    e.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    // fetch('http://localhost:8081/post')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })

    try {
        // Send user input to post route which will call meaning cloud api
        const result = await postData('/post',{text: userInput})

        //Update the UI
        document.getElementById('results').innerHTML = `<p style="font-family: fantasy; color: white;"> <span style="color: gold;"> Agreement:</span>   ${result.agreement}</p>
                                                        <p style="font-family: fantasy; color: white;"> <span style="color: gold;"> Confidence:</span>  ${result.confidence}</p>
                                                        <p style="font-family: fantasy; color: white;"> <span style="color: gold;">Score_tag:</span>   ${result.score_tag}</p>`
    }catch(error){
        console.log("error",error);
    }
}

const postData = async (url = '', data= {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    })
    try {
        //Get analysed data from server side
        const analysedData = await response.json();
        return analysedData
    } catch(error) {
        console.log("error", error);
    }
}

export { handleSubmit }